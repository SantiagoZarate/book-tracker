import { userRepository } from '@/repository/user/user.repository';
import { UserInsert } from '@/types/user.type';
import bcrypt from 'bcrypt';

const userService = {
  async register(payload: UserInsert) {
    const userWithSameUsername = await userRepository.getByUsername(
      payload.username,
    );

    if (userWithSameUsername) {
      throw new Error('Username already used');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 8);

    const result = await userRepository.create({
      password: hashedPassword,
      username: payload.username,
    });

    return result;
  },
  async login(payload: UserInsert) {
    const user = await userRepository.getByUsername(payload.username);

    if (!user) {
      throw new Error('There is no user with that name');
    }

    const hasSamePassword = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!hasSamePassword) {
      throw new Error('Invalid credentials');
    }

    return user;
  },
};

export { userService };

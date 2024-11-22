import { userRepository } from '@/repository/user/user.repository';
import { UserLogin, UserRegister } from '@/types/user.type';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';

const userService = {
  async register(payload: UserRegister) {
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
      email: payload.email,
    });

    return result;
  },
  async login(payload: UserLogin) {
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
  async userExists(email: string) {
    const user = await userRepository.getByEmail(email);

    return user !== undefined;
  },
  async getUser() {
    const session = await getServerSession();
    const user = await userRepository.getByEmail(session!.user!.email!);
    return user;
  },
};

export { userService };

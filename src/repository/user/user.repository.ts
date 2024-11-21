import { db } from '@/db/db';
import { userSchema } from '@/db/schemas';
import { UserInsert, UserRAW, UserSelect } from '@/types/user.type';
import { eq } from 'drizzle-orm';

class UserRepository {
  async getById({ id }: UserSelect) {
    const data = await db.query.userSchema.findFirst({
      where: (table) => eq(table.id, id),
    });

    return data;
  }

  async getByUsername(username: UserRAW['username']) {
    const data = await db.query.userSchema.findFirst({
      where: (table) => eq(table.username, username),
    });

    return data;
  }

  async create(payload: UserInsert) {
    const data = await db.insert(userSchema).values(payload).returning({
      id: userSchema.id,
    });

    return data[0];
  }
}

export const userRepository = new UserRepository();

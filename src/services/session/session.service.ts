import { sessionRepository } from '@/repository/session/session.repository';
import {
  SessionDelete,
  SessionInsert,
  SessionRAW,
  SessionSelect,
} from '@/types/session.type';

const sessionService = {
  async create(payload: SessionInsert) {
    const data = await sessionRepository.insert(payload);
    return data;
  },
  async delete(id: SessionDelete) {
    const data = await sessionRepository.delete(id);
    return data;
  },
  async addContent(
    content: Pick<SessionRAW, 'content'>,
    session: SessionSelect,
  ) {
    const result = await sessionRepository.addContent(content, session);
    return result;
  },
};

export { sessionService };

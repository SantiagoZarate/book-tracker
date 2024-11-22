import { sessionRepository } from '@/repository/session/session.repository';
import { trackRepository } from '@/repository/track/track.repository';
import { TrackDelete, TrackInsert, TrackSelect } from '@/types/track.type';
import { userService } from '../user/user.service';

const trackService = {
  async getAll() {
    const tracks = await trackRepository.getAll();

    const tracksWithTotalPagesRead = await Promise.all(
      tracks.map(async (track) => ({
        ...track,
        pagesAlreadyRead: await sessionRepository.getTotalPagesRead({
          id: track.id,
        }),
      })),
    );

    return tracksWithTotalPagesRead;
  },
  async getAllByUser() {
    const user = await userService.getUser();

    if (!user) {
      throw new Error('User is not logged in');
    }

    const tracks = await trackRepository.getAllByUser({ id: user.id });

    const tracksWithTotalPagesRead = await Promise.all(
      tracks.map(async (track) => ({
        ...track,
        pagesAlreadyRead: await sessionRepository.getTotalPagesRead({
          id: track.id,
        }),
      })),
    );

    return tracksWithTotalPagesRead;
  },
  async getOne(id: TrackSelect) {
    const data = await trackRepository.getOne(id);
    return data;
  },
  async create(payload: Omit<TrackInsert, 'userId'>) {
    const user = await userService.getUser();

    if (!user) {
      throw new Error('No user session');
    }

    const data = await trackRepository.create({ ...payload, userId: user.id });
    return data;
  },
  async delete(id: TrackDelete) {
    const data = await trackRepository.delete(id);
    return data;
  },
  async toggleComplete(id: TrackSelect) {
    const data = await trackRepository.getOne(id);

    if (!data) {
      throw new Error('Track not found');
    }

    await trackRepository.toggleCompleteState(id, data.isCompleted);
  },
};

export { trackService };

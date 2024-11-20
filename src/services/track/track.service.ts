import { sessionRepository } from "@/repository/session/session.repository";
import { trackRepository } from "@/repository/track/track.repository";
import { TrackDelete, TrackInsert, TrackSelect } from "@/types/track.type";

const trackService = {
  async getAll() {
    const tracks = await trackRepository.getAll();

    const tracksWithTotalPagesRead = await Promise.all(
      tracks.map(async (track) => ({
        ...track,
        pagesAlreadyRead: await sessionRepository.getTotalPagesRead({
          id: track.id,
        }),
      }))
    );

    return tracksWithTotalPagesRead;
  },
  async getOne(id: TrackSelect) {
    const data = await trackRepository.getOne(id);
    return data;
  },
  async create(payload: TrackInsert) {
    const data = await trackRepository.create(payload);
    return data;
  },
  async delete(id: TrackDelete) {
    const data = await trackRepository.delete(id);
    return data;
  },
  async toggleComplete(id: TrackSelect) {
    const data = await trackRepository.getOne(id);

    if (!data) {
      throw new Error("Track not found");
    }

    await trackRepository.toggleCompleteState(id, data.isCompleted);
  },
};

export { trackService };

import { trackRepository } from "@/repository/track/track.repository";
import { TrackInsert, TrackSelect } from "@/types/track.type";

const trackService = {
  async getAll() {
    const data = await trackRepository.getAll();
    return data;
  },
  async getOne(id: TrackSelect) {
    const data = await trackRepository.getOne(id);
    return data;
  },
  async create(payload: TrackInsert) {
    const data = await trackRepository.create(payload);
    return data;
  },
};

export { trackService };

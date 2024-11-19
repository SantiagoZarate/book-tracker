import { trackRepository } from "@/repository/track/track.repository";
import { TrackInsert } from "@/types/track.type";

const trackService = {
  async getAll() {
    const data = await trackRepository.getAll();
    return data;
  },
  async create(payload: TrackInsert) {
    const data = await trackRepository.create(payload);
    return data;
  },
};

export { trackService };

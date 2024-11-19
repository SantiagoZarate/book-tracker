import { TrackBookDTO } from "@/shared/dtos/trackDTO";
import { TrackInsert, TrackSelect } from "@/types/track.type";

export interface TrackRepository {
  getAll: () => Promise<TrackBookDTO[]>;
  create: (payload: TrackInsert) => Promise<TrackSelect>;
  getOne: (id: TrackSelect) => Promise<TrackBookDTO>;
}

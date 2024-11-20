import { TrackBookSessionsDTO } from "@/shared/dtos/trackDTO";
import { createContext } from "react";

export type Session = TrackBookSessionsDTO["sessions"];

interface TrackContextProps {
  track: TrackBookSessionsDTO;
  addSession: (newTrack: TrackBookSessionsDTO) => void;
}

export const trackContext = createContext<TrackContextProps | null>(null);

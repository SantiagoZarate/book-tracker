import { trackContext } from "@/app/context/trackContext";
import { useContext } from "react";

export function useTracker() {
  const values = useContext(trackContext);

  if (!values) {
    throw new Error("this hook must be used within a tracker provider");
  }

  return values;
}

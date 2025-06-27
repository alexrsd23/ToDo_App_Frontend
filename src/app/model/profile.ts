import { Note } from "./note";

export interface Profile {
  id?: string;
  name: string;
  notes?: Note[];
}

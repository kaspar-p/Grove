import { Quad } from "n3";

export function quadToString(q: Quad): string {
  return JSON.stringify(q.toJSON());
}

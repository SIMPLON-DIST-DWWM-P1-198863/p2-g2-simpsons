import charactersData from "../data/Character.json";
import type { Character } from "../types/Character";

export function getCharacters(): Character[] {
  return charactersData as Character[];
}

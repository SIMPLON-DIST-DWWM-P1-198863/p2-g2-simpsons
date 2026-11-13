export type RelationshipType =
  | "family"
  | "friend"
  | "colleague"
  | "enemy"
  | "mentor"
  | "neighbor"
  | "other";

export interface CharacterRelationship {
  character: string;
  type: RelationshipType;
  label?: string;
}

export interface Character {
  id: number;
  name: string;
  img: string;
  description: string;
  age: number | "Unknown";
  occupation?: string;
  relationships?: CharacterRelationship[];

  // Relations familiales
  spouse?: string;
  wife?: string;
  husband?: string;
  children?: string[];
  parents?: string[];
  siblings?: string[];
  sisters?: string[];
  mother?: string;
  father?: string;

  // Relations professionnelles et autres
  assistant?: string;
  employer?: string;
  nemesis?: string;

  // Informations complémentaires
  school?: string;
  store?: string;
  bar?: string;
  gang?: string;
  hangout?: string;
  department?: string;
  clinic?: string;
  network?: string;
  city?: string;
  field?: string;
  farm?: string;
  show?: string;
  crimes?: string[];
  passion?: string;
  catchphrase?: string;
}

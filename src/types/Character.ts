export interface Character {
  id: number;
  name: string;
  img: string;
  description: string;
  age: number;
  occupation?: string;
  spouse?: string;
  children?: string[];
  parents?: string[];
  siblings?: string[];
}

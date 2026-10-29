
export interface Character {
  id: number;
  name: string;
  img: string;
  description: string;
  age: number | string;
  occupation: string;

  [key: string]: string | number | string[] | undefined;
}

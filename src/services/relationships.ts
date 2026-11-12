import type { Character, RelationshipType } from "../types/Character";

export interface CharacterLink {
  source: number;
  target: number;
  label: string;
  type: RelationshipType;
}

export function getCharacterLinks(characters: Character[]): CharacterLink[] {
  const links = new Map<string, CharacterLink>();

  // Retrouve un personnage avec son nom complet ou raccourci
  function findCharacter(name: string): Character | undefined {
    const normalizedName = name
      .replace(/\s*\([^)]*\)/g, "")
      .trim()
      .toLowerCase();

    const exactMatch = characters.find(
      (character) => character.name.toLowerCase() === normalizedName,
    );

    if (exactMatch) return exactMatch;

    const searchWords = normalizedName.split(/\s+/);

    const matches = characters.filter((character) => {
      const characterWords = character.name.toLowerCase().split(/\s+/);

      return searchWords.every((word) => characterWords.includes(word));
    });

    return matches.length === 1 ? matches[0] : undefined;
  }

  // Évite les doublons tout en conservant les différents types de relations
  function addLink(
    source: number,
    target: number,
    label: string,
    type: RelationshipType,
  ) {
    if (source === target) return;

    const pair = [source, target].sort((a, b) => a - b).join("-");
    const key = `${pair}-${type}`;

    const existingLink = links.get(key);

    if (existingLink) {
      if (!existingLink.label.split(" · ").includes(label)) {
        existingLink.label += ` · ${label}`;
      }
      return;
    }

    links.set(key, {
      source,
      target,
      label,
      type,
    });
  }

  // Recherche et ajoute une relation
  function connect(
    character: Character,
    name: string,
    label: string,
    type: RelationshipType,
  ) {
    const related = findCharacter(name);

    if (related) {
      addLink(character.id, related.id, label, type);
    }
  }

  const defaultLabels: Record<RelationshipType, string> = {
    family: "Famille",
    friend: "Ami",
    colleague: "Collègue",
    enemy: "Ennemi",
    mentor: "Mentor",
    neighbor: "Voisin",
    other: "Autre",
  };

  characters.forEach((character) => {
    // Relations familiales
    [character.spouse, character.wife, character.husband]
      .filter((name): name is string => Boolean(name))
      .forEach((name) => connect(character, name, "Conjoint", "family"));

    [character.mother, character.father]
      .filter((name): name is string => Boolean(name))
      .forEach((name) => connect(character, name, "Parent", "family"));

    (character.parents ?? []).forEach((name) =>
      connect(character, name, "Parent", "family"),
    );

    (character.children ?? []).forEach((name) =>
      connect(character, name, "Enfant", "family"),
    );

    [...(character.siblings ?? []), ...(character.sisters ?? [])].forEach(
      (name) => connect(character, name, "Frère / sœur", "family"),
    );

    // Relations professionnelles existantes
    if (character.assistant) {
      connect(character, character.assistant, "Assistant", "colleague");
    }

    if (character.employer) {
      connect(character, character.employer, "Employeur", "colleague");
    }

    // Ancienne propriété de rivalité
    if (character.nemesis) {
      connect(character, character.nemesis, "Némésis", "enemy");
    }

    // Nouvelles relations personnalisées
    (character.relationships ?? []).forEach((relationship) => {
      connect(
        character,
        relationship.character,
        relationship.label ?? defaultLabels[relationship.type],
        relationship.type,
      );
    });
  });

  return Array.from(links.values());
}

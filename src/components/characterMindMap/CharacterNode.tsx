import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

import type { Character } from "../../types/Character";
import "./CharacterNode.css";

type CharacterNodeData = {
  character: Character;
  isSelected: boolean;
};

type CharacterNodeType = Node<CharacterNodeData, "character">;

export default function CharacterNode({ data }: NodeProps<CharacterNodeType>) {
  const { character, isSelected } = data;

  return (
    <div
      title={character.name}
      className={`character-node ${
        isSelected ? "character-node--selected" : ""
      }`}>
      {/* Point de connexion supérieur */}
      <Handle
        type="target"
        position={Position.Top}
        aria-label={`Connexion entrante pour ${character.name}`}
      />

      {/* Portrait du personnage */}
      <img
        src={`/img/${character.img}`}
        alt={`Portrait de ${character.name}`}
        className="character-node__image"
        loading="lazy"
      />

      {/* Informations du personnage */}
      <div className="character-node__info">
        <h3>{character.name}</h3>

        <p>
          {typeof character.age === "number"
            ? `${character.age} ans`
            : "Âge inconnu"}
        </p>
      </div>

      {/* Point de connexion inférieur */}
      <Handle
        type="source"
        position={Position.Bottom}
        aria-label={`Connexion sortante pour ${character.name}`}
      />
    </div>
  );
}

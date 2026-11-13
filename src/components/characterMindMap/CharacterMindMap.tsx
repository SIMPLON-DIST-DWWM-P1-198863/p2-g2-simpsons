import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { getCharacters } from "../../services/characters";
import { getCharacterLinks } from "../../services/relationships";

import type { Character, RelationshipType } from "../../types/Character";

import CharacterNode from "./CharacterNode";
import "./CharacterMindMap.css";

type CharacterNodeData = {
  character: Character;
  isSelected: boolean;
};

type CharacterNodeType = Node<CharacterNodeData, "character">;

const nodeTypes = {
  character: CharacterNode,
};

// Catégories de relations disponibles
const relationshipTypes: RelationshipType[] = [
  "family",
  "friend",
  "colleague",
  "enemy",
  "mentor",
  "neighbor",
  "other",
];

// Libellés affichés dans les filtres
const relationshipLabels: Record<RelationshipType, string> = {
  family: "Famille",
  friend: "Amis",
  colleague: "Collègues",
  enemy: "Ennemis",
  mentor: "Mentors",
  neighbor: "Voisins",
  other: "Autres",
};

// Couleurs associées aux relations
const relationshipColors: Record<RelationshipType, string> = {
  family: "#FF81C1",
  friend: "#2a9d8f",
  colleague: "#457b9d",
  enemy: "#e63946",
  mentor: "#9b5de5",
  neighbor: "#f4a261",
  other: "#888888",
};

interface CharacterMindMapProps {
  selectedCharacterId?: number;
}

// Calcule la distance entre le personnage central et les autres
function getDistances(
  selectedId: number,
  links: ReturnType<typeof getCharacterLinks>,
) {
  const distances = new Map<number, number>();
  const adjacency = new Map<number, Set<number>>();

  links.forEach(({ source, target }) => {
    if (!adjacency.has(source)) adjacency.set(source, new Set());
    if (!adjacency.has(target)) adjacency.set(target, new Set());

    adjacency.get(source)!.add(target);
    adjacency.get(target)!.add(source);
  });

  distances.set(selectedId, 0);

  const queue = [selectedId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const currentDistance = distances.get(currentId)!;

    adjacency.get(currentId)?.forEach((neighborId) => {
      if (!distances.has(neighborId)) {
        distances.set(neighborId, currentDistance + 1);
        queue.push(neighborId);
      }
    });
  }

  return distances;
}

// Positionne les personnages autour du personnage central
function getPosition(index: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (2 * Math.PI * index) / total;

  return {
    x: Math.cos(angle) * radius - 80,
    y: Math.sin(angle) * radius - 75,
  };
}

export default function CharacterMindMap({
  selectedCharacterId = 1,
}: CharacterMindMapProps) {
  const navigate = useNavigate();

  // Gestion des filtres actifs
  const [activeFilters, setActiveFilters] = useState<RelationshipType[]>([
    ...relationshipTypes,
  ]);

  const characters = getCharacters();
  const links = getCharacterLinks(characters);

  const selectedCharacter =
    characters.find((character) => character.id === selectedCharacterId) ??
    characters[0];

  if (!selectedCharacter) {
    return <p>Aucun personnage à afficher.</p>;
  }

  const distances = getDistances(selectedCharacter.id, links);

  // Active ou désactive une catégorie de relations
  const toggleFilter = (type: RelationshipType) => {
    setActiveFilters((previous) =>
      previous.includes(type)
        ? previous.filter((filter) => filter !== type)
        : [...previous, type],
    );
  };

  // Conserve uniquement les relations directes du personnage sélectionné
  const relatedCharacters = characters.filter((character) => {
    if (
      character.id === selectedCharacter.id ||
      distances.get(character.id) !== 1
    ) {
      return false;
    }

    return links.some(
      (link) =>
        ((link.source === selectedCharacter.id &&
          link.target === character.id) ||
          (link.target === selectedCharacter.id &&
            link.source === character.id)) &&
        activeFilters.includes(link.type),
    );
  });

  // Création des nœuds de la carte mentale
  const characterNodes: CharacterNodeType[] = [
    {
      id: String(selectedCharacter.id),
      type: "character",
      position: { x: -80, y: -75 },
      data: {
        character: selectedCharacter,
        isSelected: true,
      },
    },

    ...relatedCharacters.map((character, index) => ({
      id: String(character.id),
      type: "character" as const,
      position: getPosition(index, relatedCharacters.length, 400),
      data: {
        character,
        isSelected: false,
      },
    })),
  ];

  // Identifiants des personnages actuellement visibles
  const visibleIds = new Set(characterNodes.map((node) => Number(node.id)));

  // Création des connexions visibles selon les filtres actifs
  const characterEdges: Edge[] = links
    .filter(
      (link) =>
        visibleIds.has(link.source) &&
        visibleIds.has(link.target) &&
        activeFilters.includes(link.type),
    )
    .map((link, index) => ({
      id: `edge-${index}`,
      source: String(link.source),
      target: String(link.target),
      label: link.label,
      animated: link.type === "enemy",
      style: {
        stroke: relationshipColors[link.type],
        strokeWidth: 2,
      },
    }));

  return (
    <div className="mindmap-wrapper">
      <div className="mindmap-filters">
        {/* Boutons de contrôle */}
        <div className="mindmap-filter-actions">
          <button
            type="button"
            onClick={() => setActiveFilters([...relationshipTypes])}>
            Tout afficher
          </button>

          <button type="button" onClick={() => setActiveFilters([])}>
            Tout masquer
          </button>

          {/* Compteur de personnages visibles */}
          <p className="mindmap-counter" aria-live="polite">
            Personnages visibles : <strong>{characterNodes.length}</strong>
          </p>
        </div>

        {/* Filtres par catégorie de relation */}
        {relationshipTypes.map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={activeFilters.includes(type)}
            onClick={() => toggleFilter(type)}
            className={`mindmap-filter ${
              activeFilters.includes(type) ? "active" : ""
            }`}
            style={{
              borderColor: relationshipColors[type],
              backgroundColor: activeFilters.includes(type)
                ? relationshipColors[type]
                : "transparent",
            }}>
            {relationshipLabels[type]}
          </button>
        ))}
      </div>

      {/* Zone d'affichage de la carte mentale */}
      <div className="mindmap-canvas">
        <ReactFlow
          key={selectedCharacter.id}
          nodes={characterNodes}
          edges={characterEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          onNodeClick={(_, node) => navigate(`/character/${node.id}`)}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

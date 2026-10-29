const API_URL = "https://materiel-apprentissage.github.io/api/simpsons.json";

export async function getCharacters() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les personnages.");
  }

  return response.json();
}
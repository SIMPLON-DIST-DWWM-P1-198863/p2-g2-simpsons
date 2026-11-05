import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CharacterDetail() {
  // Récupère l'ID présent dans l'URL (ex: /character/1 -> id = 1)
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ici, vous pouvez faire un fetch spécifique pour un personnage,
    // ou filtrer votre liste globale selon l'ID
    fetch(`https://materiel-apprentissage.github.io/api/simpsons.json`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data[Number(id) - 1]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Chargement du profil...</div>;
  if (!character) return <div>Personnage introuvable !</div>;

  return (
    <div className="character-detail-page">
      {/* Bouton pour revenir en arrière */}
      <Link to="/" className="back-button">
        ⬅ Retour à l'accueil
      </Link>

      <div className="character-profile">
        <img src={character.image} alt={character.name} />
        <h1>{character.name}</h1>
        <p className="role">
          <strong>Rôle :</strong> {character.role}
        </p>
        <p className="bio">
          <strong>Biographie :</strong> {character.description}
        </p>

        {/* Vous pouvez rajouter ici des infos exclusives pour sa page dédiée */}
        <div className="extra-info">
          <h3>Le saviez-vous ?</h3>
          <p>
            Ici, vous pouvez afficher des anecdotes supplémentaires, ses
            meilleures citations ou ses apparitions célèbres !
          </p>
        </div>
      </div>
    </div>
  );
}

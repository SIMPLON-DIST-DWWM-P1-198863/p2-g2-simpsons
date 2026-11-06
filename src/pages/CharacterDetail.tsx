import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CharacterDetail.css";

/* Dictionnaire complet des personnages */
const charactersDetailsData: { [key: number]: any } = {
  1: {
    name: "Homer Simpson",
    img: "homer_simpson.jpg",
    description: "Père de la famille Simpson, gaffeur mais attachant.",
    age: 39,
    occupation: "Inspecteur de la sécurité nucléaire",
    spouse: "Marge Simpson",
    children: ["Bart", "Lisa", "Maggie"],
    quote: "Mmm... les donuts. 🍩",
    anekdote:
      "Il a déjà voyagé dans l'espace et a prêté sa voix à Poochie dans Itchy & Scratchy.",
  },
  2: {
    name: "Marge Simpson",
    img: "marge_simpson.jpg",
    description: "Épouse et mère patiente et attentionnée.",
    age: 38,
    occupation: "Mère au foyer",
    spouse: "Homer Simpson",
    children: ["Bart", "Lisa", "Maggie"],
    quote: "Oh, mmm...",
    anekdote:
      "Elle possède une chevelure bleue emblématique mesurant près de deux mètres de haut.",
  },
  3: {
    name: "Bart Simpson",
    img: "bart_simpson.jpg",
    description: "Fils espiègle et rebelle de la famille Simpson.",
    age: 10,
    occupation: "Élève",
    parents: ["Homer", "Marge"],
    siblings: ["Lisa", "Maggie"],
    quote: "¡Ay, caramba ! / Mange mes shorts !",
    anekdote:
      "Il passe une grande partie de son temps libre à écrire des punitions sur le tableau noir de l'école.",
  },
  4: {
    name: "Lisa Simpson",
    img: "lisa_simpson.jpg",
    description:
      "Enfant du milieu de la famille Simpson, intelligente et talentueuse.",
    age: 8,
    occupation: "Élève",
    parents: ["Homer", "Marge"],
    siblings: ["Bart", "Maggie"],
    quote: "Si quelqu'un me cherche, je serai dans ma chambre.",
    anekdote:
      "Elle est végétarienne et joue du saxophone baryton avec beaucoup de brio.",
  },
  5: {
    name: "Maggie Simpson",
    img: "maggie_simpson.jpg",
    description: "Bébé précoce de la famille Simpson.",
    age: 1,
    occupation: "Bébé",
    parents: ["Homer", "Marge"],
    siblings: ["Bart", "Lisa"],
    quote: "*Sucer sa tétine*",
    anekdote:
      "Elle s'avère souvent être une tire d'élite ou résoudre des situations périlleuses en secret.",
  },
  6: {
    name: "Ned Flanders",
    img: "ned_flanders.jpg",
    description:
      "Voisin des Simpsons, profondément religieux et excessivement optimiste.",
    age: 60,
    occupation: "Propriétaire du Leftorium",
    spouse: "Maude Flanders (décédée)",
    children: ["Rod", "Todd"],
    quote: "Salut-salut !",
    anekdote:
      "Il cache un passé de rebelle sous ses airs de voisin modèle et ultra-poliment.",
  },
  7: {
    name: "Maude Flanders",
    img: "maude_flanders.jpg",
    description: "Épouse bienveillante de Ned Flanders.",
    age: 60,
    occupation: "Mère au foyer",
    spouse: "Ned Flanders",
    children: ["Rod", "Todd"],
    quote: "Pensez aux enfants !",
    anekdote:
      "Elle est connue pour sa grande piété et sa gentillesse exemplaire dans tout Springfield.",
  },
  8: {
    name: "Montgomery Burns",
    img: "mr_burns.jpg",
    description:
      "Propriétaire milliardaire de la centrale nucléaire de Springfield, connu pour sa cupidité et sa cruauté.",
    age: 104,
    occupation: "Propriétaire de la centrale nucléaire de Springfield",
    assistant: "Waylon Smithers",
    quote: "Excellent...",
    anekdote:
      "Il est tellement âgé qu'il possède son propre service de sécurité et oublie constamment le nom d'Homer.",
  },
  9: {
    name: "Waylon Smithers",
    img: "smithers.jpg",
    description: "Assistant loyal et dévoué de M. Burns.",
    age: 45,
    occupation: "Assistant",
    employer: "Montgomery Burns",
    quote: "Oui, Monsieur Burns !",
    anekdote:
      "Il voue une admiration sans limites à son patron et collectionne les poupées Malibu Stacy.",
  },
  10: {
    name: "Principal Seymour Skinner",
    img: "principal_skinner.jpg",
    description:
      "Directeur autoritaire et coincé de l'école élémentaire de Springfield.",
    age: 48,
    occupation: "Directeur d'école",
    school: "École élémentaire de Springfield",
    mother: "Agnes Skinner",
    quote: "Superintendant Chalmers !",
    anekdote:
      "Vétéran de la guerre du Viêt Nam, il vit toujours sous le toit de sa mère dominatrice.",
  },
  11: {
    name: "Apu Nahasapeemapetilon",
    img: "apu_nahasapeemapetilon.jpg",
    description: "Propriétaire travailleur de la supérette Kwik-E-Mart.",
    age: 35,
    occupation: "Propriétaire de supérette",
    store: "Kwik-E-Mart",
    spouse: "Manjula Nahasapeemapetilon",
    quote: "Merci, au revoir !",
    anekdote:
      "Il a tenu sa supérette ouvert 24h/24 pendant des mois sans interruption.",
  },
  12: {
    name: "Moe Szyslak",
    img: "moe_szyslak.jpg",
    description: "Propriétaire cynique et bourru de la taverne de Moe.",
    age: 48,
    occupation: "Patron de bar",
    bar: "Taverne de Moe",
    quote: "Qui c'est qui veut une bière ?",
    anekdote:
      "Il tente désespérément de piéger Homer avec ses célèbres canulars téléphoniques.",
  },
  13: {
    name: "Barney Gumble",
    img: "barney_gumble.jpg",
    description:
      "Client attachant mais perpétuellement ivre de la taverne de Moe.",
    age: 42,
    occupation: "Sans emploi",
    hangout: "Taverne de Moe",
    quote: "*Rot prolongé*",
    anekdote:
      "Il possède un talent caché exceptionnel pour le chant d'opéra et la réalisation de films.",
  },
  14: {
    name: "Chef Clancy Wiggum",
    img: "chief_wiggum.jpg",
    description: "Chef de la police de Springfield, incompétent et paresseux.",
    age: 45,
    occupation: "Chef de la police",
    department: "Police de Springfield",
    wife: "Sarah Wiggum",
    children: ["Ralph"],
    quote: "Rien à voir, circulez !",
    anekdote:
      "Il passe une grande partie de son temps de service à manger des donuts.",
  },
  15: {
    name: "Krusty le Clown",
    img: "krusty_the_clown.jpg",
    description: "Présentateur cynique et désabusé du show de Krusty le Clown.",
    age: 50,
    occupation: "Clown de télévision",
    show: "Le Clown Krusty Show",
    quote: "Hé, hé, les enfants !",
    anekdote:
      "Il a de nombreuses addictions et une relation compliquée avec son rabbin de père.",
  },
  16: {
    name: "Sideshow Bob",
    img: "sideshow_bob.jpg",
    description: "Ancien acolyte devenu l'ennemi juré de Krusty le Clown.",
    age: 41,
    occupation: "Cerveau criminel",
    nemesis: "Krusty le Clown",
    quote: "Bonjour, Bart.",
    anekdote:
      "Il possède une chevelure rouge en palmier et un goût prononcé pour les arts et la haute culture.",
  },
  17: {
    name: "Nelson Muntz",
    img: "nelson_muntz.jpg",
    description: "Camarade de classe harceleur de Bart Simpson.",
    age: 10,
    occupation: "Élève",
    school: "École élémentaire de Springfield",
    quote: "Ha-ha !",
    anekdote:
      "Derrière ses manières de voyou se cache une sensibilité artistique inattendue.",
  },
  18: {
    name: "Milhouse Van Houten",
    img: "milhouse_van_houten.jpg",
    description: "Meilleur ami geek de Bart Simpson.",
    age: 10,
    occupation: "Élève",
    school: "École élémentaire de Springfield",
    quote: "Tout va bien, Bart !",
    anekdote: "Il est secrètement amoureux de Lisa Simpson.",
  },
  19: {
    name: "Superintendant Chalmers",
    img: "seymour_skinner.jpg",
    description:
      "Inspecteur sévère et discipliné de l'école élémentaire de Springfield.",
    age: 55,
    occupation: "Inspecteur académique",
    school: "École élémentaire de Springfield",
    quote: "SKINNER !",
    anekdote:
      "Il perd constamment patience face aux explications farfelues du principal Skinner.",
  },
  20: {
    name: "Jardinier Willie",
    img: "groundskeeper_willie.jpg",
    description: "Concierge écossais de l'école avec un extérieur bourru.",
    age: 47,
    occupation: "Concierge",
    school: "École élémentaire de Springfield",
    quote: "Maudits Écossais !",
    anekdote:
      "Il vit dans une cabane délabrée sur le terrain de l'école et se bat parfois torse nu contre des animaux.",
  },
  21: {
    name: "Ralph Wiggum",
    img: "ralph_wiggum.jpg",
    description: "Fils naïf et un peu simplet du chef Wiggum.",
    age: 8,
    occupation: "Élève",
    school: "École élémentaire de Springfield",
    quote: "Je suis un p'tit chat !",
    anekdote:
      "Il a une fâcheuse tendance à manger de la colle et à sortir des phrases totalement absurdes.",
  },
  22: {
    name: "Patty Bouvier",
    img: "patty_bouvier.jpg",
    description: "Sœur jumelle cynique et sarcastique de Selma Bouvier.",
    age: 40,
    occupation: "Employée au DMV",
    quote: "Homer...",
    anekdote:
      "Elle ne rate jamais une occasion de critiquer ouvertement Homer et fume cigarette sur cigarette.",
  },
  23: {
    name: "Selma Bouvier",
    img: "selma_bouvier.jpg",
    description: "Sœur jumelle cynique et sarcastique de Patty Bouvier.",
    age: 40,
    occupation: "Employée au DMV",
    quote: "J'aimerais tant trouver un homme bien.",
    anekdote:
      "Elle a connu de multiples mariages ratés, notamment avec Sideshow Bob ou Troy McClure.",
  },
  24: {
    name: "Kang",
    img: "kang.jpg",
    description: "Extraterrestre de Rigel 7 qui visite souvent Springfield.",
    age: "Inconnu",
    occupation: "Envahisseur extraterrestre",
    quote: "Humains imbéciles !",
    anekdote:
      "Il apparaît principalement dans les épisodes spéciaux d'Halloween (Treehouse of Horror).",
  },
  25: {
    name: "Kodos",
    img: "kodos.jpg",
    description: "Extraterrestre de Rigel 7 qui accompagne souvent Kang.",
    age: "Inconnu",
    occupation: "Envahisseur extraterrestre",
    quote: "Nous devons détruire cette planète !",
    anekdote: "Elle forme le duo intergalactique redoutable avec Kang.",
  },
  26: {
    name: "Le vendeur de bandes dessinées",
    img: "comic_book_guy.jpg",
    description:
      "Propriétaire enrobé et sarcastique de la boutique de comics Android's Dungeon.",
    age: 45,
    occupation: "Propriétaire de boutique de BD",
    store: "Android's Dungeon",
    quote: "Pire... épisode... de tous les temps !",
    anekdote:
      "Il possède une culture encyclopédique incollable sur la pop culture et les super-héros.",
  },
  28: {
    name: "Maire Joe Quimby",
    img: "mayor_quimby.jpg",
    description: "Maire corrompu et coureur de the de Springfield.",
    age: 55,
    occupation: "Maire",
    city: "Springfield",
    quote: "Votez Quimby !",
    anekdote:
      "Il cumule les scandales politiques et les liaisons tout en gardant son poste.",
  },
  29: {
    name: "Dr. Julius Hibbert",
    img: "dr_hibbert.jpg",
    description: "Médecin amical et compétent à Springfield.",
    age: 50,
    occupation: "Médecin",
    clinic: "Hôpital général de Springfield",
    quote: "*Rire caractéristique*",
    anekdote:
      "Il ponctue presque toutes ses phrases par un petit rire joyeux, même dans les situations graves.",
  },
  31: {
    name: "Edna Krabappel",
    img: "edna_krabappel.jpg",
    description:
      "Institutrice de CM1 désabusée et cynique à l'école de Springfield.",
    age: 40,
    occupation: "Professeure",
    school: "École élémentaire de Springfield",
    quote: "Ha ! (Rire sec)",
    anekdote:
      "Elle a partagé un long bout de chemin avec le principal Skinner et Ned Flanders.",
  },
  32: {
    name: "Professeur Frink",
    img: "professor_frink.jpg",
    description: "Scientifique excentrique et brillant de Springfield.",
    age: 45,
    occupation: "Professeur / Scientifique",
    field: "Science",
    quote: "Gliven-glavin !",
    anekdote:
      "Il invente des gadgets futuristes aussi révolutionnaires que dangereux.",
  },
  33: {
    name: "Cletus Spuckler",
    img: "cletus_spuckler.jpg",
    description: "Péquenaud stéréotypé et père de nombreux enfants.",
    age: 35,
    occupation: "Fermier",
    farm: "Ferm Spuckler",
    quote: "Hé Brandine !",
    anekdote:
      "Il a une famille nombreuse dont il a parfois du mal à se rappeler tous les prénoms.",
  },
  34: {
    name: "Brandine Spuckler",
    img: "brandine_spuckler.jpg",
    description: "Épouse de Cletus Spuckler et mère de nombreux enfants.",
    age: 35,
    occupation: "Mère au foyer",
    husband: "Cletus Spuckler",
    quote: "Cletus, viens par ici !",
    anekdote:
      "Elle partage la vie rustique de Cletus dans les recoins reculés de Springfield.",
  },
  36: {
    name: "Lenny Leonard",
    img: "lenny_leonard.jpg",
    description: "Ami fidèle d'Homer Simpson et client régulier de la taverne.",
    age: 42,
    occupation: "Employé de la centrale",
    hangout: "Taverne de Moe",
    quote: "Pas l'œil ! Je suis censé ne pas recevoir de coups dans l'œil !",
    anekdote:
      "Il est souvent associé à Carl dans toutes leurs péripéties professionnelles et amicales.",
  },
  37: {
    name: "Carl Carlson",
    img: "carl_carlson.jpg",
    description: "Ami fidèle d'Homer Simpson et client régulier de la taverne.",
    age: 42,
    occupation: "Employé de la centrale",
    hangout: "Taverne de Moe",
    quote: "C'est vrai, c'est vrai.",
    anekdote:
      "Il possède une maîtrise en physique nucléaire tout en passant ses soirées au bar.",
  },
  39: {
    name: "Lionel Hutz",
    img: "lionel_hutz.jpg",
    description: "Avocat incompétent et véreux à Springfield.",
    age: 45,
    occupation: "Avocat",
    quote:
      "Des __travaux d'intérêt général__ ? Mais c'est pour les criminels !",
    anekdote:
      "Il exerce souvent ses activités dans les pires conditions, comme dans une cabine téléphonique.",
  },
  40: {
    name: "Troy McClure",
    img: "troy_mcclure.jpg",
    description:
      "Acteur d'Hollywood sur le déclin, souvent vu dans des films éducatifs.",
    age: 55,
    occupation: "Acteur",
    quote: "Salut, je suis Troy McClure. Vous me connaissez sûrement...",
    anekdote:
      "Il est connu pour introduire ses interventions par une liste de ses anciens films.",
  },
  41: {
    name: "Gencives Sanglantes Murphy",
    img: "bleeding_gums_murphy.jpg",
    description: "Musicien de jazz et mentor de Lisa Simpson.",
    age: "Inconnu",
    occupation: "Musicien",
    quote: "Le jazz, c'est comme les bananes...",
    anekdote:
      "Il a transmis sa passion du saxophone à Lisa avant de la marquer durablement.",
  },
  42: {
    name: "Snake Jailbird",
    img: "snake_jailbird.jpg",
    description: "Criminel récurrent et fugitif à Springfield.",
    age: 35,
    occupation: "Criminel",
    quote: "A plus dans le bus !",
    anekdote:
      "Il se fait constamment arrêter par le chef Wiggum pour de petits braquages.",
  },
  43: {
    name: "Disco Stu",
    img: "disco_stu.jpg",
    description: "Résident de Springfield passionné par la culture disco.",
    age: 40,
    occupation: "Sans emploi",
    passion: "Disco",
    quote: "Disco Stu n'fait pas de pub.",
    anekdote:
      "Il porte des vêtements fluorescents et vit encore à l'heure des années 70.",
  },
  44: {
    name: "Hans Taupe (Hans Moleman)",
    img: "hans_moleman.jpg",
    description: "Habitant âgé et particulièrement malchanceux de Springfield.",
    age: 80,
    occupation: "Petits boulots divers",
    quote: "Je m'appelle Hans Taupe, et j'ai 31 ans...",
    anekdote:
      "Il subit de nombreux accidents comiques et tragiques tout au long de la série.",
  },
  45: {
    name: "Dr. Nick Riviera",
    img: "dr_nick_riviera.jpg",
    description: "Médecin charlatan, incompétent et peu éthique.",
    age: 50,
    occupation: "Médecin",
    quote: "Bonjour tout le monde !",
    anekdote: "Ses diplômes proviennent d'universités pour le moins douteuses.",
  },
  46: {
    name: "Gil Gunderson",
    img: "gil_gunderson.jpg",
    description:
      "Vendeur pathétique et malchanceux luttant contre ses problèmes financiers.",
    age: 45,
    occupation: "Commercial",
    quote: "Allez, Gil, ne lâche rien !",
    anekdote:
      "Il perd presque toujours ses contrats au dernier moment et supplie pour garder son travail.",
  },
  47: {
    name: "Kent Brockman",
    img: "kent_brockman.jpg",
    description:
      "Présentateur vedette du journal télévisé, sensationnaliste et égocentrique.",
    age: 55,
    occupation: "Présentateur télé",
    network: "Chaîne 6",
    quote: "C'est la fin du monde... ou presque.",
    anekdote:
      "Il a déjà paniqué en direct à l'antenne après avoir cru que les Martiens envahissaient la ville.",
  },
  48: {
    name: "Doris la cantinière",
    img: "lunchlady_doris.jpg",
    description: "Cantinière au caractère bien trempé de l'école élémentaire.",
    age: 60,
    occupation: "Cantinière",
    school: "École élémentaire de Springfield",
    quote: "Mangez votre purée !",
    anekdote:
      "Elle prépare des repas scolaires aux ingrédients souvent mystérieux et peu ragoûtants.",
  },
  49: {
    name: "L'adolescent à la voix muée",
    img: "squeaky_voiced_teen.jpg",
    description:
      "Jeune employé maladroit enchaînant les petits boulots à Springfield.",
    age: 16,
    occupation: "Employé polyvalent",
    quote: "*Voix qui déraille* Bienvenue au... !",
    anekdote:
      "On le retrouve derrière les caisses de presque tous les fast-foods et magasins de la ville.",
  },
  50: {
    name: "Edna Krabappel (bis)",
    img: "mrs_krabappel.jpg",
    description: "Professeure de CM1 désabusée de l'école élémentaire.",
    age: 40,
    occupation: "Professeure",
    school: "École élémentaire de Springfield",
    quote: "Asseyez-vous et lisez votre livre !",
    anekdote: "Elle fait équipe avec Bart malgré ses frasques quotidiennes.",
  },
};

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const characterId = Number(id);

    if (charactersDetailsData[characterId]) {
      setCharacter(charactersDetailsData[characterId]);
      setLoading(false);
    } else {
      fetch(`https://materiel-apprentissage.github.io/api/simpsons.json`)
        .then((res) => res.json())
        .then((data) => {
          const found =
            data.find((c: any) => c.id === characterId) ||
            data[characterId - 1];
          setCharacter(found);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return (
      <div className="character-detail-container">Chargement du profil...</div>
    );
  if (!character)
    return (
      <div className="character-detail-container">Personnage introuvable !</div>
    );

  return (
    <div className="character-detail-container">
      <Link to="/" className="back-button">
        ⬅ Retour à l'accueil
      </Link>

      <div className="character-profile-card">
        <div className="image-container">
          <img
            src={`/img/${character.img}`}
            alt={character.name}
            className="profile-img"
          />
        </div>

        <h1>{character.name}</h1>

        <p className="role">
          <strong>Rôle / Profession :</strong>{" "}
          {character.occupation || character.role}
        </p>

        {character.age && (
          <p className="age">
            <strong>Âge :</strong> {character.age} ans
          </p>
        )}

        <p className="bio">
          <strong>Biographie :</strong> {character.description}
        </p>

        <div className="extra-info">
          <h3>Le saviez-vous ?</h3>
          {character.quote && (
            <p className="quote">
              💬 <strong>Citation fétiche :</strong>{" "}
              <em>"{character.quote}"</em>
            </p>
          )}
          {character.anekdote && (
            <p className="anekdote">
              💡 <strong>Anecdote :</strong> {character.anekdote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

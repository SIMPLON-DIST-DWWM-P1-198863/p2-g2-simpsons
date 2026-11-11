import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CharacterDetail.css";

/* Dictionnaire complet et unique des personnages */
const charactersDetailsData: { [key: number]: any } = {
  1: {
    name: "Homer Simpson",
    img: "homer_simpson.jpg",
    description:
      "Père de la famille Simpson, gaffeur mais profondément attachant. " +
      "Il partage son temps entre sa sieste au travail, ses beignets préférés et les soirées à la taverne de Moe. " +
      "Malgré ses nombreux travers, ses maladresses monumentales et son manque flagrant de bon sens, il fait toujours preuve d'un amour inconditionnel pour les siens. " +
      "Il incarne l'archétype du père de famille américain ordinaire poussé à la caricature comique. " +
      "Chacune de ses aventures loufoques le conduit invariablement à frôler la catastrophe avant de retomber sur ses pieds.",
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
    description:
      "Épouse et mère patiente, dévouée et dotée d'une sagesse inébranlable. " +
      "Elle maintient l'équilibre fragile de la maisonnée face aux frasques incessantes d'Homer et de Bart. " +
      "Toujours à l'écoute, elle joue le rôle de la boussole morale pour l'ensemble de la famille. " +
      "Ses multiples tentatives d'exercer divers métiers révèlent sa polyvalence et sa force de caractère insoupçonnée. " +
      "Elle reste le pilier indéfectible sur lequel tout le monde peut compter dans les moments de crise.",
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
    description:
      "Fils espiègle, rebelle et provocateur de la famille Simpson. " +
      "Véritable terreur de l'école élémentaire, il excelle dans l'art des canulars téléphoniques et des bêtises en tout genre. " +
      "Sous ses airs de garnement incorrigible se cache toutefois un garçon doté d'une profonde loyauté envers ses proches. " +
      "Il adore faire tourner en bourrique le principal Skinner ainsi que son entourage à travers des farces mémorables. " +
      "Skateur passionné et amateur de bandes dessinées, il représente l'esprit rebelle par excellence.",
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
      "Enfant du milieu, extrêmement intelligente, cultivée et dotée d'une conscience politique aiguë. " +
      "Véritable prodige intellectuel, elle se sent souvent incomprise au sein d'une ville peu portée sur la haute culture. " +
      "Elle milite ardemment pour la protection de l'environnement, les droits des animaux et la justice sociale. " +
      "Virtuose du saxophone, elle exprime toute sa sensibilité artistique à travers des improvisations jazz poignantes. " +
      "Sa quête constante de vérité morale en fait la voix de la raison de toute la communauté.",
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
    description:
      "Bébé précoce, silencieux mais extrêmement perspicace de la famille. " +
      "Toujours occupée à sucer sa tétine, elle observe son entourage avec un regard complice et avisé. " +
      "Ne vous fiez pas à son apparence inoffensive, car elle cache des talents surprenants et un courage redoutable. " +
      "Elle intervient souvent dans l'ombre pour sauver les membres de sa famille de situations des plus périlleuses. " +
      "Véritable petit génie en devenir, elle fascine par sa capacité à résoudre des affaires complexes sans dire un mot.",
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
      "Voisin direct des Simpsons, profondément pieux et doté d'un optimisme légendaire. " +
      "Il fait preuve d'une gentillesse maladive envers son prochain, en particulier envers un Homer souvent ingrat. " +
      "Son mode de vie ultra-rigoureux est guidé par les préceptes stricts de la Bible et de sa paroisse. " +
      "Père aimant de deux garçons, il gère sa boutique spécialisée avec un enthousiasme inébranlable. " +
      "Ses expressions chantantes et son sens aigu du voisinage en font un personnage haut en couleur.",
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
    description:
      "Épouse de Ned Flanders, incarnant la grâce et la piété à l'état pur. " +
      "Toujours souriante, elle participe activement à la vie de la communauté religieuse de Springfield. " +
      "Elle veille jalousement sur l'éducation morale de ses enfants à l'abri de toute influence jugée néfaste. " +
      "Sa bienveillance et sa douceur font l'unanimité auprès de tous les habitants bienveillants de la ville. " +
      "Elle représente l'épouse chrétienne idéale selon les critères traditionnels les plus stricts.",
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
      "Propriétaire milliardaire, tyrannique et incroyablement avare de la centrale nucléaire. " +
      "Il incarne le capitalisme sans pègre et se désintéresse totalement du sort de ses employés. " +
      "Sa santé extrêmement fragile ne l'empêche pas de fomenter des plans machiavéliques pour accroître sa fortune. " +
      "Oubliant constamment le nom d'Homer, il gouverne son empire depuis son bureau haut perchée. " +
      "Sa silhouette squelettique et son rire maléfique sèment la terreur dans toute la région.",
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
    description:
      "Assistant personnel extrêmement loyal, dévoué et obsédé par son patron M. Burns. " +
      "Il anticipe le moindre désir du milliardaire avec une précision quasi-militaire et une admiration aveugle. " +
      "Sous ses aspects de subordonné modèle, il possède une riche culture artistique et de multiples passions secrètes. " +
      "Il gère les crises quotidiennes de la centrale avec un sérieux inébranlable et beaucoup de professionnalisme. " +
      "Sa dévotion absolue frôle souvent l'adoration pure et simple.",
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
      "Directeur d'école rigide, autoritaire mais profondément complexé par sa condition. " +
      "Il tente tant bien que mal de maintenir la discipline au sein de l'école élémentaire de Springfield. " +
      "Vétéran de guerre, il reste sous la coupe étroite de sa mère dominatrice avec qui il vit encore. " +
      "Ses relations houleuses avec l'inspecteur Chalmers mettent régulièrement à l'épreuve ses nerfs fragiles. " +
      "Il cache derrière son masque de fonctionnaire zélé une vie personnelle plutôt terne.",
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
    description:
      "Gérant travailleur et infatigable de la célèbre supérette Kwik-E-Mart. " +
      "Il accueille ses clients avec le sourire tout en jonglant avec des horaires impossibles. " +
      "Immigré modèle, il a acquis la nationalité américaine après un parcours parsemé d'embûches. " +
      "Il gère sa grande famille avec amour tout en veillant jalousement sur la sécurité de son commerce. " +
      "Son accent chantant et son efficacité redoutable font de lui une figure incontournable de la ville.",
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
    description:
      "Barman cynique, solitaire et bourru tenant sa propre taverne miteuse. " +
      "Il passe son temps à écouter les plaintes d'Homer et de ses amis tout en servant de la bière douteuse. " +
      "Sous ses dehors de dur à cuire se cache un cœur brisé en quête perpétuelle d'amour et de reconnaissance. " +
      "Ses origines mystérieuses et son physique atypique font l'objet de nombreuses plaisanteries. " +
      "Il se laisse facilement duper par les canulars téléphoniques récurrents de Bart.",
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
      "Client le plus fidèle et le plus ivre de la taverne de Moe. " +
      "Il passe l'essentiel de ses journées à s'enivrer au comptoir dans un état second permanent. " +
      "Malgré son alcoolisme chronique, il possède un bon fond et une sensibilité artistique insoupçonnée. " +
      "Il lui arrive de surprendre tout le monde en dévoilant des talents vocaux ou cinématographiques hors du commun. " +
      "Son rire éthylique et ses rots monumentaux accompagnent chaque scène de bar.",
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
    description:
      "Chef de la police local, bedonnant, incompétent et perpétuellement distrait. " +
      "Il privilégie systématiquement la pause gourmande aux enquêtes criminelles urgentes. " +
      "Son laxisme légendaire transforme chaque intervention policière en farce burlesque. " +
      "Il délègue le plus souvent le travail de terrain aux véritables héros de passage. " +
      "Malgré tout, il conserve son poste grâce à la bienveillance générale de la municipalité.",
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
    description:
      "Présentateur de télévision cynique, fatigué et accro au tabac. " +
      "Derrière le maquillage coloré de son personnage pour enfants se cache un adulte blasé par le show-business. " +
      "Il accumule les dettes de jeu et les frasques médiatiques en dehors des tournages. " +
      "Sa relation compliquée avec son rabbin de père a forgé son tempérament désabusé. " +
      "Il reste néanmoins l'idole absolue de Bart et Lisa à travers son émission loufoque.",
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
    description:
      "Ancien acolyte de Krusty devenu un criminel intellectuel et sophistiqué. " +
      "Il voue une haine féroce à Bart Simpson, qui a contrecarré nombre de ses plans machiavéliques. " +
      "Passionné de haute culture, d'opéra et de littérature, il méprise la vulgarité ambiante. " +
      "Ses tentatives d'assassinat échouent invariablement à cause de circonstances rocambolesques. " +
      "Sa chevelure rouge en palmier et sa voix ténébreuse le rendent immédiatement reconnaissable.",
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
    description:
      "Brute épaisse et harceleur en chef de l'école élémentaire. " +
      "Il prend un malin plaisir à racketter les élèves plus faibles avant de lancer son rire moqueur. " +
      "Issu d'un milieu familial très précaire, il souffre d'un profond sentiment d'abandon. " +
      "Sous sa carapace de voyou se cachent parfois des éclats de sensibilité artistique et de vulnérabilité. " +
      "Il noue parfois des relations inattendues avec ses camarades de classe.",
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
    description:
      "Meilleur ami fidèle, complexé et perpétuellement anxieux de Bart. " +
      "Porteur de lunettes épaisses, il subit toutes les bêtises de son camarade en tant que complice malgré lui. " +
      "Il nourrit un amour secret et transi pour Lisa Simpson, qui l'ignore superbement. " +
      "Sa fragilité physique et psychologique en fait la cible idéale des brutes de l'école. " +
      "Il compense ses frustrations à travers sa passion pour les bandes dessinées et les jeux vidéo.",
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
      "Inspecteur académique sévère, direct et intolérant à l'incompétence. " +
      "Il débarque régulièrement à l'improviste pour inspecter le travail du principal Skinner. " +
      "Ses crises de colère mémorables vis-à-vis des explications absurdes de Skinner font sa renommée. " +
      "Il incarne l'autorité administrative rigoureuse face aux dérives constantes de l'école. " +
      "Malgré son exaspération chronique, il conserve un certain respect pour le système en place.",
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
    description:
      "Concierge écossais au caractère ombrageux et au tempérament explosif. " +
      "Il entretient les terrains de l'école tout en maugréant dans sa barbe contre tout le monde. " +
      "Torse nu et armé de divers outils, il n'hésite pas à se battre contre des animaux sauvages. " +
      "Son accent écossais prononcé et ses réactions épidermiques font le sel de ses interventions. " +
      "Il vit reclus dans une cabane insalubre au milieu de la cour de récréation.",
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
    description:
      "Fils naïf, candide et intellectuellement limité du chef de la police. " +
      "Il enchaîne les remarques totalement déconnectées de la réalité avec une candeur désarmante. " +
      "Sa tendance à manger de la colle en classe témoigne de son développement singulier. " +
      "Il possède néanmoins une vision poétique et surréaliste du monde qui l'entoure. " +
      "Son comportement imprévisible procure des moments d'hilarité pure à ses camarades.",
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
    description:
      "Sœur jumelle de Selma, cynique, sarcastique et éternelle fumeuse. " +
      "Elle voue une aversion profonde et affichée pour son beau-frère Homer Simpson. " +
      "Employée au bureau des immatriculations, elle traite les usagers avec un mépris glacial. " +
      "Elle partage un mode de vie similaire à celui de sa sœur, rythmé par le tabac et les critiques. " +
      "Son regard désapprobateur pèse lourdement sur les réunions familiales.",
    age: 40,
    occupation: "Employée au DMV",
    quote: "Homer...",
    anekdote:
      "Elle ne rate jamais une occasion de critiquer ouvertement Homer et fume cigarette sur cigarette.",
  },
  23: {
    name: "Selma Bouvier",
    img: "selma_bouvier.jpg",
    description:
      "Sœur jumelle de Patty, tout aussi cynique mais en quête constante d'amour. " +
      "Elle collectionne les mariages ratés avec divers personnages excentriques de la série. " +
      "Elle fume cigarette sur cigarette tout en rêvant du prince charmant idéal. " +
      "Son désespoir amoureux l'amène parfois à commettre des choix de vie pour le moins discutables. " +
      "Elle subit les mêmes tics de langage et le même environnement de travail que sa jumelle.",
    age: 40,
    occupation: "Employée au DMV",
    quote: "J'aimerais tant trouver un homme bien.",
    anekdote:
      "Elle a connu de multiples mariages ratés, notamment avec Sideshow Bob ou Troy McClure.",
  },
  24: {
    name: "Kang",
    img: "kang.jpg",
    description:
      "Extraterrestre belliqueux originaire de la planète Rigel 7. " +
      "Il apparaît principalement dans les épisodes spéciaux pour terroriser les Terriens. " +
      "Armé de technologies avancées, il envisage régulièrement la conquête de notre monde. " +
      "Son rire glaçant et ses projets destructeurs contrastent avec le ton habituel de la série. " +
      "Il forme un duo redoutable et inséparable avec sa congénère Kodos.",
    age: "Inconnu",
    occupation: "Envahisseur extraterrestre",
    quote: "Humains imbéciles !",
    anekdote:
      "Il apparaît principalement dans les épisodes spéciaux d'Halloween (Treehouse of Horror).",
  },
  25: {
    name: "Kodos",
    img: "kodos.jpg",
    description:
      "Partenaire extraterrestre féminine de Kang venue de Rigel 7. " +
      "Elle participe activement aux projets d'invasion de la Terre lors des épisodes horrifiques. " +
      "Ses commentaires acides sur la stupidité humaine accompagnent chaque plan machiavélique. " +
      "Elle manie les armes laser intergalactiques avec une froide détermination. " +
      "Son union avec Kang symbolise la menace venue des confins de l'espace.",
    age: "Inconnu",
    occupation: "Envahisseur extraterrestre",
    quote: "Nous devons détruire cette planète !",
    anekdote: "Elle forme le duo intergalactique redoutable avec Kang.",
  },
  26: {
    name: "Le vendeur de bandes dessinées",
    img: "comic_book_guy.jpg",
    description:
      "Propriétaire sarcastique, obèse et érudit de la boutique Android's Dungeon. " +
      "Il possède une culture encyclopédique absolue sur la pop culture et les comics. " +
      "Ses répliques cinglantes visent tous les clients osant émettre une critique approximative. " +
      "Il incarne à la perfection le stéréotype du geek passionné et un brin arrogant. " +
      "Son autorité dans son domaine de prédilection demeure incontestée à Springfield.",
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
    description:
      "Maire corrompu, démagogue et coureur de jupons invétéré de Springfield. " +
      "Il utilise les fonds publics à des fins personnelles tout en multipliant les scandales. " +
      "Son accent et ses manières rappellent ostensiblement la célèbre dynastie Kennedy. " +
      "Il parvient miraculeusement à conserver son poste malgré ses multiples turpitudes. " +
      "Sa priorité absolue reste sa propre réélection à tout prix.",
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
    description:
      "Médecin amical, compétent et adepte d'un rire tonitruant et inapproprié. " +
      "Il ausculte les habitants de Springfield avec un optimisme inébranlable en toute circonstance. " +
      "Son rire caractéristique ponctue même l'annonce de nouvelles graves ou alarmantes. " +
      "Il dirige l'hôpital général avec un professionnalisme teinté de bonne humeur. " +
      "Ses diagnostics précis sauvent régulièrement les personnages de situations dramatiques.",
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
      "Institutrice de CM1 désabusée, cynique et adepte invétérée de la cigarette. " +
      "Elle subit le comportement infernal de Bart Simpson avec une lassitude évidente. " +
      "Sa vie sentimentale chaotique la pousse à chercher l'amour auprès de divers profils de la ville. " +
      "Elle cache derrière ses airs blasés un réel attachement pour ses élèves turbulents. " +
      "Son rire sec résonne souvent dans sa salle de classe usée par le temps.",
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
    description:
      "Scientifique excentrique, bégayant et génial de la ville de Springfield. " +
      "Il invente des gadgets futuristes aussi révolutionnaires que hautement dangereux. " +
      "Ses interjections loufoques et ses postures loufoques traduisent son hyperactivité mentale. " +
      "Il tente d'expliquer ses théories scientifiques complexes à un public totalement incompétent. " +
      "Son laboratoire regorge d'expériences aussi fascinantes qu'imprévisibles.",
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
    description:
      "Péquenaud stéréotypé vivant dans les zones rurales reculées de la région. " +
      "Il élève une famille nombreuse aux côtés de sa compagne Brandine dans des conditions spartiates. " +
      "Son mode de vie rustique et ses occupations agraires résument les clichés de la paysannerie. " +
      "Il a parfois du mal à se remémorer les prénoms de ses nombreux enfants turbulents. " +
      "Son attachement à sa terre natale reste indéfectible malgré la misère.",
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
    description:
      "Épouse dévouée de Cletus et mère d'une immensité d'enfants. " +
      "Elle partage l'existence rustique et isolée de son mari dans les recoins les plus reculés. " +
      "Elle gère le foyer avec les moyens du bord tout en veillant sur sa turbulente progéniture. " +
      "Son lien fusionnel avec Cletus résiste à toutes les épreuves de la vie quotidienne. " +
      "Elle incarne l'archétype féminin de la ruralité profonde américaine.",
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
    description:
      "Employé de la centrale nucléaire et fidèle acolyte d'Homer Simpson. " +
      "Il passe ses soirées au bar de Moe en compagnie de son inséparable ami Carl. " +
      "Il subit régulièrement des petits accidents corporels, notamment au niveau de l'œil. " +
      "Sa gentillesse et sa simplicité en font un personnage très apprécié de la communauté. " +
      "Il partage toutes les péripéties professionnelles et amicales du groupe d'Homer.",
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
    description:
      "Collègue de travail, ami intime d'Homer et pilier de la taverne de Moe. " +
      "Il possède une maîtrise en physique nucléaire qu'il dissimule derrière une apparente décontraction. " +
      "Toujours mesuré, il tempère souvent les ardeurs de ses compagnons de beuverie. " +
      "Il forme avec Lenny un duo fusionnel indissociable dans toutes les situations. " +
      "Son flegme et son intelligence discrète en font le leader naturel de leur bande.",
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
    description:
      "Avocat véreux, incompétent et constamment à la recherche de clients désespérés. " +
      "Il exerce ses activités louches dans des endroits incongrus comme des cabines téléphoniques. " +
      "Ses plaidoiries rocambolesques se soldent presque toujours par des échecs cuisants. " +
      "Il change régulièrement de nom d'emprunt pour fuir ses créanciers et ses casseroles. " +
      "Son manque total d'éthique juridique fait le bonheur des parodies judiciaires.",
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
      "Acteur de cinéma hollywoodien sur le déclin reconverti dans les films éducatifs. " +
      "Il introduit systématiquement ses interventions en rappelant la liste de ses anciens navets. " +
      "Sa carrière brisée ne l'empêche pas de conserver un ego surdimensionné. " +
      "Il incarne la nostalgie des paillettes et du show-business ringard des décennies passées. " +
      "Sa silhouette de dandy désuet amuse autant qu'elle navre ses spectateurs.",
    age: 55,
    occupation: "Acteur",
    quote: "Salut, je suis Troy McClure. Vous me connaissez sûrement...",
    anekdote:
      "Il est connu pour introduire ses interventions par une liste de ses anciens films.",
  },
  41: {
    name: "Gencives Sanglantes Murphy",
    img: "bleeding_gums_murphy.jpg",
    description:
      "Musicien de jazz torturé, talentueux et mentor spirituel de Lisa Simpson. " +
      "Il transmet sa passion du saxophone à la jeune fille lors de rencontres nocturnes mémorables. " +
      "Sa musique mélancolique reflète les épreuves et la tristesse de son existence. " +
      "Il marque durablement la vie artistique de Lisa à travers ses précieux conseils. " +
      "Son âme d'artiste puriste plane longtemps sur la série.",
    age: "Inconnu",
    occupation: "Musicien",
    quote: "Le jazz, c'est comme les bananes...",
    anekdote:
      "Il a transmis sa passion du saxophone à Lisa avant de la marquer durablement.",
  },
  42: {
    name: "Snake Jailbird",
    img: "snake_jailbird.jpg",
    description:
      "Criminel récurrent, tatoué et rebelle spécialisé dans les braquages de supérette. " +
      "Il sillonne la ville à bord de sa voiture sportive en semant la panique. " +
      "Il se fait constamment arrêter par le chef Wiggum lors de délits mineurs et répétitifs. " +
      "Son look de motard hors-la-loi contraste avec son inefficacité chronique face à la justice. " +
      "Il représente la petite délinquance urbaine typique de Springfield.",
    age: 35,
    occupation: "Criminel",
    quote: "A plus dans le bus !",
    anekdote:
      "Il se fait constamment arrêter par le chef Wiggum pour de petits braquages.",
  },
  43: {
    name: "Disco Stu",
    img: "disco_stu.jpg",
    description:
      "Habitant de Springfield resté bloqué dans l'ambiance des années 1970. " +
      "Il porte en permanence des vêtements fluorescents et étincelants aux couleurs du disco. " +
      "Il refuse obstinément d'admettre que sa sous-culture musicale a depuis longtemps disparu. " +
      "Ses apparitions furtives se résument souvent à vanter son propre style vestimentaire. " +
      "Il incarne l'anachronisme musical ambulant de la ville.",
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
    description:
      "Vieillard extrêmement âgé, ridé et doté d'une malchance légendaire. " +
      "Il subit des accidents comiques, violents et absurdes tout au long des épisodes. " +
      "Son âge réel fait l'objet de constants paradoxes humoristiques au sein de la série. " +
      "Il survit miraculeusement à des catastrophes qui auraient dû lui être fatales. " +
      "Sa fragilité extrême en fait le souffre-douleur involontaire par excellence.",
    age: 80,
    occupation: "Petits boulots divers",
    quote: "Je m'appelle Hans Taupe, et j'ai 31 ans...",
    anekdote:
      "Il subit de nombreux accidents comiques et tragiques tout au long de la série.",
  },
  45: {
    name: "Dr. Nick Riviera",
    img: "dr_nick_riviera.jpg",
    description:
      "Médecin charlatan, incompétent et totalement dépourvu de la moindre éthique médicale. " +
      "Ses diplômes douteux proviennent d'instituts obscurs et non reconnus par la profession. " +
      "Il pratique des interventions chirurgicales hasardeuses avec un enthousiasme inquiétant. " +
      "Ses tarifs discount attirent les clients fauchés de Springfield en quête de soins rapides. " +
      "Son incompétence notoire frôle constamment la catastrophe sanitaire.",
    age: 50,
    occupation: "Médecin",
    quote: "Bonjour tout le monde !",
    anekdote: "Ses diplômes proviennent d'universités pour le moins douteuses.",
  },
  46: {
    name: "Gil Gunderson",
    img: "gil_gunderson.jpg",
    description:
      "Commercial pathétique, raté et perpétuellement au bord de la faillite financière. " +
      "Il supplie ses clients et ses patrons de lui accorder une chance pour sauver son poste. " +
      "Il perd systématiquement ses contrats les plus importants au tout dernier moment. " +
      "Sa détresse professionnelle chronique éveille à la fois la pitié et l'agacement. " +
      "Il symbolise la lutte désespérée contre la précarité du monde du travail.",
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
      "Présentateur vedette du journal télévisé, sensationnaliste et égocentrique. " +
      "Il dramatise le moindre fait divers local pour captiver l'audience à tout prix. " +
      "Son narcissisme exacerbé transparaît dans chacune de ses interventions à l'antenne. " +
      "Il a déjà provoqué des vagues de panique générale en direct par pure incompétence journalistique. " +
      "Il incarne la critique satirique des médias de masse et de la télévision poubelle.",
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
    description:
      "Cantinière au caractère bien trempé de l'école élémentaire de Springfield. " +
      "Elle sert des repas scolaires aux ingrédients mystérieux, peu ragoûtants et d'origine incertaine. " +
      "Son autorité naturelle dissuade les élèves les plus difficiles de rechigner devant leurs assiettes. " +
      "Elle gère la cafétéria avec une efficacité bourrue et pragmatique. " +
      "Ses préparations culinaires font l'objet de nombreuses légendes urbaines parmi les enfants.",
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
      "Jeune employé maladroit et complexé enchaînant les petits boulots à travers la ville. " +
      "Sa voix change constamment de tonalité en plein milieu d'une phrase de manière imprévisible. " +
      "On le retrouve derrière les caisses de presque tous les fast-foods et commerces de Springfield. " +
      "Il subit ses tâches quotidiennes avec un mélange de résignation et de nervosité. " +
      "Son visage boutonneux et ses faux pas répétés en font un running gag permanent.",
    age: 16,
    occupation: "Employé polyvalent",
    quote: "*Voix qui déraille* Bienvenue au... !",
    anekdote:
      "On le retrouve derrière les caisses de presque tous les fast-foods et magasins de la ville.",
  },
};

export default function CharacterDetail() {
  const { id } = useParams();
  const characterId = Number(id);
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Gestion de la boucle de navigation entre les personnages existants
  const validIds = Object.keys(charactersDetailsData).map(Number);
  const currentIndex = validIds.indexOf(characterId);

  const prevId =
    currentIndex > 0
      ? validIds[currentIndex - 1]
      : validIds[validIds.length - 1];
  const nextId =
    currentIndex < validIds.length - 1 && currentIndex !== -1
      ? validIds[currentIndex + 1]
      : validIds[0];

  useEffect(() => {
    if (charactersDetailsData[characterId]) {
      setCharacter(charactersDetailsData[characterId]);
      setLoading(false);
    } else {
      fetch(`https://materiel-apprentissage.github.io/api/simpsons.json`)
        .then((res) => res.json())
        .then((data) => {
          const found =
            data.find((c: any) => c.id === characterId) ||
            charactersDetailsData[1];
          setCharacter(found);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setCharacter(charactersDetailsData[1]);
          setLoading(false);
        });
    }
  }, [characterId]);

  if (loading)
    return <div className="character-detail-container">Chargement...</div>;
  if (!character)
    return (
      <div className="character-detail-container">Personnage introuvable !</div>
    );

  return (
    <div className="character-detail-container">
      {/* Bouton retour vers la page d'accueil / liste des personnages */}
      <Link to="/" className="back-button">
        ⬅ Retour à la liste!
      </Link>

      <div className="navigation-wrapper">
        {/* Flèche gauche (Personnage précédent) */}
        <Link
          to={`/character/${prevId}`}
          className="nav-arrow left-arrow"
          title="Personnage précédent"
        >
          ❮
        </Link>

        {/* Carte principale du personnage */}
        <div className="character-profile-card">
          <div className="image-container">
            <img
              src={`/img/${character.img}`}
              alt={character.name}
              className="profile-img"
            />
          </div>

          <div className="profile-content">
            <h1>{character.name}</h1>

            <div className="pills-container">
              {character.age && (
                <span className="pill">{character.age} ans</span>
              )}
              <span className="pill">
                {character.occupation || character.role}
              </span>
              {character.quote && (
                <span className="pill quote-pill">"{character.quote}"</span>
              )}
            </div>

            <p className="bio">{character.description}</p>

            {character.anekdote && (
              <p className="anekdote-text">
                <em>Anecdote : {character.anekdote}</em>
              </p>
            )}
          </div>
        </div>

        {/* Flèche droite (Personnage suivant) */}
        <Link
          to={`/character/${nextId}`}
          className="nav-arrow right-arrow"
          title="Personnage suivant"
        >
          ❯
        </Link>
      </div>
    </div>
  );
}

import "./Simpsons.css";

export default function Simpsons() {
  const imgSimpsons = "./canapesimpsons.jpg";
  const description =
    "Les Simpson sont un miroir déformant de la société américaine, et plus largement de notre époque. Sous l’humour absurde se cache une satire féroce de la famille, de la politique, des médias, de la religion et de la société de consommation. La série montre une classe moyenne ordinaire, coincée entre un travail sans avenir, des factures et l’envie de simplement vivre tranquille. Elle se moque des institutions : les dirigeants sont corrompus ou incompétents, les grandes entreprises écrasent les individus, et la télévision abrutit les foules. Pourtant, derrière le cynisme, le message reste profondément humain. Malgré les erreurs, les disputes et les catastrophes, la famille finit toujours par se retrouver, et l’amour qui la lie passe avant tout. Les Simpson rappellent qu’on peut rire de tout, y compris de soi-même, et qu’une société qui ne sait plus s’autocritiquer court à sa perte. Ils invitent aussi à garder un esprit critique face à ce qu’on nous vend, nous dit et nous montre. Entre tendresse et ironie, la série célèbre l’imperfection comme ce qui nous rend vivants.";
  return (
    <section className="container" id="simpsons">
      <p className="description-simpson">{description}</p>
      <div className="regroupement">
        <img src={imgSimpsons} alt="Simpson" className="simsponsfamily" />
        <span className="saisonsepisodes">
          <p className="badge-saison">Saison 38</p>
          <p className="badge-episodes">700+ épisodes</p>
        </span>
      </div>
    </section>
  );
}

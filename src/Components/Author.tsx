type AuthorProps = {
  name: string;
  birthDate: string;
  mattSrc: string;
};

export default function author({ name, birthDate, mattSrc }: AuthorProps) {
  return (
    <>
      <img src={mattSrc} alt={name} />
      <h2>{name}</h2>
      <h3>Né le {birthDate}</h3>
    </>
  );
}

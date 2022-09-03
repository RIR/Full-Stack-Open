interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const contentItems = courseParts.map((coursePart) => (
    <p key={coursePart.toString()}>
      {coursePart.name} {coursePart.exerciseCount}
    </p>
  ));

  return <>{contentItems}</>;
};

export default Content;

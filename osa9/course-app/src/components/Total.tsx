interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return <p>Number of exercises {total}</p>;
};

export default Total;

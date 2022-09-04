import { CoursePart } from '../App';

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return <p style={{ marginTop: 20, fontSize: '1.5em' }}>Number of exercises {total}</p>;
};

export default Total;

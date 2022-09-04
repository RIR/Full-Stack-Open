import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map((coursePart) => (
      <Part key={coursePart.toString()} coursePart={coursePart} />
    ))}
  </>
);

export default Content;

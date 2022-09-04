import { CoursePart } from '../App';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>{coursePart.description}</p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>{coursePart.description}</p>
          <p>required skills: {coursePart.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;

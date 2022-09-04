import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

const courseName = 'Half Stack application development';
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDescription {
  type: 'special';
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is the easy course part',
    type: 'normal',
  },
  {
    name: 'Advanced',
    exerciseCount: 7,
    description: 'This is the hard course part',
    type: 'normal',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    type: 'groupProject',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    type: 'submission',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    type: 'special',
  },
];

const App = () => (
  <div>
    <Header name={courseName} />
    <Content courseParts={courseParts} />
    <Total courseParts={courseParts} />
  </div>
);
export default App;

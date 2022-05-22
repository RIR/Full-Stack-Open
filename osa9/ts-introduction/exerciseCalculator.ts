/*
Should separate these constanst and types to own files but IMO not in scope
*/
const ratings: Readonly<{ 1: 'Have to do better'; 2: 'Pretty decent'; 3: 'Excellent' }> = {
  1: 'Have to do better',
  2: 'Pretty decent',
  3: 'Excellent',
};

type Rating = keyof typeof ratings;
type RatingDescription = typeof ratings[Rating];

// For REST
export interface ExerciseArgs {
  target: number;
  daily_exercises: number[];
}

export interface ParsedExerciseArgs {
  target: number;
  dailyExerciseHours: number[];
}

export interface ExerciseResponse {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const getRating = (consistency: number, success: boolean): Rating => {
  if (consistency >= 0.5 && success) return 3;
  if ((consistency < 0.5 && success) || (consistency >= 0.5 && !success)) return 2;
  return 1;
};

const getRatingDescription = (rating: Rating): RatingDescription => ratings[rating];

export const parseCliExerciseArgs = (args: string[]): ParsedExerciseArgs => {
  if (args.length < 2) throw new Error('Not enough arguments');

  const [target, ...dailyExerciseHours] = args.map((arg) => {
    if (isNaN(Number(arg))) throw new Error(`Provided value "${arg}" is not a number`);
    else return Number(arg);
  });

  const parsedArgs = { dailyExerciseHours, target };
  return parsedArgs;
};

// Maybe could've join this with the cli function. Some duplication here.
export const validateRestExerciseArgs = (target: number, dailyExerciseHours: number[]): void => {
  if (target === undefined || dailyExerciseHours === undefined) {
    const error = new Error('Not enough arguments');
    // Should probably make constants out of these error names, but IMO not in the exercise's scope
    error.name = 'MissingArguments';
    throw error;
  }

  for (const arg of [target, ...dailyExerciseHours]) {
    if (isNaN(Number(arg))) {
      const error = new Error(`Provided value "${arg}" is not a number`);
      error.name = 'NaNError';
      throw error;
    }
  }
};

export const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResponse => {
  /*
This is really not an optimal way because I'm looping the array multiple times here,
but I'm thinking that's not the main point here. Could consider .reduce etc. to get
multiple values in a single loop.
*/
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const totalTrainingHours = dailyExerciseHours.reduce((total, hours) => (total += hours));
  const average = totalTrainingHours / periodLength;
  const consistency = trainingDays / periodLength;
  const success = average >= target;
  const rating = getRating(consistency, success);
  const ratingDescription = getRatingDescription(rating);

  const exerciseData: ExerciseResponse = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return exerciseData;
};

// 9.2
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// 9.3
try {
  const { dailyExerciseHours, target }: ParsedExerciseArgs = parseCliExerciseArgs(process.argv.slice(2));
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

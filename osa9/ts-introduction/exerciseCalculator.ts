const ratings: Readonly<{ 1: 'Have to do better'; 2: 'Pretty decent'; 3: 'Excellent' }> = {
  1: 'Have to do better',
  2: 'Pretty decent',
  3: 'Excellent',
};

type Rating = keyof typeof ratings;
type RatingDescription = typeof ratings[Rating];

interface ExerciseData {
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

const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseData => {
  /*
This is really not an optimal way, since I'm looping the array multiple times here,
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

  const exerciseData: ExerciseData = {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

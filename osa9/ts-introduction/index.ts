import express from 'express';
import { ParsedBmiArgs, BmiResponse, parseBmiArgs, calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseArgs, ExerciseResponse, validateRestExerciseArgs } from './exerciseCalculator';

const MALFORMATTED_PARAMETERS_RESPONSE: { error: 'malformatted parameters' } = {
  error: 'malformatted parameters',
};

const MISSING_PARAMETERS_RESPONSE: { error: 'parameters missing' } = {
  error: 'parameters missing',
};

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight }: ParsedBmiArgs = parseBmiArgs([req.query.height, req.query.weight]);
    const response: BmiResponse = { height, weight, bmi: calculateBmi(height, weight) };

    return res.json(response);
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    return res.status(400).json(MALFORMATTED_PARAMETERS_RESPONSE);
  }
});

app.post('/exercise-stats', (req, res) => {
  try {
    const { target, daily_exercises }: ExerciseArgs = req.body;
    validateRestExerciseArgs(target, daily_exercises);
    const response: ExerciseResponse = calculateExercises(daily_exercises, target);

    return res.json(response);
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    const responseBody =
      error?.name === 'MissingArguments' ? MISSING_PARAMETERS_RESPONSE : MALFORMATTED_PARAMETERS_RESPONSE;

    return res.status(400).json(responseBody);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

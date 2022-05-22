import express from 'express';
import { ParsedBmiArgs, BmiResponse, parseBmiArgs, calculateBmi } from './bmiCalculator';

const MALFORMATTED_PARAMETERS_ERROR: { error: 'malformatted parameters' } = {
  error: 'malformatted parameters',
};

const app = express();

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
    return res.status(400).json(MALFORMATTED_PARAMETERS_ERROR);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

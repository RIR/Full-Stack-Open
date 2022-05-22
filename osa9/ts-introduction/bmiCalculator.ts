export interface ParsedBmiArgs {
  height: number;
  weight: number;
}

/*
 Could also `export interface BmiResponse extends BmiArgs`
 here, but maybe that's a bit hazy abstraction
*/
export interface BmiResponse {
  height: number;
  weight: number;
  bmi: string;
}

// Modified to accept unknown so better usable in Express too
export const parseBmiArgs = (args: Array<unknown>): ParsedBmiArgs => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  const [height, weight] = args.map((arg) => {
    if (isNaN(Number(arg))) throw new Error(`Provided value "${arg}" is not a number`);
    else return Number(arg);
  });

  return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightAsMeters: number = height / 100;
  const BMI: number = weight / heightAsMeters ** 2;

  if (BMI < 18.5) return 'Underweight (unhealthy weight)';
  if (BMI > 25.0) return 'Overweight (unhealthy weight)';

  return 'Normal (healthy weight)';
};

// 9.1
// console.log(calculateBmi(180, 74));
// console.log(calculateBmi(180, 33));
// console.log(calculateBmi(180, 120));

// 9.3
try {
  const { height, weight } = parseBmiArgs(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

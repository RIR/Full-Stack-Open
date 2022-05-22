interface BmiArgs {
  height: number;
  weight: number;
}

const parsedBmiArgs = (args: Array<string>): BmiArgs => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  const [height, weight] = args.map((arg) => {
    if (isNaN(Number(arg))) throw new Error(`Provided value "${arg}" is not a number`);
    else return Number(arg);
  });

  return { height, weight };
};

const calculateBmi = (height: number, weight: number): string => {
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

try {
  const { height, weight } = parsedBmiArgs(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

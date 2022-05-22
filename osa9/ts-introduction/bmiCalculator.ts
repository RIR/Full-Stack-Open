const calculateBmi = (height: number, weight: number): string => {
  const heightAsMeters: number = height / 100;
  const BMI: number = weight / heightAsMeters ** 2;

  if (BMI < 18.5) return 'Underweight (unhealthy weight)';
  if (BMI > 25.0) return 'Overweight (unhealthy weight)';

  return 'Normal (healthy weight)';
};

console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 33));
console.log(calculateBmi(180, 120));

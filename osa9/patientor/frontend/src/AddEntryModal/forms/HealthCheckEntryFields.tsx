import { HealthCheckRating } from '../../types';
import { baseEntryInitialValues, requiredError } from '../constants';
import { HealthCheckRatingOption, SelectField } from '../FormField';
import { HealthCheckEntryValues } from '../types';
import { validateBaseFormValues } from '../utils';

export const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

export const initialHealthCheckEntryValues: HealthCheckEntryValues = {
  type: 'HealthCheck',
  ...baseEntryInitialValues,
  healthCheckRating: HealthCheckRating.Healthy,
};

export const validateHealthCheckEntryFields = (values: HealthCheckEntryValues) => {
  const baseFormErrors: { [field: string]: string } = validateBaseFormValues(values);
  const healthCheckEntryErrors: { [field: string]: string } = {};

  if (!Object.values(HealthCheckRating).includes(values.healthCheckRating)) {
    healthCheckEntryErrors.healthCheckRating = requiredError;
  }

  const errors = { ...baseFormErrors, ...healthCheckEntryErrors };
  return errors;
};

const HealthCheckEntryFields = () => (
  <SelectField label='Health check rating' name='healthCheckRating' options={healthCheckRatingOptions} />
);

export default HealthCheckEntryFields;

import { Entry } from '../types';
import { invalidTypeError, requiredError } from './constants';
import { initialHealthCheckEntryValues, validateHealthCheckEntryFields } from './forms/HealthCheckEntryFields';
import { initialHospitalEntryValues, validateHospitalEntryFields } from './forms/HospitalEntryFields';
import {
  initialOccupationalHealthCareEntryValues,
  validateOccupationalHealthCareEntryFields,
} from './forms/OccupationalHealthCareEntryFields';
import {
  isHealthCheckEntryFormValues,
  isHospitalEntryFormValues,
  isOccupationalHealthCareEntryFormValues,
} from './typeGuards';
import { EntryFormValues } from './types';

// Validation helpers
export const isValidEntryType = (value: Entry['type']) => {
  return value === 'HealthCheck' || value === 'OccupationalHealthcare' || value === 'Hospital';
};

export const isValidDate = (value: string) => {
  const dateRegex = /^[0-9]{4}-((1[0-2])|(0[1-9]))-(([0-2][0-9])|(3[0-1]))$/;
  return dateRegex.test(value);
};

export const validateBaseFormValues = (values: EntryFormValues) => {
  const errors: { [field: string]: string } = {};

  if (!isValidEntryType(values.type)) {
    errors.type = invalidTypeError;
  }
  if (!values.description) {
    errors.name = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (values.date && !isValidDate(values.date)) {
    errors.date = `${invalidTypeError}. Accepted date format is YYYY-MM-DD.`;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  return errors;
};

export const validateFormValues = (type: Entry['type'], values: EntryFormValues): { [field: string]: unknown } => {
  switch (type) {
    case 'HealthCheck':
      return isHealthCheckEntryFormValues(values) ? validateHealthCheckEntryFields(values) : {};
    case 'OccupationalHealthcare':
      return isOccupationalHealthCareEntryFormValues(values) ? validateOccupationalHealthCareEntryFields(values) : {};
    case 'Hospital':
      return isHospitalEntryFormValues(values) ? validateHospitalEntryFields(values) : {};
  }
};

export const getInitialValues = (type: Entry['type']): EntryFormValues => {
  switch (type) {
    case 'HealthCheck':
      return initialHealthCheckEntryValues;
    case 'OccupationalHealthcare':
      return initialOccupationalHealthCareEntryValues;
    case 'Hospital':
      return initialHospitalEntryValues;
  }
};

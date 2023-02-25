import {
  EntryFormValues,
  HealthCheckEntryValues,
  HospitalEntryValues,
  OccupationalHealthCareEntryValues,
} from './types';

export const isHealthCheckEntryFormValues = (values: EntryFormValues): values is HealthCheckEntryValues => {
  return values.type === 'HealthCheck' && values.healthCheckRating !== undefined;
};

export const isOccupationalHealthCareEntryFormValues = (
  values: EntryFormValues
): values is OccupationalHealthCareEntryValues => {
  return values.type === 'OccupationalHealthcare' && values.employerName !== undefined;
};

export const isHospitalEntryFormValues = (values: EntryFormValues): values is HospitalEntryValues => {
  return values.type === 'Hospital' && values.discharge !== undefined;
};

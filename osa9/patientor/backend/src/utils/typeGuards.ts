import {
  BaseNewEntry,
  Entry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthCareEntry,
} from '../types';

// Type guards
export const isString = (txt: unknown): txt is string => {
  return typeof txt === 'string' || txt instanceof String;
};

export const isDate = (value: unknown): value is string => {
  return isString(value) && Boolean(Date.parse(value));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export const isEntry = (param: unknown): param is Entry => {
  return (param as Entry) !== undefined;
};

// Not very generic
export const isEntryType = (param: unknown): param is Entry['type'] => {
  return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param as Entry['type']);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSickLeave = (param: any): param is OccupationalHealthCareEntry['sickLeave'] => {
  if (param === undefined || param.startDate === undefined || param.endDate === undefined) {
    return false;
  }
  return isDate(param.startDate) && isDate(param.endDate);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDischarge = (param: any): param is HospitalEntry['discharge'] => {
  if (param === undefined || param.date === undefined || param.criteria === undefined) {
    return false;
  }
  return isDate(param.date) && isString(param.criteria);
};

export const isHealthCheckEntry = (param: BaseNewEntry): param is HealthCheckEntry => {
  return param.type === 'HealthCheck';
};

export const isOccupationalHealthcareEntry = (param: BaseNewEntry): param is OccupationalHealthCareEntry => {
  return param.type === 'OccupationalHealthcare';
};

export const isHospitalEntry = (param: BaseNewEntry): param is HospitalEntry => {
  return param.type === 'Hospital';
};

import {
  Diagnosis,
  Entry,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewEntry,
  NewPatient,
  OccupationalHealthCareEntry,
} from '../types';
import {
  isDate,
  isGender,
  isHealthCheckEntry,
  isHospitalEntry,
  isOccupationalHealthcareEntry,
  isString,
  isEntry,
  isHealthCheckRating,
  isSickLeave,
  isDischarge,
  isEntryType,
} from './typeGuards';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, 'SSN'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: parseEntries(object.entries),
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const newEntry = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    type: parseEntryType(object.type),
  };

  if (isHealthCheckEntry(newEntry)) {
    newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
  } else if (isOccupationalHealthcareEntry(newEntry)) {
    newEntry.employerName = parseString(object.employerName, 'employerName');
    newEntry.sickLeave = parseSickLeave(object.sickLeave);
  } else if (isHospitalEntry(newEntry)) {
    newEntry.discharge = parseDischarge(object.discharge);
  }

  return newEntry as NewEntry;
};

// Parse helpers

// Generic parsers
// TODO: Possibly some generic implementation could infer the param name?
const parseString = (param: unknown, propName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${propName}`);
  }
  return param;
};

const parseDate = (date: unknown): string => {
  if (!date || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// For NewPatient
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries) || !entries.every(isEntry)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown = []): Array<Diagnosis['code']> => {
  if (!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(isString)) {
    throw new Error('Incorrect or missing diagnosisCodes');
  }
  return diagnosisCodes;
};

const parseEntryType = (type: unknown): Entry['type'] => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type');
  }
  return type;
};

// Parse helpers for HealthCheck type
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating == null || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing Health check rating');
  }
  return healthCheckRating;
};

// Parse helpers for OccupationalHealthcare type
const parseSickLeave = (sickLeave: unknown): OccupationalHealthCareEntry['sickLeave'] => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
};

// Parse helpers for Hospital type
const parseDischarge = (discharge: unknown): HospitalEntry['discharge'] => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

export default toNewPatient;

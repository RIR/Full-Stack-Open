import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PublicPatient, NewPatientEntry, Patient } from '../types';

// Exclude the social security number from results
const getNonSensitiveEntries = (): PublicPatient[] =>
  patients.map(({ ssn: _ssn, entries: _entries, ...sensitiveEntry }) => sensitiveEntry);

// TODO get patient with id
const getPatient = (id: string): undefined | Patient => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  getPatient,
  addPatient,
};

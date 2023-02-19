import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PublicPatient, NewPatient, Patient, Entry, NewEntry } from '../types';

// Exclude the social security number from results
const getNonSensitiveEntries = (): PublicPatient[] =>
  patients.map(({ ssn: _ssn, entries: _entries, ...sensitiveEntry }) => sensitiveEntry);

const getPatient = (id: string): undefined | Patient => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patientIdx = patients.findIndex((patient) => patient.id === id);
  const patient = patients[patientIdx];
  const newEntry = { id: uuid(), ...entry };
  patient.entries.push(newEntry);
  // TODO: check what actually should be returned
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  getPatient,
  addPatient,
  addEntry,
};

import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types';

// Exclude the social security number from results
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] =>
  patients.map(({ ssn:_ssn, ...sensitiveEntry }) => sensitiveEntry);

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};

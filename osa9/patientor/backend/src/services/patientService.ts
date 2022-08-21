import patients from '../../data/patients';

import { NonSensitivePatientEntry } from '../types';

// Exclude the social security number from results
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] =>
  patients.map(({ ssn, ...sensitiveEntry }) => sensitiveEntry);

export default {
  getNonSensitiveEntries,
};

import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils/parseUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patientsWithoutSSN = patientService.getNonSensitiveEntries();
  res.send(patientsWithoutSSN);
});

// TODO
router.get('/:id', (req, res) => {
  const patientFound = patientService.getPatient(req.params.id);
  return patientFound ? res.send(patientFound) : res.status(404).send('Patient not found');
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    // Should actually check that the patient exists, but not in the scope of this exercise
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

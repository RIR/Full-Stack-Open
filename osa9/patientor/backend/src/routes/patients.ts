import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patientsWithoutSSN = patientService.getNonSensitiveEntries();
  res.send(patientsWithoutSSN);
});

export default router;

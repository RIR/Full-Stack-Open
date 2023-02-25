import { TextField } from '../FormField';

import { Field } from 'formik';
import { HospitalEntryValues } from '../types';
import { isValidDate, validateBaseFormValues } from '../utils';
import { baseEntryInitialValues, invalidTypeError, requiredError } from '../constants';

export const initialHospitalEntryValues: HospitalEntryValues = {
  type: 'Hospital',
  ...baseEntryInitialValues,
  discharge: {
    date: '',
    criteria: '',
  },
};

export const validateHospitalEntryFields = (values: HospitalEntryValues) => {
  const baseFormErrors: { [field: string]: string } = validateBaseFormValues(values);
  const hospitalEntryErrors: { discharge: { date: unknown; criteria: unknown } } = {
    discharge: { date: null, criteria: null },
  };

  const {
    discharge: { date, criteria },
  } = values;

  if (!date) {
    hospitalEntryErrors.discharge.date = requiredError;
  }

  if (!criteria) {
    hospitalEntryErrors.discharge.criteria = requiredError;
  }

  if (date && !isValidDate(date)) {
    hospitalEntryErrors.discharge.date = `${invalidTypeError}. Accepted date format is YYYY-MM-DD.`;
  }

  const errors = {
    ...baseFormErrors,
    ...Object.fromEntries(
      Object.entries(hospitalEntryErrors).filter(([key, val]) => {
        if (key === 'discharge' && val.date === null) return false;
        return true;
      })
    ),
  };

  return errors;
};

const HospitalEntryFields = () => {
  return (
    <>
      {/* <Field label='Discharge date' placeholder='YYYY-MM-DD' name='dischargeDate' component={TextField} /> */}
      <Field label='Discharge date' placeholder='YYYY-MM-DD' name='discharge.date' component={TextField} />
      <Field label='Discharge criteria' placeholder='Criteria' name='discharge.criteria' component={TextField} />
    </>
  );
};

export default HospitalEntryFields;

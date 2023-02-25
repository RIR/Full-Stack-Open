import { TextField } from '../FormField';

import { Field } from 'formik';
import { OccupationalHealthCareEntryValues } from '../types';
import { isValidDate, validateBaseFormValues } from '../utils';
import { baseEntryInitialValues, invalidTypeError, requiredError } from '../constants';

export const initialOccupationalHealthCareEntryValues: OccupationalHealthCareEntryValues = {
  type: 'OccupationalHealthcare',
  ...baseEntryInitialValues,
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: '',
  },
};

export const validateOccupationalHealthCareEntryFields = (values: OccupationalHealthCareEntryValues) => {
  const baseFormErrors: { [field: string]: string } = validateBaseFormValues(values);
  const occuPationalHealthCareEntryErrors: {
    employerName?: string;
    sickLeave: { startDate?: unknown; endDate?: unknown };
  } = { sickLeave: { startDate: null, endDate: null } };

  const { employerName, sickLeave: { startDate, endDate } = {} } = values;

  if (!employerName) {
    occuPationalHealthCareEntryErrors.employerName = requiredError;
  }

  if (startDate && !endDate) {
    occuPationalHealthCareEntryErrors.sickLeave.endDate = requiredError;
  }
  if (endDate && !startDate) {
    occuPationalHealthCareEntryErrors.sickLeave.startDate = requiredError;
  }

  if (startDate && !isValidDate(startDate)) {
    occuPationalHealthCareEntryErrors.sickLeave.startDate = `${invalidTypeError}. Accepted date format is YYYY-MM-DD.`;
  }

  if (endDate && !isValidDate(endDate)) {
    occuPationalHealthCareEntryErrors.sickLeave.endDate = `${invalidTypeError}. Accepted date format is YYYY-MM-DD.`;
  }

  const errors = {
    ...baseFormErrors,
    // A bit hacky way to clean the empty values from validations. These cause false invalid statuses
    ...Object.fromEntries(
      Object.entries(occuPationalHealthCareEntryErrors).filter(([key, val]) => {
        if (typeof val !== 'string' && key === 'sickLeave' && val.startDate === null && val.endDate === null) {
          return false;
        }
        return true;
      })
    ),
  };

  return errors;
};

const OccupationalHealthCareEntryFields = () => {
  return (
    <>
      <Field label='Employer' placeholder='Employer' name='employerName' component={TextField} />
      {/* <Field label='Start date' placeholder='YYYY-MM-DD' name='startDate' component={TextField} /> */}
      <Field label='Start date' placeholder='YYYY-MM-DD' name='sickLeave.startDate' component={TextField} />
      {/* <Field label='End date' placeholder='YYYY-MM-DD' name='endDate' component={TextField} /> */}
      <Field label='End date' placeholder='YYYY-MM-DD' name='sickLeave.endDate' component={TextField} />
    </>
  );
};

export default OccupationalHealthCareEntryFields;

import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField, DiagnosisSelection, HealthCheckRatingOption, TypeOption } from './FormField';
import { HealthCheckRating, HealthCheckEntry, Entry } from '../types';
import { useStateValue } from '../state';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

const isValidEntryType = (value: Entry['type']) => {
  return value === 'HealthCheck' || value === 'OccupationalHealthcare' || value === 'Hospital';
};

// Questionable if usable, since
const isValidDate = (value: string) => {
  const dateRegex = /^[0-9]{4}-((1[0-2])|(0[1-9]))-(([0-2][0-9])|(3[0-1]))$/;
  return dateRegex.test(value);
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const invalidTypeError = 'Invalid value';
        const errors: { [field: string]: string } = {};

        if (!isValidEntryType(values.type)) {
          errors.type = invalidTypeError;
        }
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !isValidDate(values.date)) {
          errors.date = `${invalidTypeError}. Accepted date format is YYYY-MM-DD.`;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <SelectField label='Type' name='type' options={typeOptions} disabled />
            <Field label='Description' placeholder='Description' name='description' component={TextField} />
            <Field label='Date' placeholder='YYYY-MM-DD' name='date' component={TextField} />
            <Field label='Specialist' placeholder='specialist' name='specialist' component={TextField} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label='Health Check Rating' name='healthCheckRating' options={healthCheckRatingOptions} />
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}>
                  {/* disabled={!dirty || !isValid}> */}
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

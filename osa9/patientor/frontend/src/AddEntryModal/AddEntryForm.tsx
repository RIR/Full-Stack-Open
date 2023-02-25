import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import { DiagnosisSelection, SelectField, TextField, TypeOption } from './FormField';
import { Entry } from '../types';
import { useStateValue } from '../state';
import HealthCheckEntryFields from './forms/HealthCheckEntryFields';
import OccupationalHealthCareEntryFields from './forms/OccupationalHealthCareEntryFields';
import HospitalEntryFields from './forms/HospitalEntryFields';
import { getInitialValues, validateFormValues } from './utils';
import { EntryFormValues } from './types';
import { isHospitalEntryFormValues, isOccupationalHealthCareEntryFormValues } from './typeGuards';

interface Props {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={getInitialValues('HealthCheck')}
      onSubmit={onSubmit}
      validate={(values) => validateFormValues(values.type, values)}>
      {({ isValid, dirty, setFieldValue, setFieldTouched, values, initialValues, resetForm }) => {
        const renderEntryForm = (type: Entry['type']) => {
          switch (type) {
            case 'HealthCheck':
              return <HealthCheckEntryFields />;
            case 'OccupationalHealthcare':
              return isOccupationalHealthCareEntryFormValues(values) ? <OccupationalHealthCareEntryFields /> : <></>;
            case 'Hospital':
              return isHospitalEntryFormValues(values) ? <HospitalEntryFields /> : <></>;
          }
        };

        if (initialValues.type !== values.type) resetForm({ values: getInitialValues(values.type) });

        return (
          <Form className='form ui'>
            <SelectField label='Type' name='type' options={typeOptions} />
            <Field label='Description' placeholder='Description' name='description' component={TextField} />
            <Field label='Date' placeholder='YYYY-MM-DD' name='date' component={TextField} />
            <Field label='Specialist' placeholder='specialist' name='specialist' component={TextField} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {renderEntryForm(values.type)}
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

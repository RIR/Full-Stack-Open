import { BaseEntryValues } from "./types";

export const baseEntryInitialValues: BaseEntryValues = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
};

export const requiredError = 'Field is required';
export const invalidTypeError = 'Invalid value';

export const INVALID_HEALTH_CHECK_ENTRY_FORM_VALUES = 'Invalid health check entry form values';
export const INVALID_HOSPITAL_ENTRY_FORM_VALUES = 'Invalid hospital entry form values';
export const INVALID_OCCUPATIONAL_HEALTH_CARE_ENTRY_FORM_VALUES = 'Invalid occupational health care entry form values';
import { State } from './state';
import { Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    };

export const setPatientList: (patients: Patient[]) => Action = (patients: Patient[]) => {
  return { type: 'SET_PATIENT_LIST', payload: patients };
};

export const addPatient: (patient: Patient) => Action = (patient: Patient) => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const updatePatient: (patient: Patient) => Action = (patient: Patient) => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    // TODO: not sure if there should be a separate state for "sensitive information..."
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

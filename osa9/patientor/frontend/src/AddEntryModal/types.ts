import { BaseEntry, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry, UnionOmit } from '../types';

export type EntryFormValues = UnionOmit<Entry, 'id'>;

export type BaseEntryValues = Omit<BaseEntry, 'id' | 'type'>;
export type HealthCheckEntryValues = Omit<HealthCheckEntry, 'id'>;
export type HospitalEntryValues = Omit<HospitalEntry, 'id'>;
export type OccupationalHealthCareEntryValues = Omit<OccupationalHealthCareEntry, 'id'>;

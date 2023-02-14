import React, { useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
// import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
// import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import EntryDetails from '../components/EntryDetails/EntryDetails.';

const PatientInformationPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      console.log({ data }, 'WAS FETCHED FROM BACKEND');
      return data;
    };

    const setCurrentPatient = async (id: string) => {
      try {
        const patientFromStorage = patients[id];
        const fetchedPatient = patientFromStorage?.ssn != null ? patientFromStorage : await fetchPatient(id);

        console.log({ fetchedPatient });

        dispatch(updatePatient(fetchedPatient));
        setPatient(fetchedPatient);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
        } else {
          console.error('Unknown error', e);
        }
      }
    };
    id && void setCurrentPatient(id);
  }, [dispatch]);

  const displayGenderIcon = patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />;

  return (
    <div className='App'>
      <Box style={{ margin: '1em 0' }}>
        <Typography variant='h5'>
          {patient?.name} {displayGenderIcon}
        </Typography>
      </Box>
      <Typography> ssh: {patient?.ssn}</Typography>
      <Typography> occupation: {patient?.occupation}</Typography>
      <Typography variant='h6' style={{ margin: '1em 0', fontWeight: 'bold' }}>
        Entries
      </Typography>
      {patient?.entries?.map((entry) => (
        <Box
          key={entry.id}
          style={{ margin: '1em 0', padding: '0.5em', border: '1px solid black', borderRadius: '10px' }}>
          <EntryDetails entry={entry} />
        </Box>
      ))}
    </div>
  );
};

export default PatientInformationPage;

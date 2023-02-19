import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { useStateValue } from '../../state';

import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { OccupationalHealthCareEntry } from '../../types';

const OccupationalHealthCareEntryDetails: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  const { date, description, specialist, diagnosisCodes = [], employerName, sickLeave } = entry;

  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <Typography>
        {date} <MedicalInformationIcon />
      </Typography>
      <Typography variant='body2'>{description}</Typography>

      {diagnosisCodes.length > 0 && (
        <Box style={{ margin: '1em 0' }}>
          <Typography>Diagnoses</Typography>
          <List dense>
            {diagnosisCodes?.map((code) => (
              <ListItem key={code} dense>
                <ListItemIcon>
                  <ControlCameraIcon />
                </ListItemIcon>
                <ListItemText primary={`${code} ${diagnoses && diagnoses[code].name}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {sickLeave && (
        <Box style={{ margin: '1em 0' }}>
          <Typography variant='body2'>
            Written sick leave to patient for the time period {sickLeave.startDate} - {sickLeave.endDate}
          </Typography>
          <Typography variant='body2'>Patient is employed by {employerName}</Typography>
        </Box>
      )}

      <Typography variant='body2'>diagnosis by {specialist}</Typography>
    </>
  );
};

export default OccupationalHealthCareEntryDetails;

import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { useStateValue } from '../../state';
import { HospitalEntry } from '../../types';

import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const { date, description, specialist, diagnosisCodes = [], discharge } = entry;

  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <Typography>
        {date} <LocalHospitalIcon />{' '}
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

      <Box style={{ margin: '1em 0' }}>
        <Typography variant='body2'>
          Patient discharged on {discharge.date}: {discharge.criteria}
        </Typography>
      </Box>

      <Typography variant='body2'>diagnosis by {specialist}</Typography>
    </>
  );
};

export default HospitalEntryDetails;

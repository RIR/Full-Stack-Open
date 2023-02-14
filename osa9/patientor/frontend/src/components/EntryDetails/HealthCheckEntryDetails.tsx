import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { HealthCheckEntry } from '../../types';
import { useStateValue } from '../../state';

import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const { date, description, specialist, diagnosisCodes = [], healthCheckRating } = entry;

  const [{ diagnoses }] = useStateValue();

  const ratingColor = {
    0: 'green',
    1: 'blue',
    2: 'red',
    3: 'black',
  };

  return (
    <>
      <Typography>
        {date} <MonitorHeartIcon /> <FavoriteIcon fontSize='medium' sx={{ color: ratingColor[healthCheckRating] }} />
      </Typography>
      <Typography variant='body2'>{description}</Typography>

      {/* At this point is obvious that DiagnosisSection probably should be its own component but that's not the focus
      here  */}

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
        <Typography variant='body2'>diagnosis by {specialist}</Typography>
      </Box>
    </>
  );
};

export default HealthCheckEntryDetails;

{
  /* <HomeIcon />
<HomeIcon color="primary" />
<HomeIcon color="secondary" />
<HomeIcon color="success" />
<HomeIcon color="action" />
<HomeIcon color="disabled" />
<HomeIcon sx={{ color: pink[500] }} /> */
}

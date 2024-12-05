import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex justify-center">
      <CircularProgress style={{ color: 'red' }} size={'20px'} {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      ></Box>
      {/* <Typography
        variant='caption'
        fontSize={'16px'}
        fontWeight={'bold'}
        component='div'
        color='blue'
        marginLeft={1}
      >
        {'Saving...'}
      </Typography> */}
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function SaveIndicator() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 20
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

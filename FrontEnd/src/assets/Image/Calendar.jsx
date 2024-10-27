import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function Calendar() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: '100cm', // Adjust this value to shift the component to the right
  };


  const datePickerStyle = {
    marginBottom: '10px', // Adjust as needed to separate the date from the calendar
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={containerStyle}>
        <div style={datePickerStyle}>
          <StaticDatePicker
            defaultValue={dayjs('2022-04-17')}
            slotProps={{
              actionBar: {
                actions: ['today'],
              },
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}

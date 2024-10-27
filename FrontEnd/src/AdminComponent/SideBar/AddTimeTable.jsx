import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreatePage from '../Dashtabs/CreatePage';
import Creditspage from '../Dashtabs/Creditspage';
import SelectTeachersPage from '../Dashtabs/SelectTeachersPage';
import Programme from '../Dashtabs/Programme';
import ClassLists from '../Dashtabs/ClassLists'; // Import the component for the "Programme" tab

export default function AddTimeTable() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveAndNext = () => {
    // Save data for the current tab (handled separately for each tab)
    // Then proceed to the next tab
    setValue(value + 1);

    console.log("Save and NExt");
  };

  const handleCreateTabClick = () => {
    setValue(value + 1);

  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {/* <Tab label="time-table Lists" /> */}
          <Tab label="Programme" />
          <Tab label="Hours" />
          <Tab label="Choose Teachers" />
          <Tab label="Create" onClick={handleCreateTabClick} /> {/* Add onClick handler */}
        </Tabs>
      </Box>
     
      {/* <TabPanel value={value} index={0}>
        <ClassLists onSave={handleSaveAndNext} />
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <Programme onSave={handleSaveAndNext} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Creditspage onSave={handleSaveAndNext} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SelectTeachersPage onSave={handleSaveAndNext} />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <CreatePage />
      </TabPanel>
    </Box>
  );
}

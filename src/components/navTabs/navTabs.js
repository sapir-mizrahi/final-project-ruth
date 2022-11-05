import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './style.css';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // event.preventDefault();
      }}
      {...props}
    />
  );
}
const NavTabs = (props) => {
  const [value, setValue] = React.useState(0);
  //   const history = useHistory();
  //   const tab = () => {
  //       history.push("/tab")
  //   }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="courses" href="/Courses" />
        <LinkTab label="customers" href="/Customers" />
        <LinkTab label="bonuses" href="/Bonuses" />
      </Tabs>
    </Box>
  );
}
export default NavTabs;

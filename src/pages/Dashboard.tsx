import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import ComplaintConsult from "../components/ComplaintConsult";
import Catalogues from "../components/Catalogues";
import Form from "../components/Form";

const Dashboard = ({ setToken }) => {
   const [value, setValue] = useState(0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const handleLogout = () => {
      localStorage.removeItem("AUTH_TOKEN");
      setToken(null);
   };

   return (
      <Stack>
         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 24, color: "#305e58ff", mx: 2 }}>REDECO</Typography>
            <Button variant="contained" onClick={handleLogout} sx={{ bgcolor: "#305e58ff" }}>
               Cerrar sesión
            </Button>
         </Box>
         <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", gap: 2 }}>
            <Tabs
               value={value}
               onChange={handleChange}
               variant="scrollable"
               scrollButtons="auto"
            >
               <Tab label="Consultar quejas" />
               <Tab label="Formulario" />
               <Tab label="Catálogos" />
            </Tabs>
         </Box>
         <CustomTabPanel value={value} index={0}>
            <ComplaintConsult />
         </CustomTabPanel>
         <CustomTabPanel value={value} index={1}>
            <Form />
         </CustomTabPanel>
         <CustomTabPanel value={value} index={2}>
            <Catalogues />
         </CustomTabPanel>
      </Stack>
   );
};

export default Dashboard;

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

function CustomTabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
   );
}

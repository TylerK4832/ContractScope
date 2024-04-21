import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Table from "./Table";
import TimeSeries from "./TimeSeries";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Layout: React.FC = () => {
  const [leftPaneActive, setLeftPaneActive] = useState("0");
  const [rightPaneActive, setRightPaneActive] = useState("0");

  const handleLeftPaneChange = (
    evt: React.SyntheticEvent<Element, Event>,
    idx: string
  ) => setLeftPaneActive(idx);
  const handleRightPaneChange = (
    evt: React.SyntheticEvent<Element, Event>,
    idx: string
  ) => setRightPaneActive(idx);

  return (
    <Container sx={{ height: "100vh" }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Item>
            <Table />
          </Item>
        </Grid>
        <Grid xs={8} height="40vh">
          <Item>
            <TabContext value={leftPaneActive}>
              <TabList onChange={handleLeftPaneChange}>
                <Tab label="Analysis 1" value="0" />
                <Tab label="Analysis 2" value="1" />
                <Tab label="Analysis 3" value="2" />
              </TabList>
              <TabPanel value="0">
                <TimeSeries />
              </TabPanel>
              <TabPanel value="1">Item Two</TabPanel>
              <TabPanel value="2">Item Three</TabPanel>
            </TabContext>
          </Item>
        </Grid>
        <Grid xs={4} height="40vh">
          <Item>
            <TabContext value={rightPaneActive}>
              <TabList onChange={handleRightPaneChange}>
                <Tab label="Analysis 1" value="0" />
                <Tab label="Analysis 2" value="1" />
              </TabList>
              <TabPanel value="0">Item One</TabPanel>
              <TabPanel value="1">Item Two</TabPanel>
            </TabContext>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;

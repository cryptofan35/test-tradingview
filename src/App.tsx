import React from "react";
import {
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { TVChartContainer } from "./TVChartContainer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      marginRight: theme.spacing(4),
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Circular Std",
    fontStyle: "normal",
    fontWeight: "normal",
    margin: "60px",
  },
  numVal: {
    fontSize: "70px",
    lineHeight: "89px",
    color: "#1A243A",
  },
  usd: {
    fontWeight: "normal",
    fontSize: "24px",
    lineHeight: "30px",
    color: "#BDBEBF",
    verticalAlign: "top",
  },
  percent: {
    fontSize: "18px",
    lineHeight: "23px",
    color: "#67BF6B",
    marginBottom: "40px",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div>
        <span className={classes.numVal}>63,179.71</span>
        <span className={classes.usd}>USD</span>
      </div>
      <div className={classes.percent}>+ 2,161.42 (3.54%)</div>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="Summary" {...a11yProps(0)} />
        <AntTab label="Chart" {...a11yProps(1)} />
        <AntTab label="Statistics" {...a11yProps(2)} />
        <AntTab label="Analysis" {...a11yProps(3)} />
        <AntTab label="Setting" {...a11yProps(3)} />
      </AntTabs>
      <TabPanel value={value} index={0}>
        Summary
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TVChartContainer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Statistics
      </TabPanel>
      <TabPanel value={value} index={3}>
        Analysis
      </TabPanel>
      <TabPanel value={value} index={4}>
        Setting
      </TabPanel>
    </div>
  );
}

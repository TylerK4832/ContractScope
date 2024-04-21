import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import BasicExampleDataGrid from "./components/table";

interface IProps {}

const App: React.FC<IProps> = (props) => {
  return (
    <>
      <CssBaseline />
      <BasicExampleDataGrid />
      {/* Add project code beneath the baseline */}
    </>
  );
};

export default App;

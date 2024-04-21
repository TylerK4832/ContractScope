import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import rows from "./rows";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const BasicExampleDataGrid = () => {
  const columns = [
    { field: "context", headerName: "Context", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "awardedCompany", headerName: "Awarded Company", width: 250 },
    {
      field: "awardedCompanyLocation",
      headerName: "Company Location",
      width: 250,
    },
    { field: "amountAwarded", headerName: "Amount Awarded", width: 180 },
    { field: "awardedFor", headerName: "Awarded For", width: 250 },
    { field: "workLocation", headerName: "Work Location", width: 250 },
    {
      field: "expectedCompletionDate",
      headerName: "Expected Completion Date",
      width: 250,
    },
    {
      field: "contractingActivityGroup",
      headerName: "Contracting Activity Group",
      width: 250,
    },
    {
      field: "activityGroupLocation",
      headerName: "Activity Group Location",
      width: 250,
    },
    { field: "activityCode", headerName: "Activity Code", width: 200 },
    { field: "contractType", headerName: "Contract Type", width: 180 },
    { field: "isModification", headerName: "Modification", width: 150 },
  ];

  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div style={{ height: "60%", width: "95%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
};

export default BasicExampleDataGrid;

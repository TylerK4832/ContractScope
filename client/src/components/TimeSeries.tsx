// import * as React from "react";
import { DatasetElementType } from "@mui/x-charts/models/seriesType/config";
import rows from "../utils/rows";
import { LineChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const TimeSeries = () => {
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

  const keyToLabel: { [key: string]: string } = {
    coal: "Electricity from coal (TWh)",
    gas: "Electricity from gas (TWh)",
    oil: "Electricity from oil (TWh)",
    nuclear: "Electricity from nuclear (TWh)",
    hydro: "Electricity from hydro (TWh)",
    wind: "Electricity from wind (TWh)",
    solar: "Electricity from solar (TWh)",
    bio: "Electricity from bioenergy (TWh)",

    other: "Other renewables excluding bioenergy (TWh)",
  };

  // const stackStrategy = {
  //   stack: "total",
  //   area: true,
  //   stackOffset: "none", // To stack 0 on top of others
  // } as const;

  // const customize = {
  //   height: 300,
  //   legend: { hidden: true },
  //   margin: { top: 5 },
  //   stackingOrder: "descending",
  // };

  // const data = rows.reduce((acc, contract) => {
  //   const existingDateIndex = acc.findIndex(item => item.date === contract.date);

  //   if (existingDateIndex !== -1) {
  //     acc[existingDateIndex].amount += contract.amountAwarded;
  //   } else {
  //     acc.push({ date: contract.date, amount: contract.amountAwarded });
  //   }

  //   return acc;
  // }, []);

  const dateToAmountAwarded: { [date: string]: number } = {};

  rows.forEach((contract) => {
    let contract_date = contract.date.toISOString();
    // If the date already exists in the hash map, increment its value by the amount awarded
    if (dateToAmountAwarded[contract_date]) {
      dateToAmountAwarded[contract_date] += contract.amountAwarded;
    } else {
      // If the date does not exist in the hash map, initialize it with the amount awarded
      dateToAmountAwarded[contract_date] = contract.amountAwarded;
    }
  });

  const keys = Object.keys(dateToAmountAwarded).sort();
  const keys_dated = keys.map((k) => new Date(k));
  const values = keys_dated.map(
    (k) => dateToAmountAwarded[k.toISOString()] / 1000000
  );

  console.log(keys.map((k) => new Date(k)));
  console.log(values);
  return (
    <div style={{ height: "60%", width: "95%" }}>
      <LineChart
        xAxis={[
          {
            data: keys_dated,
            scaleType: "time",
            label: "Year",
          },
        ]}
        yAxis={[
          {
            label: "Amount in Dollars (in Millions)",
          },
        ]}
        series={[
          {
            data: values,
          },
        ]}
        width={600}
        height={400}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            // Move the y-axis label with CSS
            transform: "translateX(-10px)",
          },
        }}
        margin={{ top: 5, right: 5, bottom: 80, left: 55 }}
      />
    </div>
  );
};

export default TimeSeries;

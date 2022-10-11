import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
//   { field: "id", headerName: "ID", width: 90 },
  {
    field: "fname",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lname",
    headerName: "Last name",
    width: 300,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 400,
    valueGetter: (params) =>
      `${params.row.fname || ""} ${params.row.lname || ""}`,
  },
];

export default function DataGridDemo() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7777/api/userlist")
      .then((response) => response.json())
      .then((data) => setTableData(data));
  }, []);
  console.log(tableData);

  return (
    <Box sx={{ height: 400, width: "100%"}}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[5]}
        getRowId ={(row) => row._id}
        hideFooterSelectedRowCount
      />
    </Box>
  );
}

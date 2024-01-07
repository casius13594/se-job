"use client";
import { getEmployeeOfCompany } from "@/components/controller";
import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { employeeCompany } from "@/components/DashBoard/user/userinfo";
import { Box } from "@radix-ui/themes";

const columns: GridColDef[] = [
  { field: "id", headerName: "No.", flex: 0.1, minWidth: 50 },
  { field: "name", headerName: "Name", flex: 0.2, minWidth: 130 },
  { field: "email", headerName: "Email", flex: 0.3, minWidth: 200 },
  {
    field: "phone",
    headerName: "Phone",
    flex: 0.2,
    minWidth: 120,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.1,
    minWidth: 70,
    sortable: false,
  },
];

function QuickSearchToolbar() {
  return (
    <Box
      style={{
        padding: "0.5rem",
        paddingBottom: 0,
      }}
    >
      <GridToolbarQuickFilter className="  rounded-md" />
    </Box>
  );
}

export default function UserPage() {
  const [data, setData] = useState<employeeCompany[]>([]);
  React.useEffect(() => {
    const fetchdata = async () => {
      setData(await getEmployeeOfCompany());
    };
    fetchdata();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        pageSizeOptions={[5, 10]}
        slots={{ toolbar: QuickSearchToolbar }}
      />
    </div>
  );
}

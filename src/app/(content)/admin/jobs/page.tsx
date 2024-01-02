"use client";
import { jobInfo } from "@/components/DashBoard/user/userinfo";
import { getListJob, updateJobStatus } from "@/components/controller";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box } from "@radix-ui/themes";
import React, { useEffect, useMemo, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function QuickSearch() {
  return (
    <Box
      style={{
        padding: "0.5rem",
        paddingBottom: 0,
      }}
    >
      <GridToolbarQuickFilter className="bg-[#b1f2b9] rounded-md" />
    </Box>
  );
}

export default function JobList() {
  const [data, setData] = useState<jobInfo[]>([]);
  type StatusOrder = { [key: string]: number };
  const fetchJobData = async () => {
    try {
      const jobData = await getListJob();
      const statusOrder: StatusOrder = { pending: 0, open: 1, closed: 2 };
      const sortedData = jobData.sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status];
      });

      setData(sortedData);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const handleActionClick = async (jobId: string, action: string) => {
    try {
      await updateJobStatus(jobId, action);
      fetchJobData();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "No.", flex: 0.1, minWidth: 50 },
      { field: "name", headerName: "Name", flex: 0.2, minWidth: 150 },
      {
        field: "employer_name",
        headerName: "Employers",
        flex: 0.3,
        minWidth: 200,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 0.1,
        minWidth: 100,
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        flex: 0.2,
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<FaCheck />}
            label="Accept"
            onClick={() => handleActionClick(params.row.job_id, "open")}
          />,
          <GridActionsCellItem
            icon={<FaTimes />}
            label="Decline"
            onClick={() => handleActionClick(params.row.job_id, "closed")}
          />,
        ],
      },
    ],
    []
  );

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
        pageSizeOptions={[5, 9]}
        slots={{ toolbar: QuickSearch }}
      />
    </div>
  );
}

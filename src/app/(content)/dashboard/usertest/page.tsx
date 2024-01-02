"use client"
import { userinfo } from '@/components/DashBoard/user/userinfo';
import { banUser, getListUser, unBanUser } from '@/components/controller';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { Box } from '@radix-ui/themes';
import { UUID } from 'crypto';
import React, { useMemo, useState } from 'react'
import {FaLock, FaUnlock} from 'react-icons/fa'

function QuickSearch() {
    return (
      <Box
        style={{
          padding: '0.5rem',
          paddingBottom: 0,
        }}
      >
        <GridToolbarQuickFilter className="bg-[#b1f2b9] rounded-md"/>
      </Box>
    );
  }

export default function userList(){
    const [tdata, setData] = useState<userinfo[]>([]);
    
    React.useEffect(() => {
        const fetchdata = async () => { setData( await getListUser());
            console.log(tdata);};
        fetchdata();
      }, []);

    const handleBanUser = async (user_id: UUID) => {
        banUser(user_id)
    };
    const handleUnBanUser = async (user_id: UUID) => {
        unBanUser(user_id)
    };
    const columns: GridColDef[] = useMemo(()=>[
        {field: 'id', headerName: 'No.', flex: 0.1, minWidth: 50},
        {field: 'user_id', headerName: 'user_id', flex: 0.1, minWidth: 50},
        {field: 'name', headerName: 'Name', flex: 0.2, minWidth: 150},
        {field: 'email', headerName: 'Email', flex: 0.3, minWidth:200},
        {field:'last_login', headerName: 'Last Login', flex: 0.1, minWidth:100},
        {field:'role', headerName: 'Role', flex: 0.1, minWidth:100},
        {
            field:'actions',
            headerName:'Action',
            type: 'actions',
            flex:0.2, 
            width: 100,
            getActions: (params)=>[
                <GridActionsCellItem
                    icon={<FaLock/>}
                    label ='Ban'
                    onClick={()=> handleBanUser(params.row.user_id)}
                    
                />,
                <GridActionsCellItem
                    icon={<FaUnlock/>}
                    label = 'Unlock'
                    onClick = {()=>handleUnBanUser(params.row.user_id)}
                />
            ]
        },
    ],[]);

    return (
        <div style={{height: '100%', width: '100%'}}>
      <DataGrid
        rows = {tdata}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {page: 0, pageSize: 5}
          },
          columns: {
            columnVisibilityModel: {
              user_id: false,
            },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        
        pageSizeOptions={[5,9]}
        slots={{ toolbar: QuickSearch }}
        
      />
    </div>
    )
}


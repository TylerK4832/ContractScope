import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Contract } from '../../types';

interface IProps {
    data: Contract[];
    isCollapsed: boolean;
}

const Table: React.FC<IProps> = (props) => {
    const columns = [
        { field: 'companyName', headerName: 'Company Name', width: 250 },
        { field: 'amountAwarded', headerName: 'Amount Awarded', width: 180 },
        { field: 'completionDate', headerName: 'Completion Date', width: 200 },
        { field: 'contractingActivity', headerName: 'Contracting Activity', width: 250 },
        { field: 'awardedFor', headerName: 'Awarded For', width: 250 },
        { field: 'workLocation', headerName: 'Work Location', width: 250 },
        { field: 'contractType', headerName: 'Contract Type', width: 180 },
        { field: 'contractNumber', headerName: 'Contract Number', width: 250 },
    ];

    // function debounce() {
    //     let timeoutId 
    //     if (timeoutId !== null) {
    //         clearTimeout(timeoutId);
    //     }
    //     timeoutId = setTimeout(onTableChange, 750); // Adjust the debounce time as needed
    // }
    

    // const debounceTableChange = debounce(((state) => ) => {}, 250);

    // const onTableChange = (state: any) => {
    //     let activeCount = 0;
    //     const activeKeys: string[] = [];

    //     for (const [key, value] of Object.entries(state.visibleRowsLookup)) {
    //         if (value === true) {
    //             activeCount++;
    //             activeKeys.push(key);
    //         }
    //     }

    //     console.log(activeKeys);
    // };

    return (
        <Box>
            <DataGrid
                rows={props.data}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                autoPageSize={true}
                sx={{
                    height: props.isCollapsed ? '30vh' : '70vh',
                    '.MuiDataGrid-scrollbar': { left: 0 },
                }}
                // onStateChange={(state) => onTableChange(state)}
            />
        </Box>
    );
};

export default Table;

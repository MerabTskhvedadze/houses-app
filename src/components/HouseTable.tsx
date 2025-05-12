import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Link from 'next/link';
import { House } from '@/app/types';

interface HouseTableProps {
  houses: House[];
}

const columns: GridColDef<House>[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'price', headerName: 'Price (€)', width: 120 },
  { field: 'type', headerName: 'Type', width: 120 },
  { field: 'area', headerName: 'Area', width: 120 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Link href={`/houses/${params.row.id}`} passHref>
        <Button variant='outlined' size='small'>
          View
        </Button>
      </Link>
    ),
  },
];

export default function HouseTable({ houses }: HouseTableProps) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={houses}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </div>
  );
}

import { DataGrid } from "@mui/x-data-grid";

type TableProps = {
  rows: Rows[];
  columns: Columns[];
  pageSize: number;
  rowsPerPage: number;
  pageChanger: (val: number) => void;
};

type Rows = {
  [key: string]: any;
};
type Columns = {
  field: string;
  headerName: string;
  width: number;
};

export default function Table({
  rows,
  columns,
  pageSize,
  rowsPerPage,
  pageChanger,
}: TableProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} hideFooter />
    </div>
  );
}

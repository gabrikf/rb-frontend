import { GrNext, GrPrevious } from "react-icons/gr";
import { Box, display } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { ClipLoader } from "react-spinners";
import { override } from "../utils/loadingCss";

type TableProps = {
  rows: Rows[];
  columns: Columns[];
  pageSize: number;
  rowsPerPage: number;
  pageChanger: any;
  currentPage: number;
  loader: boolean;
  totalPages: number;
  hasNext: boolean;
};

type Rows = {
  [key: string]: any;
};
type Columns = {
  field: string;
  headerName: string;
  width: any;
};

export default function Table({
  rows,
  columns,
  pageSize,
  rowsPerPage,
  hasNext,
  totalPages,
  loader,
  currentPage,
  pageChanger,
}: TableProps) {
  if (loader) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <ClipLoader
          color={"#BBDEFB"}
          loading={loader}
          css={override}
          size={150}
        />
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ height: 600, width: "100%", paddingTop: "20px" }}>
        <DataGrid rows={rows} columns={columns} hideFooter />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Box
          onClick={() =>
            pageChanger(currentPage !== 1 ? currentPage - 1 : currentPage)
          }
          sx={{
            transition: "0.2s",
            cursor: `${currentPage !== 1 ? "pointer" : "not-allowed"}`,
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <GrPrevious />
        </Box>
        <Box>
          {currentPage} de {totalPages}
        </Box>
        <Box
          onClick={() =>
            pageChanger(
              currentPage !== totalPages ? currentPage + 1 : currentPage
            )
          }
          sx={{
            transition: "0.2s",
            cursor: `${currentPage !== totalPages ? "pointer" : "not-allowed"}`,
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <GrNext />
        </Box>
      </Box>
    </>
  );
}

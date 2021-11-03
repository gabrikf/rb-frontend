import { Link } from "react-router-dom";
import Header from "../components/Header";
import Table from "../components/Table";
import { BiSearchAlt2, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";

export function FrontPage() {
  const [page, setPage] = useState(1);
  const [loding, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [count, setCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    axios
      .get(
        `http://localhost:6660/person?itensPerPage=${pageSize}&currentPage=${page}`
      )
      .then((response) => {
        setContent(response.data.data);
        const result = response.data.count / response.data.data.length;
        setCount(parseInt(String(result)));
        setHasNext(response.data.hasNext);
        setLoading(false);
      });
  }, [page, pageSize]);

  function handleDeleteRow(id: number) {
    axios.delete(`http://localhost:6660/person/${id}`);
    setContent(content.filter((item: any) => item.id !== id));
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "dataNascimento", headerName: "Data de Nascimento", width: 220 },
    { field: "idade", headerName: "Idade", width: 150 },
    { field: "cep", headerName: "CEP", width: 150 },
    { field: "cidade", headerName: "Cidade", width: 200 },
    { field: "uf", headerName: "Uf", width: 100 },
    {
      field: "edit",
      headerName: "Editar",
      width: 130,
      align: "right",
      headerAlign: "right",
      renderCell: (cellValues: any) => {
        return (
          <Link to={`edit/${cellValues.row.id}`}>
            <BiSearchAlt2 color={"black"} />
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Deletar",
      width: 140,
      headerAlign: "right",
      align: "right",
      renderCell: (cellValues: any) => {
        return (
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteRow(cellValues.row.id)}
          >
            <BiTrash color={"black"} />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <Table
        loader={loding}
        rows={content}
        columns={columns}
        pageSize={pageSize}
        rowsPerPage={5}
        pageChanger={setPage}
        totalPages={count}
        currentPage={page}
        hasNext={hasNext}
      />
    </>
  );
}

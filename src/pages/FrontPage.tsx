import { Link } from "react-router-dom";
import Header from "../components/Header";
import Table from "../components/Table";
import { BiSearchAlt2, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";

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
        console.log(page);
        console.log(response.data);
        setContent(response.data.data);
        const result = response.data.count / response.data.data.length;
        setCount(parseInt(String(result)));
        console.log(response.data.data.length);
        setHasNext(response.data.hasNext);
        setLoading(false);
      });
  }, [page, pageSize]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nome", headerName: "First name", width: 200 },
    { field: "dataNascimento", headerName: "Last name", width: 200 },
    { field: "cep", headerName: "ID", width: 200 },
    { field: "cidade", headerName: "First name", width: 200 },
    { field: "uf", headerName: "Last name", width: 200 },
    {
      field: "edit",
      headerName: "Editar",
      width: 150,
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
      width: 150,
      headerAlign: "right",
      align: "right",
      renderCell: (cellValues: any) => {
        return (
          <Link to={`edit/${cellValues.row.id}`}>
            <BiTrash color={"black"} />
          </Link>
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

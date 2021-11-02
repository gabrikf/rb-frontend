import { Link } from "react-router-dom";
import Header from "../components/Header";
import Table from "../components/Table";
import { BiSearchAlt2, BiTrash } from "react-icons/bi";
import { useState } from "react";

export function FrontPage() {
  const [page, setPage] = useState(1);
  const [loding, setLoading] = useState(false);
  function changePage(val: number) {
    setPage(val);
    console.log(val);
  }
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

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      action: "opa",
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
    { id: 6, lastName: "Melisandre", firstName: "Querida", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <>
      <Header />
      <Table
        loader={loding}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPage={5}
        pageChanger={changePage}
      />
    </>
  );
}

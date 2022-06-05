import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FirebaseStudentService from "../../../services/FirebaseStudentService";

const StudentTableRow = (props) => {
  const { _id, name, course, ira } = props.student;

  function deleteStudent() {
    if (!props.userLogged) {
      window.alert("Você deve estar logado para excluir o elemento.");
      return;
    }
    if (window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
      //axios.delete(`http://localhost:3001/students/${_id}`)
      /*axios.delete(`http://localhost:3002/crud/students/delete/${_id}`)
                .then(response => props.deleteStudentById(_id))
                .catch(error => console.log(error))*/
      FirebaseStudentService.delete(props.firestoreDb, () => {}, _id);
    }
  }

  return (
    <tr>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{course}</td>
      <td>{ira}</td>
      <td style={{ textAlign: "center" }}>
        <Link to={`/editStudent/${_id}`} className="btn btn-primary">
          Editar
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>
        <button className="btn btn-danger" onClick={() => deleteStudent()}>
          Apagar
        </button>
      </td>
    </tr>
  );
};

export default StudentTableRow;

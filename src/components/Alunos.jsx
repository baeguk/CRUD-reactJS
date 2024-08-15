import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import ModalEdit from './ModalEdit';
import ModalPost from './ModalPost';

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [isModalPostOpen, setModalPostOpen] = useState(false);

  function openModal(aluno) {
    setSelectedAluno(aluno)
    setModalEditOpen(true);
  }

  function openModalPost() {
    setModalPostOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/alunos')
        const data = await response.json()
        setAlunos(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  },[])

  const handleAdd = (newAluno) => {
    setAlunos((prevAluno) => [...prevAluno, newAluno])
  }

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            setAlunos((prevAlunos) => prevAlunos.filter(aluno => aluno.id !== id));
        } else {
            console.error('Erro ao deletar aluno');
        }
    } catch (error) {
        console.error(error);
    }
  };


  const handleEdit = async (updatedAluno) => {
    try {
      const response = await fetch(`http://localhost:3000/alunos/${updatedAluno.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedAluno)
      });
      
      const updatedData = await response.json();

      console.log("Dados atualizados:", updatedData);

      setAlunos((prevAlunos) => 
        prevAlunos.map((aluno) => 
          aluno.id === updatedData.id ? updatedData : aluno
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className='titulo'>
        <span>Alunos</span>
        <button className='novoButton' onClick={() => openModalPost()}>+ Novo</button>
      </div>
      <div className='tableDiv'>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Curso</th>
              <th>Telefone</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {alunos.map(aluno => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.idade}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.telefone}</td>
                <td>
                  <span className='action' onClick={() => openModal(aluno)}>
                    <FaEdit />
                  </span>
                  <span className='action' onClick={() => handleDelete(aluno.id)}>
                    <FaTrashAlt />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalEdit 
        isOpen={isModalEditOpen}
        onRequestClose={() => setModalEditOpen(false)}
        aluno={selectedAluno}
        onEdit={handleEdit}
      />
      <ModalPost 
        isOpen={isModalPostOpen}
        onRequestClose={() => setModalPostOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  )
}

export default Alunos;

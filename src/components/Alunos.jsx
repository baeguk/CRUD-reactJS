import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);

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
  }, [])

  const deleteData = async (id) => {
    try {
      await fetch(`http://localhost:3000/alunos/${id}`,{
        method: 'DELETE',
        })
      
      setAlunos((prevAlunos) => prevAlunos.filter(aluno => aluno.id !== id));
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = (id) => {
    deleteData(id)
  }

  return (
    <div>
      <div className='titulo'>
        <span>Alunos</span>
        <button className='novoButton'>+ Novo</button>
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
                  <span className='action'>
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
    </div>
  )
}

export default Alunos
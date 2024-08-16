import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const ModalPost = ({ isOpen, onRequestClose, onAdd }) => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [curso, setCurso] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      const newAluno = { nome, idade, curso, telefone }

      try {
        const response = await fetch('http://localhost:3000/alunos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAluno),
        })

        if (response.ok) {
          const addedAluno = await response.json()
          onAdd(addedAluno)
          onRequestClose()
        }else {
          console.error('Erro ao adicionar aluno')
        }
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal Edit"
        className="myContentClass"
        id="edit"
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            display: "flex",
            flexDirection: "column",
            border: "none",
            padding: "20px",
            outline: "none",
            backgroundColor: "#fff",
            borderRadius: "4px",
            width: "400px",
            height: "auto",
          },
        }}
      >
        <button onClick={onRequestClose} className='xButton' style={{ alignSelf: 'flex-end', marginBottom: '10px' }}>x</button>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div className='input'>
              <span>Nome:</span>
              <input
                type="text"
                id="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className='input'>
              <span>Idade:</span>
              <input
                type="number"
                id="age"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              />
            </div>
            <div className='input'>
              <span>Curso:</span>
              <input
                type="text"
                id="course"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
              />
            </div>
            <div className='input'>
              <span>Telefone:</span>
              <input
                type="text"
                id="telephone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
          </div>
          <button className='sendButton' type="submit" style={{ marginTop: '20px' }}>Adicionar</button>
        </form>
      </Modal>
    );
};

export default ModalPost;

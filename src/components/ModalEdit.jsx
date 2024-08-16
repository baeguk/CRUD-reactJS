import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const ModalEdit = ({ isOpen, onRequestClose, aluno, onEdit }) => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [curso, setCurso] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        if (aluno) {
            setNome(aluno.nome || '');
            setIdade(aluno.idade || '');
            setCurso(aluno.curso || '');
            setTelefone(aluno.telefone || '');
        }
    }, [aluno]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedAluno = {
            ...aluno,
            nome,
            idade,
            curso,
            telefone,
        };

        await onEdit(updatedAluno);

        onRequestClose();
    };
  
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
          <button className='sendButton' type="submit" style={{ marginTop: '20px' }}>Salvar alterações</button>
        </form>
      </Modal>
    );
};

export default ModalEdit;

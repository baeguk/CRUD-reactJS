const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

let alunos = [
    {id: 1, nome: 'Alice Silva', idade: 20, telefone: '(21) 999313323', curso: 'Sistemas de Informação'},
    {id: 2, nome: 'Bruno Martins', idade: 22, telefone: '(21) 999561323', curso: 'Engenharia de Produção'},
    {id: 3, nome: 'Carla Vianna', idade: 19, telefone: '(21) 999318723', curso: 'Engenharia Civil'}
];

app.get('/alunos', (req, res) => {
    res.json(alunos);
});

app.get('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado')
    }
})

app.post('/alunos', (req, res) => {
    const novoAluno = {
        id: alunos.length + 1,
        nome: req.body.nome,
        idade: req.body.idade,
        curso: req.body.curso,
        telefone: req.body.telefone
    };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno)
})

app.put('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id))
    if (aluno) {
        aluno.nome = req.body.nome;
        aluno.idade = req.body.idade;
        aluno.curso = req.body.curso;
        aluno.telefone = req.body.telefone;
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado')
    }
});

app.delete('/alunos/:id', (req, res) => {
    const alunoId = parseInt(req.params.id);
    const alunoIndex = alunos.findIndex(a => a.id === alunoId);

    if (alunoIndex !== -1) {
        alunos.splice(alunoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})


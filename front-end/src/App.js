import React from "react";
import api from './services/api'
import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    // async function getAll() {
    //   await api.get('repositories').then(res => {
    //     setRepositories(res.data)
    //   })

    // }
    // getAll()


  }, [])

  async function handleAddRepository() {
    const addProject = await api.post("/repositories", {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })


    let project = addProject.data

    setRepositories([...repositories, project])
    console.log(repositories)

  }

  async function upDateData() {
    api.get('repositories').then(res => {

      setRepositories(res.data)
    }
    )
  }

  async function handleRemoveRepository(e) {

    await api.delete(`/repositories/${e.id}`)

    upDateData()


  }
  async function handleRemoveAll() {
    // api.delete('deleteAll')<-------- habilitar para que todos os itens sejam excluidos no botao de excluir todos
    setRepositories([])
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(e => (
          <li key={e.id} >{e.title}


            <button onClick={() => handleRemoveRepository(e)}>
              Remover
           </button>


          </li>
        ))}

      </ul>

      <button onClick={handleRemoveAll}>Remover</button>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

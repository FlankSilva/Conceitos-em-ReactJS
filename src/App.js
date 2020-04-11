import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRetository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRetository(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'resat/react',
      url: 'https://github.com/facebook/react',
      techs: ['ReactJS', 'React Native'],
    })

    const repository = response.data

    setRetository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repository = await repositories.filter(r => r.id !== id)

    setRetository(repository, ...repositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

//BD
const repositories = [];


//Get all but if its has a query its will filter
app.get("/repositories", (request, response) => {
  const { title } = request.query

  if (title) {
    const results = title
      ? repositories.filter(e => e.title.includes(title)) : repositories

    return response.json(results)
  }

  return response.json(repositories)
});


//Create a new repositories
app.post("/repositories", (request, response) => {

  const { title, techs, url, id } = request.body;

  const createToDo = {
    id,
    title,
    techs,
    url,
    likes: 0

  }

  repositories.push(createToDo)

  return response.json(createToDo)

});


//update repositories by id
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;




  const findIndex = repositories.findIndex(e => e.id === id)

  if (findIndex < 0) {
    return response.status(400).json({ error: "repositorie doesnt exists" })
  }

  const updateToDo = {
    id,
    title,
    techs,
    url,
    likes: repositories[findIndex].likes

  }

  if (findIndex < 0) {
    return response.status(400).json({ error: 'Not found' })
  }

  repositories[findIndex] = updateToDo

  return response.json(
    // alterado: true,
    updateToDo
  )
});

app.delete('/deleteAll', (req, res) => {
  repositories.splice(0)
})

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex(e => e.id === id)

  if (findIndex < 0) {
    return response.status(400).json({ error: 'Not found' })
  }

  repositories.splice(findIndex, 1)
  return response.status(204).send()


});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const findIndex = repositories.findIndex(e => e.id === id)

  if (id && findIndex >= 0) {
    console.log(findIndex)
    const addLike = {
      id,
      title: repositories[findIndex].title,
      techs: repositories[findIndex].techs,
      url: repositories[findIndex].url,
      likes: repositories[findIndex].likes + 1
    }

    repositories[findIndex] = addLike
  } else if (findIndex < 0) {
    return response.status(400).json({ error: "id doesn't exist" })
  }


  return response.json(repositories[findIndex])


});

module.exports = app;

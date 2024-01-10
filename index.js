const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');

app.use(bodyParser.json());


let pokemons = [
  { id: 1, name: 'Bulbasaur', type: 'Grass' },
  // Add more Pokémon here
];

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/pokemons', (req, res) => {
  res.json(pokemons);
});

app.get('/pokemons/:id', (req, res) => {
  const pokemon = pokemons.find(p => p.id === parseInt(req.params.id));
  if (!pokemon) return res.status(404).send('The Pokémon with the given ID was not found.');
  res.json(pokemon);
});

app.put('/pokemons/:id', (req, res) => {
  const pokemon = pokemons.find(p => p.id === parseInt(req.params.id));
  if (!pokemon) return res.status(404).send('The Pokémon with the given ID was not found.');

  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  res.json(pokemon);
});


app.post('/pokemons', (req, res) => {
  const newPokemon = {
    id: pokemons.length + 1,
    name: req.body.name,
    type: req.body.type
  };
  pokemons.push(newPokemon);
  res.json(newPokemon);
});

app.delete('/pokemons/:id', (req, res) => {
  const pokemon = pokemons.find(p => p.id === parseInt(req.params.id));
  if (!pokemon) return res.status(404).send('The Pokémon with the given ID was not found.');

  const index = pokemons.indexOf(pokemon);
  pokemons.splice(index, 1);

  res.json(pokemon);
});


app.post('/add-pokemon', async (req, res) => {
  try {
    // Replace 'your-api-url' with the URL of your hosted API
    const response = await axios.post('https://robinscloudapi.azurewebsites.net/pokemons', {
      name: req.body.name,
      type: req.body.type
    });

    res.json({ message: 'Pokémon added successfully', data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding Pokémon');
  }
});


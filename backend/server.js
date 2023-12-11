const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const albumModel = require('./models/album');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

// Definir o modelo do álbum
const Album = require('./models/album')(sequelize);

// Sincronizar o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Database synced');
});

// Rotas
const routes = require('./routes');
const albumRoutes = routes(Album); // chama a função com o modelo Album
app.use('/api', albumRoutes);
//app.use('/api', routes(Album));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

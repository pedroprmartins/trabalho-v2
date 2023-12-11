const express = require('express');
const router = express.Router();
//const { Album } = require('./models/album');

module.exports = function (Album) {

  // Rota para criar um novo álbum
  router.post('/albums', async (req, res) => {
    const newAlbum = req.body;
    try {
      const createdAlbum = await Album.create(newAlbum);
      console.log('Album created:', createdAlbum);
      res.json(createdAlbum);
    } catch (error) {
      console.error('Error creating album:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Rota para atualizar um álbum existente
  router.put('/albums/:id', async (req, res) => {
    const albumId = req.params.id;
    const updatedAlbumData = req.body;

    try {
      const [updatedRows] = await Album.update(updatedAlbumData, {
        where: { id: albumId }
      });

      if (updatedRows > 0) {
        const updatedAlbum = await Album.findByPk(albumId);
        console.log('Album updated:', updatedAlbum);
        res.json(updatedAlbum);
      } else {
        res.status(404).json({ error: 'Album not found' });
      }
    } catch (error) {
      console.error('Error updating album:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Rota para excluir um álbum
  router.delete('/albums/:id', async (req, res) => {
    const albumId = req.params.id;

    try {
      const deletedAlbumRows = await Album.destroy({
        where: { id: albumId }
      });

      if (deletedAlbumRows > 0) {
        console.log('Album deleted:', albumId);
        res.json({ message: 'Album deleted successfully' });
      } else {
        res.status(404).json({ error: 'Album not found' });
      }
    } catch (error) {
      console.error('Error deleting album:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Rota para obter todos os álbuns
  router.get('/albums', async (req, res) => {
    try {
      const albums = await Album.findAll();
      res.json(albums);
    } catch (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};

//module.exports = router;

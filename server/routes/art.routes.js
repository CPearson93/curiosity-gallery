const ArtController = require('../controllers/art.controller');
module.exports = (app) => {
    app.get('/api/art', ArtController.findAllArt);
    app.post('/api/art', ArtController.createArt);
    app.get("/api/art/:id", ArtController.getOnePiece);
    app.patch("/api/art/:id", ArtController.editArt);
    app.delete("/api/art/:id", ArtController.destroyArt);
}

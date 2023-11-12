const Art = require('../models/art.model');

module.exports = {
    findAllArt: (request, response) => {
        Art.find({})
            .then((allArt) => { response.json({ allArt })})
            .catch((err) => { response.json({ message: 'Something went wrong', error: err })});
        },

    getOnePiece: (request, response) => {
        Art.findOne({_id:request.params.id})
            .then(Art => response.json(Art))
            .catch(err => response.status(400).json(err))
        },

    createArt: (request, response) => {
        Art.create(request.body)
            .then(Art => response.json(Art))
            .catch(err => response.status(400).json(err))
        },

    editArt: (request, response) => {
        Art.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
                .then(editArt => response.json(editArt))
                .catch(err => response.status(400).json(err))
        },

        destroyArt: (request, response) => {
            Art.deleteOne({ _id: request.params.id }) 
                .then(deleteConfirmation => response.json(deleteConfirmation))
                .catch(err => response.status(400).json(err))
        }
}



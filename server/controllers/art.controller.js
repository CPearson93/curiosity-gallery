const Art = require('../models/art.model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        // You can customize the filename if needed
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
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
            upload.array('images')(request, response, function (err) {
                if (err) {
                    return response.status(400).json({ message: 'Error uploading files', error: err });
                }


    
                // Create the Art document with form data and file information
                const art = new Art({
                    title: request.body.title,
                    artist: request.body.artist,
                    height: request.body.height,
                    width: request.body.width,
                    description: request.body.description,
                    type: request.body.type,
                    // Add file information to the Art document
                    imageUrls: request.files.map(file => file.path),
                });
    
                // Save the Art document to the database
                art.save()
                    .then((art) => response.json(art))
                    .catch((err) => response.status(400).json(err));
            });
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
        },
        searchArt: (req, res) => {
            const { title, artist } = req.query;
            const filter = {};
    
            if (title && artist) {
                // Search by both title and artist
                filter.$or = [{ title: { $regex: title, $options: 'i' } }, { artist: { $regex: artist, $options: 'i' } }];
            } else if (title) {
                filter.title = { $regex: title };
            } else if (artist) {
                filter.artist = { $regex: artist };
            }

            console.log(filter)
    
            Art.find(filter)
                .then(allArt => res.json({allArt}))
                .catch(err => res.status(400).json(err));
        },
}



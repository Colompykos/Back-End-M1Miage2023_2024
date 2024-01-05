let Matiere = require('../model/matiere');


// Récupérer toutes les matières (GET)
function getMatieres(req, res){
    Matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

// Récupérer une matière par son id (GET)
function getMatiere(req, res){
    let matiereId = req.params.id;

    Matiere.findOne({id: matiereId}, (err, matiere) =>{
        if(err){res.send(err)}
        res.json(matiere);
    })
}

// Ajout d'une matière (POST)
function postMatiere(req, res){
    let matiere = new Matiere();
    matiere.id = req.body.id;
    matiere.nom = req.body.nom;
    matiere.professeur = req.body.professeur;
    matiere.image = req.body.image;

    console.log("POST matiere reçu :");
    console.log(matiere)

    matiere.save( (err) => {
        if(err){
            res.send('cant post matiere ', err);
        }
        res.json({ message: `${matiere.nom} saved!`})
    })
}

// Update d'une matière (PUT)
function updateMatiere(req, res) {
    console.log("UPDATE recu matiere : ");
    console.log(req.body);
    Matiere.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, matiere) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

        // console.log('updated ', matiere)
    });
}

// suppression d'une matière (DELETE)
function deleteMatiere(req, res) {
    Matiere.findByIdAndRemove(req.params.id, (err, matiere) => {
        if (err) {
            res.send(err);
        }
        res.json({message: matiere.nom + ' deleted'});
    })
}


module.exports = { getMatieres, postMatiere, getMatiere, updateMatiere, deleteMatiere };


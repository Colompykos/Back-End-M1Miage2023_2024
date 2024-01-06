let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

/*
let assignments = [];
    let auteurs = ["Marwen", "Mohamed", "Lucas", "Nawel", "Melina","Marcel"];
    let matieres = ["javascript", "Base de données", "Sport", "Planification", "Communication", "Math BigData", "Management SI", "Gestion Projet" ];

    for(let i = 1; i <= 11; i++) {
        let assignment = new Assignment();
        assignment.id = i;
        assignment.nom = `Assignment ${i}`;
        assignment.auteur = auteurs[Math.floor(Math.random() * auteurs.length)]; // Auteur aléatoire
        assignment.matiere = matieres[Math.floor(Math.random() * matieres.length)]; // Matière aléatoire
        assignment.dateDeRendu = new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)); // Date de rendu aléatoire en 2022
        assignment.note = Math.floor(Math.random() * 20) + 1; // Note aléatoire entre 1 et 20
        assignment.remarques = `Remarques pour l'assignment ${i}`;
        assignments.push(assignment);

    }

    Assignment.insertMany(assignments, (err) => {
        if (err) throw err;
        console.log('Matière créée avec succès');
    });
*/

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.auteur = req.body.auteur;
    assignment.matiere = req.body.matiere;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.note = req.body.note;
    assignment.remarques = req.body.remarques;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };

let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    Assignment.find((err, assignments) => {
        if (err) {
            res.send(err)
        }

        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
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

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!` })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }
        // console.log('updated ', assignment)
    });

}
// Récupérer l'id du dernier assignment (GET)
async function getLastAssignmentId(req, res) {
    try {
        const lastAssignment = await Assignment.findOne().sort('-id').exec();
        const lastId = lastAssignment ? lastAssignment.id : 0;
        res.json(lastId);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${assignment.nom} deleted` });
    })

}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getLastAssignmentId };

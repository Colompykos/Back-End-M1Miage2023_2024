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


let assignments = [];
let auteurs = ["Marwen", "Mohamed", "Lucas", "Nawel", "Melina", "Marcel", "Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack",
    "Katherine", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rachel", "Samuel", "Taylor",
    "Ursula", "Victor", "Wendy", "Xander", "Yasmine", "Zachary",
    "Amelia", "Benjamin", "Chloe", "Daniel", "Ella", "Finn", "Georgia", "Harrison", "Isabella", "Jacob",
    "Kylie", "Lucas", "Mila", "Nathan", "Oscar", "Penelope", "Quentin", "Rose", "Sebastian", "Sophia",
    "Theodore", "Uma", "Vincent", "Willow", "Xavier", "Yara", "Zoe",
    "Ava", "Brayden", "Cora", "Dylan", "Evelyn", "Felix", "Gabriella", "Hudson", "Isabelle", "James",
    "Kira", "Leo", "Madison", "Nora", "Owen", "Piper", "Quincy", "Riley", "Scarlett", "Thomas",
    "Ulysses", "Violet", "Wyatt", "Ximena", "Yannick", "Zara",
    "Abigail", "Bryce", "Camila", "Dexter", "Eva", "Finnley", "Giselle", "Hector", "Isla", "Jaxon",
    "Kendall", "Luna", "Mason", "Natalie", "Oliver", "Paige", "Quinton", "Reagan", "Sawyer", "Trinity",
    "Uriel", "Valentina", "Wesley", "Xyla", "Yvonne", "Zion",];
let matieres = ["javascript", "Base de données", "Sport", "Planification", "Communication", "Math BigData", "Management SI", "Gestion Projet"];
let noms = [
    "Rapports de laboratoire",
    "Essais ou dissertations",
    "Présentations orales",
    "Travaux de recherche",
    "Analyses de cas",
    "Exercices pratiques",
    "Projets de groupe",
    "Tests et examens",
    "Lecture critique",
    "Travaux créatifs",
    "Études de cas",
    "Résumés",
    "Synthèses",
    "Analyse statistique",
    "Simulations",
    "Débats académiques",
    "Études de marché",
    "Conception expérimentale",
    "Cartes conceptuelles",
    "Revues de littérature",
    "Présentations de posters",
    "Travaux de terrain",
    "Analyse SWOT",
    "Plans d'affaires",
    "Recherches sur le terrain",
    "Modélisation mathématique",
    "Enquêtes et questionnaires",
    "Analyse économique",
    "Évaluations de performances",
    "Conception de prototypes",
    "Projets de développement",
    "Analyse de données",
    "Création de logiciels",
    "Calculs complexes",
    "Création de sites web",
    "Tests d'hypothèses",
    "Analyses financières",
    "Conceptions graphiques",
    "Études d'impact environnemental",
    "Évaluations de politiques publiques",
    "Élaboration de programmes éducatifs",
    "Rédaction de manuels",
    "Exercices de programmation",
    "Conceptions d'expériences",
    "Analyse de réseaux sociaux",
    "Études de faisabilité",
    "Examen de cas juridiques",
    "Analyse de tendances",
    "Calculs d'ingénierie",
    "Études de faisabilité technologique",
    "Création de bases de données",
    "Développement de modèles",
    "Calculs de probabilité",
    "Conceptions de circuits électriques",
    "Recherches en sciences humaines",
    "Planification de projets",
    "Création de prototypes physiques",
    "Études de géopolitique",
    "Élaboration de politiques de santé",
    "Analyses de données biologiques",
    "Calculs de structures",
    "Évaluations financières",
    "Rédaction de propositions de recherche",
    "Création de rapports d'analyse",
    "Planification urbaine",
    "Conception de produits",
    "Études d'architecture",
    "Conception de réseaux informatiques",
    "Élaboration de politiques environnementales",
    "Conception de systèmes mécaniques",
    "Calculs thermodynamiques",
    "Analyse de performances sportives",
    "Modélisation économique",
    "Conception de jeux vidéo",
    "Calculs de résistance des matériaux",
    "Conception de systèmes électriques",
    "Élaboration de politiques éducatives",
    "Études de psychologie expérimentale",
    "Recherches en linguistique",
    "Conception d'algorithmes",
    "Études de philosophie morale",
    "Analyse de données marketing",
    "Calculs de géométrie différentielle",
    "Élaboration de politiques culturelles",
    "Études de géologie structurale",
    "Conception de systèmes de télécommunications",
    "Analyses de politique internationale",
    "Recherches en anthropologie",
    "Conception de dispositifs médicaux",
    "Études de musicologie",
    "Développement de logiciels éducatifs",
    "Calculs de mécanique des fluides",
    "Études de linguistique computationnelle",
    "Élaboration de politiques énergétiques",
    "Conception de modèles biomédicaux"
];

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

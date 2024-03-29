let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const cors = require ('cors')
const cookieParser = require ('cookie-parser')
let assignment = require('./routes/assignments');
let matiere = require('./routes/matieres');
const routes = require('./routes/routes')

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

 app.use(cors({
   credentials:true,
   origin:['http://localhost:4200',"https://app-miage-assignments.netlify.app"]
 }))


app.use(cookieParser())
app.use(express.json())

app.use('/api', routes);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://Marouane:azerty12345@cluster0.tkshmvj.mongodb.net/assignments?retryWrites=true&w=majority';
//uri = "http://localhost:8010/api/assignments";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
  useCreateIndex: true,
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/users que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

//  Pour accepter les connexions cross-domain (CORS)
 app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   next();
 });

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment)
  
app.route(prefix + '/assignments/lastid')
  .get(assignment.getLastAssignmentId);  

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app.route(prefix + '/assignments/maxid')
  .get(async (req, res) => {
    try {
      const maxId = await Assignment.findOne().sort('-id').exec();
      res.json(maxId ? maxId.id : 0);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

app.route(prefix + '/matieres')
  .get(matiere.getMatieres)
  .post(matiere.postMatiere);

app.route(prefix + '/matieres/:id')
  .get(matiere.getMatiere)
  .delete(matiere.deleteMatiere);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;
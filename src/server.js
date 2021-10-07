const express = require('express');
//const path = require('path');
const cors = require('cors');

const routes = require('./routes');
const multer = require('multer');
const multerConfig = require('./config/multer');
//const upload = require('./function/uploadsPhoto/index');

require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);*/

app.use(routes);

app.listen(3000, () => {
    console.log('server start');
})

app.get("/listKids", (req, res) => {
    
    const Kids = require('./models/Kid');

    const kids = Kids.findAll()

    return res.json(kids);
})

app.post('/createdKid', multer(multerConfig).single("file"), (req, res) => {
    
    const { file } = req.file.originalname;
    const { treatment, code, name, rate, birth, parent, note } = req.body;
    
    const Kid = require('./models/Kid');

    const kid = Kid.create(
        { file, treatment, code, name, rate, birth, parent, note },
        (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).json({
                  err: true,
                  message: "erro"
               }) 
            } else {
                if (req.body + req.file) {
                    return res.json({
                        err: false,
                        message: "cadastrado com sucesso."
                    });
                }

                res.send("Valores inseridos");
                

                return console.log(req.file);
            }
        }
    );
    
    return res.json(kid);
    
})

app.put('/updatedKid/:id', (req, res) => {
    const Kid = require('./models/Kid');

    const { id } = req.params;
    const { treatment, code, name, rate, birth, parent, note } = req.body;

    console.log('controller update criança', req.params, req.body);

    const kid = Kid.update(

        { treatment, code, name, rate, birth, parent, note },

        {where: {
            id: id
        }}
        
    );

    return res.json(kid);
})

app.delete('/deletedKid/:id', (req, res) => {
    const Kid = require('./models/Kid');

    const { id } = req.params;
    console.log('controller delete criança', req.params);

    const kid = Kid.destroy({
        where: {
            id: id
        }
    });

    return res.json(kid);
})

app.get("/listActivities", (req, res) => {
    const Activities = require('./models/Activity');

    const activities = Activities.findAll()

    return res.json(activities);
})

app.post('/createActivity', (req, res) => {
    const { name, type, emotion } = req.body;

    const Activity = require('./models/Activity');

    const activity = Activity.create(
        { name, type, emotion },
        (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Valores inseridos");
            }
        }
    );

    return res.json(activity);
})

app.put('/updatedActivity/:id', (req, res) => {
    const Activity = require('./models/Activity');

    const { id } = req.params;
    const { name, type, emotion } = req.body;

    console.log('controller update criança', req.params, req.body);

    const activity = Activity.update(

        { name, type, emotion },

        {where: {
            id: id
        }}
        
    );

    return res.json(activity);
})

app.delete('/deletedActivity/:id', (req, res) => {
    const Activity = require('./models/Activity');

    const { id } = req.params;
    console.log('controller delete atividade', req.params);

    const activity = Activity.destroy({
        where: {
            id: id
        }
    });

    return res.json(activity);
})
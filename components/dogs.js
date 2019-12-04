const express = require('express');
const db = require('../db');
const router = express.Router();

//  Return all dog information
router.get('/', (req, res) => {
    db.query('SELECT * FROM patientinformation').then(results => {
        res.json({ dogs: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//  Return information of a single dog
router.get('/:patientId', (req, res) => {
    db.query('SELECT * FROM patientinformation where id = ?', [req.params.patientId])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

/* Create a new dog
    Expects the following data format
    {
        name: string,
        image: string - whole url to image
    }
*/
router.post('/', (req, res) => {

    db.query('INSERT INTO patientinformation (StateInfo, state, stateDescription, time, temp) VALUES (?,?,?,?,?)', [req.body.StateInfo, req.body.state, , req.body.stateDescription, , req.body.time, , req.body.temp)]
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(() => {
        res.sendStatus(500);
    });

});

router.delete('/:dogId', (req, res) => {
    db.query('DELETE FROM patientinformation where id = ?', [req.params.patientId])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;

var express = require('express');
var router = express.Router();

router.post('/ungesichert-post', (req, res) => {
    res.send("Das hast du gepostet: " + req.body.body);
});

router.get('/ungesichert-get/:id', (req, res) => {
    res.send("Die übertragene ID lautet: " + req.params.id);
});

module.exports = router;
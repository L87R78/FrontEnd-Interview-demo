const router = require('express').Router();
let feedBack = require('../models/feedback');

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedBack = new feedBack({ email, feedback });
    newFeedBack.save()
        .then(() => res.json('feedback added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router;
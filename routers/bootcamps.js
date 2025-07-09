const express = require('express');
const { getBootCamps, getBootCamp, createBootCamp, 
        updateBootCamp , deleteBootCamp} = require('..//controllers/bootcamps');

const router = express.Router();

router.route('/').get(getBootCamps)
                 .post(createBootCamp);

router.route('/:id').get(getBootCamp)
                    .delete(deleteBootCamp)
                    .put(updateBootCamp);

module.exports = router;

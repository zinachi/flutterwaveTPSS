const express = require('express');
const router = express.Router();

const {
    getAllFees,
    postFees,
    postFeeComputation,
    deleteFees,
} = require('../controllers/feesController');

router.route('/fees').post(postFees).get(getAllFees);
router.delete('/fees/:id', deleteFees);
router.post('/split-payments/compute', postFeeComputation);

module.exports = router;
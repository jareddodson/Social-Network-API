const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThoughtById,
} = require('../../controllers/thoughts-controller');

router.route('/:userId').post(addThought);

router
    .route('/')
    .get(getAllThoughts)
    .get(getThoughtById)
    .post(addThought)
    .put(updateThought)
    .delete(deleteThoughtById)

module.exports = router;    
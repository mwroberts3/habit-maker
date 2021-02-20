const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habits-controller');
const tokenCheck = require('../middleware/token-check');

router.get('/', tokenCheck, habitController.loadHabits);

router.post('/add-habit', tokenCheck, habitController.addNewHabit);

module.exports = router;


const Habit = require('../model/habit-model');
const Mongoose = require('mongoose');

exports.loadHabits = (req, res, next) => {
    Habit.find({ creator: req.userId}, (err, habits) => {
        if (err) console.log(err);

        // push retreived data into new array to hide userId
        let editedHabits = [];
        Array.from(habits).forEach((habit) => {
            let habitToAdd = {};
            habitToAdd.active = habit.active;
            habitToAdd.description = habit.description;
            habitToAdd.createdAt = habit.createdAt;
            habitToAdd.goal = habit.goal;
            habitToAdd.skipDays = habit.skipDays;
            habitToAdd.streak = habit.streak;
            editedHabits.push(habitToAdd);
        });

        res.json(editedHabits);
    });
};

exports.addNewHabit = (req, res, next) => {
    const habit = new Habit({
        description: req.body.description,
        active: req.body.updateStyle == 'active' ? true : false,
        goal: req.body.daysGoal,
        streak: 0,
        skipDays: {
            option: req.body.skipPerDays > 0 ? true : false,
            streakUnlock: req.body.skipPerDays,
            count: 0
        },
        creator: Mongoose.Types.ObjectId(req.userId)
    });
    
    habit.save()
        .then(() => {
            res.status(201).json({message: 'new habit added'});
        })
        .catch(err => console.log(err));
    
};
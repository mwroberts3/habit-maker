const Habit = require('../model/habit-model');
const Mongoose = require('mongoose');

exports.loadHabits = async (req, res, next) => {
    let currentDate = req.get('Timestamp');
    let editedHabits = [];

    let habits = await Habit.find({ creator: req.userId});

    habits = Array.from(habits);

    for(let i = 0; i < habits.length; i++) {
        console.log(new Date(currentDate).getTime(), new Date(habits[i].lastUpdated).getTime());

        console.log(new Date(currentDate), new Date(habits[i].lastUpdated))
        
        let diffTime = Math.abs(new Date(currentDate) - new Date(habits[i].lastUpdated))
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log(diffDays);

        if (new Date(currentDate).getTime() > new Date(habits[i].lastUpdated).getTime()) {
            // if it's a passive hobby update days passed and streak automatically
            // ...need a way to count the number of days that have passed since the last update though
            // console.log(habits[i]);
            if (!habits[i].active) {
                if (habits[i].updatedToday) {
                    habits[i] = await Habit.findOneAndUpdate({ creator: req.userId, description: habits[i].description }, { lastUpdated: new Date(currentDate), $inc : {daysLogged: diffDays - 1, daysLeft: -diffDays}}, {
                        new: true
                    })
                } else {
                    habits[i] = await Habit.findOneAndUpdate({ creator: req.userId, description: habits[i].description }, { lastUpdated: new Date(currentDate), $inc : { daysLogged: diffDays,daysLeft: -diffDays}}, {
                        new: true
                    })
                }
            }

            if (habits[i].active) {
                habits[i] = await Habit.findOneAndUpdate({ creator: req.userId, description: habits[i].description }, { lastUpdated: new Date(currentDate), $inc : { daysLeft: -diffDays }}, {
                    new: true
                })
            }
            
            habits[i] = await Habit.findOneAndUpdate({ creator: req.userId, description: habits[i].description }, { updatedToday: false }, {
                new: true
            })

    
            // if it's a passive hobby update days passed and streak automatically
            // ...need a way to count the number of days that have passed since the last update though
        }
    }


    habits = await Habit.find({ creator: req.userId});

    // console.log(habits);

    // push retreived data into new array to hide userId
    Array.from(habits).forEach((habit) => {
        let habitToAdd = {};
        habitToAdd.active = habit.active;
        habitToAdd.description = habit.description;
        habitToAdd.goal = habit.goal;
        habitToAdd.daysLogged = habit.daysLogged;
        habitToAdd.daysLeft = habit.daysLeft;
        habitToAdd.skipDays = habit.skipDays;
        habitToAdd.streak = habit.streak;
        habitToAdd.lastUpdated = habit.lastUpdated;
        habitToAdd.createdAt = habit.createdAt;

        habitToAdd.updatedToday = habit.updatedToday;

        editedHabits.push(habitToAdd);
    });
    
    res.json(editedHabits);
};

exports.addNewHabit = (req, res, next) => {
    console.log(req.body.createdAtDate);

    const habit = new Habit({
        description: req.body.description,
        active: req.body.updateStyle == 'active' ? true : false,
        goal: req.body.daysGoal,
        daysLogged: 0,
        daysLeft: req.body.daysLeft,
        lastUpdated: req.get('Timestamp'),
        updatedToday: false,
        createdAt: req.body.createdAtDate,
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
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
    
};

exports.logHabit = async (req, res, next) => {
    console.log(req.userId, req.body.habitDesc);
    let habitType;

    let habit = await Habit.findOne({ creator: req.userId, description: req.body.habitDesc });

    habit.active ? habitType = {type: 'active', increment: 1} : habitType = {type: 'passive', increment: 0};

    Habit.findOneAndUpdate({ creator: req.userId, description: req.body.habitDesc }, { updatedToday: true, lastUpdated: req.body.lastUpdated, $inc : { daysLogged: habitType.increment}}, {
        new: true
    })
    .then((habit) => {
        let habitToAdd = {};
        habitToAdd.active = habit.active;
        habitToAdd.description = habit.description;
        habitToAdd.goal = habit.goal;
        habitToAdd.daysLogged = habit.daysLogged;
        habitToAdd.daysLeft = habit.daysLeft;
        habitToAdd.skipDays = habit.skipDays;
        habitToAdd.streak = habit.streak;
        habitToAdd.lastUpdated = req.body.lastUpdated;
        habitToAdd.updatedToday = habit.updatedToday;
        habitToAdd.createdAt = habit.createdAt;
        console.log(habitToAdd);
        res.status(201).json(habitToAdd);

        console.log(new Date(habit.createdAt).getTime(), new Date(habit.lastUpdated).getTime());
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    });
}

exports.timesUpLog = async (req, res, next) => {
    // active habits that aren't logged the previous day need to have a day subtracted from daysLeft

    let habits = Array.from(req.body);
    console.log(habits[0].description.toString());

    for (let habit of habits) {
        await Habit.findOneAndUpdate({ creator: req.userId, description: habit.description.toString()}, { updatedToday: false }, {new: true});
    }

    res.status(201).json({ message: 'habit updated' });
}


exports.deleteHabit = (req, res, next) => {
    Habit.findOneAndDelete({ creator: req.userId, description: req.body.description })
        .then(() => {
            res.status(204).json();
        })
        .catch(err => {
            if (!err.statusCode) {
            err.statusCode = 500;
            }
            next(err);
        });
};
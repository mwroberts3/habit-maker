const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema(
    {
        description: String,
        active: Boolean,
        passiveUpdate: Boolean,
        goal: Number,
        streak: Number,
        skipDays: {
            option: Boolean,
            streakUnlock: Number,
            count: Number
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Habit', habitSchema);
import React, { useState, useEffect } from 'react'
import HabitCard from './HabitCard'

const HabitList = ({ loggedIn }) => {
    const [userHabits, setUserHabits] = useState([])

    // need to store and retrieve json in localstorage before fetching habits
    useEffect(() => {
        let currentDate = new Date(new Date().getTime());
        currentDate.setHours(0,0,0,0);

        let token = localStorage.getItem('token')

        fetch(`http://localhost:5050/habits/`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                Timestamp: currentDate
            }
            })
            .then(res => res.json())
            .then(res => {
                if (userHabits.length === 0) setUserHabits(res)
            })
    })

    console.log(userHabits)

    return (
        <div id='habit-list'>
            {userHabits.map((habit, index) => (
            <HabitCard key={ index } habit={ habit }/>
            ))}
        </div>
    )
}

export default HabitList

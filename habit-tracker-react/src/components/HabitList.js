import { useState } from 'react'
import HabitCard from './HabitCard'

const HabitList = ({validLoginCheck}) => {
    const [userHabits, setUserHabits] = useState([])
    const [loading, setLoading] = useState(true)

    let currentDate = new Date(new Date().getTime())
    currentDate.setHours(0,0,0,0)
    
    let token = localStorage.getItem('token')

    const habitDeletedCheck = () => {
        setLoading(true)
    }
    
    if (loading) {
        // Need to somehow check if habit has been completed and I guess log it to some kind of stats collection to then be displayed in the stats component

        setLoading(false)
        fetch(`https://habit-target-api.herokuapp.com/habits`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                Timestamp: currentDate
            }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)

                if (res.message === "jwt expired" || res.message === "Not authenticated.") {
                    localStorage.removeItem('token')
                    validLoginCheck(false)

                    // this should actually reload the login page with a 'session expired' message
                    window.location.reload()
                } else {
                    setUserHabits(res.editedHabits)
                }
            })
    }

    return (
        <div id='habit-list'>
            {
            userHabits.length > 0 &&
                userHabits.map((habit, index) => (
                <HabitCard key={ index } habit={ habit } habitDeletedCheck = { habitDeletedCheck } passedClass={ habit.updatedToday ? habit.active ? 'habit-card habit-logged-active' : 'habit-card habit-logged-passive' : 'habit-card'}/>
                ))
            }
        </div>
    )
}

export default HabitList

import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import HabitCard from './HabitCard'

const HabitList = ({validLoginCheck, serverUrl}) => {
    const history = useHistory()

    const [userHabits, setUserHabits] = useState([])
    const [loading, setLoading] = useState(true)

    let currentDate = new Date(new Date().getTime())
    currentDate.setHours(0,0,0,0)
    
    let token = localStorage.getItem('token')

    const habitDeletedCheck = () => {
        setLoading(true)
    }
  
    if (loading) {
        setLoading(false)
        fetch(`${serverUrl}/habits`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                Timestamp: currentDate
            }
            })
            .then(res => res.json())
            .then(res => {
                if (res.message === "jwt expired" || res.message === "Not authenticated.") {
                    localStorage.removeItem('token')
                    validLoginCheck(false)

                    history.go(0)
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
                <HabitCard serverUrl={ serverUrl }key={ index } habit={ habit } habitDeletedCheck = { habitDeletedCheck } passedClass={ habit.updatedToday ? habit.active ? 'habit-card habit-logged-active' : 'habit-card habit-logged-passive' : 'habit-card'}/>
                ))
            }
        </div>
    )
}

export default HabitList

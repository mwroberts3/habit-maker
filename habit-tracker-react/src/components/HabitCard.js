import DeleteHabit from './DeleteHabit'

const HabitCard = ({ habit, habitDeletedCheck, passedClass }) => {
    const logHabit = (habit) => {
        // Need to somehow check if habit has been completed and I guess log it to some kind of stats collection to then be displayed in the stats component
        let lastUpdated = new Date(new Date().getTime())
        lastUpdated.setHours(0,0,0,0)

        let token = localStorage.getItem('token')

        fetch(`http://localhost:5050/habits/log-habit`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                habitDesc: habit.description,
                lastUpdated
            })
        })
        .then(() => {
            habitDeletedCheck()
        })
    }

    return (
        <div id={habit.description} className={passedClass} onClick={(e) => {
            if (!e.target.classList.contains('delete-btn-x')) logHabit(habit)
        }}>
            <p>{habit.description}</p>
            <p className={habit.active ? 'active' : 'passive'}>{habit.active ? 'active' : 'passive'}</p>
            <p>Goal: {habit.daysLogged} / {habit.goal} ({habit.daysLeft})
            </p>
            <DeleteHabit habitDesc={habit.description} habitDeletedCheck={ habitDeletedCheck }/>
        </div>
    )
}

export default HabitCard

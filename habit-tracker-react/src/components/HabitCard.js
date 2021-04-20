import DeleteHabit from './DeleteHabit'

const HabitCard = ({ habit, habitDeletedCheck, passedClass, serverUrl }) => {
    const logHabit = (e, habit) => {
        // Need to somehow check if habit has been completed and I guess log it to some kind of stats collection to then be displayed in the stats component
        let lastUpdated = new Date(new Date().getTime())
        lastUpdated.setHours(0,0,0,0)

        let token = localStorage.getItem('token')

        fetch(`${serverUrl}/habits/log-habit`, {
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
            if (habit.active) {
                if (e.target.tagName === 'SPAN' && !e.target.parentNode.parentNode.parentNode.classList.contains('habit-logged-active')) {
                    e.target.parentNode.parentNode.parentNode.classList.add('habit-logged-active')

                    e.target.parentNode.parentNode.children[2].innerHTML = `
                    Goal: ${habit.daysLogged + 1} / ${habit.goal} <span style="color: #777; fontSize:14px">[${habit.daysLeft}]</span>
                    `
                } else if (e.target.tagName !== 'SPAN') {
                    e.target.parentNode.parentNode.classList.add('habit-logged-active')

                    e.target.parentNode.children[2].innerHTML = `
                    Goal: ${habit.daysLogged + 1} / ${habit.goal} <span style="color: #777; fontSize:14px">[${habit.daysLeft}]</span>
                    `
                }
            } else {
                if (e.target.tagName !== 'SPAN'){ 
                    e.target.parentNode.parentNode.classList.add('habit-logged-passive')
                } else {
                    e.target.parentNode.parentNode.parentNode.classList.add('habit-logged-passive')
                }
            }
        })
    }

    return (
        <div id={habit.description} className={passedClass} onClick={(e) => {
            if (!e.target.classList.contains('delete-btn-x') && !habit.failed && !habit.completed) logHabit(e, habit)
        }}>
            { !habit.failed && !habit.completed && 
            <div>
                <p>{habit.description}</p>
                <p className={habit.active ? 'active' : 'passive'}>{habit.active ? 'active' : 'passive'}</p>
                <p>Goal: {habit.daysLogged} / {habit.goal} <span style={{color:"#777", fontSize:"14px"}}>[{habit.daysLeft}]</span>
                </p>
                <DeleteHabit habitDesc={habit.description} habitDeletedCheck={ habitDeletedCheck }/>
            </div> }
            { habit.failed && 
            <div>
                <p>{habit.description} Failed</p>
                <p>{habit.daysLogged} / {habit.goal}</p>
                <DeleteHabit habitDesc={habit.description} habitDeletedCheck={ habitDeletedCheck }/>
            </div>
            }
            { habit.completed && 
            <div>
                <p>{habit.description} Completed</p>
                <p>{habit.daysLogged} / {habit.goal}</p>
                {/* user should be able to click this to restart the habit from the beginning */}
                <p>Reload Habit?</p>
                <DeleteHabit habitDesc={habit.description} habitDeletedCheck={ habitDeletedCheck }/>
            </div>
            }
        </div>
    )
}

export default HabitCard

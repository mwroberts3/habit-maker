const HabitCard = ({ habit }) => {
    return (
        <div className='habit-card'>
            <p>{habit.description}</p>
            <p className={habit.active ? 'active' : 'passive'}>{habit.active ? 'active' : 'passive'}</p>
            <p>Goal: {habit.daysLogged} / {habit.goal} ({habit.daysLeft})
            </p>
            <div className='delete-habit-btn'>X</div>
        </div>
    )
}

export default HabitCard

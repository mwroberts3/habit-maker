const HabitList = ({ loggedIn }) => {
    return (
        <div className={loggedIn ? '' : 'hidden'}>
           Habits List 
        </div>
    )
}

export default HabitList

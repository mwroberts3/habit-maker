import Button from './Button'

const UserOptions = () => {
    return (
        <div id="user-options">
            <div>
            <Button btnFunction="addHabit" btnDisplay="Add Habit" />
            <Button btnFunction="viewUserStats" btnDisplay="Stats" />
            </div>
            <Button btnFunction="logout" btnDisplay="Logout" />
        </div>
    )
}

export default UserOptions

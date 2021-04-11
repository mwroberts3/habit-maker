import Button from './Button'
import { Link } from 'react-router-dom'

const UserOptions = () => {
    return (
        <div id="user-options">
            <div>
            <Link to='/add-habit'>
            <Button btnFunction="addHabitBtn" btnDisplay="Add Habit" />
            </Link>
            <Link to='/stats'>
            </Link>
            </div>
            <Button btnFunction="logoutBtn" btnDisplay="Logout" />
        </div>
    )
}

export default UserOptions

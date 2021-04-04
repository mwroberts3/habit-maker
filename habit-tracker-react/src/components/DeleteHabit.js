import {Redirect} from 'react-router-dom'

const DeleteHabit = ({ habitDesc, habitDeletedCheck }) => {
    const deleteHabitRequest = () => {
        let token = localStorage.getItem('token')

        fetch(`http://localhost:5050/habits/delete-habit`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ description: habitDesc })
        })
        .then(() => {
            habitDeletedCheck()
            return (<Redirect to='/' />)
        })
    }

    return (
        <div className='delete-habit-btn' onClick={() => {
            deleteHabitRequest()
        }}>
            <span className='delete-btn-x'>
                x
            </span>
        </div>
    )
}

export default DeleteHabit

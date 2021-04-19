const DeleteHabit = ({ habitDesc, habitDeletedCheck }) => {
    const deleteHabitRequest = (e) => {
        let token = localStorage.getItem('token')

        fetch(`https://habit-target-api.herokuapp.com/habits/delete-habit`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ description: habitDesc })
        })
        .then(() => {
            habitDeletedCheck(e)
        })
    }

    return (
        <div className='delete-habit-btn' onClick={(e) => {
            deleteHabitRequest(e)
        }}>
            <span className='delete-btn-x'>x</span>
        </div>
    )
}

export default DeleteHabit

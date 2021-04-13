const Button = ({ btnFunction, btnDisplay, functionLiteral }) => {
    return (
        <button className="light-btn" onClick={
            (e) => {
                if (btnFunction === 'logoutBtn') {
                    localStorage.removeItem('token')
                    window.location.reload()
                } else if (btnFunction === 'submitNewHabitBtn') {
                    // should make sure that all form fields are filled out before add new habit to the database
                    e.preventDefault()
                    functionLiteral()
                } else if (btnFunction === 'closeAddHabitForm') {
                    e.preventDefault()
                    functionLiteral()
                }
            }
        }>
            { btnDisplay }
        </button>
    )
}

export default Button

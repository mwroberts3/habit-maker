const Button = ({ btnFunction, btnDisplay, functionLiteral }) => {
    return (
        <button className="light-btn" onClick={
            (e) => {
                if (btnFunction === 'logoutBtn') {
                    localStorage.removeItem('token')
                    window.location.reload()
                } else if (btnFunction === 'submitNewHabitBtn') {
                    e.preventDefault()
                    functionLiteral();
                }
            }
        }>
            { btnDisplay }
        </button>
    )
}

export default Button

const Button = ({ btnFunction, btnDisplay }) => {
    return (
        <button className="light-btn" id={btnFunction}>
            { btnDisplay }
        </button>
    )
}

export default Button

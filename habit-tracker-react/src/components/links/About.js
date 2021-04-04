import Button from '../Button'
import { Link } from 'react-router-dom' 

const About = () => {
    return (
        <div id="about-container">
            <h2>About</h2>
            <span>v1.0.0</span>
            <span>Created 2021</span>
            <p>Habit Checker was created for the purpose to help users develop and maintain new habits.</p>
            <p>It also works as a general todo list or project tracker.</p>
            <Link to='/'>
                <Button btnDisplay='Back' btnFunction='backToLoginBtn' style={{marginBottom: '5px'}}/>
            </Link>
        </div>
    )
}

export default About

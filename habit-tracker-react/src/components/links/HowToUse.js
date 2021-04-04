import Button from '../Button'
import { Link } from 'react-router-dom' 

const HowToUse = () => {
    return (
        <div id="how-to-use-container">
            <h2>How To Use</h2>
            <p>Click the 'Add Habit' button to add a new habit.</p>
            <p>Fill out the form and submit.</p>
            <p>How often you need to log your progress depends on whether a given habit is <span style={{color: 'green'}}>active</span> or <span style={{color: 'red'}}>passive</span></p>
            <p>Active habits need to be updated everyday.</p>
            <p>Passive habits only need to be updated if a habit wasn't done that day.</p>
            <Link to='/'>
                <Button btnDisplay='Back' btnFunction='backToLoginBtn' 
                style={{marginBottom: '5px'}}/>
            </Link>
        </div>
    )
}

export default HowToUse

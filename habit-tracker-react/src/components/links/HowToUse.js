import Button from '../Button'
import { Link } from 'react-router-dom' 

const HowToUse = () => {
    return (
        <div id="how-to-use-container">
            <h2>How To Use</h2>
            <p>Create a new account by clicking the 'Signup' button on the home page. Choose a unique username and submit a password.</p>
            <p>You'll be forwarded to the habit list page once you're logged in.</p>
            <p>Click the 'Add Habit' button to add a new habit.</p>
            <p>Enter a short description. <em>Each habit description needs to be unique.</em></p>
            <p>How progress is logged depends on whether a given habit is <span style={{color: 'green', background: 'aliceblue', borderRadius: '5px'}}>&nbsp;active&nbsp;</span> or <span style={{color: 'red', background: 'aliceblue', borderRadius: '5px'}}>&nbsp;passive&nbsp;</span></p>
            <p><em>Active</em> habits need to be updated when they are accomplished everyday.</p>
            <p><em>Passive</em> habits only need to be updated if a habit wasn't done that day.</p>
            <p>Finally, a goal needs to be set. Enter the amount of individual days you want to accomplish this habit and the total amount of days you have to reach your goal.</p>
            <p><em>For example,</em> you might want to do a 30 minute bike ride 5 out of 10 days.</p>
            <p>Fill out the form and submit.</p>
            <p>Once a habit has been added, you'll be able to click on its card in the habit list once a day to log a habit, whether active or passive.</p>
            <p>Each habit card displays the amount of days you've logged towards your goal as well as the total amount of days you've allotted to acheive this goal.</p>
            <p>Everyday the number displayed for the total amount of days you allotted yourself will decrease by 1.</p>
            <p>A habit will display 'Completed' when you have logged the amount of days you set as a goal or 'Failed' if the amount of days you set to reach your goal has run out.</p>
            <Link to='/'>
                <p style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                    <Button btnDisplay='Back' btnFunction='backToLoginBtn' />
                </p>
            </Link>
        </div>
    )
}

export default HowToUse

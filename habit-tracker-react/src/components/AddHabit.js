import Button from './Button'
import {Redirect} from 'react-router-dom'
import React, {useState} from 'react'

const AddHabit = ({serverUrl}) => {
    const [newHabitSubmitted, setNewHabitSubmitted] = useState(false)
    const [addHabitFormClosed, setAddHabitFormClosed] = useState(false)

    if (newHabitSubmitted || addHabitFormClosed) {
        return (<Redirect to='/' />)
    }

    const closeAddHabitForm = () => {
      setAddHabitFormClosed(true)
    }

    const submitNewHabit = () => {

        setNewHabitSubmitted(true)

        const formData = new FormData(document.getElementById('new-habit-form'))
        let formDataObj = {}
        
        // add local timezone date
        let date = new Date(new Date(Date.now()).getTime())
        date = date.setHours(0,0,0,0)
        formData.append('createdAtDate', new Date(date))
    
        for (let key of formData.keys()) {
            formDataObj[key] = formData.get(key)
        }    

        let token = localStorage.getItem('token')

        fetch(`${serverUrl}/habits/add-habit/`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                Timestamp: new Date(date)
            },
            body: JSON.stringify(formDataObj)
        })
    }

    return (
      <div id='add-habit-container'>
        <form id='new-habit-form'>
          <h3>Add New Habit</h3>
          <label htmlFor="description">Short Description</label>
          <input id="habit-description" name="description" type="text" required/>
          <h3>Update Style</h3>
          <input type="radio" name="updateStyle" value="active" />
          <label htmlFor="active-update">active</label>
          <input type="radio" name="updateStyle" value="passive" defaultChecked />
          <label htmlFor="passive-update">passive</label>
          <div>
            <label htmlFor="days">Goal</label>
            <input name="daysGoal" type="number" required/>
            Days
          </div>
          <div>
            <label htmlFor="days">Time</label>
            <input name="daysLeft" type="number" required/>
            Days
          </div>
          <Button btnDisplay='Submit' btnFunction='submitNewHabitBtn' functionLiteral={submitNewHabit} />&nbsp;
          <Button btnDisplay='Close' btnFunction='closeAddHabitForm' functionLiteral={closeAddHabitForm} />
        </form>
      </div>
    )
}

export default AddHabit

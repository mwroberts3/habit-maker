import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { useEffect } from 'react'

import About from './components/links/About'
import HowToUse from './components/links/HowToUse'
import Footer from './components/Footer'
import Login from './components/Login'
import HabitList from './components/HabitList'
import UserOptions from './components/UserOptions'
import AddHabit from './components/AddHabit'

function App() {
  console.log(process.env)

  let serverUrl;

  if (process.env.NODE_ENV === "development") {
    serverUrl = 'http://localhost:5050'
  } else {
    serverUrl = 'https://habit-target-api.herokuapp.com'
  }
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      validLoginCheck(true)
    }
  })

  const validLoginCheck = (validated) => {
    if (validated) {

      // re-render to show only the habit list contain and user options
      ReactDOM.render(
      <Router>
      <div id="total-container">
        <div className="inner-contents"> 
          <Route exact path='/'>
            <UserOptions />
            <HabitList validLoginCheck={validLoginCheck}  serverUrl={serverUrl}/>
          </Route>
          <Route exact path='/add-habit'>
            <AddHabit serverUrl={serverUrl} />
          </Route>
          <Route path='/how-to-use' component={HowToUse} />
        </div>
      </div>
        <Footer />
      </Router>
      , document.getElementById('root'))
    }
  }

  return (
    <Router>
    <div id="total-container">
      <div className="inner-contents">
      <Route exact path='/'>
          <Login validLoginCheck={ validLoginCheck} serverUrl={serverUrl}/>
      </Route>
      <Route path='/how-to-use' component={HowToUse} />
      </div>
      <Footer />
    </div>
    </Router>
  )
}

export default App;

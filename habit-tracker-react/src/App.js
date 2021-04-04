import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './components/links/About'
import HowToUse from './components/links/HowToUse'
import Footer from './components/Footer'
import Login from './components/Login'
import HabitList from './components/HabitList'
import UserOptions from './components/UserOptions'
import AddHabit from './components/AddHabit'

function App() {
  let loggedIn = false

  const validLoginCheck = (validated) => {
    if (validated) loggedIn = true

    // re-render to show only the habit list contain and user options
    ReactDOM.render(
    <Router>
    <div id="total-container">
      <Route exact path='/'>
        <UserOptions />
        <HabitList loggedIn={loggedIn}/>
      </Route>
      <Route path='/add-habit' component={AddHabit} />
      <Route path='/about' component={About} />
      <Route path='/how-to-use' component={HowToUse} />
      <Footer />
    </div>
    </Router>
    , document.getElementById('root'))
  }
  
  // getting error in chrome devtools...also when JWT is expired this should redirect to the home page
  if (localStorage.getItem('token')) {
    validLoginCheck(true)
  }

  return (
    <Router>
    <div id="total-container">
      <Route exact path='/'>
          <Login validLoginCheck={ validLoginCheck}/>
      </Route>
      <Route path='/about' component={About} />
      <Route path='/how-to-use' component={HowToUse} />
      <Footer />
    </div>
    </Router>
  )
}

export default App;

import ReactDOM from 'react-dom'

import Footer from './components/Footer'
import Login from './components/Login'
import HabitList from './components/HabitList'
import UserOptions from './components/UserOptions'

function App() {
  let loggedIn = false

  const validLoginCheck = (validated) => {
    if (validated) loggedIn = true

    // re-render to show only the habit list contain and user options
    ReactDOM.render(<div id="total-container">
    <UserOptions />
    <HabitList loggedIn={loggedIn}/>
    <Footer />
    </div>, document.getElementById('root'))
  }

  return (
    <div id="total-container">
      <Login validLoginCheck={ validLoginCheck}/>
      <Footer />
    </div>
  )
}

export default App;

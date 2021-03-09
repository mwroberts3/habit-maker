import ReactDOM from 'react-dom'

import Login from './components/Login'
import HabitList from './components/HabitList'
import UserOptions from './components/UserOptions'

function App() {
  let loggedIn = false

  const validLoginCheck = (validated) => {
    if (validated) loggedIn = true

    // re-render to show only the habit list contain and user options
    ReactDOM.render(<div className="container">
    <UserOptions />
    <HabitList loggedIn={loggedIn}/>
    </div>, document.getElementById('root'))
  }

  return (
    <div className="container">
      <Login validLoginCheck={ validLoginCheck}/>
    </div>
  )
}

export default App;

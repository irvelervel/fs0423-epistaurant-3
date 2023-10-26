import logo from './logo.svg'
import './App.css'
// importiamo il foglio CSS di bootstrap, UNA VOLTA SOLA in App.js
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Badge } from 'react-bootstrap'

// che cos'è un componente React a funzione?
// È una funzione che ritorna del JSX

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <button className="btn btn-primary">BOTTONE PRIMARY</button> */}
        <Button variant="primary" size="sm" className="mt-5">
          Primary
        </Button>
        {/* <span class="badge bg-secondary">New</span> */}
        <Badge bg="secondary" pill={true}>
          New
        </Badge>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

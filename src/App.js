import './App.css'
// importiamo il foglio CSS di bootstrap, UNA VOLTA SOLA in App.js
import 'bootstrap/dist/css/bootstrap.min.css'

// importiamo i componenti da noi scritti
// senza { } perchè tutti i miei componenti li esporto come "default"
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import ReservationForm from './components/ReservationForm'
import ReservationList from './components/ReservationList'

// che cos'è un componente React a funzione?
// È una funzione che ritorna del JSX

function App() {
  return (
    <div>
      {/* voglio aggiungere un sottotitolo alla mia navbar, personalizzato! */}
      <CustomNavbar additionalText="I migliori piatti del web!" />
      {/* ora è il momento di inserire il contenuto principale della landing page! */}
      <ReservationList />
      <ReservationForm />
      <Home />
    </div>
  )
}

export default App

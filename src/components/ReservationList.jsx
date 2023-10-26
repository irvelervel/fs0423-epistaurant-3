// COSA SUCCEDE IN QUESTO COMPONENTE (LIFE-CYCLE)
// 1) Il componente si avvia per la prima volta e si prepara a raggiungere il DOM: viene impostato il suo stato,
// viene invocato render(), le parti statiche dell'interfaccia vengono scritte nel DOM (il Container, la Row, la
// ListGroup vuota, etc.). Poichè this.state.reservations al primo render() è un array vuoto, il suo corrispettivo
// .map() nel render() non genera dinamicamente nessun elemento della lista.

// 2) React cerca all'interno del componente un metodo chiamato "componentDidMount", e se viene trovato viene eseguito.
// Nel nostro componentDidMount abbiamo inserito l'unica invocazione di getReservations, quindi parte la fetch!
// la fetch viene eseguita correttamente, dal server recuperiamo l'array di prenotazioni, e a questo punto lanciamo
// un setState() per aggiornare lo stato del componente e rimpiazzare il vecchio valore di this.state.reservations
// con l'array data pieno di prenotazioni.
// componentDidMount viene eseguito UNA VOLTA SOLA per componente, non esiste la possibilità che venga re-invocato.

// 3) a causa del setState invocato da getReservations (e quindi da componentDidMount), il metodo render() viene
// automaticamente re-invocato da React! La regola è: il metodo render() di un componente a classe viene re-invocato
// automaticamente ogni volta che cambia il suo stato, o le sue props.
// Quindi render() riparte: troverà già al loro posto nel DOM tutte le parti statiche, e non le sostituirà.
// Però, arrivato al contenuto di ListGroup (le parentesi graffe), ri-valuterà l'array this.state.reservations, e
// si renderà conto che ora lo stato è pieno di prenotazioni. React quindi ri-disegnerà tutto il contenuto della
// ListGroup, creato un ListGroup.Item per ogni elemento dell'array reservations.
// A questo punto, il componente si ferma (va in stand-by).

import { Component } from 'react'
import { Container, Row, Col, ListGroup, Spinner, Alert } from 'react-bootstrap'

// per recuperare le prenotazioni, e mostrarle in una lista avremo bisogno di uno STATE

class ReservationList extends Component {
  state = {
    // come mai creo uno stato in ReservationList?
    // perchè devo RECUPERARE le PRENOTAZIONI con una fetch()
    // ogni volta che dovrete recuperare dei dati con una fetch, dovrete avere un posto in cui salvarli!
    // questo posto è lo stato del vostro componente
    // NON potrete salvare il risultato della vostra fetch in una variabile a caso...
    reservations: [], // DEVE nascere come un array vuoto!
    // alla fine reservations diventerà un array di oggetti "prenotazione"!!!
    isLoading: true,
    isError: false,
  }

  // async/await
  //   getReservations = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://striveschool-api.herokuapp.com/api/reservation'
  //       )
  //       if (response.ok) {
  //         // fetch finita bene
  //         const data = await response.json()
  //         console.log('DATI RECUPERATI', data)
  //       } else {
  //         // fetch finita male
  //         throw new Error('Errore nel recupero prenotazioni!')
  //       }
  //     } catch (error) {
  //       console.log('ERROR!', error)
  //     }
  //   }

  // .then/.catch
  getReservations = () => {
    fetch('https://striveschool-api.herokuapp.com/api/reservation')
      .then((response) => {
        if (response.ok) {
          // fetch finita bene
          return response.json()
        } else {
          // fetch finita male
          throw new Error('Errore nel recupero prenotazioni!')
        }
      })
      .then((data) => {
        console.log('fetch completata, DATI RECUPERATI', data)
        // se noi qua settassimo lo stato di reservations...
        // la lista verrebbe generata in automatico!
        this.setState({
          reservations: data,
          isLoading: false,
        })
        // la regola è:
        // ogni volta che viene usato setState, render() viene re-invocato automaticamente
      })
      .catch((error) => {
        console.log('ERROR!', error)
        this.setState({
          isLoading: false,
          isError: true,
        })
      })
  }

  // è SBAGLIATO invocare una funzione che fa un setState dentro render()!
  // questo perchè ogni setState ri-lancia render() automaticamente
  // e quindi finiremo SEMPRE in un loop infinito! D:

  // sarebbe bello avere un posto dove avere la garanzia che il suo contenuto NON venga eseguito più volte
  // sarebbe bello trovare un metodo (NON render) in cui avere la garanzia che NON venga ri-eseguito

  componentDidMount() {
    // componentDidMount viene eseguito UNA VOLTA SOLA!
    // se noi mettessimo la fetch QUI DENTRO,
    this.getReservations()
    // componentDidMount viene eseguito automaticamente DOPO la prima invocazione di render()
  }

  render() {
    // render() viene invocato AUTOMATICAMENTE dal componente a classe ogni volta che cambia lo stato o le props!
    // this.getReservations()

    console.log('SONO RENDER!')

    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col
            md={6}
            // esempio di assegnazioni classi dinamica senza ripetere le classi presenti in entrambi i casi
            className={`col col-md-6 ${this.state.isLoading ? 'mb-2' : 'mb-3'}`}
          >
            <h2 className="text-center my-3">Prenotazioni esistenti:</h2>
            {this.state.isLoading && (
              <div className="text-center mb-2">
                <Spinner animation="border" variant="info" />
              </div>
            )}
            {this.state.isError && (
              <Alert variant="danger" className="text-center">
                Errore nel recupero delle prenotazioni😥
              </Alert>
            )}
            <ListGroup>
              {this.state.reservations.map((reservation) => {
                return (
                  <ListGroup.Item key={reservation._id}>
                    {reservation.name} per {reservation.numberOfPeople} il{' '}
                    {reservation.dateTime}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationList

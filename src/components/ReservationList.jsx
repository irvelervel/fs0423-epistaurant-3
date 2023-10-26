// componentDidMount

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

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
  }

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
        console.log('DATI RECUPERATI', data)
        // se noi qua settassimo lo stato di reservations...
        // la lista verrebbe generata in automatico!
        this.setState({
          reservations: data,
        })
        // la regola è:
        // ogni volta che viene usato setState, render() viene re-invocato automaticamente
      })
      .catch((error) => {
        console.log('ERROR!', error)
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

    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <h2 className="text-center my-3">Prenotazioni esistenti:</h2>
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

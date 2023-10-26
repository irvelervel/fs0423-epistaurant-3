// questo componente servirà a permettere agli utenti di prenotare un tavolo nel nostro ristorante
// questo componente avrà bisogno dello STATE
// perchè OGNI VOLTA che voi inserite 1+ input fields in un componente, avrete bisogno dello STATE

import { Component } from 'react'
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap'

// quali sono i campi del nostro form? Com'è fatta una prenotazione di un tavolo?

// name --> string
// phone --> string/number
// numberOfPeople --> string/number
// smoking --> boolean
// dateTime --> string
// specialRequests --> string (not mandatory)

class ReservationForm extends Component {
  state = {
    reservation: {
      name: '',
      phone: '',
      numberOfPeople: '1',
      smoking: false,
      dateTime: '',
      specialRequests: '',
    },
    showAlert: false,
  }

  handleInputChange = (property, value) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [property]: value,
        // se noi vogliamo utilizzare un parametro o una variabile come NOME di proprietà di un oggetto
        // dobbiamo valutare il contenuto del parametro o della variabile tramite [ ]
        // property è ad es. name, phone, numberOfPeople. etc.
      },
    })
  }

  handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log('Ora inviamo la prenotazione!')
    // dobbiamo utilizzare il metodo fetch() con un method: 'POST' in modo da CREARE una NUOVA prenotazione
    // 1) gestiamo la Promise con i .then() e i .catch()
    // fetch('https://striveschool-api.herokuapp.com/api/reservation', {
    //   // oggetto di configurazione
    //   method: 'POST',
    //   body: JSON.stringify(this.state.reservation),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => {
    //     console.log('RESPONSE', res)
    //     if (res.ok) {
    // // prenotazione salvata
    // // alert('Prenotazione salvata!')
    // // svuotare il form?? settiamo lo state!
    // // possiamo ripristinare lo stato iniziale di "reservation" nello state
    // this.setState({
    //   reservation: {
    //     name: '',
    //     phone: '',
    //     numberOfPeople: '1',
    //     smoking: false,
    //     dateTime: '',
    //     specialRequests: '',
    //   },
    //   // e i campi si svuoteranno :)
    //   showAlert: true, // così faccio apparire l'Alert di Bootstrap!
    // })
    //     } else {
    // throw new Error(
    //   "C'è stato un errore nel salvataggio della prenotazione"
    // )
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('errore!', err)
    //   })

    // 2) gestiamo la Promise con la metodologia async/await
    try {
      const res = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation',
        {
          // oggetto di configurazione
          method: 'POST',
          body: JSON.stringify(this.state.reservation),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.ok) {
        // prenotazione salvata
        // alert('Prenotazione salvata!')
        // svuotare il form?? settiamo lo state!
        // possiamo ripristinare lo stato iniziale di "reservation" nello state
        this.setState({
          reservation: {
            name: '',
            phone: '',
            numberOfPeople: '1',
            smoking: false,
            dateTime: '',
            specialRequests: '',
          },
          // e i campi si svuoteranno :)
          showAlert: true, // così faccio apparire l'Alert di Bootstrap!
        })
      } else {
        throw new Error(
          "C'è stato un errore nel salvataggio della prenotazione"
        )
      }
    } catch (error) {
      console.log('errore', error)
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <h2 className="text-center">Prenota il tuo tavolo!</h2>
            {
              // operatore SHORT CIRCUIT &&
              this.state.showAlert && (
                <Alert variant="info">Prenotazione Salvata!</Alert>
              )
            }

            {/* giocando con le classi CSS */}
            {/* <Alert
              variant="info"
              className={this.state.showAlert ? 'd-block' : 'd-none'}
              // se showAlert è true, la classe sarà 'd-block', se è false sarà 'd-none'
            >
              Prenotazione Salvata!
            </Alert> */}

            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Gianni Morandi"
                  value={this.state.reservation.name}
                  onChange={
                    // setto lo state ogni volta che scrivo una lettera nel campo "Nome"
                    (e) => {
                      this.setState({
                        // qui dentro va inserito il NUOVO OGGETTO STATE
                        // che verrà "fuso" con l'oggetto esistente
                        reservation: {
                          // grazie allo spread operator ...
                          // il mio oggetto "reservation" parte
                          // trascinandosi dentro tutte le coppie esistenti nello state
                          ...this.state.reservation,
                          name: e.target.value,
                        },
                        // VIETATO FARE
                        // this.state.reservation.name = e.target.value <-- VIETATISSIMO!
                        // perchè lo state è read-only
                      })
                    }
                  }
                  required
                />
              </Form.Group>

              {/* EASTER EGG */}
              {/* voglio che questo Alert venga visualizzato "condizionalmente" */}

              {
                // operatore SHORT CIRCUIT &&
                this.state.reservation.name === 'Gianni Morandi' && (
                  <Alert variant="success">Bel nome!</Alert>
                )
              }

              <Form.Group className="mb-3">
                <Form.Label>Il tuo recapito telefonico</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="xxxxxxxxx"
                  value={this.state.reservation.phone}
                  onChange={
                    (e) =>
                      // visto che TUTTI gli onChange fanno la stessa cosa, ovvero scrivono una particolare
                      // proprietà dell'oggetto reservation con un valore derivante dall'evento scaturito,
                      // scrivo UNA volta una funzione che accetta il nome di tale proprietà e il valore da salvare
                      // e la riutilizzo per OGNI onChange
                      this.handleInputChange('phone', e.target.value) // è anche il valore di ritorno di onChange, non cambia niente
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>In quanti siete?</Form.Label>
                <Form.Select
                  aria-label="Quantità"
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => {
                    this.handleInputChange('numberOfPeople', e.target.value)
                  }}
                  required
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori?"
                  checked={this.state.reservation.smoking}
                  onChange={(e) => {
                    // this.setState({
                    //   reservation: {
                    //     ...this.state.reservation,
                    //     smoking: e.target.checked, // true/false
                    //     // le checkbox restituiscono un valore booleano NON con target.value ma con target.checked
                    //   },
                    this.handleInputChange('smoking', e.target.checked)
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Per quando?</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    this.handleInputChange('dateTime', e.target.value)
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Note particolari?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Allergie, intolleranze, etc."
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => {
                    this.handleInputChange('specialRequests', e.target.value)
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationForm

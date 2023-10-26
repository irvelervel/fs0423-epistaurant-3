import { Carousel, Container, Row, Col, ListGroup } from 'react-bootstrap'
import menu from '../data/menu.json'
import { Component } from 'react'

// il carosello ora è generato dinamicamente a partire dal menu
// ma ogni pasta ha le proprie "recensioni", che vogliamo mostrare in una sezione sottostante
// queste recensioni devono essere mostrate per la pasta correntemente visualizzata
// devo inserire nel mio componente Home una specie di "memoria", che tenga traccia della pasta
// correntemente visualizzata
// impariamo ad utilizzare il concetto di "state"

// lo "state" è stata da sempre una caratteristica unicamente associata ai Class Components
// quindi per prima cosa, convertiamo velocemente il nostro componente a funzione in un componente a classe

class Home extends Component {
  // ora che abbiamo un componente a classe, possiamo utilizzare lo state

  state = {
    // in questo oggetto io inserirò delle coppie chiave/valore che intendo "ricordare" per la durata
    // di vita di questo componente
    // l'oggetto state è READ-ONLY
    selectedPasta: menu[0], // carbonara
  }

  render() {
    return (
      // inseriamo un Container, una Row e una Col per dare una struttura contenitiva al nostro carosello
      <Container>
        <Row className="justify-content-center">
          {/* <div className="col col-12 col-md-6 col-lg-4"> */}
          <Col md={6}>
            <Carousel
              className="mt-4"
              onSlid={(incomingSlideIndex) => {
                // console.log(incomingSlideIndex)
                // incomingSlideIndex abbiamo scoperto essere l'INDICE della slide che è appena arrivata
                // dovrei mantenere aggiornato lo state con la pasta che al momento è appena arrivata
                // selectedPasta inizialmente è menu[0], ma deve diventare --> menu[incomingSlideIndex]
                // TI PIACEREBBE FARE --> this.state.selectedPasta = menu[incomingSlideIndex]
                // non si può fare! lo state è read only :(
                this.setState({
                  // questo oggetto sarà il nuovo state
                  selectedPasta: menu[incomingSlideIndex],
                  // questo è l'UNICO MODO di settare lo state! utilizzando il metodo this.setState()
                })
              }}
            >
              {menu.map((pasta, i) => {
                return (
                  // OGNI VOLTA che generate dinamicamente del contenuto tramite il metodo .map()
                  // dovete ricordarvi che React ha bisogno di poter DISTINGUERE tra gli elementi
                  // generati
                  // per fare questo è necessario assegnare una "key" univoca ad ogni elemento generato
                  // questo serve a livello di performance, per evitare manipolazioni del DOM inutili
                  // e perchè è brutto da vedere :)
                  <Carousel.Item key={i}>
                    <img src={pasta.image} alt="kitten" className="w-100" />
                    <Carousel.Caption>
                      <h3>{pasta.name}</h3>
                      <p>{pasta.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <ListGroup className="text-center">
              {this.state.selectedPasta.comments.map((review) => {
                return (
                  <ListGroup.Item key={review.id}>
                    {review.author} - {review.comment} | {review.rating}
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

export default Home

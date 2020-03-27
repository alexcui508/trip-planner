import React from 'react';
import { 
  Modal, 
  Icon, 
  Container,
  Segment,
  Header,
  Divider,
  Grid,
} from 'semantic-ui-react';
import BusinessDetail from './BusinessDetail';

class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
      loading: false,
      isHovered: false,
    };
  }

  getYelpDetailedUrl = (id) => {
    return "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id;
  }

  searchHandler = () => {
    const { eventInfo } = this.props;

    this.setState({
      loading: true,
    }, () => {
      fetch(this.getYelpDetailedUrl(eventInfo.id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY
        }
      }).then(response => response.json())
        .then(data => {
          this.setState({
            details: data,
            loading: false,
          });
        });
    });
  }

  convertRating = () => {
    const { eventInfo } = this.props;

    var renderedStars = [];
    var numStars = eventInfo.rating;
    var addHalf = false;

    if (!Number.isInteger(numStars)) {
      numStars -= 0.5;
      addHalf = true;
    }

    for (let i = 0; i < numStars; i++) {
      renderedStars.push(<Icon name='star' color='yellow' />);
    }

    if (addHalf) {
      renderedStars.push(<Icon name='star half' color='yellow' />);
    }

    return renderedStars
  }

  getRenderedEventCard = () => {
    const { isHovered } = this.state;
    const { eventInfo } = this.props;

    return (
      <Segment attached color="teal" secondary={isHovered}>
        <Header as='h2'>
          {eventInfo.name}
          <Divider hidden/>
          <Header.Subheader>{eventInfo.categories.map(v => v.title).join(", ")}</Header.Subheader>
          <Header.Subheader>{eventInfo.location.display_address.join(", ")}</Header.Subheader>
          <Header.Subheader>{eventInfo.display_phone}</Header.Subheader>
        </Header>
      </Segment>
    );
  }

  render() {
    const { loading, details } = this.state;
    const { eventInfo, eventDate, eventTime, deleteSelectedEvent } = this.props;

    const renderedStars = this.convertRating();
    const renderedEventCard = this.getRenderedEventCard();

    return (
      <>
        <div style={{ marginRight: '10px' }}>
          <Header as='h1' attached='top'>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>{eventTime}</Grid.Column>
                <Grid.Column textAlign="right" style={{marginRight: '-10px'}}>
                  <Icon link name="delete" color="red" onClick={() => {deleteSelectedEvent(eventDate, eventTime)}}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Header>
        </div>
        <Modal trigger={
          <div 
            style={{ marginBottom: '20px', marginRight: '10px' }} 
            onClick={this.searchHandler} 
            onMouseEnter={() => this.setState({ isHovered: true })}
            onMouseLeave={() => this.setState({ isHovered: false })}
          >
            {renderedEventCard}
          </div>
        }>
          <Modal.Header>{eventDate}, {eventTime}</Modal.Header>
          <Modal.Content>
            <BusinessDetail 
              loading={loading} 
              details={details} 
              price={
                <Container style={{color:'green'}}>
                  {eventInfo.price}
                </Container>
              } 
              rating={renderedStars}
            />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default EventCard;
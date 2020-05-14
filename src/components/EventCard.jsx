import React from 'react';
import { 
  Modal, 
  Icon, 
  Container,
  Segment,
  Header,
  Grid,
} from 'semantic-ui-react';
import BusinessDetail from './BusinessDetail';

class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
      reviewData: [],
      loading: false,
      isHovered: false,
    };
  }

  getYelpDetailsUrl = (id) => {
    return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`;
  }

  getYelpReviewsUrl = (id) => {
    return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`;
  }

  searchHandler = () => {
    const { businessInfo } = this.props;

    this.setState({
      loading: true,
    }, () => {
      fetch(this.getYelpDetailsUrl(businessInfo.id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          details: data,
        });
      })
      .then(() => {
        fetch(this.getYelpReviewsUrl(businessInfo.id), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY
          }
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            reviewData: data,
            loading: false,
          });
        });
      });
    });
  }

  convertRating = (rating) => {
    var renderedStars = [];
    var addHalf = false;

    if (!Number.isInteger(rating)) {
      rating -= 0.5;
      addHalf = true;
    }

    for (let i = 0; i < rating; i++) {
      renderedStars.push(<Icon name='star' color='yellow' />);
    }

    if (addHalf) {
      renderedStars.push(<Icon name='star half' color='yellow' />);
    }

    return renderedStars
  }

  getRenderedEventCard = () => {
    const { isHovered } = this.state;
    const { businessInfo } = this.props;

    return (
      <Segment attached color="teal" secondary={isHovered}>
        <Header as='h2'>
          {businessInfo.name}
          <Header.Subheader>{businessInfo.categories.map(v => v.title).join(", ")}</Header.Subheader>
          <Header.Subheader>{businessInfo.location.display_address.join(", ")}</Header.Subheader>
          <Header.Subheader>{businessInfo.display_phone}</Header.Subheader>
        </Header>
      </Segment>
    );
  }

  render() {
    const { loading, details, reviewData } = this.state;
    const { businessInfo, date, startTime, endTime, deleteSelectedEvent } = this.props;

    const renderedEventCard = this.getRenderedEventCard();

    return (
      <>
        <div style={{ marginRight: '10px' }}>
          <Header as='h1' attached='top'>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>{startTime} - {endTime}</Grid.Column>
                <Grid.Column textAlign="right" style={{marginRight: '-10px'}}>
                  <Icon link name="delete" color="red" onClick={() => { deleteSelectedEvent(date, startTime, endTime) }}/>
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
          <Modal.Header> 
            <Header as='h1'>
              <Header.Content>{businessInfo.name}</Header.Content>
              <Header.Subheader>
                {date}, {startTime} - {endTime}
              </Header.Subheader>
            </Header>
          </Modal.Header>
          <Modal.Content>
            <BusinessDetail 
              loading={loading} 
              details={details}
              reviewData={reviewData} 
              price={
                <Container style={{color:'green'}}>
                  {businessInfo.price}
                </Container>
              } 
              convertRating={this.convertRating}
            />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default EventCard;
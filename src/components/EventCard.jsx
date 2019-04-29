import React from 'react';
import { Modal, Segment, Icon } from 'semantic-ui-react';

let REACT_APP_YELP_API_KEY = '1oVKZrEwzseUCh8sk57ORW4vBLSPDpk7tMDgrLSzsBVQ554QHwHKoghKGRNLhiVTajkH3zD8vuxepiWhu9GMCwglYwZqUiYlGrR9__0DMsVxEuTyL1iITpqI8qHGXHYx';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
    this.state = {
      details: [],
    };
  }

  yelp_detailed_url(id) {
    return "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id;
  }

  searchHandler(event) {
    let id = this.props.eventID;
    fetch(this.yelp_detailed_url(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + REACT_APP_YELP_API_KEY
      }
    }).then(response => response.json())
      .then(data => {
        this.setState({
          details: data,
        }, () => {console.log(this.state)});
      });
  }

  convertRating() {
    let renderedStars = [];
    let numStars = this.props.eventRating;
    let addHalf = false;
    if (!Number.isInteger(numStars)) {
      numStars -= 0.5;
      addHalf = true;
    }
    while (numStars > 0) {
      renderedStars.push(<Icon name='star' />);
      numStars -= 1;
    }
    if (addHalf) {
      renderedStars.push(<Icon name='star half' />);
    }

    return renderedStars
  }

  render() {
    let renderedStars = this.convertRating();
    return (
      <Modal trigger={<Segment.Group horizontal onClick={this.searchHandler}> 
                        <Segment>{this.props.eventName}</Segment>
                        <Segment style={{color: "green"}}>{this.props.eventPrice}</Segment> 
                        <Segment style={{color: "gold"}}>{renderedStars}</Segment>
                      </Segment.Group>}>
        <Modal.Header>{this.props.eventName}</Modal.Header>
        <Modal.Content>
          <p>Phone: {this.props.eventPhone}</p>
          <p>Price: {this.props.eventPrice}</p>
          <p>Rating: {this.props.eventRating}</p>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EventCard;
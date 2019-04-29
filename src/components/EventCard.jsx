import React from 'react';
import { Button, Modal, Segment, Icon } from 'semantic-ui-react'


class EventCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stars = this.props.eventRating.split("");
    let renderedStars = stars.map(star => <Icon name='star'/>); 
    return (
      <Modal trigger={<Segment.Group horizontal> 
                        <Segment>{this.props.eventName}</Segment>
                        <Segment style={{color: "green"}}>{this.props.eventPrice}</Segment> 
                        <Segment style={{color: "gold"}}>{renderedStars}</Segment>
                      </Segment.Group>}>
        <Modal.Header>{this.props.eventName}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>{this.props.eventDescription}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EventCard;
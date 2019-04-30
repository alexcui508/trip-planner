import React from 'react';
import { Accordion, Icon, Label, Grid} from 'semantic-ui-react';
import EventCard from './EventCard';

class DayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    let renderedEvents = this.props.events.map((event) => <ul><EventCard eventsDate={this.props.eventsDate} eventName={event.business.name}
      eventPhone={event.business.phone} eventPrice={event.business.price} eventRating={event.business.rating} 
      eventID={event.business.id} /></ul>);
    const { activeIndex } = this.state;
    return (
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
        <Grid>
          <Grid.Row>
          <Icon name='dropdown' />
          {this.props.eventsDate}
            <Grid.Column floated='left'> 
            </Grid.Column>
            <Grid.Column floated='right'>
              <Label circular color="blue">
                {renderedEvents.length}
              </Label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            {renderedEvents}
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default DayCard;
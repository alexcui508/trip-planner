import React from 'react';
import { 
  Accordion, 
  Icon, 
  Label, 
  Grid, 
} from 'semantic-ui-react';
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

  getRenderedEvents = () => {
    const { eventsWithTimes, eventDate, deleteSelectedEvent } = this.props;

    var renderedEvents = [];

    const sortedEventsWithTimes = {};
    Object.keys(eventsWithTimes).sort((time1, time2) => {
      return new Date('1970/01/01 ' + time1) - new Date('1970/01/01 ' + time2);
    }).forEach((key) => {
      sortedEventsWithTimes[key] = eventsWithTimes[key];
    });

    for (const eventTime in sortedEventsWithTimes) {
      const event = sortedEventsWithTimes[eventTime];
      renderedEvents.push(<EventCard eventDate={eventDate} eventInfo={event.business} eventTime={eventTime} deleteSelectedEvent={deleteSelectedEvent} />);
    }

    return renderedEvents;
  }

  render() {
    const { activeIndex } = this.state;
    const { eventDate } = this.props;

    const renderedEvents = this.getRenderedEvents();

    return (
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Label.Group size="big">
            <Label> 
              <Icon name="dropdown"/>
              {eventDate}
            </Label>
            <Label color="teal">
              {renderedEvents.length}
            </Label>
          </Label.Group>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={15}>
                {renderedEvents}  
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default DayCard;
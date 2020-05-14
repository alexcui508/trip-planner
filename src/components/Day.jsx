import React from 'react';
import { 
  Accordion, 
  Icon, 
  Label, 
  Grid, 
} from 'semantic-ui-react';
import EventCard from './EventCard';

class Day extends React.Component {
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
    const { eventsWithTimes, date, deleteSelectedEvent } = this.props;

    const orderedEventsWithTimes = {};
    Object.keys(eventsWithTimes).sort((startTime1, startTime2) => {
      return new Date('1970/01/01 ' + startTime1) - new Date('1970/01/01 ' + startTime2);
    }).forEach((startTime) => {
      orderedEventsWithTimes[startTime] = eventsWithTimes[startTime];
    });

    var renderedEvents = [];
    for (const startTime in orderedEventsWithTimes) {
      const orderedEndTimes = Object.keys(orderedEventsWithTimes[startTime]).sort((endTime1, endTime2) => {
        return new Date('1970/01/01 ' + endTime1) - new Date('1970/01/01 ' + endTime2);
      });

      orderedEndTimes.forEach((endTime) => {
        const addedEvent = orderedEventsWithTimes[startTime][endTime];
        renderedEvents.push(
          <EventCard 
            date={date} 
            businessInfo={addedEvent} 
            startTime={startTime} 
            endTime={endTime} 
            deleteSelectedEvent={deleteSelectedEvent} 
          />
        );
      });
    }

    return renderedEvents;
  }

  render() {
    const { activeIndex } = this.state;
    const { date } = this.props;

    const renderedEvents = this.getRenderedEvents();

    return (
      <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Label.Group size="big">
            <Label> 
              <Icon name="dropdown"/>
              {date}
            </Label>
            <Label color="teal">
              {renderedEvents.length}
            </Label>
          </Label.Group>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column width={12}>
                {renderedEvents}  
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default Day;
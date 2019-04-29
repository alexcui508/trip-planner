import React from 'react';
import DayCard from './DayCard';
import EventData from './data/EventData';
import { Header, Icon } from 'semantic-ui-react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: {}
    };
  }

  groupEvents() {
    let events = EventData.events;
    let sortedEvents = events.sort((event1, event2) => { return event1.eventDate.getTime() - event2.eventDate.getTime() });
    for (let i = 0; i < sortedEvents.length; i++) {
      let event = sortedEvents[i];
      this.state.groups[event.eventDate.toDateString()] = [];
    }
    for (let i = 0; i < sortedEvents.length; i++) {
      let event = sortedEvents[i];
      this.state.groups[event.eventDate.toDateString()].push(event);
    }
    let groupedEvents = Object.values(this.state.groups);
    return groupedEvents;
  }

  render() {
    let groupedEvents = this.groupEvents();
    let renderedDays = [];
    for (let i = 0; i < groupedEvents.length; i++) {
      let eventGroup = groupedEvents[i];
      renderedDays.push(<DayCard events={eventGroup} eventsDate={Object.keys(this.state.groups)[i]} />);
    }
    return (
        <div>
          <br></br>
          <Header as='h1'>
            <Icon name='calendar alternate outline' />
            <Header.Content>
              Calendar
        <Header.Subheader>Plan your trip</Header.Subheader>
            </Header.Content>
          </Header>
          <br></br>
          {renderedDays}
        </div>
    );
  }
}

export default Calendar;
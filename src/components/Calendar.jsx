import React from 'react';
import DayCard from './DayCard';
import { Header, Icon } from 'semantic-ui-react';
import Timeline from 'react-timeline-semantic-ui';

class Calendar extends React.Component {
  groupEvents() {
    let events = this.props.selected;
    let sortedEvents = events.sort((event1, event2) => { return event1.date.getTime() - event2.date.getTime() });
    let initial = {};
    for (let i = 0; i < sortedEvents.length; i++) {
      let eventDate = sortedEvents[i].date.toDateString();
      initial[eventDate] = [];
    }
    for (let i = 0; i < sortedEvents.length; i++) {
      let event = sortedEvents[i];
      let eventDate = event.date.toDateString();
      initial[eventDate].push(event);
    }
    return initial;
  }

  render() {
    let groupedEvents = Object.values(this.groupEvents());
    let renderedDays = [];
    for (let i = 0; i < groupedEvents.length; i++) {
      let eventGroup = groupedEvents[i];
      renderedDays.push(<DayCard events={eventGroup} eventsDate={Object.keys(this.groupEvents())[i]} />);
    }
    return (
        <div>
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
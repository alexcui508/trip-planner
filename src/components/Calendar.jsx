import React from 'react';
import Day from './Day';
import { 
  Header, 
  Container,
  Grid,
  Divider,
} from 'semantic-ui-react';

class Calendar extends React.Component {
  groupEvents = () => {
    const { selected } = this.props;

    const sortedEvents = selected.sort((event1, event2) => { return event1.date.getTime() - event2.date.getTime() });

    var groupedEvents = {};

    sortedEvents.forEach((event) => {
      let eventDate = event.date.toDateString();
      groupedEvents[eventDate] = {};
    }); 

    sortedEvents.forEach((event) => {
      let eventDate = event.date.toDateString();
      groupedEvents[eventDate][event.time] = event;
    });

    return groupedEvents;
  }

  getRenderedDays = () => {
    var renderedDays = [];
    const groupedEvents = this.groupEvents();

    for (const eventDate in groupedEvents) {
      const eventsWithTimes = groupedEvents[eventDate];
      renderedDays.push(<Day eventsWithTimes={eventsWithTimes} eventDate={eventDate} deleteSelectedEvent={this.props.deleteSelectedEvent} />);
    }

    return renderedDays;
  }

  getTimeRange = () => {
    const { dates } = this.props;
    
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    return {
      start: startDate.toDateString(),
      end: endDate.toDateString(),
    }
  }

  render() {
    const renderedDays = this.getRenderedDays();
    const timeRange = this.getTimeRange();
    const RESULTS_HEIGHT = (window.innerHeight - 68).toString() + 'px';

    return (
      <Container>
        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Header size="huge">Your Itinerary</Header>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <Header size="small">Start Date</Header> 
                    </Grid.Column>
                    <Grid.Column width={14} style={{marginBottom: '10px'}}>
                      <Header size="small" color="grey">{timeRange.start}</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header size="small">End Date</Header> 
                    </Grid.Column>
                    <Grid.Column width={14}>
                      <Header size="small" color="grey">{timeRange.end}</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Divider fitted />
        <Container style={{ 'overflowY': 'auto', 'overflowX': 'hidden', height: RESULTS_HEIGHT, paddingLeft: '20px'}}>
          {renderedDays}
        </Container>
      </Container>
    );
  }
}

export default Calendar;
import React from 'react';
import Day from './Day';
import { 
  Header, 
  Container,
  Grid,
  Divider,
} from 'semantic-ui-react';
import { Ghost } from 'react-kawaii';

class Calendar extends React.Component {
  getRenderedDays = () => {
    const { selected, deleteSelectedEvent } = this.props;

    var renderedDays = [];

    for (const eventDate in selected) {
      const eventsWithTimes = selected[eventDate];
      if (Object.keys(eventsWithTimes).length > 0) {
        renderedDays.push(
          <Day 
            eventsWithTimes={eventsWithTimes} 
            eventDate={eventDate} 
            deleteSelectedEvent={deleteSelectedEvent} 
          />
        );
      }
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
          {renderedDays.length === 0 && 
            <Container textAlign='center' style={{marginTop: '25%'}}>
              <Ghost 
                size={200} 
                mood="sad" 
                color="#E0E4E8"
              />
              <Header as='h1'>
                No events so far
                <Header.Subheader>
                  Add an event on the right and it will show up here.
                </Header.Subheader>
              </Header>
            </Container>
          }
          {renderedDays}
        </Container>
      </Container>
    );
  }
}

export default Calendar;
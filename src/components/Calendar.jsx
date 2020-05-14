import React from 'react';
import Day from './Day';
import GoogleExportButton from './GoogleExportButton';
import { 
  Header, 
  Container,
  Grid,
  Divider,
  List,
} from 'semantic-ui-react';
import { Ghost } from 'react-kawaii';

class Calendar extends React.Component {
  getRenderedDays = () => {
    const { selected, deleteSelectedEvent } = this.props;

    var renderedDays = [];
    var orderedSelectedEvents = {};
    Object.keys(selected).sort((date1, date2) => { return new Date(date1) - new Date(date2); }).forEach((date) => {
      orderedSelectedEvents[date] = selected[date];
    });

    for (const date in orderedSelectedEvents) {
      const eventsWithTimes = orderedSelectedEvents[date];
      if (Object.keys(eventsWithTimes).length > 0) {
        renderedDays.push(
          <Day 
            eventsWithTimes={eventsWithTimes} 
            date={date} 
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
    const { selected } = this.props;
    const renderedDays = this.getRenderedDays();
    const timeRange = this.getTimeRange();
    const RESULTS_HEIGHT = (window.innerHeight - 68).toString() + 'px';

    return (
      <Container>
        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
          <Grid container stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Header size="huge">
                  Your Itinerary
                </Header>
                <List>
                  <List.Item>
                    <List.Header size="small">Start Date</List.Header>
                    {timeRange.start}
                  </List.Item>
                  <List.Item>
                    <List.Header size="small">End Date</List.Header>
                    {timeRange.end}
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column verticalAlign="bottom">
                <GoogleExportButton selected={selected} />
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
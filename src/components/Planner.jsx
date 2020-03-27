import React from 'react';
import Calendar from './Calendar';
import Search from './Search';
import { Grid } from 'semantic-ui-react'
import StartMenu from './StartMenu';
import { BrowserRouter as Router, Route } from "react-router-dom";

class Planner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvents: [],
      location: {},
      dates: [],
    }
  }

  addBusinessToPlanner = (business, date, time) => {
    const { selectedEvents } = this.state; 
    this.setState({
      selectedEvents: [...selectedEvents, { business: business, date: date, time: time }],
    });
  }

  deleteSelectedEvent = (eventDate, eventTime) => {
    const { selectedEvents } = this.state; 
    var selectedEventsCopy = [...selectedEvents];

    var indexToRemove = -1;
    selectedEventsCopy.forEach((selectedEvent, i) => {
      if (selectedEvent.date.toDateString() === eventDate && selectedEvent.time === eventTime) {
        indexToRemove = i;
      }
    });

    if (indexToRemove > -1) {
      selectedEventsCopy.splice(indexToRemove, 1);
      this.setState({
        selectedEvents: selectedEventsCopy,
      });
    }
  }

  startPlan = (location, dates) => {
    this.setState({ location: location, dates: dates });
  }

  render() {
    const { selectedEvents, dates, location } = this.state; 

    return (
      <Router>
        <Route exact path="/" render={() => <StartMenu startPlan={this.startPlan} />}/>
        <Route path="/plan" render={() => (
          <Grid columns={2} divided style={{height: '100vh'}}>
            <Grid.Row>
              <Grid.Column>
                <Calendar dates={dates} selected={selectedEvents} deleteSelectedEvent={this.deleteSelectedEvent}/>
              </Grid.Column>
              <Grid.Column>
                <Search dates={dates} location={location} addBusiness={this.addBusinessToPlanner} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}/>
      </Router>
    )
  }
}

export default Planner;
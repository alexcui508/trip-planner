import React from 'react';
import Calendar from './Calendar';
import Search from './Search';
import { Grid } from 'semantic-ui-react'
import StartMenu from './StartMenu';
import { HashRouter as Router, Route } from "react-router-dom";

class Planner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvents: {},
      location: {},
      dates: [],
    }
  }

  addBusinessToPlanner = (business, date, time) => {
    const { selectedEvents } = this.state;

    const newBusiness = { business: business, date: date, time: time };

    var selectedEventsCopy = {...selectedEvents};
    if (!selectedEvents.hasOwnProperty(date.toDateString())) {
      selectedEventsCopy[date.toDateString()] = {};
    } 
    selectedEventsCopy[date.toDateString()][time] = newBusiness;

    var orderedSelectedEventsCopy = {};
    Object.keys(selectedEventsCopy).sort((date1, date2) => { return new Date(date1) - new Date(date2) }).forEach(function(key) {
      orderedSelectedEventsCopy[key] = selectedEventsCopy[key];
    });

    this.setState({
      selectedEvents: orderedSelectedEventsCopy,
    });
  }

  deleteSelectedEvent = (eventDate, eventTime) => {
    const { selectedEvents } = this.state; 

    var selectedEventsCopy = {...selectedEvents};
    delete selectedEventsCopy[eventDate][eventTime];

    this.setState({
      selectedEvents: selectedEventsCopy,
    });
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
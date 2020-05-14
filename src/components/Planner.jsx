import React from 'react';
import Calendar from './Calendar';
import Search from './Search';
import { Grid } from 'semantic-ui-react'
import StartMenu from './StartMenu';
import { HashRouter as Router, Route } from 'react-router-dom';

class Planner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvents: {},
      location: {},
      dates: [],
    }
  }

  addBusinessToPlanner = (business, date, startTime, endTime) => {
    const { selectedEvents } = this.state;

    var selectedEventsCopy = {...selectedEvents};
    const dateKey = date.toDateString();
    if (!selectedEventsCopy.hasOwnProperty(dateKey)) {
      selectedEventsCopy[dateKey] = {};
    }
    if (!selectedEventsCopy[dateKey].hasOwnProperty(startTime)) {
      selectedEventsCopy[dateKey][startTime] = {};
    } 

    selectedEventsCopy[dateKey][startTime][endTime] = business;

    this.setState({
      selectedEvents: selectedEventsCopy,
    });
  }

  deleteSelectedEvent = (date, startTime, endTime) => {
    const { selectedEvents } = this.state; 

    var selectedEventsCopy = {...selectedEvents};
    delete selectedEventsCopy[date][startTime][endTime];
    if (Object.keys(selectedEventsCopy[date][startTime]).length === 0) {
      delete selectedEventsCopy[date][startTime];
    }
    if (Object.keys(selectedEventsCopy[date]).length === 0) {
      delete selectedEventsCopy[date];
    }

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
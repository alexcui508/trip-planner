import React from 'react';
import Calendar from './Calendar';
import Search from './Search';
import { Grid } from 'semantic-ui-react'
import StartMenu from './StartMenu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


let DATES = [new Date("2019-12-16"), new Date("2019-12-17"), new Date("2019-12-18")];
let LOCATION = {
  lat: 37.871853,
  lon: -122.258423
};

class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.addBusinessToPlanner = this.addBusinessToPlanner.bind(this);
    this.startPlan = this.startPlan.bind(this);
    this.state = {
      selectedEvents: [],
      location: {},
      dates: [],
    }
  }

  addBusinessToPlanner(business, date) {
    this.setState({
      selectedEvents: [...this.state.selectedEvents, { business: business, date: date }],
    }, () => { console.log(this.state.selectedEvents) });
  }
  startPlan(location, dates) {
    console.log(location, dates);
    this.setState({ location: location, dates: dates });
  }
  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <StartMenu startPlan={this.startPlan} />}/>
        <Route path="/plan" render={() => (<Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Calendar />
            </Grid.Column>
            <Grid.Column>
              <Search dates={this.state.dates} location={this.state.location} addBusiness={this.addBusinessToPlanner} />
            </Grid.Column>
          </Grid.Row>
        </Grid>)}/>
      </Router>
    )
  }
}

export default Planner;
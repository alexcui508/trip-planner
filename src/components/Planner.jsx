import React from 'react';
import Calendar from './Calendar';
import Search from './Search';
import { Grid, Divider } from 'semantic-ui-react'
import StartMenu from './StartMenu';
import { HashRouter as Router, Route } from "react-router-dom";

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

  addBusinessToPlanner = (business, date) => {
    const { selectedEvents } = this.state; 
    this.setState({
      selectedEvents: [...selectedEvents, { business: business, date: date }],
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
                <Calendar selected={selectedEvents}/>
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
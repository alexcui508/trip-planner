import React from 'react';
import Calendar from './Calendar';
import Search from './Search';
import { Grid } from 'semantic-ui-react'

let DATES = [new Date("2019-12-16"), new Date("2019-12-17"), new Date("2019-12-18")];
let LOCATION = {
  lat: 37.871853,
  lon: -122.258423
};

class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.addBusinessToPlanner = this.addBusinessToPlanner.bind(this);
    this.state = {
      selectedEvents: []
    }
  }

  addBusinessToPlanner(business, date) {
    this.setState({
      selectedEvents: [...this.state.selectedEvents, {business: business, date: date}],
    }, ()=>{console.log(this.state.selectedEvents)});
  }
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Calendar selected={this.state.selectedEvents}/>
          </Grid.Column>
          <Grid.Column>
            <Search dates={DATES} location={LOCATION} addBusiness={this.addBusinessToPlanner}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Planner;
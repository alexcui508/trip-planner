import React from 'react';
import { Segment, Grid, Button, Form, Header } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import Geosuggest from 'react-geosuggest';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



function getDates(startDate, endDate) {
  let dates = [],
      currentDate = startDate,
      addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

class StartMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesRange: '',
      location: null,
      dateCheck: true,
      placeCheck: true,
    }
    this.handleStartPlan = this.handleStartPlan.bind(this);

  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value, 
        dateCheck: value.split(" - ").length < 2 ? true : value.split(" - ")[1].length === 0 });
    }
  }

  handleStartPlan(e) {
    let dateStrings = this.state.datesRange.split(' - ');
    function format(s) {
      let l = s.split('-');
      let temp = l[0];
      l[0] = l[1];
      l[1] = temp;
      return l.join('-');
    }
    let start = new Date(format(dateStrings[0]));
    let end = new Date(format(dateStrings[1]));

    let dates = getDates(start, end);
    this.props.startPlan(this.state.location, dates);
  }


  render() {
    return (
      <div className='login-form'>
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
        .login-form{
          height:100vh;
        }
        body {
          background-image: url("https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg");
          background-size: cover;
          /* Resize the background image to cover the entire container */
        }
    `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment>
              <Header>Plan Your Next Adventure.</Header>
              <Form size={"large"}>
                <DatesRangeInput
                  name="datesRange"
                  placeholder="From - To"
                  value={this.state.datesRange}
                  iconPosition="left"
                  onChange={this.handleChange}
                />
                <Geosuggest onSuggestSelect={s => {
                  if (s)
                    this.setState({placeCheck: false, location: {lat: s.location.lat, lon: s.location.lng}})}}/>
                <br/>
                <Link to="/plan">
                <Button onClick={this.handleStartPlan} disabled={this.state.dateCheck || this.state.placeCheck} color='teal' fluid size='large'>
                  Start Planning!
                </Button>
                </Link>

              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default StartMenu;
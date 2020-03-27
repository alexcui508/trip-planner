import React from 'react';
import { Segment, Grid, Button, Form, Header } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import Geosuggest from 'react-geosuggest';
import { Link } from 'react-router-dom';
import BackgroundSlider from 'react-background-slider';
import travel1 from '../images/travel1.jpg';
import travel2 from '../images/travel2.jpg';
import travel3 from '../images/travel3.jpg';
import travel4 from '../images/travel4.jpg';
import travel5 from '../images/travel5.jpg';
import travel6 from '../images/travel6.jpg';
import travel7 from '../images/travel7.jpg';

class StartMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesRange: '',
      location: null,
      dateCheck: true,
      placeCheck: true,
    }
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value, 
        dateCheck: value.split(" - ").length < 2 ? true : value.split(" - ")[1].length === 0 });
    }
  }

  getDates = (startDate, endDate) => {
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
  }

  getBackground = () => {
    const slideImages = [
      travel1,
      travel2,
      travel3,
      travel4,
      travel5,
      travel6,
      travel7,
    ];

    return (
      <BackgroundSlider
        images={slideImages}
        duration={7} 
        transition={2} 
      />
    );
  }

  handleStartPlan = (e) => {
    const { datesRange, location } = this.state;
    const { startPlan } = this.props;

    let dateStrings = datesRange.split(' - ');
    function format(s) {
      let l = s.split('-');
      let temp = l[0];
      l[0] = l[1];
      l[1] = temp;
      return l.join('-');
    }
    let start = new Date(format(dateStrings[0]));
    let end = new Date(format(dateStrings[1]));

    let dates = this.getDates(start, end);
    startPlan(location, dates);
  }

  stripLocationName = (location) => {
    return location.split(',')[0];
  }

  render() {
    const { datesRange, dateCheck, placeCheck } = this.state;
    const renderedBackground = this.getBackground();

    return (
      <div style={{height: '100vh'}}>
        {renderedBackground}
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment>
              <Header>Plan Your Next Adventure.</Header>
              <Form size={"large"}>
                <DatesRangeInput
                  name="datesRange"
                  placeholder="From - To"
                  value={datesRange}
                  iconPosition="left"
                  onChange={this.handleChange}
                />
                <Geosuggest onSuggestSelect={selected => {
                  if (selected) {
                    this.setState({
                      placeCheck: false, 
                      location: {
                        lat: selected.location.lat, 
                        lon: selected.location.lng,
                        name: this.stripLocationName(selected.label),
                      }
                    })
                  }
                }}/>
                <br/>
                <Button as={Link} to="/plan" onClick={this.handleStartPlan} disabled={dateCheck || placeCheck} color='teal' fluid size='large'>
                  Start Planning!
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default StartMenu;
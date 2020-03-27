import React from 'react';
import { 
  Segment, 
  Grid, 
  Image, 
  Button, 
  Icon, 
  Dropdown, 
} from 'semantic-ui-react';
import { TimeInput } from 'semantic-ui-calendar-react';

class SearchResultCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateIndex: -1, 
      time: '',
    }
  }

  handleSelect = (e) => {
    const { dateIndex, time } = this.state;
    const { addBusiness, business, dates } = this.props;

    addBusiness(business, dates[dateIndex], time);
  }

  convertRating = () => {
    const { business } = this.props;

    var renderedStars = [];
    var numStars = business.rating;
    var addHalf = false;

    if (!Number.isInteger(numStars)) {
      numStars -= 0.5;
      addHalf = true;
    }

    for (let i = 0; i < numStars; i++) {
      renderedStars.push(<Icon name='star' color='yellow' />);
    }

    if (addHalf) {
      renderedStars.push(<Icon name='star half' color='yellow' />);
    }

    return renderedStars;
  }

  render() {
    const { time, dateIndex } = this.state;
    const { business, dates } = this.props;

    const localeDates = dates.map(d => d.toLocaleDateString());
    const renderedStars = this.convertRating();

    return (
      <Segment raised style={{ marginRight: '10px' }}>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={6} >
              <Image src={business.image_url} style={{ objectFit: "cover", width: "100%", height: "200px" }} />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3>{business.name}</h3>
              <div style={{ float: "left", width:"50%" }}>
                <span>{business.categories.map(v => v.title).join(", ")}</span> <br />
                {business.price && 
                  <>
                    <b style={{color: "green"}}>{business.price}</b><br/>
                    {renderedStars}
                  </>
                }
                <div style={{ position: "absolute", bottom: '0', width:"50%"}}>
                {business.display_phone} <br />
                {business.location.display_address.join(", ")}
                <br /><br />
                </div>
              </div>
              <div style={{ float: "right" }}>
                {business.review_count} reviews 
                <br />
                <br />
                <Dropdown
                  placeholder='Select Date'
                  fluid
                  selection
                  options={localeDates.map((v, i) => ({ key: business.id + v, text: v, value: i }))}
                  style={{ marginBottom: "5px" }}
                  onChange={(e, data) => this.setState({ dateIndex: data.value })}
                />
                <TimeInput 
                  name="time"
                  value={time}
                  onChange={(e, data) => this.setState({ time: data.value })}
                  clearable
                  onClear={() => {this.setState({ time: '' })}}
                  timeFormat="AMPM"
                  icon={false}
                  placeholder="Select Time"
                  style={{ marginBottom: "5px" }}
                />
                <Button icon color="teal" labelPosition="right" disabled={dateIndex === -1 || time === ''} onClick={this.handleSelect}>
                  Add to plan
                  <Icon name="add"></Icon>
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}


export default SearchResultCard;
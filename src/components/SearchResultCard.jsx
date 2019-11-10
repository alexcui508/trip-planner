import { Segment, Grid, Image, Button, Icon, Dropdown, Placeholder } from 'semantic-ui-react';
import React from 'react';

class SearchResultCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {dateIndex: -1, disable: true}
  }
  handleSelect(e) {
    this.props.addBusiness(this.props.business, this.props.dates[this.state.dateIndex]);
  }
  render() {
    let business = this.props.business;
    let dates = this.props.dates.map(d => d.toLocaleDateString());
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
                  </>
                }
                <div style={{ position: "absolute", bottom: '0', width:"50%"}}>
                {business.display_phone} <br />
                {business.location.display_address}
                <br /><br />
                </div>
              </div>
              <div style={{ float: "right" }}>
                <b>{business.rating}/5 </b><br />
                {business.review_count} reviews <br />
                <br />
                <Dropdown
                  placeholder='Select Date'
                  fluid
                  selection
                  options={dates.map((v, i) => ({ key: business.id + v, text: v, value: i }))}
                  style={{ marginBottom: "5px" }}
                  onChange={(e, data) => {this.setState({dateIndex: data.value, disable: false})}}
                />
                <Button primary icon labelPosition="right" disabled={this.state.disable} onClick={this.handleSelect}>
                  Add to plan
                  <Icon name="add"></Icon>
                </Button>
              </div>
              <br />
             
              <br />

            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Segment>
    )
  }
}


export default SearchResultCard;
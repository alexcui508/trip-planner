import React from 'react';
import { Input, Container } from 'semantic-ui-react';
import SearchResultCard from "./SearchResultCard";

let REACT_APP_YELP_API_KEY = '1oVKZrEwzseUCh8sk57ORW4vBLSPDpk7tMDgrLSzsBVQ554QHwHKoghKGRNLhiVTajkH3zD8vuxepiWhu9GMCwglYwZqUiYlGrR9__0DMsVxEuTyL1iITpqI8qHGXHYx';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
    this.state = { query: '', results: [] };
  }
  yelp_url(query) {
    return "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + query +
      '&latitude=' + this.props.location.lat.toString() +
      '&longitude=' + this.props.location.lon.toString();
  }

  searchHandler(event) {
    fetch(this.yelp_url(this.state.query), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + REACT_APP_YELP_API_KEY
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          results: data.businesses
        });
      });
  }
  render() {
    let RESULTS_HEIGHT = (window.innerHeight - 68).toString() + 'px';
    return (
      <Container >
        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <Input action={{
            color: 'teal',
            labelPosition: 'right',
            icon: 'search',
            content: 'Search',
            onClick: this.searchHandler
          }}
            placeholder={"Search"}
            onChange={e => { this.setState({ query: e.target.value }) }} />
        </div>
        <Container style={{ overflow: 'auto', maxHeight: RESULTS_HEIGHT, paddingTop: '10px', paddingBottom: '10px' }}>
          <Container>
            {this.state.results.map((value, i) => (
              <SearchResultCard key={i.toString()} business={value} dates={this.props.dates} addBusiness={this.props.addBusiness} />
            ))}
          </Container>
        </Container>
      </Container>
    )
  }
}

export default Search;
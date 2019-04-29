import React from 'react';
import Search from './Search';

let REACT_APP_YELP_API_KEY = '1oVKZrEwzseUCh8sk57ORW4vBLSPDpk7tMDgrLSzsBVQ554QHwHKoghKGRNLhiVTajkH3zD8vuxepiWhu9GMCwglYwZqUiYlGrR9__0DMsVxEuTyL1iITpqI8qHGXHYx';

class BusinessDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      details: [],
    };
  }

  yelp_detailed_url(id) {
    return "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id;
  }

  searchHandler(event) {
    fetch(this.yelp_detailed_url(this.state.id), {
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
          details: data,
        });
      });
  }

  render() {

  }
}

export default BusinessDetail;
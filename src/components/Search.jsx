import React from 'react';
import Geosuggest from 'react-geosuggest';
import { 
  Input, 
  Container, 
  Button, 
  Grid, 
  Divider, 
  Header, 
  Icon, 
  Placeholder, 
  Segment, 
  Dimmer, 
  Loader,
  Form,
  Modal,
} from 'semantic-ui-react';
import SearchResultCard from "./SearchResultCard";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
    this.state = { 
      query: '', 
      results: [],
      loading: false,
      settingsModalOpen: false,
    };
  }

  getSelectedLocation = () => {
    return this.state.location ? this.state.location : this.props.location;
  }

  getYelpURL = (query) => {
    const location = this.getSelectedLocation();
    return 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + query + '&latitude=' + location.lat.toString() + '&longitude=' + location.lon.toString();
  }

  searchHandler = (event) => {
    const { query, loading } = this.state;
    this.setState({
      loading: true,
    }, () => {
      fetch(this.getYelpURL(query), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
      }
    }).then(response => response.json())
      .then(data => {
        this.setState({
          results: data.businesses,
          loading: false,
        });
      });
    });
  }

  clearResults = () => {
    this.setState({
      query: '',
      results: [],
    });
  }

  getPlaceholderCards = () => {
    let cards = [];
    for (let i = 0; i < 20; i++) {
      cards.push(
        <Segment key={i} raised style={{ marginRight: '10px' }}>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={6} >
                <Placeholder>
                  <Placeholder.Image style={{ objectFit: "cover", width: "100%", height: "200px" }}/>
                </Placeholder>
              </Grid.Column>
              <Grid.Column width={10}>
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
    return cards;
  }

  saveSettings = () => {
    return 
  }

  stripLocationName = (location) => {
    return location.split(',')[0];
  }

  render() {
    const { query, results, loading, settingsModalOpen } = this.state;
    const { dates, addBusiness } = this.props;

    const RESULTS_HEIGHT = (window.innerHeight - 68).toString() + 'px';
    const renderedLoadingResults = this.getPlaceholderCards();
    const location = this.getSelectedLocation();

    return (
      <Container >
        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
          <Header size="large">
            Things to do around {location.name}
          </Header>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Input 
                  style={{ marginRight: '10px', marginTop: '10px' }}
                  action={{
                    color: 'teal',
                    icon: 'search',
                    onClick: this.searchHandler,
                    disabled: !query,
                  }}
                  value={query}
                  placeholder={"Search"}
                  onChange={e => { this.setState({ query: e.target.value }) }} 
                />
                <Button
                  style={{ marginRight: '10px', marginTop: '10px' }}
                  icon="idea"
                  labelPosition="right"
                  color="teal"
                  content="What's popular?"
                  onClick={() =>
                    this.setState({
                      query: '',
                    }, this.searchHandler)
                  }
                />
                {results && results[0] &&
                  <Button
                    style={{ marginRight: '10px', marginTop: '10px' }}
                    icon="remove circle"
                    labelPosition="right"
                    color="teal"
                    content="Clear results"
                    onClick={this.clearResults}
                  />
                }
                <Modal trigger={
                  <Button 
                    style={{ marginRight: '10px', marginTop: '10px' }}
                    color="teal"
                    floated="right"
                    icon="setting"
                  />
                }>
                  <Modal.Header>Settings</Modal.Header>
                  <Modal.Content>
                  <Form size="large">
                    <Geosuggest onSuggestSelect={selected => {
                      if (selected) {
                        this.setState({
                          location: {
                            lat: selected.location.lat, 
                            lon: selected.location.lng,
                            name: this.stripLocationName(selected.label),
                          }
                        })
                      }
                    }}/>
                    </Form>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Divider fitted />
        {loading && renderedLoadingResults}
        {results && results[0] && 
           <Container style={{ overflow: 'auto', maxHeight: RESULTS_HEIGHT, paddingTop: '10px', paddingBottom: '10px' }}>
          <Container>
            {results.map((value, i) => (
              <SearchResultCard key={i.toString()} business={value} dates={dates} addBusiness={addBusiness} />
            ))}
          </Container>
        </Container>
        }
      </Container>
    )
  }
}

export default Search;
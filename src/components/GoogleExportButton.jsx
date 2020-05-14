import React from 'react';
import { 
  Button, 
  Icon,
} from 'semantic-ui-react';

class GoogleExportButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isSignedIn: false,
      loading: false,
      exported: false,
    };
  }

  componentDidMount() {
    window.gapi.load('client:auth2', this.initClient);
  }

  initClient = () => {
    window.gapi.client.init({
      apiKey: 'AIzaSyCZX3V4y7EDiZTfiGi6Ur8e_8c-e4Fz95s',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      clientId: '383149879152-9ado61dvk1dtvujfnda604agm88rfnll.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar',
    }).then(() => {
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  exportToCalendar = () => {
    var batch = window.gapi.client.newBatch();
    const formattedEvents = this.formatEvents();
    formattedEvents.forEach((event) => {
      batch.add(window.gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
      }));
    });

    batch.then(() => {
      this.setState({
        loading: false,
        exported: true,
      });

      setTimeout(() => {
        this.setState({
          exported: false,
        });
      }, 2000);
    });
  }

  updateSigninStatus = (isSignedIn) => {
    this.setState({
      isSignedIn: isSignedIn,
    });
  }

  handleAuthClick = () => {
    const { isSignedIn } = this.state;
    
    if (!isSignedIn) {
      window.gapi.auth2.getAuthInstance().signIn().then(() => {
        this.setState({
          loading: true,
        }, this.exportToCalendar);
      });
    } else {
      this.setState({
        loading: true,
      }, this.exportToCalendar);
    }
  }

  formatEvents = () => {
    const { selected } = this.props;
    var formattedEvents = [];

    for (const date in selected) {
      for (const startTime in selected[date]) {
        for (const endTime in selected[date][startTime]) {
          const business = selected[date][startTime][endTime];
          const eventStart = new Date(`${date} ${startTime}`).toISOString();
          const eventEnd = new Date(`${date} ${endTime}`).toISOString();
          const formattedEvent = {
            'summary': business.name,
            'location': business.location.display_address.join(", "),
            'start': {
              'dateTime': eventStart,
            },
            'end': {
              'dateTime': eventEnd,
            },
          };
          formattedEvents.push(formattedEvent);
        }
      }
    }

    return formattedEvents;
  }

  render() {
    const { loading, exported } = this.state;
    const { selected } = this.props;

    return (
      <Button 
        icon 
        loading={loading} 
        labelPosition='left' 
        color='teal' 
        floated='right' 
        onClick={this.handleAuthClick} 
        disabled={Object.keys(selected).length === 0}
      >
        <Icon name={exported ? 'checkmark' : 'upload'} />
        Export Itinerary
      </Button>
    );
  }
}

export default GoogleExportButton;
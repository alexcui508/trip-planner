import React from 'react';
import { Grid, Image, Icon, Header, List, Container, Feed } from 'semantic-ui-react';
import Map from './Map';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class BusinessDetail extends React.Component {
  getRenderedPhotos = () => {
    const { details } = this.props;
    let photos = details.photos;
    let renderedPhotos = photos.map((photo) =>
      <Image src={photo} verticalAlign='middle' style={{height: '400px', width: 'auto'}}/>
    );
    return renderedPhotos;
  }

  getAddress = () => {
    const { details } = this.props;
    let full_address = details.location.display_address;
    let address = [];
    for (let i = 0; i < full_address.length - 1; i++) {
      address.push(full_address[i]);
      address.push(", ");
    }
    address.push(full_address[full_address.length - 1]);
    return address;
  }

  getCategories = () => {
    const { details } = this.props;
    let categories = details.categories;
    let titles = [];
    for (let i = 0; i < categories.length - 1; i++) {
      let categoryTitle = categories[i].title;
      titles.push(categoryTitle);
      titles.push(", ");
    }
    titles.push(categories[categories.length - 1].title);
    return titles;
  }

  getOperatingDays = () => {
    const { details } = this.props;
    const availabilities = details.hours[0]['open'];

    var operatingDays = {
      'Monday': [],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': [],
      'Sunday': [],
    };

    var numToDay = new Array(7);
    numToDay[0] = 'Monday';
    numToDay[1] = 'Tuesday';
    numToDay[2] = 'Wednesday';
    numToDay[3] = 'Thursday';
    numToDay[4] = 'Friday';
    numToDay[5] = 'Saturday';
    numToDay[6] = 'Sunday';

    availabilities.forEach(availability => {
      const operatingDay = numToDay[availability.day];
      operatingDays[operatingDay].push(availability);
    });
    
    return operatingDays;
  }

  convert24to12 = (hour24) => {
    var hour = parseInt(hour24.slice(0, 2));
    const minutes = hour24.slice(2, 5);
    var amOrPm = 'AM';
    if (hour > 12) {
      hour %= 12;
      amOrPm = 'PM';
    }
    return `${hour.toString()}:${minutes} ${amOrPm}`;
  }

  getFormattedHoursString = (start, end) => {
    const open = this.convert24to12(start);
    const close = this.convert24to12(end);
    return `${open} - ${close}`;
  }

  getFormattedHours = () => {
    const operatingDays = this.getOperatingDays();
    var daysToHours = {
      'Monday': '',
      'Tuesday': '',
      'Wednesday': '',
      'Thursday': '',
      'Friday': '',
      'Saturday': '',
      'Sunday': '',
    };

    Object.keys(operatingDays).forEach(day => {
      const operatingHours = operatingDays[day];
      var hoursString = '';
      var availability;
      var formattedHoursString;
      if (operatingHours.length === 0) {
        hoursString = 'CLOSED';
      } else {
        for (let i = 0; i < operatingHours.length - 1; i++) {
          availability = operatingHours[i];
          formattedHoursString = this.getFormattedHoursString(availability.start, availability.end);
          hoursString += `${formattedHoursString}, `;
        }
        availability = operatingHours[operatingHours.length - 1];
        formattedHoursString = this.getFormattedHoursString(availability.start, availability.end);
        hoursString += `${formattedHoursString}`;
      }
      daysToHours[day] = hoursString;
    });

    var formattedHours = [];
    Object.keys(daysToHours).forEach(day => {
      formattedHours.push(<List.Item>{`${day} ${daysToHours[day]}`}</List.Item>);
    });

    return formattedHours;
  }

  getRenderedReviews = () => {
    const { reviewData, convertRating } = this.props;

    var renderedReviews = [];
    reviewData.reviews.forEach(review => {
      const userRating = convertRating(review.rating);
      const timeCreated = new Date(review.time_created).toDateString();

      renderedReviews.push(
        <Feed.Event>
          <Feed.Label>
            <Image src={review.user.image_url} style={{ objectFit: 'cover', width: '35px', height: '35px'}} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              {review.user.name} {userRating} 
              <Feed.Date>{timeCreated}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{review.text}</Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      );
    });

    return renderedReviews;
  }

  render() {
    const { details, loading, price, convertRating } = this.props;

    if (loading) {
      return <Container textAlign='center'><Icon name='circle notch' loading size='huge'/></Container>
    }

    const rating = convertRating(details.rating);
    const titles = this.getCategories();
    const renderedPhotos = this.getRenderedPhotos();
    const address = this.getAddress();
    const formattedHours = this.getFormattedHours();
    const isCurrentlyOpen = details.hours[0].is_open_now;
    const renderedReviews = this.getRenderedReviews();

    return (
      <Grid celled='internally' columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <Header as='h1'>
              <Icon name='photo' />
              <Header.Content>Photos</Header.Content>
            </Header>
            <Carousel
              infinite
              dots
              centered
              draggable={false}
              arrowLeft={<Icon size='big' name='arrow left' />}
              arrowRight={<Icon size='big' name='arrow right' />}
              addArrowClickHandler
            >
              {renderedPhotos}
            </Carousel>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Header as='h1'>
              <Icon name='info circle' />
              <Header.Content>Basic Information</Header.Content>
            </Header>
            <List relaxed>
              <List.Item><List.Header>Address</List.Header>{address}</List.Item>
              <List.Item><List.Header>Phone</List.Header>{details.display_phone}</List.Item>
              <List.Item>
                <List.Header>
                  <span>Regular Hours {isCurrentlyOpen ? <div style={{color:'green'}}>Currently Open</div> : <div style={{color:'red'}}>Currently Closed</div>}</span>
                </List.Header>
                {formattedHours}
              </List.Item>
              <List.Item><List.Header>Price</List.Header>{price}</List.Item>
              <List.Item><List.Header>Rating</List.Header>{rating}</List.Item>
              <List.Item><List.Header>Categories</List.Header>{titles}</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as='h1'>
              <Icon name='users' />
              <Header.Content>Highlighted Reviews</Header.Content>
            </Header>
            <Feed>
              {renderedReviews}
            </Feed>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h1'>
              <Icon name='map' />
              <Header.Content>Map</Header.Content>
            </Header>
            <Map latitude={details.coordinates.latitude} longitude={details.coordinates.longitude} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BusinessDetail;
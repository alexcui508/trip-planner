import React from 'react';
import { Grid, Modal, Image, Icon, Divider, Header, List } from 'semantic-ui-react';

class BusinessDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  getPhotos() {
    let photos = this.props.details.photos;
    let renderedPhotos = photos.map((photo) =>
      <div>
        <Modal trigger={<Image src={photo} size='medium' verticalAlign='middle' />} basic>
          <Modal.Content image>
            <Image wrapped size='big' src={photo} />
          </Modal.Content>
        </Modal>
        <Divider hidden fitted />
      </div>
    );
    return renderedPhotos;
  }

  getAddress() {
    let full_address = this.props.details.location.display_address;
    let address = [];
    for (let i = 0; i < full_address.length-1; i++) {
      address.push(full_address[i]);
      address.push(", ");
    }
    address.push(full_address[full_address.length-1]);
    return address;
  }

  getCategories() {
    let categories = this.props.details.categories;
    let titles = [];
    for (let i = 0; i < categories.length - 1; i++) {
      let categoryTitle = categories[i].title;
      titles.push(categoryTitle);
      titles.push(", ");
    }
    titles.push(categories[categories.length - 1].title);
    return titles;
  }

  /* getHours() {
    let hours = this.props.details.hours.open;
    for () {

    }
  } */

  render() {
    if (this.props.loading) {
      return <Icon loading name='circle notched' />
    }

    let titles = this.getCategories();
    let renderedPhotos = this.getPhotos();
    let address = this.getAddress();
    return (
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <Header as='h1'>
              <Icon name='photo' />
              <Header.Content>Photos</Header.Content>
            </Header>
            {renderedPhotos}
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h1'>
              <Header.Content>{this.props.details.name}</Header.Content>
              <Header.Subheader>
                {titles}
              </Header.Subheader>
            </Header>
            <List bulleted>
              <List.Item><List.Header>Address</List.Header>{address}</List.Item>
              <List.Item><List.Header>Phone</List.Header>{this.props.details.display_phone}</List.Item>
              <List.Item><List.Header>Price</List.Header>{this.props.price}</List.Item>
              <List.Item><List.Header>Rating</List.Header>{this.props.rating}</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BusinessDetail;
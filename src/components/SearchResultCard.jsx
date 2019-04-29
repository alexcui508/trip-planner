import {Segment, Grid, Image, Button, Icon} from 'semantic-ui-react';
import React from 'react';

function SearchResultCard(business) {
  return (
    <Segment raised style={{marginRight: '10px'}}>
    <Grid celled>
    <Grid.Row>
      <Grid.Column width={6} >
        <Image src={business.image_url} style={{objectFit: "cover", width:"100%", height: "200px"}}/>
      </Grid.Column>
      <Grid.Column width={10}>
      <h3>{business.name}</h3>
      <b style={{float: "left"}}>{business.price}</b> 
      <div style={{float: "right"}}>
        <b>{business.rating}/5 </b><br/>
        {business.review_count} reviews <br/>
      </div>
      <br/>
      <span>{business.categories.map(v => v.title).join(", ")}</span> <br/>
      <div style={{position: "absolute", bottom: '0'}}>
      {business.display_phone} <br/>
      {business.location.display_address}
      <br/><br/>
      </div>
      <br/>
      <Button primary style={{float: "right"}}> 
      <Button.Content>
        <Icon name="add"></Icon> 
      </Button.Content>
      </Button>
      </Grid.Column>
    </Grid.Row>
    </Grid>
     
    </Segment>
  )
}

export default SearchResultCard;
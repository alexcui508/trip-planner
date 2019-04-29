import React from 'react';
import Calendar from './Calendar';
import Search from './Search';
import { Grid } from 'semantic-ui-react'



const Planner = () => (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Calendar />
        </Grid.Column>
        <Grid.Column>
          <Search />
        </Grid.Column>
      </Grid.Row>
    </Grid>
)

export default Planner;
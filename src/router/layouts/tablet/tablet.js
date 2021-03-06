import React from 'react'
import { Switch, Route, useLocation } from 'react-router'
import { Grid } from '@material-ui/core'
import * as Pages from 'pages'
import { useRoutesStore } from 'hooks/stores'
import Navbar from 'components/navbar/responsive_navbar'
import styled from 'styled-components'

const StyledContainer = styled(Grid)`
  && {
    margin-top: 96px;
    min-height: 120vh;
  }
`

const LayoutTemplate = () => {
  const routesStore = useRoutesStore()
  const location = useLocation()
  const background = location.state && location.state.background

  return (
    <StyledContainer container>
      <Grid item sm={12}>
        <Switch location={background || location}>
          <Route exact path={routesStore.root}>
            <Pages.HomePage />
          </Route>
        </Switch>
        {background && (
          <Route path={routesStore.orderPage}>
            {/*<Pages.__SomeModal__ />*/}
          </Route>
        )}
      </Grid>
    </StyledContainer>
  )
}

const Tablet = () => {
  return (
    <>
      <Navbar />
      <LayoutTemplate />
    </>
  )
}

export default Tablet

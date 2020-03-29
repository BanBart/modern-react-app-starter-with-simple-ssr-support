import React from 'react'
import styled from 'styled-components'
import { Grid, useScrollTrigger, AppBar, Toolbar } from '@material-ui/core'
import { Responsive } from 'components/media_query/media_query'
import LocaleSwitchButton from '../shared/locale_switch_button'

const Wrapper = styled.div`
  padding: 0 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => (props.trigger ? 64 : 96)}px;
  transition: height 0.3s;
  border-bottom: 1px solid ${props => props.theme.colors.black};
`

const TabletWrapper = styled(Wrapper)`
  padding: 0 32px;
`

const StyledAppBar = styled(AppBar)`
  && {
    background-color: white;
  }
`

const StyledToolbar = styled(Toolbar)`
  && {
    padding-left: 0;
    padding-right: 0;
  }
`

function ElevationScroll({ children, trigger }) {
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const DefaultNavbar = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 12
  })

  return (
    <ElevationScroll trigger={trigger}>
      <StyledAppBar elevation={10}>
        <StyledToolbar>
          <Grid container>
            <Grid item sm={12}>
              <Responsive
                DesktopWrapper={Wrapper}
                TabletWrapper={TabletWrapper}
                trigger={trigger}
              >
                <LocaleSwitchButton />
              </Responsive>
            </Grid>
          </Grid>
        </StyledToolbar>
      </StyledAppBar>
    </ElevationScroll>
  )
}

export default DefaultNavbar

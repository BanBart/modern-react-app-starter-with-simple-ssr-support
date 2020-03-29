import React, { useState } from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
  useScrollTrigger
} from '@material-ui/core'
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons'
import LocaleSwitchButton from '../shared/locale_switch_button'

const Wrapper = styled.div`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;

  .collapse__wrapper {
    height: calc(100vh - 64px);
    &-inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .app-bar__root {
    ${props =>
      !props.trigger &&
      `
      box-shadow: none;
    `}
    background-color: ${props => props.theme.colors.white};
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  && {
    color: ${props => props.theme.colors.black};
  }
`

const StyledCloseIcon = styled(CloseIcon)`
  && {
    color: ${props => props.theme.colors.black};
  }
`

const StyledIconButton = styled(IconButton)`
  && {
    padding: 0;
  }
`

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  height: 64px;
`

const MobileNavbar = () => {
  const [open, setOpen] = useState(false)

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return (
    <Wrapper trigger={trigger}>
      <AppBar classes={{ root: 'app-bar__root' }}>
        <StyledToolbar>
          <LocaleSwitchButton />
          <StyledIconButton onClick={() => setOpen(!open)}>
            {open ? <StyledCloseIcon /> : <StyledMenuIcon />}
          </StyledIconButton>
        </StyledToolbar>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          classes={{
            wrapper: 'collapse__wrapper',
            wrapperInner: 'collapse__wrapper-inner'
          }}
        ></Collapse>
      </AppBar>
    </Wrapper>
  )
}

export default MobileNavbar

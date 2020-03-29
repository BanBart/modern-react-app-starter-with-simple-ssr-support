import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { useLocaleStore } from 'hooks/stores'

const StyledButton = styled(Button)`
  && {
    border: 2px solid ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.black};
    padding: 0;
    width: 34px;
    height: 34px;
    border-radius: 5px;
    min-width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    line-height: 13px;
    font-weight: bold;
    transition: 0.3s;
    &:hover {
      border: 2px solid ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.black};
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const LocaleSwitchButton = () => {
  const { availableLocales, locale, toggleLocale } = useLocaleStore()

  if (availableLocales.length === 1) return null

  return (
    <Wrapper>
      <StyledButton onClick={toggleLocale}>{locale}</StyledButton>
    </Wrapper>
  )
}

LocaleSwitchButton.Wrapper = Wrapper

export default observer(LocaleSwitchButton)

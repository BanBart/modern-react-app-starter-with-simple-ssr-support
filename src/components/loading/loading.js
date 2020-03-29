import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: ${props => props.theme.colors.black};
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${props =>
    props.fitScreen
      ? `
    height: 80vh;
  `
      : `
    flex: 1;
  `}
`

const Loading = ({
  size = 45,
  thickness = 4,
  fitScreen = false,
  fitAspectRatio = false
}) => {
  return (
    <Wrapper fitScreen={fitScreen} fitAspectRatio={fitAspectRatio}>
      <StyledCircularProgress size={size} thickness={thickness} />
    </Wrapper>
  )
}

export default Loading

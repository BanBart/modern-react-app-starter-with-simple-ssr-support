import React from 'react'
import { compact } from 'lodash'
import { useMediaQueryBreakpoints } from 'hooks/media_query'

const Desktop = ({ children }) => {
  const { isDesktop } = useMediaQueryBreakpoints()
  return isDesktop ? children : null
}

const Tablet = ({ children }) => {
  const { isTablet } = useMediaQueryBreakpoints()
  return isTablet ? children : null
}

const TabletOrAbove = ({ children }) => {
  const { isTabletOrAbove } = useMediaQueryBreakpoints()
  return isTabletOrAbove ? children : null
}

const TabletOrBelow = ({ children }) => {
  const { isTabletOrBelow } = useMediaQueryBreakpoints()
  return isTabletOrBelow ? children : null
}

const Mobile = ({ children }) => {
  const { isMobile } = useMediaQueryBreakpoints()
  return isMobile ? children : null
}

const Responsive = ({
  DesktopWrapper,
  TabletWrapper,
  MobileWrapper,
  TabletOrAboveWrapper,
  TabletOrBelowWrapper,
  children,
  ...props
}) => {
  const {
    isDesktop,
    isTablet,
    isTabletOrAbove,
    isTabletOrBelow,
    isMobile,
  } = useMediaQueryBreakpoints()

  // react-responsive bug with shrinking from smaller size to bigger, on first render it returns truthy values for smaller and bigger wrapper.
  if (
    compact([
      TabletOrAboveWrapper && isTabletOrAbove,
      TabletOrBelowWrapper && isTabletOrBelow,
      DesktopWrapper && isDesktop,
      MobileWrapper && isMobile,
      TabletWrapper && isTablet,
    ]).length > 1
  )
    return null

  if (DesktopWrapper && isDesktop)
    return <DesktopWrapper {...props}>{children}</DesktopWrapper>

  if (TabletWrapper && isTablet)
    return <TabletWrapper {...props}>{children}</TabletWrapper>

  if (MobileWrapper && isMobile)
    return <MobileWrapper {...props}>{children}</MobileWrapper>

  if (TabletOrAboveWrapper && isTabletOrAbove)
    return <TabletOrAboveWrapper {...props}>{children}</TabletOrAboveWrapper>

  if (TabletOrBelowWrapper && isTabletOrBelow)
    return <TabletOrBelowWrapper {...props}>{children}</TabletOrBelowWrapper>

  return null
}

export { Desktop, Tablet, TabletOrAbove, TabletOrBelow, Mobile, Responsive }

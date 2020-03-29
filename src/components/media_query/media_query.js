import React from 'react'
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
}) => (
  <React.Fragment>
    {DesktopWrapper && (
      <Desktop>
        <DesktopWrapper {...props}>{children}</DesktopWrapper>
      </Desktop>
    )}
    {TabletWrapper && (
      <Tablet>
        <TabletWrapper {...props}>{children}</TabletWrapper>
      </Tablet>
    )}
    {MobileWrapper && (
      <Mobile>
        <MobileWrapper {...props}>{children}</MobileWrapper>
      </Mobile>
    )}
    {TabletOrAboveWrapper && (
      <TabletOrAbove>
        <TabletOrAboveWrapper {...props}>{children}</TabletOrAboveWrapper>
      </TabletOrAbove>
    )}
    {TabletOrBelowWrapper && (
      <TabletOrBelow>
        <TabletOrBelowWrapper {...props}>{children}</TabletOrBelowWrapper>
      </TabletOrBelow>
    )}
  </React.Fragment>
)

export { Desktop, Tablet, TabletOrAbove, TabletOrBelow, Mobile, Responsive }

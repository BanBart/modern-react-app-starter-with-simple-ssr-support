import { useMediaQuery } from 'react-responsive'
import React from 'react'

const useMediaQueryBreakpoints = () => {
  const isDesktop = useMediaQuery({ minWidth: 1200 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 })
  const isTabletOrAbove = useMediaQuery({ minWidth: 768 })
  const isTabletOrBelow = useMediaQuery({ maxWidth: 1199 })
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return {
    isDesktop,
    isTablet,
    isTabletOrAbove,
    isTabletOrBelow,
    isMobile
  }
}

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

export {
  Desktop,
  Tablet,
  TabletOrAbove,
  TabletOrBelow,
  Mobile,
  Responsive,
  useMediaQueryBreakpoints
}

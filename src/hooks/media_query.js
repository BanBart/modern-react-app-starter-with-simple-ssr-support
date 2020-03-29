import { useMediaQuery } from 'react-responsive'

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

export { useMediaQueryBreakpoints }

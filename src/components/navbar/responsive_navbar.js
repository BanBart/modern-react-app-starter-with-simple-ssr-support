import React from 'react'
import { useMediaQueryBreakpoints } from 'hooks/media_query'
import DefaultNavbar from './default_navbar/default_navbar'
import MobileNavbar from './mobile_navbar/mobile_navbar'

const ResponsiveNavbar = () => {
  const { isMobile } = useMediaQueryBreakpoints()

  if (isMobile) return <MobileNavbar />

  return <DefaultNavbar />
}

export default ResponsiveNavbar

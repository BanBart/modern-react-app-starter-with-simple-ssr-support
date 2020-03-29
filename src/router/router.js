import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Route } from 'react-router'
import { useParams } from 'react-router-dom'
import DesktopLayout from './layouts/desktop/desktop'
import TabletLayout from './layouts/tablet/tablet'
import MobileLayout from './layouts/mobile/mobile'
import { useMediaQueryBreakpoints } from 'hooks/media_query'
import ScrollToTop from './scroll_to_top/scroll_to_top'
import { useLocaleStore, useRoutesStore } from 'hooks/stores'

const Router = observer(() => {
  const { isMobile, isTablet } = useMediaQueryBreakpoints()
  const { locale } = useParams()
  const {
    setLocale,
    availableLocales,
    isDefaultLocale,
    locale: localeStoreLocale
  } = useLocaleStore()
  const { redirectToRoot } = useRoutesStore()

  useEffect(() => {
    if (locale && availableLocales.includes(locale)) {
      setLocale(locale)
      isDefaultLocale && redirectToRoot()
    } else {
      setLocale(availableLocales[0])
    }
  }, [
    locale,
    availableLocales,
    setLocale,
    localeStoreLocale,
    isDefaultLocale,
    redirectToRoot
  ])

  if (isMobile) {
    return <MobileLayout />
  }

  if (isTablet) {
    return <TabletLayout />
  }

  return <DesktopLayout />
})

const I18nRoute = () => {
  return (
    <ScrollToTop>
      <Route path="/:locale?">
        <Router />
      </Route>
    </ScrollToTop>
  )
}

export default I18nRoute

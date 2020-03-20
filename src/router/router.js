import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Route } from 'react-router'
import { useParams, useHistory } from 'react-router-dom'
import DesktopLayout from './layouts/desktop/desktop'
import TabletLayout from './layouts/tablet/tablet'
import MobileLayout from './layouts/mobile/mobile'
import { useMediaQueryBreakpoints } from 'components/media_query/media_query'
import ScrollToTop from './scroll_to_top/scroll_to_top'
import { useFilterStore } from 'hooks/stores'

const Router = observer(() => {
  const { isMobile, isTablet } = useMediaQueryBreakpoints()
  const { locale } = useParams()
  let history = useHistory()
  const {
    setLocale,
    availableLocales,
    locale: filterStoreLocale
  } = useFilterStore()

  useEffect(() => {
    if (locale && availableLocales.includes(locale)) {
      setLocale(locale)
    } else {
      setLocale(availableLocales[0])
      if (availableLocales[0] === 'en') history.push('/en')
    }
  }, [locale, availableLocales, setLocale, history])

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

import React from 'react'
import { observer } from 'mobx-react'
// import { useExamplesStore, useLocaleStore } from 'src/hooks/stores'
import Example from 'components/example/example'
import Helmet from 'react-helmet'

const HomePage = () => {
  // const { fetch, reset, isLoaded } = useExamplesStore()
  // const { locale } = useLocaleStore

  // useEffect(() => {
  //   fetch()
  //
  //   return () => reset()
  // },[fetch, reset, locale])
  //
  // if(!isLoaded)
  //   return <Loading/>

  return (
    <>
      <Helmet>
        <title>Example</title>
      </Helmet>
      <Example />
    </>
  )
}

export default observer(HomePage)

import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Responsive } from 'components/media_query/media_query'

const Wrapper = styled.div`
  padding: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ExampleText = styled.h1`
  font-size: 40px;
  padding: 32px;
`

const TabletWrapper = styled(Wrapper)`
  ${ExampleText} {
    padding: 24px;
  }
`

const MobileWrapper = styled(Wrapper)`
  ${ExampleText} {
    padding: 16px;
  }
`

const Example = () => {
  const { t } = useTranslation()

  return (
    <Responsive
      DesktopWrapper={Wrapper}
      TabletWrapper={TabletWrapper}
      MobileWrapper={MobileWrapper}
    >
      <ExampleText>{t('Example')}</ExampleText>
    </Responsive>
  )
}

export default observer(Example)

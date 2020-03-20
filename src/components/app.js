import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import colors from 'styles/colors'
import Router from 'router/router'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: proxima-nova;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${colors.black};
  }
`

function App() {
  return (
    <>
      <ThemeProvider theme={{ colors }}>
        <Router />
      </ThemeProvider>
      <GlobalStyle />
    </>
  )
}

export default App

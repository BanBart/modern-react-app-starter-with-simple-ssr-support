import { createMuiTheme } from '@material-ui/core/styles'
import colors from 'styles/colors'

export default createMuiTheme({
  typography: {
    fontSize: 13
  },
  palette: {
    primary: {
      main: colors.black
    }
  },
  breakpoints: {
    values: {
      sm: 768,
      md: 992,
      lg: 1200
    }
  }
})

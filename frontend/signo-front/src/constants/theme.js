import { createMuiTheme } from '@material-ui/core/styles';
import {primaryColor, neutralColor} from "./colors"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "black"
    },
    text: {
        primary: neutralColor
    }
  },
});

export default theme;
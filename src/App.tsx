import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/material";

import Chatbot from "./components/Chatbot";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008EAA", // Your existing primary color
    },
    // You can define your scrollbar colors here if you want them themeable
    // scrollbar: {
    //   track: '#f1f1f1',
    //   thumb: '#c1c1c1',
    //   thumbHover: '#a8a8a8',
    // },
  },
});

const globalScrollbarStyles = {
  // Target WebKit browsers
  "*::-webkit-scrollbar": {
    width: "6px", // Thinner scrollbar
    height: "6px", // For horizontal scrollbars if they appear anywhere
  },
  "*::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1", // Light grey track (or theme.palette.scrollbar.track)
    borderRadius: "3px",
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: "#c1c1c1", // Darker grey thumb (or theme.palette.scrollbar.thumb)
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "#a8a8a8", // Slightly darker on hover (or theme.palette.scrollbar.thumbHover)
    },
  },
  // Target Firefox
  // Note: For body/root scrollbar, Firefox often respects system settings more.
  // scrollbarWidth and scrollbarColor on `html` or `body` can be less consistent
  // than on specific elements. However, it's worth trying.
  // For more robust Firefox global scrollbar, you might need to target `html`
  // or ensure your main scrolling container gets these.
  // Let's target `body` for now as it's common.
  body: {
    scrollbarWidth: "thin",
    scrollbarColor: "#c1c1c1 #f1f1f1", // thumb track
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalScrollbarStyles} />
      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Chatbot />
      </Container>
    </ThemeProvider>
  );
}

export default App;

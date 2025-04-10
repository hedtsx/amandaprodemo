import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Chatbot from './components/Chatbot';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008EAA',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 4
        }}
      >
        <Chatbot />
      </Container>
    </ThemeProvider>
  );
}

export default App;

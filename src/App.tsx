import './App.css'
import AppRouter from './app/router';
import { useConfig } from './store/config';
import { messages } from './translations';
import { IntlProvider } from 'react-intl';

function App() {
  const {lang} = useConfig();
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <AppRouter/>
    </IntlProvider>
  )
}

export default App

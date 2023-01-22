import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { configureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

const store=configureStore();

function App() {
  return (
    <Provider store={store}>
 <BrowserRouter>

    <div className="App">
     <Main/>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

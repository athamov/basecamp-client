import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store/store'
import '../src/style.css';
import { StoreProvider } from "./context/store-context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>
);

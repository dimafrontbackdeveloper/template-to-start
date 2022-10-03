import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <App />
        </div>
        {/* footer */}
      </div>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();

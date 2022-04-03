import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>

        {/* 
            - Wrap the whole application with the auth provider.
            this provider will allow the pages or component use the auth context in order to check if the user is authenticated or not
        */}
        <AuthProvider>
            <App />
        </AuthProvider>
        
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

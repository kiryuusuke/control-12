import { createRoot } from 'react-dom/client'
import App from './App'
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./globalConstants.ts";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
)

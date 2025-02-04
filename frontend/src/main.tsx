import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);

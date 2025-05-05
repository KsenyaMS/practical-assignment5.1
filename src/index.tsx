import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MyThemeProvider } from '../providers/ThemeProvider';
import { ThemeProvider } from '@emotion/react';
import { MainTheme } from './styles/styles';
import { Provider } from 'jotai';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={MainTheme}>
        <MyThemeProvider>
            <Provider>
                <App />
            </Provider>
        </MyThemeProvider>
    </ThemeProvider>
)

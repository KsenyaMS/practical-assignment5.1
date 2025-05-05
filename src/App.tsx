import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMyThemeProvider } from '../providers/ThemeProvider';
import { Layout } from './components/Layout';
import { ThemeProvider } from '@emotion/react';
import { themes } from './styles/styles';
import { CartPage } from './pages/CartPage';
import { Provider } from 'react-redux';
import { store } from '../providers/ShoppingCartProvider';
import { ProductPage } from '../src/pages/ProductPage';

export const App = () => {
    const { theme } = useMyThemeProvider();

    return <Provider store={store}>
        <ThemeProvider theme={themes[theme]}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="*" element={<ProductPage />} />
                        <Route path="table" element={<ProductPage />} />
                        <Route path="cart" element={<CartPage />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
}
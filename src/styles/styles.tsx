import { createTheme } from '@mui/material';

export const themes = {
    light: {
        background: {
            primary: '#ed3cca',
            secondary: '#7d18f8',
            layout: 'white',
        },
        color: {
            primary: '#ed3cca',
            secondary: 'black',
            supportive: 'grey',
            heading: 'white',
        },

    },
    dark: {
        background: {
            primary: '#7d18f8',
            secondary: '#ed3cca',
            layout: 'white',
        },
        color: {
            primary: '#7d18f8',
            secondary: 'black',
            supportive: 'grey',
            heading: 'white',
        },

    }
}

export const MainTheme = createTheme({
    palette: {
        background: {
            default: 'white',
        },
    },
});

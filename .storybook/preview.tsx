import ThemeProvider from "./ThemeDecorator";

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'Midnight',
        values: [
            {
                name: 'White',
                value: '#fffff',
            },
            {
                name: 'Midnight',
                value: '#1c2031',
            },
        ],
    },
};

export const decorators = [ThemeProvider];



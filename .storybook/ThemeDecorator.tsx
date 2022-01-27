import themes from '../src/themes/themes.module.css';


function ThemeProvider (Story, context) {
    const backgroundColour = context?.globals?.backgrounds?.value || '#1c2031';
    const theme = getTheme(backgroundColour);

    return (
        <div className={themes[theme]}>
            <Story />
        </div>
    );
};

const getTheme = (key: '#fffff' | '#1c2031') => {
    const themeMap = {
        '#1c2031': 'midnight',
        '#fffff': 'white',
    };

    return themeMap[key];
};

export default ThemeProvider;
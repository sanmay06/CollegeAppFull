import {Appearance} from 'react-native';
import { React, useState, useContext, createContext, useEffect } from 'react';
import { Colors } from '../constants/Colors';

export const ThemeContext = createContext({
    theme: Colors.light,
    colorScheme: 'light',
    setcolorScheme: () => {},
});

export const ThemeProvider = ({children}) => {

  const[ colorScheme, setcolorScheme ] = useState(Appearance.getColorScheme() || 'dark');
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setcolorScheme(newColorScheme || 'light');
    });

    return () => subscription?.remove();
  }, []);
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return (  
        <ThemeContext.Provider value={{theme, colorScheme, setcolorScheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
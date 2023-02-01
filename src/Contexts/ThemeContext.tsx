import { createContext } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const iThemeContextState = {
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(iThemeContextState);

export default ThemeContext;

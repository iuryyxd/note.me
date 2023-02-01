import Routes from './routes';
import './lib/dayjs';
import { useEffect, useState } from 'react';
import ThemeContext from './Contexts/ThemeContext';

export default function App() {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const themeStoraged = localStorage.getItem('theme');
    if (themeStoraged) {
      setTheme(themeStoraged);
    } else {
      localStorage.setItem('theme', theme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.background = '#343539';
    } else {
      document.body.style.background = '#ffffff';
    }
  }, [theme]);

  return (
    <>
      {theme && (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Routes />
        </ThemeContext.Provider>
      )}
    </>
  );
}

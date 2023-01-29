import logoDark from '../assets/logo_dark.svg';
import logoLight from '../assets/logo_light.svg';
import ThemeContext from '~/Contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

export default function Loading() {
  const [progress, setProgress] = useState<number>(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      setProgress(100);
    }, 500);
  }, []);

  return (
    <div
      className={clsx('h-screen w-full flex flex-col items-center justify-center gap-16', {
        ['bg-midNight']: theme === 'dark',
      })}
    >
      {theme === 'dark' ? <img src={logoLight} alt='logo' /> : <img src={logoDark} alt='logo' />}
      <div
        className={clsx('w-[500px] h-[10px] rounded-2xl', {
          ['bg-opaqueRedOrange']: theme !== 'dark',
          ['bg-gray-800']: theme === 'dark',
        })}
      >
        <div
          className={clsx('h-full rounded-2xl transition-all', {
            ['bg-midNight']: theme !== 'dark',
            ['bg-rose']: theme === 'dark',
          })}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

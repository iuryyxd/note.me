import { useContext } from 'react';
import logoDark from '../assets/logo_sidebar_dark.svg';
import logoLight from '../assets/logo_sidebar_light.svg';
import { FiLogOut, FiHome, FiPlus } from 'react-icons/fi';
import ThemeContext from '~/Contexts/ThemeContext';
import clsx from 'clsx';

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);

  return (
    <aside
      className={clsx(
        'w-28 h-screen  shadow-xl flex flex-col items-center justify-between py-7 fixed',
        {
          ['bg-screamWhite']: theme === 'light',
          ['bg-midNight text-white']: theme === 'dark' || theme === 'hybrid',
        },
      )}
    >
      {theme === 'light' ? <img src={logoDark} alt='logo' /> : <img src={logoLight} alt='logo' />}
      <div className='flex flex-col w-full gap-7 self-start'>
        <button className='bg-none flex items-center'>
          <div
            className={clsx('w-1 h-14 rounded-r-[5px]', {
              ['bg-midNight']: theme === 'light',
              ['bg-white']: theme === 'dark' || theme === 'hybrid',
            })}
          />
          <FiHome size={32} className='ml-[35px]' />
        </button>
        <button className='bg-none flex items-center group'>
          <div
            className={clsx('w-1 h-14 group-hover:rounded-r-[5px]', {
              ['group-hover:bg-midNight']: theme === 'light',
              ['group-hover:bg-white']: theme === 'dark' || theme === 'hybrid',
            })}
          />
          <FiPlus size={32} className='ml-[35px]' />
        </button>
      </div>
      <button className='bg-none'>
        <FiLogOut size={32} className='opacity-50 transition-opacity hover:opacity-100' />
      </button>
    </aside>
  );
}

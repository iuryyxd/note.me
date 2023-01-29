import { useContext, useEffect, useState } from 'react';
import Sidebar from '~/components/Sidebar';
import { FiMoon, FiSearch, FiSunset, FiSun } from 'react-icons/fi';
import Note from '~/components/Note';
import ThemeContext from '~/Contexts/ThemeContext';
import clsx from 'clsx';
import Loading from '~/components/Loading';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  function handleThemeChange(theme: string) {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }

  if (loading) return <Loading />;

  return (
    <div className='w-full h-full flex gap-[112px]'>
      <Sidebar />
      <main className='w-full h-full max-w-5xl py-10 ml-[224px]'>
        <header
          className={clsx('flex items-center justify-between w-full mb-12', {
            ['text-gray-400']: theme === 'light' || theme === 'hybrid',
            ['text-gray-300']: theme === 'dark',
          })}
        >
          <form className='flex items-center gap-3'>
            <button type='submit' className='bg-none'>
              <FiSearch size={18} />
            </button>
            <input
              type='search'
              placeholder='Buscar notas'
              className='outline-none bg-transparent'
            />
          </form>
          <button className='bg-none'>
            {theme === 'light' && (
              <FiSunset size={18} onClick={() => handleThemeChange('hybrid')} />
            )}
            {theme === 'hybrid' && <FiMoon size={18} onClick={() => handleThemeChange('dark')} />}
            {theme === 'dark' && <FiSun size={18} onClick={() => handleThemeChange('light')} />}
          </button>
        </header>

        <div className='flex flex-col gap-2'>
          <h1
            className={clsx('font-normal text-3xl', {
              ['text-gray-900']: theme === 'light' || theme === 'hybrid',
              ['text-white']: theme === 'dark',
            })}
          >
            Olá, <span className='font-bold'>Jack! 👋</span>
          </h1>
          <p
            className={clsx('font-normaltext-xl', {
              ['text-gray-600']: theme === 'light' || theme === 'hybrid',
              ['text-gray-300']: theme === 'dark',
            })}
          >
            Todas as suas anotações estão aqui, em um só lugar!
          </p>
        </div>

        <div className='flex gap-9 flex-wrap mt-[63px]'>
          <Note
            note='É assim que uma nota no Note.me se parece! Muito simples, limpo e estético! 😍'
            date={new Date()}
            color='opaqueLightYellow'
          />

          <Note
            note='É assim que uma nota no Note.me se parece! Muito simples, limpo e estético! 😍'
            date={new Date()}
            color='opaqueLightCyan'
          />

          <Note
            note='É assim que uma nota no Note.me se parece! Muito simples, limpo e estético! 😍'
            date={new Date()}
            color='opaqueRedOrange'
          />
        </div>
      </main>
    </div>
  );
}

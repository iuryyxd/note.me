import { useContext, useEffect, useState } from 'react';
import Sidebar from '~/components/Sidebar';
import { FiMoon, FiSearch, FiSunset, FiSun } from 'react-icons/fi';
import Note from '~/components/Note';
import ThemeContext from '~/Contexts/ThemeContext';
import clsx from 'clsx';
import Loading from '~/components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '~/services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface UserType {
  name: string;
  notes: {
    note: string;
    created_at: string;
    color: string;
  }[];
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);
  const { theme, setTheme } = useContext(ThemeContext);

  const usersCollectionRef = collection(db, 'users');

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const getUsers = async (uid: string) => {
      const data = await getDocs(usersCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      newData.map((doc: any) => {
        if (!state && doc.id === uid) {
          setUser(doc);
          setLoading(false);
        }
        if (state && doc.id === state.uid) {
          setUser(doc);
          setLoading(false);
        }
      });
    };

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUsers(currentUser.uid);
      } else {
        navigate('/login');
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleThemeChange(theme: string) {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }

  if (loading) return <Loading />;

  return (
    <>
      {user && (
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
                {theme === 'hybrid' && (
                  <FiMoon size={18} onClick={() => handleThemeChange('dark')} />
                )}
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
                Olá, <span className='font-bold'>{user.name}! 👋</span>
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
              {user.notes.map((note) => (
                <Note
                  key={crypto.randomUUID()}
                  color={note.color}
                  date={note.created_at}
                  note={note.note}
                />
              ))}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

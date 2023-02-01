import { useContext, useEffect, useState } from 'react';
import Sidebar from '~/components/Sidebar';
import { FiMoon, FiSearch, FiSunset, FiSun, FiLogOut } from 'react-icons/fi';
import Note from '~/components/Note';
import ThemeContext from '~/Contexts/ThemeContext';
import clsx from 'clsx';
import Loading from '~/components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '~/services/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { generateNoteColor } from '~/utils/generateColor';
import dayjs from 'dayjs';
import EmptyNotes from '~/components/EmptyNotes';

interface NotesType {
  note: string;
  created_at: string;
  color: string;
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<string | null>(null);
  const [notes, setNotes] = useState<NotesType[]>([]);
  const [notesFilter, setNotesFilter] = useState<NotesType[] | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [userUid, setUserUid] = useState<string>('');

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
          setUser(doc.name);
          setNotes(doc.notes.reverse());
          setNotesFilter(doc.notes.reverse());
          setLoading(false);
          setUserUid(uid);
        }
        if (state && doc.id === state.uid) {
          setUser(doc.name);
          setNotes(doc.notes.reverse());
          setNotesFilter(doc.notes.reverse());
          setLoading(false);
          setUserUid(state.uid);
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

  async function updateUser(userNotes: NotesType[]) {
    try {
      await setDoc(doc(db, 'users', userUid), {
        name: user,
        notes: userNotes,
      });
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  }

  function signOut() {
    auth
      .signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setNotesFilter(notes);

    updateUser(notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  function handleFilter(noteName: string) {
    setFilter(noteName);
    if (noteName.trim() === '') setNotesFilter(notes);
  }

  function handleThemeChange(theme: string) {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }

  function handleSearchNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setNotesFilter(
      notes!.filter((note) => note.note.toLowerCase().includes(filter.trim().toLowerCase())),
    );
  }

  function createNote() {
    setNotes([
      {
        color: generateNoteColor(),
        created_at: dayjs(new Date()).format('MMM, DD YYYY'),
        note: 'Comece a digitar a nota...',
      },
      ...notes,
    ]);
  }

  function updateNote(index: number, note: string) {
    const tempNotes = [...notes];

    tempNotes[index].note = note;

    updateUser(tempNotes);
  }

  function deleteNote(noteIndex: number) {
    const tempNotes = [...notes];

    setNotes(tempNotes.filter((_, index) => index !== noteIndex));
  }

  if (loading) return <Loading />;

  return (
    <>
      {user && (
        <div className='w-full h-full flex gap-[112px]'>
          <Sidebar createNote={createNote} />
          <main className='w-full h-full max-w-5xl xl:max-w-full xl:pr-5 sm:items-center sm:justify-center py-10 ml-[224px] sm:ml-0 sm:px-6'>
            <header
              className={clsx('flex items-center justify-between w-full mb-12', {
                ['text-gray-400']: theme === 'light' || theme === 'hybrid',
                ['text-gray-300']: theme === 'dark',
              })}
            >
              <form className='flex items-center gap-3' onSubmit={handleSearchNote}>
                <button type='submit' className='bg-transparent'>
                  <FiSearch
                    size={18}
                    className={clsx('transition-all', {
                      ['hover:text-white']: theme === 'dark',
                    })}
                  />
                </button>
                <input
                  type='search'
                  placeholder='Buscar notas'
                  className={clsx('outline-none bg-transparent sm:w-1/2', {
                    ['text-white']: theme === 'dark',
                  })}
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </form>
              <div className='flex sm:gap-14 items-center'>
                <button className='bg-transparent'>
                  {theme === 'light' && (
                    <FiSunset size={18} onClick={() => handleThemeChange('hybrid')} />
                  )}
                  {theme === 'hybrid' && (
                    <FiMoon size={18} onClick={() => handleThemeChange('dark')} />
                  )}
                  {theme === 'dark' && (
                    <FiSun size={18} onClick={() => handleThemeChange('light')} />
                  )}
                </button>
                <button className='hidden sm:flex bg-transparent' onClick={signOut}>
                  <FiLogOut size={18} />
                </button>
              </div>
            </header>

            <div className='flex flex-col gap-2'>
              <h1
                className={clsx('font-normal text-3xl', {
                  ['text-gray-900']: theme === 'light' || theme === 'hybrid',
                  ['text-white']: theme === 'dark',
                })}
              >
                Olá, <span className='font-bold'>{user}! 👋</span>
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

            <div className='flex gap-9 flex-wrap mt-[63px] sm:items-center sm:justify-center'>
              {notesFilter!.length > 0 ? (
                notesFilter?.map((note, index) => (
                  <Note
                    key={crypto.randomUUID()}
                    index={index}
                    color={note.color}
                    date={note.created_at}
                    note={note.note}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                  />
                ))
              ) : (
                <EmptyNotes />
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

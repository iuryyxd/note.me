import ilustration from '../assets/login_ilustration.svg';
import logoDark from '../assets/logo_dark.svg';
import { FaGoogle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { signInAnonymous, signInWithGoogle } from '~/services/firebase';
import { useNavigate } from 'react-router-dom';
import { db } from '~/services/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { defaultNotes } from '~/utils/defaultNotes';

export default function Login() {
  const [codename, setCodename] = useState<string | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [isCodenameValid, setIsCodenameValid] = useState<boolean>(false);

  const usersCollectionRef = collection(db, 'users');

  const navigate = useNavigate();

  useEffect(() => {
    if (codename === null || codename.trim() === '' || codename.trim().length <= 5) {
      setIsCodenameValid(false);
    } else {
      setIsCodenameValid(true);
    }
  }, [codename]);

  async function createUser(user: any) {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName ? user.displayName : codename,
        notes: defaultNotes,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  function signInWithAnonymous(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setDisableButton(true);
    signInAnonymous()
      .then(async (result) => {
        await createUser(result.user);

        navigate('/', {
          state: {
            uid: result.user.uid,
          },
        });
      })
      .catch((error) => {
        setDisableButton(false);
        console.error(error);
      });
  }

  function signIn() {
    setDisableButton(true);
    signInWithGoogle()
      .then(async (result) => {
        const data = await getDocs(usersCollectionRef);
        const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const user = newData.filter((doc) => doc.id === result.user.uid);
        if (user.length === 0) await createUser(result.user);

        navigate('/', {
          state: {
            uid: result.user.uid,
          },
        });
      })
      .catch((error) => {
        setDisableButton(false);
        console.log(error);
      });
  }

  return (
    <div className='w-full h-screen flex items-center bg-screamWhite lg:justify-center'>
      <div className='lg:hidden flex flex-col items-center justify-center w-1/2 h-full bg-white'>
        <div className='flex flex-col w-[456px]'>
          <img src={ilustration} alt='man working' className='w-full h-[299px]' />
          <h1 className='font-bold leading-10 text-4xl text-gray-900 mt-[80px]'>
            Mantenha a vida simples
          </h1>
          <p className='font-normal text-gray-400 text-2xl leading-8 w-full mt-[21px]'>
            Armazene todas as suas anotações em um aplicativo simples e intuitivo que o ajuda a
            aproveitar o que é mais importante na vida.
          </p>
        </div>
      </div>

      <div className='flex flex-col w-1/2 h-full items-center justify-center sm:w-full'>
        <div className='flex flex-col w-[320px] sm:w-full sm:px-7 sm:items-center'>
          <img src={logoDark} alt='logo' className='w-[297px] h-[65px] mb-[74px]' />
          <button
            onClick={signIn}
            disabled={disableButton}
            className='flex items-center justify-center gap-2 w-full h-[50px] bg-semanticRed text-white rounded-lg font-medium text-base mb-[46px] transition-opacity hover:opacity-90'
          >
            <FaGoogle size={24} />
            Entrar com google
          </button>
          <div className='flex items-center gap-6 sm:gap-0 sm:justify-between mb-9'>
            <div className='w-28 sm:w-8 h-[1px] bg-gray-300' />
            <p className='w-full text-center text-gray-300 text-sm font-normal'>
              ou entre anonimamente
            </p>
            <div className='w-28 sm:w-8 h-[1px] bg-gray-300' />
          </div>
          <form className='w-full flex flex-col gap-7' onSubmit={signInWithAnonymous}>
            <input
              type='text'
              placeholder='Digite seu codinome secreto'
              className='w-full h-[50px] bg-white border border-gray-300 rounded-lg p-4 focus:outline-none font-normal placeholder:text-gray-300 text-base text-gray-900 '
              onChange={(e) => setCodename(e.target.value)}
            />
            <button
              type='submit'
              className={`w-full h-[50px] rounded-lg bg-semanticGreen flex items-center justify-center gap-[10px] text-white transition-opacity ${
                isCodenameValid ? 'hover:opacity-90' : 'opacity-75 cursor-not-allowed'
              }`}
              disabled={!isCodenameValid || disableButton}
            >
              <FiLogIn size={20} /> Entrar anonimamente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

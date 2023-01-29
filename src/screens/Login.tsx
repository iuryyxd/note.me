import ilustration from '../assets/login_ilustration.svg';
import logoDark from '../assets/logo_dark.svg';
import { FaGoogle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Login() {
  const [codename, setCodename] = useState<string | null>(null);
  const [isCodenameValid, setIsCodenameValid] = useState<boolean>(false);

  useEffect(() => {
    if (codename === null || codename.trim() === '' || codename.trim().length <= 5) {
      setIsCodenameValid(false);
    } else {
      setIsCodenameValid(true);
    }
  }, [codename]);

  return (
    <div className='w-full h-screen flex items-center bg-screamWhite'>
      <div className='flex flex-col items-center justify-center w-1/2 h-full bg-white'>
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

      <div className='flex flex-col w-1/2 h-full items-center justify-center'>
        <div className='flex flex-col w-[320px]'>
          <img src={logoDark} alt='logo' className='w-[297px] h-[65px] mb-[74px]' />
          <button className='flex items-center justify-center gap-2 w-full h-[50px] bg-semanticRed text-white rounded-lg font-medium text-base mb-[46px] transition-opacity hover:opacity-90'>
            <FaGoogle size={24} />
            Entrar com google
          </button>
          <div className='flex items-center gap-6 mb-9'>
            <div className='w-28 h-[1px] bg-gray-300' />
            <p className='w-full text-center text-gray-300 text-sm font-normal'>
              ou entre anonimamente
            </p>
            <div className='w-28 h-[1px] bg-gray-300' />
          </div>
          <form className='w-full flex flex-col gap-7'>
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
              disabled={!isCodenameValid}
            >
              <FiLogIn size={20} /> Entrar anonimamente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

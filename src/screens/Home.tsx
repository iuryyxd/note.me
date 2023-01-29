import Sidebar from '~/components/Sidebar';
import { FiMoon, FiSearch } from 'react-icons/fi';
import Note from '~/components/Note';

export default function Home() {
  return (
    <div className='w-full h-full flex gap-[112px]'>
      <Sidebar />
      <main className='w-full h-full max-w-5xl py-10 ml-[224px]'>
        <header className='flex items-center justify-between w-full mb-12'>
          <form className='flex items-center gap-3'>
            <button type='submit' className='bg-none'>
              <FiSearch size={18} className='text-gray-400' />
            </button>
            <input
              type='search'
              placeholder='Buscar notas'
              className='outline-none text-gray-400'
            />
          </form>
          <button className='bg-none'>
            <FiMoon size={18} className='text-gray-400' />
          </button>
        </header>

        <div className='flex flex-col gap-2'>
          <h1 className='font-normal text-gray-900 text-3xl'>
            Olá, <span className='font-bold'>Jack! 👋</span>
          </h1>
          <p className='font-normal text-gray-600 text-xl'>
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

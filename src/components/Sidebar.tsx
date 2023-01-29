import logoDark from '../assets/logo_sidebar_dark.svg';
import { FiLogOut, FiHome, FiPlus } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <aside className='w-28 h-screen bg-screamWhite shadow-xl flex flex-col items-center justify-between py-7 fixed'>
      <img src={logoDark} alt='logo' />
      <div className='flex flex-col w-full gap-7 self-start'>
        <button className='bg-none flex items-center'>
          <div className='w-1 h-14 bg-midNight rounded-r-[5px]' />
          <FiHome size={32} className='ml-[35px]' />
        </button>
        <button className='bg-none flex items-center group'>
          <div className='w-1 h-14 group-hover:bg-midNight group-hover:rounded-r-[5px]' />
          <FiPlus size={32} className='ml-[35px]' />
        </button>
      </div>
      <button className='bg-none'>
        <FiLogOut size={32} className='opacity-50 transition-opacity hover:opacity-100' />
      </button>
    </aside>
  );
}

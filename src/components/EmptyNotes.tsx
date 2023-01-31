import { FiSmile } from 'react-icons/fi';

export default function EmptyNotes() {
  return (
    <section className='w-full h-full flex flex-col items-center justify-center text-center opacity-40 text-gray-300'>
      <FiSmile size={50} className='mb-5' />
      <div>
        <p>Você ainda não tem notas</p>
        <span>Crie notas e mantenha sua vida mais simples.</span>
      </div>
    </section>
  );
}

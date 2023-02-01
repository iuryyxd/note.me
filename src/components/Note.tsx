import { useContext } from 'react';
import ThemeContext from '~/Contexts/ThemeContext';
import clsx from 'clsx';
import { FiTrash } from 'react-icons/fi';

interface NoteProps {
  note: string;
  date: string;
  color: string;
  updateNote: (a: number, b: string) => void;
  deleteNote: (a: number) => void;
  index: number;
}

export default function Note({ date, note, color, updateNote, deleteNote, index }: NoteProps) {
  const { theme } = useContext(ThemeContext);

  const limitOfCharacters = 102;

  const colors = {
    opaqueLightYellow: 'bg-opaqueLightYellow',
    opaqueRedOrange: 'bg-opaqueRedOrange',
    opaqueLilac: 'bg-opaqueLilac',
    opaqueGreenCyan: 'bg-opaqueGreenCyan',
    opaqueLightCyan: 'bg-opaqueLightCyan',
  };

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    updateNote(index, e.target.value);
  }

  return (
    <div
      className={clsx(
        `w-[264px] h-[240px] rounded-lg relative group ${
          colors[color as keyof typeof colors]
        } flex flex-col justify-between py-6 px-[26px]`,
        {
          ['text-midNight']: theme === 'light' || theme === 'hybrid',
          ['text-white']: theme === 'dark',
        },
      )}
    >
      <textarea
        className='font-medium text-xl outline-none flex flex-1 bg-transparent resize-none'
        onChange={handleTextChange}
        defaultValue={note}
        maxLength={limitOfCharacters}
      />
      <small className='font-medium text-sm opacity-80 capitalize'>{date}</small>

      <FiTrash
        onClick={() => deleteNote(index)}
        className='text-midNight hover:text-semanticRed cursor-pointer transition-all opacity-0 group-hover:opacity-100 absolute right-[26px] bottom-6'
      />
    </div>
  );
}

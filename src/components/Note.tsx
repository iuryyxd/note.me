import { useContext } from 'react';
import dayjs from 'dayjs';
import ThemeContext from '~/Contexts/ThemeContext';
import clsx from 'clsx';

interface NoteProps {
  note: string;
  date: Date;
  color: string;
}

export default function Note({ date, note, color }: NoteProps) {
  const { theme } = useContext(ThemeContext);

  const colors = {
    opaqueLightYellow: 'bg-opaqueLightYellow',
    opaqueRedOrange: 'bg-opaqueRedOrange',
    opaqueLilac: 'bg-opaqueLilac',
    opaqueGreenCyan: 'bg-opaqueGreenCyan',
    opaqueLightCyan: 'bg-opaqueLightCyan',
  };

  return (
    <div
      className={clsx(
        `w-[264px] h-[240px] rounded-lg ${
          colors[color as keyof typeof colors]
        } flex flex-col justify-between py-6 px-[26px]`,
        {
          ['text-midNight']: theme === 'light' || theme === 'hybrid',
          ['text-white']: theme === 'dark',
        },
      )}
    >
      <p className='font-medium text-xl'>{note}</p>
      <small className='font-medium text-sm opacity-80 capitalize'>
        {dayjs(date).format('MMM, DD YYYY')}
      </small>
    </div>
  );
}

import dayjs from 'dayjs';

interface NoteProps {
  note: string;
  date: Date;
  color: string;
}

export default function Note({ date, note, color }: NoteProps) {
  const colors = {
    opaqueLightYellow: 'bg-opaqueLightYellow',
    opaqueRedOrange: 'bg-opaqueRedOrange',
    opaqueLilac: 'bg-opaqueLilac',
    opaqueGreenCyan: 'bg-opaqueGreenCyan',
    opaqueLightCyan: 'bg-opaqueLightCyan',
  };

  return (
    <div
      className={`w-[264px] h-[240px] rounded-lg ${
        colors[color as keyof typeof colors]
      } flex flex-col justify-between py-6 px-[26px]`}
    >
      <p className='font-medium text-xl text-midNight'>{note}</p>
      <small className='font-medium text-sm text-midNight opacity-80 capitalize'>
        {dayjs(date).format('MMM, DD YYYY')}
      </small>
    </div>
  );
}

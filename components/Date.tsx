import { format, parseISO } from 'date-fns';

type DateProps = {
  dateString: string;
  className?: string;
};

export const Date = ({ dateString, className }: DateProps): JSX.Element => {
  if (!dateString) {
    return <></>;
  }
  const date = parseISO(dateString);
  return (
    <time className={`text-xs italic ${className}`} dateTime={dateString}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
};

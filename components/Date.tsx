import { format, parseISO } from 'date-fns';

type DateProps = {
  dateString: string;
  className?: string;
};

export const Date = ({ dateString, className }: DateProps): JSX.Element => {
  const date = parseISO(dateString);
  if (!date) {
    return <></>;
  }
  return (
    <small className={`text-xsm italic ${className}`}>
      <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
    </small>
  );
};

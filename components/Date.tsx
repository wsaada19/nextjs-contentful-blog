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
    <small className={`text-xsm italic ${className}`}>
      <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
    </small>
  );
};

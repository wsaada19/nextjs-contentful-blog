import { useEffect, useState } from 'react';

type SwitchProps = {
  className?: string;
};

export const Switch = ({ className }: SwitchProps) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);
  return (
    <label className={className} htmlFor="toggle-switch">
      <input
        className="toggle-switch cursor-pointer rounded-full shadow-md appearance-none bg-blue-500 dark:bg-white h-6 w-12 border-1 border-blue-600 checked-bg-blue-600 transition duration-200 relative"
        type="checkbox"
        role="switch"
        id="toggle-switch"
        checked={isDark}
        aria-label="Toggle dark mode"
        onChange={() => {
          if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
          } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
          }
        }}
      />
    </label>
  );
};

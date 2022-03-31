import styles from './switch.module.scss';

type SwitchProps = {
  className?: string;
};

export const Switch = ({ className }: SwitchProps) => {
  return (
    <label className={className} htmlFor="toggleSwitch">
      <input
        className={`${styles.toggleSwitch} cursor-pointer rounded-full appearance-none bg-gray-600 dark:bg-white h-6 w-12 border-1 border-blue-600 checked-bg-blue-600 transition duration-200 relative`}
        type="checkbox"
        role="switch"
        id="toggle-switch"
        onChange={() => {
          if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
          } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
          }
        }}
      />
    </label>
  );
};

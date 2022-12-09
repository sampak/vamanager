import { FC, Props } from './typings';
import styles from './styles.module.scss';
import BodyText from 'components/BodyText';
import { useState } from 'react';

const Dropdown: FC<Props> = ({
  label,
  onChangeValue,
  placeholder,
  error,
  value,
  options,
  ...props
}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.content}>
      {!!label?.length && <div className={styles.label}>{label}</div>}
      <div
        onClick={() => setShowMenu(!showMenu)}
        className={styles.inputWrapper}
      >
        <span>
          {options.find((option) => option.value === value)?.text ??
            'Select option'}
        </span>
      </div>
      {showMenu && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              onClick={() => {
                onChangeValue(option);
                setShowMenu(false);
              }}
              key={option.value}
              className={styles.option}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
      {error && !!error.length && (
        <BodyText className={styles.error}>{error}</BodyText>
      )}
    </div>
  );
};

export default Dropdown;

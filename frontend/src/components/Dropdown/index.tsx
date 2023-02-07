import { FC, Props } from './typings';
import styles from './styles.module.scss';
import BodyText from 'components/BodyText';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const Dropdown: FC<Props> = ({
  label,
  onChangeValue,
  placeholder,
  error,
  value,
  options,
  className = '',
  disabled = false,
  hideUsed = false,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === value)?.text ?? 'Select option'
  );
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setSelectedOption(
      options.find((option) => option.value === value)?.text ?? 'Select option'
    );
    if (!hideUsed) return;
    setFilteredOptions(options.filter((option) => option.value !== value));
  }, [options, value]);

  const [showMenu, setShowMenu] = useState(false);
  const disabledClass = disabled && styles.disabled;
  return (
    <div className={classNames(styles.content, className)}>
      {!!label?.length && <div className={styles.label}>{label}</div>}
      <div
        onClick={() => {
          if (!disabled) {
            setShowMenu(!showMenu);
          }
        }}
        className={classNames(styles.inputWrapper, disabledClass)}
      >
        <span>{selectedOption}</span>
      </div>
      {showMenu && (
        <div className={styles.options}>
          {filteredOptions.map((option) => (
            <div
              onClick={() => {
                setSelectedOption(option.text);
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

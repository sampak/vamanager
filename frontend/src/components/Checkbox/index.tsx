import classNames from 'classnames';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FC, Props } from './typings';
import BodyText from 'components/BodyText';
const Checkbox: FC<Props> = ({ label, checked, onCheck }) => {
  const checkStyle = checked ? styles.checked : '';

  return (
    <div onClick={() => onCheck(!checked)} className={styles.container}>
      <div className={classNames(styles.checkbox, checkStyle)}>
        {checked && <FontAwesomeIcon className={styles.icon} icon={faCheck} />}
      </div>
      <div>{label}</div>
    </div>
  );
};

export default Checkbox;

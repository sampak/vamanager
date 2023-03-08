import { FC, Props } from './typing';
import styles from './styles.module.scss';
import ContainerHeader from 'components/ContainerHeader';

const PirepStat: FC<Props> = ({
  headerText,
  icon,
  placeholder,
  text,
  children,
}) => {
  return (
    <div className={styles.stat}>
      <ContainerHeader icon={icon} text={headerText} />
      <div className={styles.bigText}>{children ? children : text}</div>
      {placeholder?.length && (
        <div className={styles.smallText}>{placeholder}</div>
      )}
    </div>
  );
};

export default PirepStat;

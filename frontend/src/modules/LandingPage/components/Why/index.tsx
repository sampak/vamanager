import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import BodyText from 'components/BodyText';
const Why: FC<Props> = ({ title, description, icon: SvgIcon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <SvgIcon className={styles.img} />
      </div>
      <Title className={styles.title} black>
        {title}
      </Title>
      <BodyText className={styles.body}>{description}</BodyText>
    </div>
  );
};

export default Why;

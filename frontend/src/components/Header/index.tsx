import Button from '../Button';
import Title from '../Title';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.mainPanel}>
        <div className={styles.content}>
          <Title className={styles.title}>
            Virtual Airline Manager, Create your virtual airline and try to be a
            best manager!
          </Title>
          <div className={styles.buttons}>
            <Button className={styles.button}>FIND OUT MORE</Button>
            <Button outline className={styles.button}>
              FEATURES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

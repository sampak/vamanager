import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BodyText from 'components/BodyText';
import RoundedButton from 'components/RoundedButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Title from '../Title';
import PreviewImage from './preview.png';
import styles from './styles.module.scss';

const Header = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`landingPage.${key}`);
  const navigate = useNavigate();
  const [isOnScreen, setIsOnScreen] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0, // Zmiana widoczności obiektu, gdy 50% obiektu jest na ekranie
  });

  useEffect(() => {
    if (inView) {
      setIsOnScreen(inView);
    }
  }, [inView]);

  return (
    <div ref={ref} className={styles.header}>
      <div className={styles.info}>
        <CSSTransition
          in={isOnScreen}
          timeout={200}
          classNames={{
            enterDone: styles.fadeText,
          }}
        >
          <div className={styles.text}>
            <Title className={styles.title} black>
              {t('title')}
            </Title>
            <Title className={styles.subTitle} black>
              {t('subTitle')}
            </Title>
            <BodyText className={styles.description}>
              {t('headerDescription')}
            </BodyText>
            <div className={styles.buttonWrapper}>
              <RoundedButton onClick={() => navigate('/auth/signup')}>
                <div className={styles.insideButton}>
                  {t('startNowButton')}
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </div>
              </RoundedButton>
            </div>
          </div>
        </CSSTransition>
      </div>
      <div className={styles.preview}>
        <CSSTransition
          in={isOnScreen}
          timeout={200}
          classNames={{
            enterDone: styles.fadeActive,
          }}
        >
          <img
            className={styles.previewImage}
            src={PreviewImage}
            alt="Application photo"
          />
        </CSSTransition>
        <div className={styles.color}></div>
      </div>
    </div>
  );
};

export default Header;

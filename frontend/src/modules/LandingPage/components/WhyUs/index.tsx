import Why from '../Why';
import styles from './styles.module.scss';
import { ReactComponent as FingerPrint } from '../../assets/fingerprint.svg';
import { ReactComponent as Book } from '../../assets/book.svg';
import { ReactComponent as Board } from '../../assets/board.svg';
import { ReactComponent as Tracker } from '../../assets/tracker.svg';
import { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const WhyUs = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`landingPage.${key}`);
  const [isOnScreen, setIsOnScreen] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.2, // Zmiana widoczności obiektu, gdy 50% obiektu jest na ekranie
  });

  useEffect(() => {
    if (inView) {
      setIsOnScreen(inView);
    }
  }, [inView]);

  return (
    <div className={styles.whyUs}>
      <div className={styles.header}>
        <div className={styles.title}>{t('whyHeader')}</div>
        <div className={styles.subTitle}>{t('whySubHeader')}</div>
      </div>

      <CSSTransition
        in={isOnScreen}
        timeout={0}
        classNames={{
          enterActive: styles.fadeEnter,
          enterDone: styles.fadeActive,
        }}
      >
        <div ref={ref} className={styles.list}>
          <Why
            icon={Book}
            title={t('whys.title1')}
            description={t('whys.description1')}
          />
          <Why
            icon={FingerPrint}
            title={t('whys.title2')}
            description={t('whys.description2')}
          />
          <Why
            icon={Board}
            title={t('whys.title3')}
            description={t('whys.description3')}
          />
          <Why
            icon={Tracker}
            title={t('whys.title4')}
            description={t('whys.description4')}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default WhyUs;

import styles from './styles.module.scss';
import Photo from './photo.png';
// import Mockup from './mockup.png';
import RoundedButton from 'components/RoundedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`landingPage.${key}`);
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img className={styles.img} src={Photo} />
        {/* <img className={styles.mockup} src={Mockup} /> */}
      </div>
      <div className={styles.description}>
        <div className={styles.text}>{t('aboutUsHeader')}</div>
        <div className={styles.subText}>{t('aboutUsSubHeader')}</div>
        <div className={styles.info}>
          <span>{t('aboutUsName')}</span> {t('aboutUsText')}
        </div>
        <div className={styles.buttonWrapper}>
          <RoundedButton
            onClick={() => navigate('/auth/signup')}
            className={styles.button}
          >
            <div className={styles.insideButton}>
              {t('startNowButton')}
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </div>
          </RoundedButton>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

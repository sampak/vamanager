import { FC } from './typings';
import styles from './styles.module.scss';
import OnbordingHeader from 'components/OnbordingHeader';

import { faRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import OnbordingCard from 'components/OnbordingCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OnbordingMethod: FC = () => {
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`onbording.method.${key}`);
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <OnbordingHeader
          title={t('title')}
          subTitle={t('subTitle')}
          steps={[]}
          activeStep={1}
        />
      </div>

      <div className={styles.container}>
        <OnbordingCard
          label={t('exist')}
          icon={faRightToBracket}
          onClick={() => navigate('/onbording/join')}
        />
        <OnbordingCard
          label={t('new')}
          icon={faPlus}
          onClick={() => navigate('/onbording/details')}
        />
      </div>
    </div>
  );
};

export default OnbordingMethod;

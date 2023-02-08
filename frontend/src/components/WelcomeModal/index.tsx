import { FC, Props } from './typings';
import styles from './styles.module.scss';
import SmallModal from 'components/SmallModal';
import Title from 'components/Title';
import BodyText from 'components/BodyText';
import RoundedButton from 'components/RoundedButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WelcomeModal = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`welcomeModal.${key}`);
  const [isModal, setIsModal] = useState(true);
  return (
    <SmallModal isOpen={isModal} handleClose={() => {}} isCloseButton={false}>
      <div className={styles.container}>
        <div className={styles.emoji}>🥳</div>
        <Title className={styles.title} black>
          {t('title')}
        </Title>
        <BodyText className={styles.body}>{t('body')}</BodyText>
        <RoundedButton
          onClick={() => setIsModal(false)}
          className={styles.button}
        >
          {t('button')}
        </RoundedButton>
      </div>
    </SmallModal>
  );
};

export default WelcomeModal;

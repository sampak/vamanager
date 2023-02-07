import { FC, Props } from './typing';
import styles from './styles.module.scss';
import SmallModal from 'components/SmallModal';
import Title from 'components/Title';
import Input from 'components/Input';
import RoundedButton from 'components/RoundedButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorNoti from 'components/ErrorNoti';

const InviteModal: FC<Props> = ({
  open,
  setOpen,
  error,
  isDisabled,
  handleSendInvite,
}) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`inviteModal.${key}`);
  const [email, setEmail] = useState('');

  return (
    <SmallModal isOpen={open} handleClose={setOpen}>
      <div className={styles.content}>
        {!!error?.length && <ErrorNoti text={error} />}
        <Title black>{t('header')}</Title>
        <div className={styles.input}>
          <Input
            type="email"
            placeholder={t('placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <RoundedButton
            onClick={() => setOpen(false)}
            className={styles.button}
            outline
          >
            {t('cancelButton')}
          </RoundedButton>
          <RoundedButton
            isLoading={isDisabled}
            disabled={isDisabled}
            onClick={() => handleSendInvite(email)}
            className={styles.button}
          >
            {t('acceptButton')}
          </RoundedButton>
        </div>
      </div>
    </SmallModal>
  );
};
export default InviteModal;

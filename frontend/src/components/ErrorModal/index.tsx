import { FC, Props } from './typing';
import styles from './styles.module.scss';
import SmallModal from 'components/SmallModal';
import Title from 'components/Title';
import RoundedButton from 'components/RoundedButton';
import CTAButton from 'components/CTAButton';

const ErrorModal: FC<Props> = ({
  isOpen,
  toggle,
  title,
  text,
  acceptText,
  cancelText,
  onAccept,
  onCancel,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <SmallModal
      isOpen={isOpen}
      handleClose={() => toggle(false)}
      isCloseButton={false}
    >
      <div className={styles.container}>
        <Title className={styles.title} black>
          {title}
        </Title>
        <Title className={styles.bodyText} black>
          {text}
        </Title>

        <div className={styles.buttons}>
          <CTAButton onClick={onCancel} text={cancelText} />
          <RoundedButton
            isLoading={isLoading}
            disabled={isDisabled}
            onClick={onAccept}
            className={styles.removeButton}
          >
            {acceptText}
          </RoundedButton>
        </div>
      </div>
    </SmallModal>
  );
};

export default ErrorModal;

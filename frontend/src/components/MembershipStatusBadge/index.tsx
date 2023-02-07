import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const MembershipStatusBadge: FC<Props> = ({ membership, className = '' }) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`membershipCard.${key}`);

  const getColor = () => {
    switch (membership.status) {
      case MembershipStatus.ACTIVE:
        return styles.active;
      default:
        return styles.disabled;
    }
  };

  return (
    <div className={classNames(styles.badge, getColor(), className)}>
      {t(`status.${membership.status}`)}
    </div>
  );
};

export default MembershipStatusBadge;

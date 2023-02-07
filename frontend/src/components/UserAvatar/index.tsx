import { FC, Props } from './typing';
import styles from './styles.module.scss';
import { Avatar } from '@mui/material';
import { getLettersFromName } from 'utils/getLettersFromName';
import classNames from 'classnames';
import { MembershipRole } from '@shared/base/MembershipRole';
import { MembershipStatus } from '@shared/base/MembershipStatus';

const UserAvatar: FC<Props> = ({ user, membership, className = '' }) => {
  // let styleColor = styles.pilot;

  const getRoleColor = () => {
    switch (membership.role) {
      case MembershipRole.ADMIN:
        return styles.admin;
      case MembershipRole.DISPATCHER:
        return styles.dispatcher;
      default:
        return styles.pilot;
    }
  };

  const getStatusColor = () => {
    if (membership.status === MembershipStatus.ACTIVE) {
      return null;
    }

    return styles.disabled;
  };

  return (
    <Avatar className={classNames(getRoleColor(), getStatusColor(), className)}>
      {getLettersFromName(membership?.user!).toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;

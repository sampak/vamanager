import { FC, Props } from './typing';
import styles from './styles.module.scss';
import { Avatar, Rating, Tooltip } from '@mui/material';
import Title from 'components/Title';
import Badge from 'components/Badge';
import { getName } from 'utils/getName';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import Dropdown from 'components/Dropdown';
import { MembershipRole } from '@shared/base/MembershipRole';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/auth';
import UserAvatar from 'components/UserAvatar';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import membershipService from 'api/membershipService';
import { MembershipButtons } from '@shared/ui-configuration/membership';
import { useParams } from 'react-router-dom';
import { getVisibleButtons } from 'utils/getVisibleButtons';
import { getButtonWithCallback } from 'utils/getButtonWithCallback';
import DropdownMenu from 'components/DropdownMenu';
import DropdownMenuV2 from 'components/DropdownMenuv2';
import MembershipStatusBadge from 'components/MembershipStatusBadge';
import { getAPIError } from 'utils/getAPIError';

const MembershipCard: FC<Props> = ({ setError, membership, refetchUsers }) => {
  const { workspaceId } = useParams();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`membershipCard.${key}`);
  const { mutate: updateRole } = membershipService.useUpdateRole();
  const { mutate: updateStatus } = membershipService.useUpdateStatus();
  const { mutate: resendInvite } = membershipService.useResendInvite();
  const { user } = useContext(AuthContext);
  const elo = ((membership?.rating as number) / 1000) * 100;
  const stars = (elo * 5) / 100;

  const roles = Object.keys(MembershipRole).map((role) => ({
    value: role,
    text: role,
  }));

  const [userRole, setUserRole] = useState(membership?.role);

  useEffect(() => {
    setUserRole(membership.role);
  }, [membership]);

  const handleUpdateStatus = (status: MembershipStatus) => {
    setError('');
    updateStatus(
      {
        workspaceID: workspaceId!,
        membershipID: membership.id,
        payload: {
          status,
        },
      },
      {
        onSuccess: () => refetchUsers(),
        onError: (err: any) => {
          setError(getAPIError(err, t));
        },
      }
    );
  };

  const handleUpdateRole = (role: MembershipRole) => {
    setError('');
    updateRole(
      {
        workspaceID: workspaceId!,
        membershipID: membership.id,
        payload: {
          role: role,
        },
      },
      {
        onSuccess: () => refetchUsers(),
        onError: (err: any) => {
          setError(getAPIError(err, t));
        },
      }
    );
  };

  const handleResendInvite = () => {
    setError('');
    resendInvite(
      {
        workspaceID: workspaceId!,
        membershipID: membership.id,
      },
      {
        onSuccess: () => {},
        onError: (err: any) => {
          setError(getAPIError(err, t));
        },
      }
    );
  };

  const CTACallbacks: { [x in MembershipButtons]?: () => void } = {
    [MembershipButtons.canActive]: () => {
      handleUpdateStatus(MembershipStatus.ACTIVE);
    },
    [MembershipButtons.canDisable]: () => {
      handleUpdateStatus(MembershipStatus.DISABLED);
    },
    [MembershipButtons.canResendInvite]: () => {
      handleResendInvite();
    },
  };

  const dropdownDownMenu = () => {
    const visibleButtons = getVisibleButtons(membership.uiConfiguration!);

    return (
      visibleButtons
        ?.map((button) => {
          const isCallback = getButtonWithCallback(CTACallbacks, button);
          if (isCallback) {
            return { text: t(`menu.${button.key}`), onClick: isCallback };
          }

          return null;
        })
        .filter((option) => option !== null) ?? []
    );
  };

  return (
    <div className={styles.card}>
      <Tooltip arrow placement="right" title={membership?.user?.email}>
        <div className={styles.user}>
          <UserAvatar
            className={styles.avatar}
            user={membership!.user!}
            membership={membership}
          />
          <div className={styles.data}>
            <Title className={styles.name} black>
              {getName(membership?.user!)}
            </Title>
            <div className={styles.status}>
              <MembershipStatusBadge membership={membership} />
            </div>
          </div>
        </div>
      </Tooltip>
      <div className={styles.options}>
        {membership.status === MembershipStatus.ACTIVE && (
          <div className={styles.rating}>
            <Rating name="read-only" value={stars} precision={0.5} readOnly />
          </div>
        )}
        {membership.uiConfiguration?.canChangeRole ? (
          <div className={styles.filtersWrapper}>
            <Dropdown
              hideUsed={true}
              disabled={membership?.user?.id === user?.id}
              className={styles.roleDropdown}
              onChangeValue={(option) => {
                setUserRole(option.value as MembershipRole);
                handleUpdateRole(option.value as MembershipRole);
              }}
              options={roles}
              value={userRole}
            />
          </div>
        ) : (
          <Title className={styles.role} black>
            <>Role: {membership.role}</>
          </Title>
        )}
        {!!dropdownDownMenu().length && (
          <div className={styles.dropdownMenu}>
            <DropdownMenuV2
              className={styles.dropdown}
              options={dropdownDownMenu()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipCard;

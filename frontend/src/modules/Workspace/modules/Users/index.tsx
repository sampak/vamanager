import airlineService from 'api/airlineService';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import styles from './styles.module.scss';
import { UsersSearchOrder } from '@shared/dto/UsersSearchDTO';
import MembershipCard from 'components/MembershipCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import InviteModal from 'components/InviteModal';
import AuthContext from 'contexts/auth';
import { Membership } from '@shared/base/Membership';
import { useTranslation } from 'react-i18next';
import { getAPIError } from 'utils/getAPIError';
import ErrorNoti from 'components/ErrorNoti';
import Loading from 'components/Loading';
import EmptyCard from 'components/EmptyCard';

const Users = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`users.${key}`);
  const { user } = useContext(AuthContext);
  const [isInviteModal, setIsInviteModal] = useState(false);
  const { workspaceId } = useParams();

  const [name, setName] = useState('');
  const [search] = useDebounce(name, 300);
  const [error, setError] = useState('');
  const [inviteError, setInviteError] = useState('');

  const [options, setOptions] = useState({
    orderBy: UsersSearchOrder.OLDEST,
  });

  const {
    data: usersData,
    refetch,
    isFetching,
  } = airlineService.useGetUsers(workspaceId!, {
    name: search,
    orderBy: options.orderBy,
  });

  const { mutate: sendInvite, isLoading } = airlineService.useSendInvite();

  const memberships = useMemo(() => usersData?.data ?? [], [usersData]);

  const filters = Object.keys(UsersSearchOrder).map((filter) => ({
    value: filter,
    text: t(filter),
  }));

  useEffect(() => {
    refetch();
  }, [search, options]);

  const handleSendInvite = (email: string) => {
    setInviteError('');
    sendInvite(
      {
        workspaceID: workspaceId!,
        payload: {
          email,
        },
      },
      {
        onSuccess: () => {
          setIsInviteModal(false);
          refetch();
        },
        onError: (err: any) => {
          setInviteError(getAPIError(err, t));
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      {!!error.length && <ErrorNoti className={styles.error} text={error} />}
      {user?.uiConfiguration?.canInviteUsers && (
        <div
          onClick={() => setIsInviteModal(true)}
          className={styles.createButton}
        >
          <FontAwesomeIcon icon={faCirclePlus} /> {t('inviteButton')}
        </div>
      )}

      <div className={styles.filters}>
        <div className={styles.inputWrapper}>
          <Input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('placeholder')}
          />
        </div>

        <div className={styles.filtersWrapper}>
          <Dropdown
            hideUsed={true}
            onChangeValue={(option) =>
              setOptions({
                ...options,
                orderBy: option.value as UsersSearchOrder,
              })
            }
            options={filters}
            value={options.orderBy}
          />
        </div>
      </div>
      {isFetching && <Loading className={styles.loading} />}
      {!isFetching && (
        <div className={styles.usersList}>
          {memberships
            .filter(
              (membership: Membership) =>
                !!membership?.user?.firstName?.length ||
                !!membership?.user?.email?.length
            )
            .map((membership) => (
              <MembershipCard
                setError={setError}
                refetchUsers={refetch}
                membership={membership}
              />
            ))}
        </div>
      )}
      {!isFetching && memberships.length === 1 && (
        <EmptyCard text={t('empty')} />
      )}
      <InviteModal
        error={inviteError}
        handleSendInvite={handleSendInvite}
        isDisabled={isFetching || isLoading}
        open={isInviteModal}
        setOpen={setIsInviteModal}
      />
    </div>
  );
};

export default Users;

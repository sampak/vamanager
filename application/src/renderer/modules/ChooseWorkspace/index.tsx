import userService from '../../api/userService';
import { useMemo } from 'react';
import { FC, Props } from './typings';
import styles from './styles.module.scss';
import AirlineCard from '../../components/AirlineCard';
import { MembershipStatus } from '@shared/base/MembershipStatus';
import { useNavigate } from 'react-router-dom';
import { Membership } from '@shared/base/Membership';
const ChooseWorkspace: FC<Props> = () => {
  const navigate = useNavigate();
  const { data: membershipsData } = userService.useGetMemberships();

  const memberships: Membership[] = useMemo(
    () => membershipsData?.data ?? [],
    [membershipsData]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {memberships
          .filter((membership) => membership.status === MembershipStatus.ACTIVE)
          .map((membership) => (
            <AirlineCard
              membership={membership}
              choose={true}
              onClick={() =>
                navigate(
                  `/workspace/${membership?.airline?.icao.toUpperCase()}`
                )
              }
              airline={membership.airline!}
            />
          ))}
      </div>
    </div>
  );
};

export default ChooseWorkspace;

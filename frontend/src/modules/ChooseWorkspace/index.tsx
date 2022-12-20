import userService from 'api/userService';
import { useMemo } from 'react';
import { FC, Props } from './typings';
import styles from './styles.module.scss';
import AirlineCard from 'components/AirlineCard';
import Logo from 'components/Logo';
import OnbordingHeader from 'components/OnbordingHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ChooseWorkspace: FC<Props> = () => {
  const navigate = useNavigate();
  const { data: membershipsData } = userService.useGetMemberships();

  const memberships = useMemo(
    () => membershipsData?.data ?? [],
    [membershipsData]
  );

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo size={24} />
      </div>
      <div className={styles.header}>
        <OnbordingHeader
          title={'Choose Company'}
          subTitle={''}
          steps={[]}
          activeStep={1}
        />
      </div>
      <div className={styles.addButtonWrapper}>
        <div
          onClick={() => navigate('/onbording/method')}
          className={styles.button}
        >
          <FontAwesomeIcon icon={faCirclePlus} /> Get new company
        </div>
      </div>
      <div className={styles.content}>
        {memberships.map((membership) => (
          <AirlineCard
            membership={membership}
            choose={true}
            onClick={() =>
              navigate(`/workspace/${membership.airline.icao.toUpperCase()}`)
            }
            airline={membership.airline}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseWorkspace;

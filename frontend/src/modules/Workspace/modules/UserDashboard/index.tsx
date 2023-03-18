import {
  faBook,
  faClock,
  faMap,
  faPlaneArrival,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useMemo } from 'react';
import { Rating } from '@mui/material';
import DashboardCard from 'components/DashboardCard';
import styles from './styles.module.scss';
import AuthContext from 'contexts/auth';
import {
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import ContainerHeader from 'components/ContainerHeader';
import membershipService from 'api/membershipService';
import { useNavigate, useParams } from 'react-router-dom';
import Title from 'components/Title';
import pirepService from 'api/pirepService';
import PirepCard from 'components/PirepCard';
import RoundedButton from 'components/RoundedButton';
import { navigateInsideWorkspace } from 'utils/navigateInsideWorkspace';
import LoadingIcon from 'components/LoadingIcon';

const UserDashboard = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const elo = ((user?.membership?.rating as number) / 1000) * 100;
  const stars = (elo * 5) / 100;

  const { data: chartData } = membershipService.useGetChart(
    workspaceId!,
    user?.membership?.id!
  );

  const { data: pirepsData, isLoading: pirepsIsLoading } =
    pirepService.useGetPireps(workspaceId!);

  const charts = useMemo(() => chartData?.data ?? [], [chartData]);
  const pireps = useMemo(() => pirepsData?.data ?? [], [pirepsData]);

  const maxValue = Math.ceil(
    Math.max.apply(
      null,
      charts.map((item) => item.value)
    )
  );
  const minValue = Math.floor(
    Math.min.apply(
      null,
      charts.map((item) => item.value)
    )
  );

  const integerTicks = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => i + minValue
  );

  const getText = () => {
    if (user?.membership?.uiConfiguration?.noPirepsHeader) {
      return `You don't have any flights booked yet, book one now and start your aerial adventure!`;
    }
    if (user?.membership?.uiConfiguration?.scheduledPirepsHeader) {
      return `You have a scheduled flight, don't forget about it or you'll be penalized!`;
    }
    if (user?.membership?.uiConfiguration?.isDelayedPirepHeader) {
      return 'Your flight is delayed!!! A penalty is inevitable, but you can reduce it!';
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>Hello {user?.firstName}! 👋</div>
      <div className={styles.pirep}>{getText()}</div>

      <div className={styles.statistics}>
        <DashboardCard icon={faStar} subText={'Your Rating'}>
          <Rating name="read-only" value={stars} precision={0.5} readOnly />
        </DashboardCard>

        <DashboardCard icon={faBook} subText={'Pireps Filled'}>
          <>{user?.membership?.pirepsFilled}</>
        </DashboardCard>

        <DashboardCard icon={faPlaneArrival} subText={'Average Landing Rate'}>
          <>{user?.membership?.averageLandingRate ?? 0}</>
        </DashboardCard>

        <DashboardCard icon={faClock} subText={'Hours'}>
          <>{user?.membership?.hours}</>
        </DashboardCard>
      </div>

      <div className={styles.charts}>
        <ContainerHeader
          icon={faMap}
          text={'Latest Booked PIREPs from 30 days ago'}
        />
        <ResponsiveContainer className={styles.chart} width="100%" height={400}>
          <AreaChart
            width={500}
            height={400}
            data={charts}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis
              allowDecimals={false}
              allowDataOverflow
              type="number"
              yAxisId="1"
            />
            <Tooltip />
            <Area
              yAxisId={'1'}
              type="monotone"
              dataKey="pireps"
              name="Pireps"
              stroke={styles.mainColor}
              fill={styles.mainColor}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.lastPireps}>
        <div className={styles.pirepsHeader}>
          <Title black>Last Booked Pireps</Title>
          <RoundedButton
            onClick={() =>
              navigateInsideWorkspace(navigate, workspaceId!, '/schedules')
            }
            className={styles.button}
          >
            Book Flight
          </RoundedButton>
        </div>
        <div className={styles.list}>
          {!pirepsIsLoading && !pireps.length && (
            <div className={styles.pirepsEmpty}>
              😭 There's nothing here yet, book your first flight!
            </div>
          )}
          {pirepsIsLoading && <LoadingIcon />}
          {!pirepsIsLoading && (
            <>
              {pireps.slice(0, 5).map((pirep) => (
                <PirepCard pirep={pirep} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

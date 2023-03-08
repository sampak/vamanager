import { Pirep } from '@shared/base/Pirep';
import pirepService from 'api/pirepService';
import Title from 'components/Title';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { faLink, faMap } from '@fortawesome/free-solid-svg-icons';
import PirepMap from 'components/PirepMap';
import LoadingIcon from 'components/LoadingIcon';
import ContainerHeader from 'components/ContainerHeader';
import moment from 'moment';
import classNames from 'classnames';
import PirepDetails from 'components/PirepDetails';
import { MenusItems } from './typings';
import PirepOFP from 'components/PirepOFP';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import LoadingScreen from 'components/LoadingScreen';
import Loading from 'components/Loading';
import BackButton from 'components/BackButton';
import { navigateInsideWorkspace } from 'utils/navigateInsideWorkspace';
import Badge from 'components/Badge';
import { PirepStatus } from '@shared/base/PirepStatus';
import { useTranslation } from 'react-i18next';
import RoundedButton from 'components/RoundedButton';

const PirepModule = () => {
  const { workspaceId, pirepId } = useParams();
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`pirep.${key}`);
  const { data, isLoading } = pirepService.useGetPirep(workspaceId!, pirepId!);
  const pirep: Pirep = useMemo(() => data?.data ?? [], [data]);

  const [menu, setMenu] = useState(MenusItems.DETAILS);
  const isFlightEnded = pirep?.status !== PirepStatus.CREATED;

  const badgeColor = () => {
    switch (pirep.status) {
      case PirepStatus.ACCEPTED:
        return styles.accepted;
      case PirepStatus.AWAITING_VALIDATION:
        return styles.awaiting;
      case PirepStatus.REJECTED:
        return styles.rejected;
      default:
        return '';
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(pirep.routeText);

  const openPrefileTab = (network: string) => {
    if (network === 'VATSIM') {
      window.open(pirep.vatsimLink, 'vatsim');
      return;
    }

    if (network === 'IVAO') {
      window.open(pirep.ivaoLink, 'ivao');
      return;
    }
  };

  const CBackButton = useMemo(() => {
    return (
      <div className={styles.header}>
        <BackButton
          onClick={() =>
            navigateInsideWorkspace(navigate, workspaceId!, '/pireps')
          }
          text={t('backButton')}
        />
      </div>
    );
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading className={styles.loading} />
        {CBackButton}
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      {CBackButton}
      <div className={styles.header}>
        <Title black>
          <>
            {t('flight')} {pirep.flightNumber}
          </>
        </Title>
        <Badge className={badgeColor()} text={t(pirep?.status)} />
      </div>
      <div className={styles.menu}>
        {Object.keys(MenusItems).map((menuItem) => {
          return (
            <div
              onClick={() => setMenu(menuItem as MenusItems)}
              className={classNames(
                styles.menuItem,
                menuItem === menu && styles.activeMenuItem
              )}
            >
              {menuItem}
            </div>
          );
        })}
      </div>
      <div className={styles.sides}>
        <div className={styles.left}>
          {menu === MenusItems.DETAILS && <PirepDetails pirep={pirep} />}
          {menu === MenusItems.OFP && <PirepOFP pirep={pirep} />}
        </div>
        <div className={styles.right}>
          <div className={styles.map}>
            <ContainerHeader icon={faMap} text={t('routeHeader')} />
            {pirep.id ? <PirepMap pirep={pirep} /> : <LoadingIcon />}
          </div>
          <div className={styles.networks}>
            <ContainerHeader icon={faLink} text={t('networks')} />
            <div className={styles.network}>
              <RoundedButton
                onClick={() => openPrefileTab('VATSIM')}
                className={styles.vatsim}
              >
                VATSIM
              </RoundedButton>
              <RoundedButton
                onClick={() => openPrefileTab('IVAO')}
                className={styles.networkButton}
              >
                IVAO
              </RoundedButton>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.route}>
        <ContainerHeader icon={faMap} text={t('route')} />
        <div className={styles.routeText}>{pirep.routeText}</div>
        <div className={styles.buttonWrapper}>
          <RoundedButton onClick={handleCopy} className={styles.button}>
            Copy
          </RoundedButton>
        </div>
      </div>
      {isFlightEnded && (
        <div className={styles.charts}>
          <ContainerHeader icon={faMap} text={t('chart')} />
          <ResponsiveContainer
            className={styles.chart}
            width="100%"
            height={400}
          >
            <AreaChart
              width={500}
              height={400}
              data={pirep?.tracker ?? []}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tickFormatter={(date: Date) => {
                  return moment(date).format('HH:mm');
                }}
              />
              <YAxis allowDataOverflow type="number" yAxisId="1" />
              <YAxis
                orientation="right"
                allowDataOverflow
                type="number"
                yAxisId="2"
              />
              <Tooltip />
              <Area
                yAxisId={'1'}
                type="monotone"
                dataKey="ias"
                name="Speed"
                stroke={styles.mainColor}
                fill={styles.mainColor}
              />
              <Area
                yAxisId={'2'}
                type="monotone"
                dataKey="altitude"
                name="Altitude"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PirepModule;

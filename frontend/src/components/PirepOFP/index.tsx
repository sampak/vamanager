import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import ContainerHeader from 'components/ContainerHeader';
import { useTranslation } from 'react-i18next';

const PirepOFP: FC<Props> = ({ pirep }) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`pirep.${key}`);
  return (
    <>
      <ContainerHeader icon={faBook} text={t('ofp')} />
      <div
        dangerouslySetInnerHTML={{ __html: pirep.plan_html }}
        className={styles.wrapper}
      ></div>
    </>
  );
};

export default PirepOFP;

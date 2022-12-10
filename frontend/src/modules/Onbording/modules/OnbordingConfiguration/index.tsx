import OnbordingHeader from 'components/OnbordingHeader';
import styles from './styles.module.scss';
import { FC, Props } from './typings';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from 'components/Checkbox';
import { useTranslation } from 'react-i18next';
import RoundedButton from 'components/RoundedButton';

const OnbordingConfiguration: FC<Props> = ({
  keys,
  options,
  setOptions,
  details,
  steps,
}) => {
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string, params?: { airlineName?: string }) =>
    translation.t(`onbording.configuration.${key}`, params);

  const handleCheck = (index) => {
    let newValues = [...options];
    newValues[index] = !options[index];

    setOptions(newValues);
  };

  const handleNext = () => {
    navigate('/onbording/base');
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <OnbordingHeader
          title={t('title', { airlineName: details?.name })}
          subTitle={t('subTitle')}
          steps={steps}
          activeStep={1}
        />
      </div>

      <div className={styles.details}>
        {keys.map((option, index) => (
          <Checkbox
            checked={options[index]}
            onCheck={() => handleCheck(index)}
            label={t(option)}
          />
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <RoundedButton
          outline
          onClick={() => navigate('/onbording/details')}
          className={`${styles.button} ${styles.black}`}
        >
          Back
        </RoundedButton>
        <RoundedButton onClick={handleNext} className={styles.button}>
          Next
        </RoundedButton>
      </div>
    </div>
  );
};

export default OnbordingConfiguration;

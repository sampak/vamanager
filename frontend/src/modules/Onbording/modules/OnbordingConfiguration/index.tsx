import Avatar from '@mui/material/Avatar';
import OnbordingHeader from 'components/OnbordingHeader';
import styles from './styles.module.scss';
import { FC, Props } from './typings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import CropModal from 'components/CropModal';
import { useEffect, useState } from 'react';
import { JoiningMethod } from '@shared/base/JoiningMethod';
import { useNavigate } from 'react-router-dom';
import defaultOptions from '@shared/config/AirlineConfig.json';
import Checkbox from 'components/Checkbox';
import { useTranslation } from 'react-i18next';

const OnbordingConfiguration: FC<Props> = ({
  initialValues,
  steps,
  setImage,
  image,
}) => {
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`onbording.configuration.${key}`);
  const options = Object.keys(defaultOptions);
  const [values, setValues] = useState(Object.values(defaultOptions));

  const handleCheck = (index) => {
    let newValues = [...values];
    newValues[index] = !values[index];

    setValues(newValues);
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <OnbordingHeader
          title={t('title')}
          subTitle={t('subTitle')}
          steps={steps}
          activeStep={1}
        />
      </div>

      <div className={styles.details}>
        {options.map((option, index) => (
          <Checkbox
            checked={values[index]}
            onCheck={() => handleCheck(index)}
            label={t(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default OnbordingConfiguration;

import Avatar from '@mui/material/Avatar';
import OnbordingHeader from 'components/OnbordingHeader';
import styles from './styles.module.scss';
import { FC, Props } from './typings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import CropModal from 'components/CropModal';
import { useState } from 'react';
import { Formik } from 'formik';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import { JoiningMethod } from '@shared/base/JoiningMethod';
import RoundedButton from 'components/RoundedButton';
import { useNavigate } from 'react-router-dom';
import TextArea from 'components/TextArea';
import OnbordingDetailsSchema from './validation.schema';
import { useTranslation } from 'react-i18next';

const OnbordingDetails: FC<Props> = ({
  initialValues,
  setValues,
  steps,
  setImage,
  image,
}) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`onbording.details.${key}`);
  const navigate = useNavigate();
  const [cropModal, setCropModal] = useState(false);

  const joinMethods = [
    { value: JoiningMethod.INVITATION_ONLY, text: t('INVITATION_ONLY') },
    { value: JoiningMethod.APPROVAL_NEEDED, text: t('APPROVAL_NEEDED') },
    { value: JoiningMethod.PUBLIC_ACCESS, text: t('PUBLIC_ACCESS') },
  ];

  const handleCropEnd = (croppedImage: string) => {
    setImage(croppedImage);
    setCropModal(false);
  };

  const handleSubmit = (e, values, isValid) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    setValues(values);
    navigate('/onbording/configuration');
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <OnbordingHeader
          title={t('title')}
          subTitle={t('subTitle')}
          steps={steps}
          activeStep={0}
        />
      </div>

      <div className={styles.details}>
        <div
          onClick={() => setCropModal(true)}
          className={styles.avatarContainer}
        >
          <Avatar src={image} className={styles.avatar}></Avatar>
          <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare} />
        </div>

        <Formik
          validateOnMount
          validationSchema={OnbordingDetailsSchema}
          onSubmit={() => {}}
          initialValues={initialValues}
        >
          {({
            values,
            touched,
            handleChange,
            handleBlur,
            isValid,
            errors,
            setFieldValue,
          }) => (
            <form onSubmit={(e) => handleSubmit(e, values, isValid)}>
              <div className={styles.inputWrapper}>
                <Input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  label={t('airlineName')}
                />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  maxLength={3}
                  name="icao"
                  type="text"
                  className={styles.icaoInput}
                  value={values.icao}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={t('airlineIcao')}
                />
              </div>
              <div className={styles.inputWrapper}>
                <TextArea
                  name="description"
                  placeholder={t('airlineDescription')}
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={t('airlineDescriptionLabel')}
                />
              </div>
              <div className={styles.inputWrapper}>
                <Dropdown
                  onChangeValue={(option) =>
                    setFieldValue('joiningMethod', option.value)
                  }
                  options={joinMethods}
                  label={t('method')}
                  value={values.joiningMethod}
                />
              </div>

              <div className={styles.buttonWrapper}>
                <RoundedButton
                  onClick={() => navigate('/onbording/method')}
                  outline
                  className={`${styles.button} ${styles.black}`}
                >
                  Back
                </RoundedButton>
                <RoundedButton disabled={!isValid} className={styles.button}>
                  Next
                </RoundedButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {cropModal && (
        <CropModal
          onClose={() => setCropModal(false)}
          onCropEnd={handleCropEnd}
        />
      )}
    </div>
  );
};

export default OnbordingDetails;

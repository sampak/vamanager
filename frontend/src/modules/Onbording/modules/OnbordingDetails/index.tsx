import Avatar from '@mui/material/Avatar';
import OnbordingHeader from 'components/OnbordingHeader';
import styles from './styles.module.scss';
import { FC, Props } from './typings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import CropModal from 'components/CropModal';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import { JoiningMethod } from '@shared/base/JoiningMethod';
import RoundedButton from 'components/RoundedButton';
import { useNavigate } from 'react-router-dom';
import TextArea from 'components/TextArea';
import OnbordingDetailsSchema from './validation.schema';

const joinMethods = [
  { value: JoiningMethod.INVITATION_ONLY, text: 'Invitation Only' },
  { value: JoiningMethod.APPROVAL_NEEDED, text: 'Need approval from admin' },
  { value: JoiningMethod.PUBLIC_ACCESS, text: 'Public access' },
];

const OnbordingDetails: FC<Props> = ({
  initialValues,
  setValues,
  steps,
  setImage,
  image,
}) => {
  const navigate = useNavigate();
  const [cropModal, setCropModal] = useState(false);

  const handleCropEnd = (croppedImage: string) => {
    setImage(croppedImage);
    setCropModal(false);
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    setValues(values);
    navigate('/onbording/configuration');
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <OnbordingHeader
          title="Airline Details"
          subTitle="Let us help you set up your first airline!"
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
            <form onSubmit={(e) => handleSubmit(e, values)}>
              <div className={styles.inputWrapper}>
                <Input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  label="Enter airline name"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  name="icao"
                  type="text"
                  value={values.icao}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Enter airline icao"
                />
              </div>
              <div className={styles.inputWrapper}>
                <TextArea
                  name="description"
                  placeholder="Enter description about your airline"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Enter description (Optional)"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Dropdown
                  onChangeValue={(option) =>
                    setFieldValue('joiningMethod', option.value)
                  }
                  options={joinMethods}
                  label="Choose Joining method"
                  value={values.joiningMethod}
                />
              </div>

              <div className={styles.buttonWrapper}>
                <RoundedButton
                  // onClick={() => }
                  disabled={!isValid}
                  className={styles.button}
                >
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

import { JoiningMethod } from '@shared/base/JoiningMethod';
import Logo from 'components/Logo';
import ProtectedRoute from 'components/ProtectedRoute';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import OnbordingDetails from './modules/OnbordingDetails';
import { OnbordingValues } from './typings';
import styles from './styles.module.scss';
import OnbordingConfiguration from './modules/OnbordingConfiguration';
import defaultOptions from '@shared/config/AirlineConfig.json';
import OnbordingBase from './modules/OnbordingBase';
import OnbordingMethod from './modules/OnbordingMethod';

const OnbordingRoutes = () => {
  const [values, setValues] = useState<OnbordingValues | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  const optionsKeys = Object.keys(defaultOptions);
  const [options, setOptions] = useState<boolean[]>(
    Object.values(defaultOptions)
  );

  const [selectedAirport, setSelectedAirport] = useState('');

  const initialValues: OnbordingValues = {
    name: values?.name ?? '',
    icao: values?.icao ?? '',
    description: values?.description ?? '',
    joiningMethod: values?.joiningMethod ?? JoiningMethod.APPROVAL_NEEDED,
  };

  const steps = [
    { label: 'Airline Details' },
    { label: 'Airline Configuration' },
    { label: 'Airline Base' },
    // { label: 'First Aircraft' },
    // { label: 'Schedules' },
  ];

  let formatedOptions = {};

  for (let index in optionsKeys) {
    formatedOptions[optionsKeys[index]] = options[index];
  }

  return (
    <>
      <div className={styles.logo}>
        <Logo size={24} />
      </div>
      <ProtectedRoute>
        <Routes>
          <Route path="/method" element={<OnbordingMethod />} />
          <Route
            path="/details"
            element={
              <OnbordingDetails
                setValues={setValues}
                initialValues={initialValues}
                image={image}
                setImage={setImage}
                steps={steps}
              />
            }
          />
          <Route
            path="/configuration"
            element={
              <OnbordingConfiguration
                keys={optionsKeys}
                setOptions={setOptions}
                options={options}
                details={values}
                steps={steps}
              />
            }
          />
          <Route
            path="/base"
            element={
              <OnbordingBase
                image={image ?? ''}
                options={JSON.stringify(formatedOptions)}
                setSelectedAirport={setSelectedAirport}
                selectedAirport={selectedAirport}
                details={values}
                steps={steps}
              />
            }
          />
        </Routes>
      </ProtectedRoute>
    </>
  );
};

export default OnbordingRoutes;

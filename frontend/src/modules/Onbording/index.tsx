import { JoiningMethod } from '@shared/base/JoiningMethod';
import Logo from 'components/Logo';
import ProtectedRoute from 'components/ProtectedRoute';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import OnbordingDetails from './modules/OnbordingDetails';
import { OnbordingValues } from './typings';
import styles from './styles.module.scss';

const OnbordingRoutes = () => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const initialValues: OnbordingValues = {
    name: 'SamFly',
    icao: 'SAF',
    description: 'yes',
    joiningMethod: JoiningMethod.APPROVAL_NEEDED,
  };

  const steps = [
    { label: 'Airline Details' },
    { label: 'Airline Configuration' },
    { label: 'Airline Base' },
    // { label: 'First Aircraft' },
    // { label: 'Schedules' },
  ];

  return (
    <>
      <div className={styles.logo}>
        <Logo size={24} />
      </div>
      <ProtectedRoute>
        <Routes>
          <Route
            path="/details"
            element={
              <OnbordingDetails
                initialValues={initialValues}
                image={image}
                setImage={setImage}
                steps={steps}
              />
            }
          />
          {/* <Route path="/base" element={<OnbordingDetails steps={steps} />} /> */}
        </Routes>
      </ProtectedRoute>
    </>
  );
};

export default OnbordingRoutes;

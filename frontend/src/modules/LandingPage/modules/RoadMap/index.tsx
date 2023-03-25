import RoadmapProgress from 'react-roadmap-progress';
import styles from './styles.module.scss';
import 'react-roadmap-progress/src/styles/index.scss';
import { useEffect, useRef } from 'react';
const RoadMap = () => {
  const endOfPageRef = useRef<any>(null);

  useEffect(() => {
    let timeout: any = null;
    if (endOfPageRef.current) {
      timeout = setTimeout(
        () => endOfPageRef.current.scrollIntoView({ behavior: 'smooth' }),
        100
      );
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);
  const milestones = [
    {
      title: 'Launch application for alpha testers',
      version: '0.0.5',
      description:
        'We have launched the application for a selected group of people who have been granted full access to our application in order to deliver a product of the highest standard to you.',
      complete: true,
    },
    {
      title: 'Launch application',
      version: '0.1.0',
      description:
        'Basic application features have been implemented, such as generating PIREPs, purchasing aircraft, collecting flight information, and an economic system.',
      complete: false,
    },
    {
      title: 'Redesign onbording page',
      version: '0.2.0',
      description:
        'We are aware that the current onboarding page is not optimally designed, which is why we want to change it to something more visually appealing and effective!',
      complete: false,
    },
    {
      title: 'Live Map',
      version: '0.3.0',
      description:
        'We want to introduce a live map on our website so that other users can see who is flying in our amazing application!',
      complete: true,
    },
    {
      title: 'Economy and application',
      version: '0.4.0',
      description: (
        <ul>
          <li>Improved flight data collection</li>
          <li>Economy adjustments</li>
          <li>G-force calculation</li>
          <li>Touchdown point calculation</li>
          <li>Addition of new features to the PIREP page</li>
          <li>Improve showing actual route in application</li>
        </ul>
      ),
      complete: false,
    },
    {
      title: 'Aircraft leasing and trading',
      version: '0.5.0',
      description:
        'Aircraft leasing and an aircraft exchange where airlines can sell their planes to other airlines.',
      complete: false,
    },
    {
      title: 'New Features in application',
      version: '0.6.0',
      description:
        'In this update, we aim to add several significant functionalities to our application, such as settings, a live map, and much more!',
      complete: false,
    },
    {
      title: 'Premium Shop',
      version: '0.7.0',
      description: `In order to maintain the application, we will need to introduce small fees, but don't worry, you will still be able to fully use the application for free!`,
      complete: false,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <RoadmapProgress milestones={milestones} />
      <div ref={endOfPageRef}></div>
    </div>
  );
};

export default RoadMap;

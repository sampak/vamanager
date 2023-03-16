import Analytics from 'analytics';
import { AnalyticsInstance } from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import { useState, useEffect, useContext } from 'react';
import AnalyticsContext from 'contexts/analytics';

export default function useGoogleAnalytics() {
  const { analytics, setAnalytics } = useContext(AnalyticsContext);

  useEffect(() => {
    if (analytics) return;
    const a = Analytics({
      app: 'VAManager.pl',
      plugins: [
        googleAnalytics({
          measurementIds: ['G-FLQFX8R5DT'],
        }),
      ],
    });

    setAnalytics(a);
  }, []);

  return analytics;
}

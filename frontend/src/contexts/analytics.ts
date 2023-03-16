import { createContext } from 'react';
import { AnalyticsInstance } from 'analytics';

type IAnalyticsContext = {
  analytics: AnalyticsInstance | null;
  setAnalytics: (user: AnalyticsInstance | null) => void;
};

const AnalyticsContext = createContext<IAnalyticsContext>({
  analytics: null,
  setAnalytics: () => {},
});

export default AnalyticsContext;

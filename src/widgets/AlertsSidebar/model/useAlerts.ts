import { useState, useEffect, useMemo } from 'react';
import { ALERT_TEMPLATES } from './alerts';

export const useAlerts = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const alerts = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const shuffled = [...ALERT_TEMPLATES].sort((a, b) => {
      const hashA = (seed * (ALERT_TEMPLATES.indexOf(a) + 1)) % 997;
      const hashB = (seed * (ALERT_TEMPLATES.indexOf(b) + 1)) % 997;
      return hashA - hashB;
    });
    return shuffled.slice(0, 5).map((item) => ({ ...item, time: new Date() }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

  return { alerts, currentTime };
};

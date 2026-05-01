import { useState, useEffect } from 'react';
import { health } from '../api/truthlens';

export function useHealth() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    health()
      .then((data) => setStatus(data))
      .catch(() => setStatus({ status: 'offline' }));
  }, []);

  return status;
}

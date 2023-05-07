import React, { useEffect } from 'react';
import { useSync } from '@/core/infrastructure/hooks/useSync';
import SyncView from './Sync.view';

const Sync: React.FC = () => {
  const { sync } = useSync();

  useEffect(() => {
    sync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SyncView />;
};

export default Sync;

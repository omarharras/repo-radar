import { Provider } from 'react-redux';
import { store } from '../store';
import type { PropsWithChildren } from 'react';

export function AppStoreProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

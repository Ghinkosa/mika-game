
import type { SystemState } from '../types';
import { apiRequest } from './apiClient';

type StateResponse = {
  success: boolean;
  state: SystemState;
  error?: string;
};

export async function fetchSystemState(): Promise<SystemState> {
  const result = await apiRequest<StateResponse>('/api/state');

  if (!result.success || !result.state) {
    throw new Error(result.error || 'Unable to load system state.');
  }

  return result.state;
}

export async function saveSystemStateToServer(
  state: SystemState
): Promise<void> {
  const result = await apiRequest<{ success?: boolean; error?: string }>(
    '/api/state',
    {
      method: 'POST',
      body: JSON.stringify(state),
    }
  );

  if (result.success === false) {
    throw new Error(result.error || 'Unable to save system state.');
  }
}

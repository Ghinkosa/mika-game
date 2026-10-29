
import { useCallback, useEffect, useState } from 'react';
import type { SystemState } from '../types';
import { getSystemState, saveSystemState } from '../utils/db';
import {
  fetchSystemState,
  saveSystemStateToServer,
} from '../services/systemStateService';

export function useSystemState() {
  const [state, setState] = useState<SystemState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadState = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchSystemState();
      setState(result);
      saveSystemState(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load system state.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadState();
  }, [loadState]);

  const updateState = useCallback(async (newState: SystemState) => {
    setState(newState);
    saveSystemState(newState);
    setSaving(true);
    setError(null);

    try {
      await saveSystemStateToServer(newState);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save system state.'
      );
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const resetState = useCallback(async () => {
    const defaultState = await getSystemState();
    await updateState(defaultState);
    return defaultState;
  }, [updateState]);

  return {
    state,
    loading,
    error,
    saving,
    loadState,
    updateState,
    resetState,
  };
}

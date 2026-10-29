
import AdminDashboard from '../components/AdminDashboard';
import type { SystemState } from '../types';

type Props = {
  state: SystemState;
  onStateUpdate: (state: SystemState) => void;
};

export default function AdminPage({ state, onStateUpdate }: Props) {
  return (
    <AdminDashboard
      state={state}
      onStateUpdate={onStateUpdate}
    />
  );
}

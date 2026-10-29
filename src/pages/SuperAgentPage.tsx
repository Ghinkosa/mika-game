
import SuperAgentDashboard from '../components/SuperAgentDashboard';
import type { SystemState } from '../types';

type Props = {
  state: SystemState;
  superAgentId: string;
  onStateUpdate: (state: SystemState) => void;
};

export default function SuperAgentPage({
  state,
  superAgentId,
  onStateUpdate,
}: Props) {
  return (
    <SuperAgentDashboard
      state={state}
      superAgentId={superAgentId}
      onStateUpdate={onStateUpdate}
    />
  );
}

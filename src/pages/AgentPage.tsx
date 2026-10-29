
import AgentDashboard from '../components/AgentDashboard';
import type { SystemState } from '../types';

type Props = {
  state: SystemState;
  agentId: string;
  onStateUpdate: (state: SystemState) => void;
};

export default function AgentPage({
  state,
  agentId,
  onStateUpdate,
}: Props) {
  return (
    <AgentDashboard
      state={state}
      agentId={agentId}
      onStateUpdate={onStateUpdate}
    />
  );
}

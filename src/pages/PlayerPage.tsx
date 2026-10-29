
import type { SystemState } from "../types";
import PlayerLobby from "../components/PlayerLobby";

interface PlayerPageProps {
  state: SystemState;
  playerId: string;
  onStateUpdate: (newState: SystemState) => void;
}

export default function PlayerPage({
  state,
  playerId,
  onStateUpdate,
}: PlayerPageProps) {
  return (
    <PlayerLobby
      state={state}
      playerId={playerId}
      onStateUpdate={onStateUpdate}
    />
  );
}


import { useNavigate } from 'react-router-dom';
import type { Account } from '../types';
import PlayerAuth from '../components/PlayerAuth';

type Props = {
  onLoginSuccess: (account: Account) => void;
};

export default function PlayerLoginPage({ onLoginSuccess }: Props) {
  const navigate = useNavigate();

  return (
    <PlayerAuth
      onLoginSuccess={onLoginSuccess}
      onBack={() => navigate('/')}
    />
  );
}

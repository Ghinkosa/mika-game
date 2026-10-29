
import { useNavigate } from 'react-router-dom';
import type { Account } from '../types';
import StaffAuth from '../components/StaffAuth';

type Props = {
  onLoginSuccess: (account: Account) => void;
};

export default function StaffLoginPage({ onLoginSuccess }: Props) {
  const navigate = useNavigate();

  return (
    <StaffAuth
      onLoginSuccess={onLoginSuccess}
      onBack={() => navigate('/')}
    />
  );
}

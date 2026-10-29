
import LandingPageComponent from "../components/LandingPage";

type Props = {
  onPlayerLogin: () => void;
  onPlayerRegister: () => void;
};

export default function LandingPage({
  onPlayerLogin,
  onPlayerRegister,
}: Props) {
  return (
    <LandingPageComponent
      onPlayerLogin={onPlayerLogin}
      onPlayerRegister={onPlayerRegister}
    />
  );
}

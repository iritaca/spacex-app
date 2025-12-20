import InfoIcon from "../icons/InfoIcon";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <header className="flex justify-between pt-8 px-4">
      <Logo />
      <InfoIcon size="lg" />
    </header>
  );
};

export default Header;

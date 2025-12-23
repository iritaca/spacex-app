import Logo from "../Logo/Logo";
import InfoIconAndModal from "../InfoModal/InfoModal";

/**
 * App header containing primary branding and an info icon component
 *
 */
const Header = () => {
  return (
    <header className="flex justify-between pt-8 px-4">
      <Logo />

      <InfoIconAndModal />
    </header>
  );
};

export default Header;

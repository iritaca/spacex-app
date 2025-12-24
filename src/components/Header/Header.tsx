import Logo from "../Logo/Logo";
import InfoIconAndModal from "../InfoModal/InfoModal";

/**
 * App header containing primary branding and an info icon component
 *
 */
const Header = () => {
  return (
    <header className="flex justify-between pt-8 px-4 md:h-24 md:items-center md:flex-shrink-0 md:pt-0 md:px-8 md:border-b-[1px] md:border-primary/30">
      <Logo />

      <InfoIconAndModal />
    </header>
  );
};

export default Header;

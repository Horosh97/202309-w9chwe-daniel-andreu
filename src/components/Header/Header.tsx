import HeaderStyled from "./HeaderStyled";

const Header = (): React.ReactElement => {
  return (
    <HeaderStyled className="header">
      <h1 className="header__title">ISDIgram</h1>
    </HeaderStyled>
  );
};

export default Header;
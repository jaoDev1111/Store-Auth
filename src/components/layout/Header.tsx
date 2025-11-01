import { NavLinks } from "./NavLinks";

interface HeaderProps {
  withNav?: boolean;
}

export const Header = ({ withNav = false }: HeaderProps) => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header>
      {/* Área do Logo */}
      <div></div>
      {/* Área de Navegação */}
      {withNav && <NavLinks links={links} withNav={withNav} />}
    </header>
  );
};

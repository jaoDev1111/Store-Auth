import { Link } from "react-router-dom";

// Renderiza um <nav> com <ul>/<li> baseado na lista recebida.

type NavLink = {
  name: string;
  href: string;
};

type NavLinksProps = {
  links: NavLink[];
  withNav?: boolean;
  ariaLabel?: string;
};

export function NavLinks({
  links,
  withNav = true,
  ariaLabel = "Navegação principal",
}: NavLinksProps) {
  if (!withNav) return null;

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex items-center">
        {/* Faço tipo um v-for do vue, percorrendo array */}
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="mx-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

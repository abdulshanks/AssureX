import { NavLink } from "react-router";

const links = [
  ["/", "Home"],
  ["/dashboard", "Dashboard"],
  ["/claims/new", "New Claim"],
  ["/claims", "Claim History"],
  ["/review", "Review Dashboard"],
  ["/reports", "Reports"],
  ["/login", "Member Login"],
];

export default function Header() {
  return (
    <header>
      <strong>ASSUREX</strong>

      <nav>
        {links.map(([path, label]) => (
          <NavLink key={path} to={path} end={path === "/"}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
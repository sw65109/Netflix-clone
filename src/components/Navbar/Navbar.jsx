import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import useProfile from "../../hooks/useProfile";
import SearchOverlay from "../SearchOverlay/SearchOverlay";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "TV Shows", path: "/tv" },
  { label: "Movies", path: "/movies" },
  { label: "New & Popular", path: "/new" },
  { label: "My List", path: "/my-list", requiresAuth: true },
  { label: "Browse by Languages", path: "/languages" },
];

const PROFILE_OPTIONS = [
  { label: "Adult Profile", value: "adult" },
  { label: "Kids Profile", value: "kids" },
];

const Navbar = ({ isAuthenticated = true }) => {
  const navigate = useNavigate();
  const { switchProfile } = useProfile();

  const navRef = useRef(null);
  const profileMenuRef = useRef(null);
  const accountMenuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsProfileMenuOpen(false);
        setIsAccountMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleNavClick = (event, link) => {
    if (link.requiresAuth && !isAuthenticated) {
      event.preventDefault();
      navigate("/login");
      return;
    }
    setIsMenuOpen(false);
  };

  const handleProfileSelect = (value) => {
    switchProfile(value);
    setIsProfileMenuOpen(false);
    if (value === "kids") {
      navigate("/kids");
    }
  };

  const openSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  return (
    <>
    <header ref={navRef} className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="hamburger"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={handleToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <img src={logo} alt="Netflix Logo" />

        <ul className={`nav-links ${isMenuOpen ? "nav-links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link--active" : ""}`
                }
                onClick={(event) => handleNavClick(event, link)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-right">
        <button
          type="button"
          className="icon-button"
          aria-label="Search"
          onClick={openSearch}
        >
          <img src={search_icon} alt="Search" />
        </button>
        <div className="profile-switcher" ref={profileMenuRef}>
          <button
            type="button"
            className="profile-switcher__trigger"
            aria-haspopup="true"
            aria-expanded={isProfileMenuOpen}
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
          >
            <span>Profile</span>
            <img src={caret_icon} alt="Dropdown arrow" />
          </button>

          {isProfileMenuOpen && (
            <ul
            className="profile-switcher__menu"
              role="menu"
              aria-label="Switch profile"
            >
              {PROFILE_OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleProfileSelect(option.value)}
                    >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          <img src={bell_icon} alt="Notifications" />
        </button>

        <div className="navbar-profile" ref={accountMenuRef}>
          <button
            type="button"
            className="navbar-profile__trigger"
            aria-haspopup="true"
            aria-expanded={isAccountMenuOpen}
            onClick={() => setIsAccountMenuOpen((prev) => !prev)}
          >
            <img src={profile_img} alt="Profile Image" className="profile" />
            <img src={caret_icon} alt="" />
          </button>

          {isAccountMenuOpen && (
            <div className="dropdown">
              <button type="button" role="menuitem" onClick={() => logout()}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
     <SearchOverlay
    isOpen={isSearchOpen}
    onClose={() => setIsSearchOpen(false)} 
    />
    </>
  );
};

export default Navbar;

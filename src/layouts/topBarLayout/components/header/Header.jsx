import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { cnb } from "cnbuilder";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

import { AppRoute } from "routing/AppRoute.enum";

import Button from "components/button";
import AccountDropdown from "components/accountDropdown";

import styles from "./Header.module.scss";

import logo from "assets/images/logo.png";

const Header = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  const history = useHistory();
  const { loggedIn } = useSelector((state) => state.user);

  const handleLogInClick = () => {
    history.push(AppRoute.login);
  };

  return (
    <header>
      <div
        className={cnb(
          styles.Header,
          "d-flex flex-column flex-md-row align-items-md-center"
        )}
      >
        <div className="d-flex justify-content-between align-items-center mb-1 mb-md-0">
          <img src={logo} alt="logo" />
          {!isNotMobile &&
            (loggedIn ? (
              <AccountDropdown />
            ) : (
              <div className="d-flex flex-direction-center w-auto">
                <Button
                  type="button"
                  buttonType="secondary"
                  label="Log in"
                  onClick={handleLogInClick}
                />
              </div>
            ))}
        </div>
        {children}
        {isNotMobile &&
          (loggedIn ? (
            <AccountDropdown />
          ) : (
            <div
              className={cnb(
                styles.Header__login,
                "d-flex flex-direction-center w-auto ml-md-auto"
              )}
            >
              <Button
                type="button"
                buttonType="secondary"
                label="Log in"
                onClick={handleLogInClick}
              />
            </div>
          ))}
      </div>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: undefined,
};

export default Header;

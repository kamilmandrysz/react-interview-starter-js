import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";

import { logout } from "store/user/actions";

import styles from "./AccountDropdown.module.scss";

import avatar from "assets/images/avatar.png";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    className={styles.AccountDropdown__image}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </button>
));

const AccountDropdown = () => {
  const dispatch = useDispatch();

  return (
    <Dropdown className="ml-md-auto">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <img src={avatar} alt="avatar" />
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.AccountDropdown__dropdown}>
        <Dropdown.Item onClick={() => dispatch(logout())} eventKey="1">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AccountDropdown;

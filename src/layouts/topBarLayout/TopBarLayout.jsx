import React from "react";
import PropTypes from "prop-types";

import Header from "layouts/topBarLayout/components/header";
import Content from "layouts/topBarLayout/components/content";

const TopBarLayout = ({ headerChildren, contentChildren }) => {
  return (
    <>
      <Header>{headerChildren}</Header>
      <Content>{contentChildren}</Content>
    </>
  );
};

TopBarLayout.propTypes = {
  headerChildren: PropTypes.node,
  contentChildren: PropTypes.node.isRequired,
};

TopBarLayout.defaultProps = {
  headerChildren: undefined,
};

export default TopBarLayout;

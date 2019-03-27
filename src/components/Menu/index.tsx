import React, { SFC } from "react";

import ToggleMenu from "../ToggleMenu/index";

const Menu: SFC = () => {
  return (
    <>
      <ToggleMenu title="One">content one</ToggleMenu>
      <ToggleMenu title="Two">content Two</ToggleMenu>
      <ToggleMenu title="Three">content Three</ToggleMenu>
    </>
  );
}

export default Menu;

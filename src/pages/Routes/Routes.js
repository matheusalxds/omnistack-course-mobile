import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Main from "../Main/Main";
import Box from "../Box/Box";

const Routes = createAppContainer(
  createSwitchNavigator({
    Main,
    Box,
  })
);

export default Routes;

import React from "react";
import ReduxToastr from "react-redux-toastr";

import { TOASTR_OPTIONS } from "constants/toastr";

const Toastr = () => <ReduxToastr {...TOASTR_OPTIONS} />;

export default Toastr;

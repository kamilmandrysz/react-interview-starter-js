import { combineReducers } from "redux";

import { reducer as toastr } from "react-redux-toastr";
import { reducer as products } from "store/products/reducer";
import { reducer as modal } from "store/modal/reducer";
import { reducer as user } from "store/user/reducer";

export const rootReducer = combineReducers({ products, modal, user, toastr });

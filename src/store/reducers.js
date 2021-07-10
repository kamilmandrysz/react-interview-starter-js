import { combineReducers } from "redux";

import { reducer as products } from "store/products/reducer";
import { reducer as modal } from "store/modal/reducer";

export const rootReducer = combineReducers({ products, modal });

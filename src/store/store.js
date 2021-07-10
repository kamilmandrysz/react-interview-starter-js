import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import { rootReducer } from "store/reducers";

const initializeStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (module.hot) {
    module.hot.accept("store/reducers", () => {
      const nextReducer = require("store/reducers");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export const store = initializeStore();

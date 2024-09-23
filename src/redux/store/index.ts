import { configureStore } from "@reduxjs/toolkit";

import navSectionReducer from "../reducers/navigationSection";

export default configureStore({
  reducer: {
    navSection: navSectionReducer,
  },
});

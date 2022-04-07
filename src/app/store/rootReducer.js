import { combineReducers } from "@reduxjs/toolkit";
import fuse from "./fuse";
import i18n from "./i18nSlice";
import authorization from "./auth";
import user from "./user";
import ordersAdmin from "./oredersAdmin";
import driverMonitor from "./driverMonitor"
import ordersMonitor from "./OrderMonitor"

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    i18n,
    ordersMonitor,
    authorization,
    user,
    ordersAdmin,
    driverMonitor,
    ...asyncReducers,
  });

  return combinedReducer(state, action);
};

export default createReducer;

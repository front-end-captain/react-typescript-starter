import { Modal } from "./../../lib/reduxEffect";

export const GlobalState = {
  login: false,
}

const Global: Modal = {
  namespace: "global",
  state: GlobalState,
}

export default Global;

import { HomeState } from "./../Home/index";
import { AboutState } from "./../About/index";

interface GlobalState {
  home: typeof HomeState;
  about: typeof AboutState;
}

export { GlobalState }

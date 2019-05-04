import { useState, useEffect } from "react";
import { produce } from "immer";
import { Modal, Reducers, Effects, Updater, Update, Selector, Reducer, ActionSelector } from "./types";
import { getActionName } from "./helps";

class Store<S, R extends Reducers<S>, E extends Effects> {
  private store: S;

  private updaters: Array<Updater<S>> = [];

  private modal: Modal<S, R, E>;

  constructor(modal: Modal<S, R, E>) {
    this.store = modal.state;
    this.modal = modal;
  }


  public useStore<P>(selector: Selector<S, P>): P {
    const [state, setState] = useState(this.store);

    const update: Update<S> = (set: any, action: Reducer<S>, payload: any) => {
      if (!action) {
        return null;
      }

      const nextStore: S = produce(this.store, (draftState: S) => {
        action(draftState, payload);
      });

      this.store = nextStore;

      set(() => nextStore);
    };

    const updater: Updater<S> = {
      update,
      set: setState,
    };

    useEffect(() => {
      this.updaters.push(updater);
      return () => {
        this.updaters.splice(this.updaters.indexOf(updater), 1)
      };
    }, []);

    // console.dir(this);

    return selector(state);
  }


  public dispatch<K extends any>(action: keyof (R & E) | ActionSelector<R, E>, payload?: K): void {
    const actionName = getActionName(action);

    if (this.modal.effects && this.modal.effects[actionName]) {
      return this.modal.effects[actionName](payload);
    }

    if (!this.updaters.length) {
      return;
    }

    this.updaters.forEach((updater) => {
      if (this.modal.reducers) {
        updater.update(updater.set, this.modal.reducers[actionName], payload);
      }
    });

    // console.dir(this);
  }
}

export { Store };

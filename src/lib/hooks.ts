interface Instance<I extends Object> {
  render: () => void;
  [key: string]: (param?: any) => void | any;
}

// type Instance<I, K = keyof I> = {
//   render: () => void;
//   keyof I?: (param?: any) => void | any;
// };

export type Component<I> = () => Instance<I>;

type DepList = ReadonlyArray<any>;
type StateList = Array<any>;
type EffectCallback = () => void | (() => void | undefined);
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S;
interface MutableObject<T> {
  current: T;
}

const SimpleReact = (() => {
  const States: StateList = [];
  let currentStateIndex = 0;

  return {
    render: function<I>(component: Component<I>): Instance<I> {
      const com: Instance<I> = component();

      States.splice(States.length - 1, 1);

      com.render();

      currentStateIndex = 0;

      return com;
    },

    useEffect: function(effect: EffectCallback, deps: DepList): void {
      const hasNoDeps = !deps;
      const currentState = States[currentStateIndex];
      const hasChangedDeps = currentState ? !deps.every((dep, i) => dep === currentState[i]) : true;

      if (hasNoDeps || hasChangedDeps) {
        effect();
        States[currentStateIndex] = deps;
      }

      currentStateIndex++;
    },

    useState: function<S>(initialValue: S): [S, Dispatch<SetStateAction<S>>] {
      States[currentStateIndex] = States[currentStateIndex] || initialValue;

      const currentSetStateIndex = currentStateIndex;

      function setState<S>(newValue: S): void {
        States[currentSetStateIndex] = newValue;
      }

      return [States[currentStateIndex++], setState];
    },

    useRef: function<T>(initialValue: T): MutableObject<T> {
      return { current: initialValue };
    },
  };
})();

export { SimpleReact };

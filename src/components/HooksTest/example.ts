import { SimpleReact, Component } from "@/lib/hooks";

const { useState, useEffect } = SimpleReact;

let times = 0;

interface CounterInstance {
  click: () => void;
  query: (word: string) => void;
  noop: () => void;
}

const Counter: Component<CounterInstance> = () => {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState("react");

  useEffect(() => {
    console.group(`${times} render`);
    console.log("%ceffect", "color: blue; font-size: large", count, word);
  }, [count, word]);

  return {
    click: () => setCount(count + 1),
    query: (word: string) => setWord(word),
    noop: () => setCount(count),
    render: () => {
      console.log("%crender", "color: blue; font-size: large", { count, word });
      console.groupEnd();
    },
  };
};


// first render
let counter = SimpleReact.render<CounterInstance>(Counter);
times += 1;

// second render
counter.click();
counter = SimpleReact.render<CounterInstance>(Counter);
times += 1;

// third render
counter.query("hooks");
counter = SimpleReact.render<CounterInstance>(Counter);
times += 1;

// fourth render
counter.noop();
counter = SimpleReact.render<CounterInstance>(Counter);
times += 1;

// fifth render
counter.click();
counter = SimpleReact.render<CounterInstance>(Counter);
times += 1;

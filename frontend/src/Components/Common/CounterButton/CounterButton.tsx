import { hookstate, useHookstate } from "@hookstate/core";

const globalCounterState = hookstate(0);

function CounterButton() {
    const state = useHookstate(globalCounterState);

  return (
    <>
        <b>Counter value: {state.get()}</b>
        <button onClick={() => state.set(p => p + 1)}>Increment</button>
    </>
  )
}

export default CounterButton
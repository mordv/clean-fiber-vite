import { create, GetState, SetState, StateCreator, StoreApi } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

export interface AppState {
  counter: number;
  inc(): void;
  dec(): void;
}

const loggerMiddleware =
  (stateCreator: StateCreator<AppState>) =>
  (set: SetState<AppState>, ...rest: [GetState<AppState>, StoreApi<AppState>]) =>
    stateCreator((state) => {
      console.log(`update state: `, typeof state === `function` ? `function update` : state);
      set(state);
    }, ...rest);

export const useAppStore = create<AppState>()(
  devtools(
    loggerMiddleware((set) => {
      const setMutable = (mutator: (draft: AppState) => void) => set(produce(mutator));

      return {
        counter: 0,
        inc: () => setMutable((state) => void state.counter++),
        dec: () => setMutable((state) => void state.counter--),
      };
    })
  )
);

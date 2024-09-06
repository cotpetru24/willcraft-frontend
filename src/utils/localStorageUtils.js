export const loadState = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null || serializedState === undefined) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error(`Could not load state for key "${key}"`, err);
      return undefined;
    }
  };
  
  
  export const saveState = (key, state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error(`Could not save state for key "${key}"`, err);
    }
  };
  
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PersistentState<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistentState<T>(key: string, defaultValue: T): PersistentState<T> {
  const [value, setValue] = useState<T>(() => {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

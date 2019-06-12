import * as React from 'react';

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const isPrev = (prev:any) => (params:string[]) => {
  if (prev === undefined) return false;
  if (prev === null) return false;

  for (let i of params) {
    if (!prev[i]) return false;
    if (Array.isArray(prev[i]) && prev[i].length === 0) return false;
  }

  return true;
}

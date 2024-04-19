import { useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export default function useSize(ref: React.MutableRefObject<HTMLElement | null>) {
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    if (ref.current === null) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}

import { useEffect, useRef } from 'react';

interface PollingTask {
  key: string;
  fn: () => void;
  interval: number;
}

export function usePolling(tasks: PollingTask[]) {
  const timers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    tasks.forEach(task => {
      // 立即执行一次
      task.fn();
      // 定时轮询
      timers.current[task.key] = setInterval(task.fn, task.interval);
    });
    return () => {
      // 卸载时清理所有定时器
      Object.values(timers.current).forEach(clearInterval);
    };
  }, [tasks]);
} 
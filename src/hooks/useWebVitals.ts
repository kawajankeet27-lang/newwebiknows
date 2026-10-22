import { useEffect } from 'react';

export function useWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Track Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        if (lastEntry) {
          console.log(
            `%c[Performance] LCP: ${Math.round(lastEntry.startTime)}ms`,
            'background: #10B981; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
            {
              element: (lastEntry as any).element || 'unknown',
              url: (lastEntry as any).url || window.location.href,
              startTime: lastEntry.startTime
            }
          );
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP observer not supported or cross-origin restrictions
    }

    // 2. Track Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;

      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count layout shifts without recent user input
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            console.log(
              `%c[Performance] CLS: ${clsValue.toFixed(4)}`,
              'background: #3B82F6; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
              { currentShift: (entry as any).value, totalCLS: clsValue, entry }
            );
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Log final CLS on page hide / unload
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          console.log(
            `%c[Performance] Final CLS Score: ${clsValue.toFixed(4)}`,
            'background: #6366F1; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;'
          );
        }
      };
      window.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        window.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } catch (e) {
      // CLS observer not supported
    }
  }, []);
}

import { useEffect } from 'react';

const DEFAULT_TITLE = 'Jackson Macharia | Data Analyst · BI Developer';

export const usePageTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | Jackson Macharia` : DEFAULT_TITLE;
    return () => {
      document.title = previous;
    };
  }, [title]);
};

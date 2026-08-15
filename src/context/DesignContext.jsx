import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const directions = ['cinematic', 'editorial', 'earthy', 'minimal', 'photographic'];
const DesignContext = createContext(null);
export function DesignProvider({ children }) {
  const [direction, setDirectionState] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('version');
    return directions.includes(requested) ? requested : (localStorage.getItem('hj-direction') || 'cinematic');
  });
  const [theme, setThemeState] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('theme');
    return requested === 'dark' ? 'dark' : (localStorage.getItem('hj-theme') || 'light');
  });
  const setDirection = (value) => {
    const next = directions.includes(value) ? value : 'cinematic';
    const url = new URL(window.location.href);
    url.searchParams.set('version', next);
    window.history.replaceState(window.history.state, '', url);
    setDirectionState(next);
  };
  const setTheme = (value) => {
    const next = value === 'dark' ? 'dark' : 'light';
    const url = new URL(window.location.href);
    url.searchParams.set('theme', next);
    window.history.replaceState(window.history.state, '', url);
    setThemeState(next);
  };
  useEffect(() => { document.documentElement.dataset.direction = direction; localStorage.setItem('hj-direction', direction); }, [direction]);
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; localStorage.setItem('hj-theme', theme); }, [theme]);
  const value = useMemo(() => ({ direction, setDirection, theme, setTheme, directions }), [direction, theme]);
  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
}
export const useDesign = () => useContext(DesignContext);

import { useDesign } from '../../context/DesignContext.jsx';
const labels = { cinematic: '01 Film', editorial: '02 Editorial', earthy: '03 Terrain', minimal: '04 Minimal', photographic: '05 Photo' };
export default function DesignControls() {
  const { direction, setDirection, theme, setTheme, directions } = useDesign();
  return <div className="design-controls" aria-label="Website design and theme">
    <label className="sr-only" htmlFor="design-direction">Design direction</label>
    <select id="design-direction" value={direction} onChange={(event) => setDirection(event.target.value)}>{directions.map((item) => <option key={item} value={item}>{labels[item]}</option>)}</select>
    <button type="button" className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? 'Moon' : 'Sun'}</button>
  </div>;
}

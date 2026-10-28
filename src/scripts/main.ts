import { initTheme } from './theme';
import { initGlow } from './glow';
import { initSpy } from './spy';
import { initReveal } from './reveal';
import { initOpenSource } from './openSource';
import { initPalette } from './palette';
import { initVideos } from './videos';
import { initZoomCenter } from './zoomCenter';

const boot = () => {
  initTheme();
  initGlow();
  initSpy();
  initOpenSource();
  initPalette();
  initReveal();
  initVideos();
  initZoomCenter();
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();

window.addEventListener('vite:preloadError', (event: VitePreloadErrorEvent) => {
  event.preventDefault();
  window.location.reload();
});

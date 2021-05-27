function time(target, name, descriptor) {
  const orig = descriptor.value;
  descriptor.value = function(...args) {
    const start = performance.now();
    orig.apply(this, args);
    const stop = performance.now();
    console.log(`Metrics stats:`, (stop - start).toFixed(2));
  };
}

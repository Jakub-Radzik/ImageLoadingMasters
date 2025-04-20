const desktop3G = {
  rttMs: 400,
  throughputKbps: 400,
  cpuSlowdownMultiplier: 4,
  requestLatencyMs: 0,
  downloadThroughputKbps: 400,
  uploadThroughputKbps: 400,
};

module.exports = {
  extends: "lighthouse:default",
  settings: {
    emulatedFormFactor: "desktop",
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleRatio: 1,
      disabled: false,
    },
    throttling: desktop3G,
    throttlingMethod: "simulate",
  },
};

const desktop4G = {
  rttMs: 170,
  throughputKbps: 9000,
  cpuSlowdownMultiplier: 2,
  requestLatencyMs: 0,
  downloadThroughputKbps: 9000,
  uploadThroughputKbps: 9000,
};

module.exports = {
  extends: "lighthouse:default",
  settings: {
    emulatedFormFactor: "desktop",
    screenEmulation: {
      width: 1920,
      height: 1080,
      deviceScaleRatio: 1,
      disabled: false,
    },
    throttling: desktop4G,
    throttlingMethod: "simulate",
  },
};

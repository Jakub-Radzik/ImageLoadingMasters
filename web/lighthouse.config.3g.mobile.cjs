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
    emulatedFormFactor: "mobile",
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleRatio: 1,
      disabled: false,
    },
    throttling: desktop3G,
    throttlingMethod: "simulate",
  },
};

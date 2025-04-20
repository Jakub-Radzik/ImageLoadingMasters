const mobile4G = {
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
    emulatedFormFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleRatio: 2,
      disabled: false,
    },
    throttling: mobile4G,
    throttlingMethod: "simulate",
  },
};

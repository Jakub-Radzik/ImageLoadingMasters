import { useSearchParams } from "react-router-dom";
import { Compression, FORMAT } from "../../utils/url";

export const ReferenceImageControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current parameter values (or fallback to defaults)
  const dir = searchParams.get("dir") as FORMAT | null;
  const img = parseInt(searchParams.get("img") || "0");
  const w = parseInt(searchParams.get("w") || "0");
  const q = parseInt(searchParams.get("q") || "-1");
  const c = (searchParams.get("c") || "lossless") as Compression;
  const interlaced = searchParams.get("interlaced") === "true";

  // Helper to update a single search parameter
  const updateSearchParam = (key: string, value: string) => {
    // Clone the current search params to avoid mutating them directly
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <div>
      <h2>Reference Image Controls</h2>
      <div>
        Image:
        {[1, 2, 3].map((v) => (
          <button
            style={img === v ? { background: "cyan" } : {}}
            onClick={() => {
              updateSearchParam("img", v.toString());
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <div>
        Format:
        {["png", "avif", "webp", "jpg"].map((v) => (
          <button
            style={dir === v ? { background: "cyan" } : {}}
            onClick={() => {
              updateSearchParam("dir", v);
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <div>
        Width:
        {[1920, 800, 400].map((v) => (
          <button
            style={w === v ? { background: "cyan" } : {}}
            onClick={() => {
              updateSearchParam("w", v.toString());
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <div>
        Quality / Level:
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90].map(
          (v) => (
            <button
              style={q == v ? { background: "cyan" } : {}}
              onClick={() => {
                updateSearchParam("q", v.toString());
              }}
            >
              {v}
            </button>
          )
        )}
      </div>
      <div>
        Compression:
        {["lossy", "lossless"].map((v) => (
          <button
            style={c == v ? { background: "cyan" } : {}}
            onClick={() => {
              updateSearchParam("c", v.toString());
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <div>
        Interlacing:
        {[true, false].map((v) => (
          <button
            style={interlaced === v ? { background: "cyan" } : {}}
            onClick={() => {
              updateSearchParam("interlaced", v.toString());
            }}
          >
            {v.toString()}
          </button>
        ))}
      </div>
    </div>
  );
};

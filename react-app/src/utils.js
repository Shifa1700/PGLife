// Resolve API and image URLs relative to the PHP page so the build works on
// localhost and when the project is deployed under a different directory.
export const base_path =
  window.location.port === "3000" ? "http://localhost/PGLife" : ".";

export const assetUrl = path => {
  if (!path) {
    return "";
  }

  return `${base_path}/${path.replace(/^\/+/, "")}`;
};

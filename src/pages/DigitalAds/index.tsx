import CabContext from "@/contexts/CabContext";
import useCab from "@/hooks/useCab";
import Spinner from "react-spinners/PacmanLoader";

const origins = {
  beta: "https://app.dev.glide.com",
  dev: "http://webapp.localhost",
};
const serviceId = "digital-ads";
export default function DigitalAds() {
  const { bridge, loading, error } = useCab(
    {
      origin: origins.dev,
      serviceId,
      autoResize: false,
    },
    (token) => console.log
  );
  if (error) {
    console.error("errrrrr", error.message);
  }
  return loading ? (
    <CabContext.Provider value={bridge}>
      <div>Select the demo embedded app you want to load.</div>
      {error && <div>{error}</div>}
    </CabContext.Provider>
  ) : (
    <div>
      <Spinner />
    </div>
  );
}

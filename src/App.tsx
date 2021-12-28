import useCAB from "./hooks/useCAB";

const origins = {
  beta: "https://app.dev.glide.com",
  dev: "http://webapp.localhost",
};
const serviceId = "digital-ads";
export default function App() {
  const bridge = useCAB(
    {
      origin: origins.dev,
      serviceId,
      autoResize: false,
    },
    (token) => console.log
  );
  return <h1>App!!</h1>;
}

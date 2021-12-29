import { createContext } from "react";
import { EmbeddedApp } from "vendor/compass-app-bridge";

const CabContext = createContext<EmbeddedApp | undefined>(undefined);
export default CabContext;

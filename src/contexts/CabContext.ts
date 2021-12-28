import { createContext } from "react";
import { EmbeddedApp } from "../compass-app-bridge";

const CabContext = createContext<EmbeddedApp | undefined>(undefined);
export default CabContext;

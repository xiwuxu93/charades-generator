import CharadesGeneratorOptimized from "./CharadesGeneratorOptimized";
import type { ComponentProps } from "react";

export type CharadesGeneratorProps = ComponentProps<typeof CharadesGeneratorOptimized>;

export default function CharadesGenerator(props: CharadesGeneratorProps) {
  return <CharadesGeneratorOptimized {...props} />;
}

// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    clearHoveredId: "UNHOVER";
    setHoveredId: "HOVER";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "add"
    | "cursor"
    | "cursor.hover"
    | "cursor.noHover"
    | "pan"
    | { cursor?: "hover" | "noHover" };
  tags: never;
}

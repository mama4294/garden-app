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
    setCursorLoc: "MOVE_CURSOR";
    setHoveredId: "HOVER";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "add"
    | "add.idle"
    | "cursor"
    | "cursor.Selecting"
    | "cursor.Selecting.idle"
    | "cursor.hovering"
    | "cursor.hovering.hover"
    | "cursor.hovering.noHover"
    | "pan"
    | {
        add?: "idle";
        cursor?:
          | "Selecting"
          | "hovering"
          | { Selecting?: "idle"; hovering?: "hover" | "noHover" };
      };
  tags: never;
}

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
    addIdToSelection: "SELECT_SHAPE";
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
    | "cursor.Selecting.noSelection"
    | "cursor.Selecting.selection"
    | "cursor.hovering"
    | "cursor.hovering.hover"
    | "cursor.hovering.noHover"
    | "cursor.movement"
    | "cursor.movement.idle"
    | "pan"
    | {
        add?: "idle";
        cursor?:
          | "Selecting"
          | "hovering"
          | "movement"
          | {
              Selecting?: "noSelection" | "selection";
              hovering?: "hover" | "noHover";
              movement?: "idle";
            };
      };
  tags: never;
}

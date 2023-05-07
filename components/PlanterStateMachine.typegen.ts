// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "onAdd" | "onCursor" | "onHover" | "onPan" | "onUnhover";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    onAdd: "selectAdd" | "xstate.init";
    onCursor: "selectCursor";
    onHover: "onHover";
    onPan: "selectPan";
    onUnhover: "onUnhover";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "add"
    | "cursor"
    | "cursor.isHovering"
    | "cursor.isNotHovering"
    | "pan"
    | { cursor?: "isHovering" | "isNotHovering" };
  tags: never;
}
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "onAdd" | "onCursor" | "onHover" | "onPan" | "onUnhover";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    onAdd: "selectAdd" | "xstate.init";
    onCursor: "selectCursor";
    onHover: "onHover";
    onPan: "selectPan";
    onUnhover: "onUnhover";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "add"
    | "cursor"
    | "cursor.isHovering"
    | "cursor.isNotHovering"
    | "pan"
    | { cursor?: "isHovering" | "isNotHovering" };
  tags: never;
}

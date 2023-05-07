import { createMachine, assign } from "xstate";

type Event =
  | { type: "HOVER"; id: string }
  | {
      type:
        | "SELECT_CURSOR"
        | "SELECT_PAN"
        | "SELECT_ADD"
        | "SELECT_SHAPE"
        | "CLEAR_SELECTION"
        | "UNHOVER";
    };

type Context = {
  hoveredId: string | null;
  cursor: { x: number; y: number };
};

export const stateMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcD2AnAdAYwFctZsBiAZQFEAZSgYQBUB9ABQEEA5AbQAYBdRKAAOGWOhQYAdoJAAPRACYAHABYcANgCsARgCcCzQp4B2JZq0AaEAE9ExzTm0KV2gMzrdPV8Z-HtAX38rVExcQmJsHEkMAAkMADcwLFIYgHkANUoAJV4BJBARMTQJaXz5BB8cP2NnJQMlHhUFY3UrWwRXTVdHdW0VHV0VJW0lP3VA4Ih0SPCSXAALBKTSAFUONMyc-hlC8SkZctcFbu0eXV69U2MVNsVXbvUvLvP7nkeVCfAp0JwhAENJBQaPRmHQVllyKktnlhKI9qVQOUnEpHJozJo0XUMX5NLcKg4nC53J5vL4AkEvtNcP9AVRaIwmGwACJM3I7OHFfZlRT9HBvQzGN5vTqqPEAWgU2nUOF0ugF6hUJh4JhanxCMyIcyB9OYzNZ23yu05CLkiBUiqq-XUpjlcpcrRsiCU0tOnVcuicg2VBjV30ifwgEG1INYnDZho5JQOiFcQxwSlcdXsaNOoxujoQYu0hkcPClzVGst0zt9VJwAaDdJDYIhUPDsKKUe5CE0sr5ejO-Kcbwd7TFnnjOnUCjlXVGCmtgQp0QgcBk6qw7MbXMRiCzKOUzR01z0mhq6b7rkaOBUcuaI2V5tcUtLP1m2CX8OjCBHVW0+6xDSaLTxfRdT3dT1FR4H0KQXfBNUiaI4kSRcI2XE1yiUXQcFqTQAJUHxGjxY4HgAl4j3eBRbw1CIFiWOCGyfZtFQUeNvCMEDdB8BpdDxbwXUTb093sfQExI6kAUfY1nycOjzQMPxdGvTCtAUcVs26Tp8w8bw9xMXQBPLQNhKbVcEBUdQUQTJMMWGHg0wUrocGU4dhzeQlzCnfwgA */
    tsTypes: {} as import("./stateMachine.typegen").Typegen0,
    id: "editor",

    context: {
      hoveredId: null,
      cursor: { x: 0, y: 0 },
    },

    schema: {
      context: {} as Context,
      events: {} as Event,
    },

    states: {
      cursor: {
        on: {
          SELECT_PAN: {
            target: "pan",
          },

          SELECT_ADD: "add",
        },

        states: {
          noHover: {
            on: {
              HOVER: {
                target: "hover",
                actions: ["setHoveredId"],
              },
            },
          },

          hover: {
            on: {
              UNHOVER: { target: "noHover", actions: ["clearHoveredId"] },
            },
          },
        },

        initial: "noHover",
      },

      pan: {
        on: {
          SELECT_CURSOR: "cursor",
          SELECT_ADD: "add",
        },
      },

      add: {
        on: {
          SELECT_PAN: "pan",
          SELECT_CURSOR: "cursor",
        },
      },
    },

    predictableActionArguments: true,
    initial: "cursor",
  },
  {
    actions: {
      // consolelog: (context, event) => console.log(JSON.stringify(event.id)),
      setHoveredId: assign((context, event) => {
        return {
          hoveredId: event.id,
        };
      }),
      clearHoveredId: assign(() => {
        return {
          hoveredId: null,
        };
      }),
    },
  }
);

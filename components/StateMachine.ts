import { createMachine, assign } from "xstate";

type Shapes = Record<string, Shape>;

type Event =
  | { type: "HOVER"; id: string }
  | { type: "MOVE_CURSOR"; cursor: Point }
  | { type: "SELECT_SHAPE"; id: string }
  | {
      type:
        | "SELECT_CURSOR"
        | "SELECT_PAN"
        | "SELECT_ADD"
        | "DELETE_SELECTION"
        | "UNHOVER";
    };

type Context = {
  hoverId: string | null;
  cursor: Point;
  shapes: Shapes;
  selection: string[];
};

export const stateMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcD2AnAdAYwFctZsBiAZQFEAZSgYQBUB9ABQEEA5AbQAYBdRKAAOGWOhQYAdoJAAPRABYAnAEYcKgBwB2AKw8VAJgDMWnrqUAaEAE9EJozgM8jhlSZUA2HtoUBfX1aomLiExGRUtIxMbAAiMbwCSCAiYmgS0knyCMpqmrr6xqbmVrYITgaOevpGPh5KCgYG-oEQ6Nj4RCS4ALYYAG5g3WCSaDgoEAA2YKQAsgDyAGqUTHQAqgBK5HPrCTIp4lIyWQC0ujo4Sjxml+5ad1oldjrnBho6ugYqPDoKCkYKHma4FawQ6YVwAAt+mAsChJFAcJIMAAJaFYUjIxaUHb8PaiA4ZUAnFSGCreAw6DQkr5ebyPBBGDxaHA1BQ6DweAxaHwqJRAoLtUJdHBQgaw+EitGkVYcTFLHGJYT4tKHTKIY4koznb46JQeEwaQ06Tz04weFl1L4aHgKHgGX4qfkgwWddrkMBTPBpCVI92elWSCg0ejMcjItgsSi7JL7ANHdUOlm2pSmM16n4eelGfTqT6eK4aTkKLQePwBYFtEKu3B+sBeuEI2AeusB0gxYMMZYREMASTm3FxMeV6XjCGOxh4OD+ChJSmeug0M50We8OELGjnml57w8hadlbBwtr9YlTf96SDkVD4cj0aVqRHarHM7UXJ4HN+WicRiUlhsilUHB3zzO1lEXNx91BIQAENA27KI1k2bY72SYdVSJRBnnNHg5wpN49A0LkjHpHQnBwOpuUMEt7hJSD2hguDgyiWJ4kHe8CVHTl6XuHBTBcFR8kpXc+XLAVcGgiAIEvENWE4FDY0fDCEFI+lCI0RxnE1UsClUOjxMk6SEI2LYFTxB90LkADcm0PRDBMMxdVUtQqiuHC7l+AEyxaA8JIgMZJmmeYlhWYzkLY1DzMJSyyn1IDjGnTQFENE1-wQPUFHUHRsyULUqTcG1-HLJEIDgGQxLMjinw1RMPCqRkXy0HKHlS8dzXyjddBqAx9T4vTD2wCq4yqtwcvIurSxJRqTHpDw1EZVQbSMT5jA3R1ROdKtwRwXoBiGEZBsU6LjmtBxLmuZwtAE+56RUPQpzMUtZq1Nw2S0PqhXaHbBmGUZximA6LJOLQaiAu0XGzSkDD1TNUsKC4HuLX8AXcQF1oPD7ITRBsAai4l-nOWqrnqyampupK10td9NDMJd3urSUxQbREUTRHHRw1KHmUJ5wJoE0nYbqXMtF+Kk2RtZ46a20UYSZ6WsDZqq53NGoVCS7QcJyn8sw5Fl2QXFNZ2LSWj2bE8oAVpTjlsqcfnteps0LD8buNXNJoE20OTeY23VN70EV9X3DoUwGEyym2GmUP5vA5UtTRBzkSW0nCltF72a0D09A4s4PcYTNwcFstxPApVRlHpBp1PZZbtL0OoRO8qDYIt6LrQqGps10VXspU1LZvNNkUxnNzSOUPrfObrJPm1eL-kS5LKScjLbu7q5GkpeuK1BXz-P+odItHLklEcYG-k0KklGMIxiNSy41Fq7Ld1mktbsK3wgA */
    tsTypes: {} as import("./stateMachine.typegen").Typegen0,

    id: "editor",

    schema: {
      context: {} as Context,
      events: {} as Event,
    },

    states: {
      cursor: {
        states: {
          movement: {
            states: {
              idle: {
                on: {
                  MOVE_CURSOR: {
                    target: "idle",
                    internal: true,
                    actions: ["setCursorLoc"],
                  },
                },
              },
            },

            initial: "idle",
          },

          hovering: {
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
                  UNHOVER: {
                    target: "noHover",
                    actions: ["clearHoveredId"],
                  },
                },
              },
            },

            initial: "noHover",
          },

          Selecting: {
            states: {
              noSelection: {
                on: {
                  SELECT_SHAPE: {
                    target: "selection",
                    actions: ["addIdToSelection"],
                  },
                },
              },

              selection: {
                on: {
                  SELECT_SHAPE: {
                    target: "selection",
                    actions: ["addIdToSelection"],
                    internal: true,
                  },

                  DELETE_SELECTION: {
                    target: "noSelection",
                    // actions: ["deleteSelection"],
                  },
                },
              },
            },

            initial: "noSelection",
          },
        },

        on: {
          SELECT_PAN: "pan",
          SELECT_ADD: "add",
        },

        type: "parallel",
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

        states: {
          idle: {
            on: {
              MOVE_CURSOR: {
                target: "idle",
                internal: true,
                actions: ["setCursorLoc"],
              },
            },
          },
        },

        initial: "idle",
      },
    },

    predictableActionArguments: true,
    initial: "cursor",
  },
  {
    actions: {
      setHoveredId: assign((context, event) => {
        return {
          hoverId: event.id,
        };
      }),
      clearHoveredId: assign(() => {
        return {
          hoverId: null,
        };
      }),
      setCursorLoc: assign((context, event) => {
        return {
          cursor: event.cursor,
        };
      }),
      addIdToSelection: assign((context, event) => {
        return {
          selection: [...context.selection, event.id],
        };
      }),
    },
  }
);

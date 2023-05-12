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
        | "UNHOVER"
        | "PAN"
        | "START_PAN"
        | "END_PAN";
    };

export type Context = {
  hoverId: string | null;
  cursor: Point;
  shapes: Shapes;
  selection: string[];
};

export const stateMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcD2AnAdAYwFctZsBiAZQFEAZSgYQBUB9ABQEEA5AbQAYBdRKAAOGWOhQYAdoJAAPRABYAnAEYcKgBwB2AKw8VAJgDMWnrqUAaEAE9EJozgM8jhlSZUA2HtoUBfX1aomLiExGRUtIxMbAAiMbwCSCAiYmgS0knyCMpqmrr6xqbmVrYITgaOevpGPh5KCgYG-oEQ6Nj4RCS4ALYYAG5g3WCSaDgoEAA2YKQAsgDyAGqUTHQAqgBK5HPrCTIp4lIyWQC0ujo4Sjxml+5ad1oldjrnBho6ugYqPDoKCkYKHma4FawQ6YVwAAt+mAsChJFAcJIMAAJaFYUjIxaUHb8PaiA4ZUAnFSGCreAw6DQkr5ebyPBBGDxaHA1BQ6DweAxaHwqJRAoLtUJdHBQgaw+EitGkVYcTFLHGJYT4tKHTKIY4koznb46JQeEwaQ06Tz04weFl1L4aHgKHgGX4qfkgwWddrkMBTPBpCVI92elWSCg0ejMcjItgsSi7JL7ANHdUOlm2pSmM16n4eelGfTqT6eK4aTkKLQePwBYFtEKu3B+sBeuEI2AeusB0gxYMMZYREMASTm3FxMeV6XjCGOxh4OD+ChJSmeug0M50We8OELGjnml57w8hadlbBwtr9YlTf96SDkVD4cj0aVqRHarHM7UXJ4HP1jSchgU9JyOHfRp9C0G4tHtQFywFXAhAAQ0DbsojWTZtjvZJh1VIlEGec0eDnCk3j0DQuSMekdCcHA6m5QwS3uEl91BWD4ODKJYniQd7wJUdOXpe4cFMFwVHySldz5SDnWguDEQwNAWDgyQGwoBg2HWZh2AHRU0IfDC5DsOoFD4rRiy+XUtWLek3jUECnBTDQXD+bl6PaRicEY+T4VISgOBiVhOFQ2NH1AUoaQ0ACchUYsahTE0dIZPUKmURkN0MvReQ0RzcBgiAIEvEMfPUvEtMJGKyPM15HGcTVSwKVR0pwTLsoQ5gkK2BUCs4p9-zyFLCjMXVzLUKorlwu5fgBMsWgPeqxkmaZ5iWFYNhavz0KKrI5307kmWNX5dTZDR6S+QS+L+WzKVsiK0qBJEIDgGQoLauMnw1RMPCqRkXxAkx6XHc03GGmcai0TQCNqoVsAegKYo1IwlAcV6rneklPoeGxEA8NRGVUJQlELEl2SccaK1BMGemhIYRgh7STmtBxLmuZwgfuFGgr0KczEM8KAUaZQdFB6scF6AZydGcYpkp1b1S0GoALtFxs0pAw9UzVGyhMC4zFLED6n1IGIIm4n+dFGEG3F0dobZCi3tLJHYeZxBwpCwslG-HJbN5PnwUlMUGyk1ExVNp7DBTS2EetwTbdNOpc0MhQqTZG1ng94UjfFBEU4DzCxznc0agd7RcNhmGsw5Fl2QXKLeWLJO3WbE8oAzqGUqnH57XqbNCw5X8VZUY1cxJTkDVe8Dq5rWvvQRX0x8h-yqYTHQHDZBplD+bwPy70pjBCzl+9tXCjFecKR5wY9x5wM8W2nlazYBnAUrcTwKVUZQ-zK-HDCqvQ6lE-WnLghusneuaEaQNviwx+HbBA+olC303kYLU+pfivFqs5JEMk5ImyHIVUcJhe4cnqGBGG+oagkRVmBZkdpd66CIYJS6P8JKSBcug+E-87D5D4kyai9oUo4wOu+EKNpVDhSlklTwtV6osIQJcIBhZdCc12pScyTJjqMlep4BoitaFE3aFNUWYAJFRQAoyQyT8NElnpHOF4J0YZqK+Mofw-ggA */
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
                  DELETE_SELECTION: {
                    target: "noSelection",
                    actions: ["delete"],
                  },

                  SELECT_SHAPE: {
                    target: "selection",
                    internal: true,
                    actions: ["addIdToSelection"],
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

        states: {
          notPanning: {
            on: {
              START_PAN: {
                target: "panning",
              },
            },
          },

          panning: {
            on: {
              END_PAN: {
                target: "notPanning",
              },
            },
          },
        },

        initial: "notPanning",
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
        //change this to toggle selection
        return {
          selection: [...context.selection, event.id],
        };
      }),

      delete: assign((context) => {
        //remove the context.shape objects which have an ID in the context.selection array
        const updatedShapes = Object.keys(context.shapes)
          .filter((key: string) => !context.selection.includes(key))
          .reduce((obj: Shapes, key: string) => {
            obj[key] = context.shapes[key];
            return obj;
          }, {});

        console.log(updatedShapes);
        return {
          shapes: updatedShapes,
          selection: [],
        };
      }),
    },
  }
);

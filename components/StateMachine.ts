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
    /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcD2AnAdAYwFctZsBiAZQFEAZSgYQBUB9ABQEEA5AbQAYBdRKAAOGWOhQYAdoJAAPRABYAnAEYcKgBwB2AKw8VAJgDMWnrqUAaEAE9EJozgM8jhlSZUA2HtoUBfX1aomLiExGRUtIxMbAAiMbwCSCAiYmgS0knyCMpqmrr6xqbmVrYITgaOevpGPh5KCgYG-oEQ6Nj4RCS4ALYYAG5g3WCSaDgoEAA2YKQAsgDyAGqUTHQAqgBK5HPrCTIp4lIyWQC0ujo4Sjxml+5ad1oldjrnBho6ugYqPDoKCkYKHma4FawQ6YVwAAt+mAsChJFAcJIMAAJaFYUjIxaUHb8PaiA4ZUAnFSGCreAw6DQkr5ebyPBBGDxaHA1BQ6DweAxaHwqJRAoLtUJdHBQgaw+EitGkVYcTFLHGJYT4tKHTKIY4koznb46JQeEwaQ06Tz04weFl1L4aHgKHgGX4qfkgwWddrkMBTPBpCVI92elWSCg0ejMcjItgsSi7JL7ANHdUOlm2pSmM16n4eelGfTqT6eK4aTkKLQePwBYFtEKu3B+sBeuEI2AeusB0gxYMMZYREMASTm3FxMeV6XjCGOxh4OD+ChJSmeug0M50We8OELGjnml57w8hadlbBwtr9YlTf96SDkVD4cj0aVqRHarHM7UXJ4HP1jSchgU9JyOHfRp9C0G4tHtQFywFXAhAAQ0DbsojWTZtjvZJh1VIlEGec0eDnCk3j0DQuSMekdCcHA6m5QwS3uEl91BWD4ODKJYniQd7wJUdOXpe4cFMFwVHySldz5SDnWguDEQwNAWDgyQGwoBg2HWZh2AHRU0IfDC5DsOoFD4rRiy+XUtWLek3jUECnBTDQXD+bl6PaRicEY+T4TbdY2AAcVYThUNjR9MIZVQHBtddPnqMCDHM3UAO5bMQKUKl9QgloDxgiAIEvENfPUvEtMJHSEDI8zXkcZxNVLApVEc3AMqyhDmCQrYFXyzin3-PI9EMEwzF1cy1CqK5cLuX4ATLNLQXqsZJmmeYlhWDYWv89DCqyOd9O5JljV+XU2Q0ekvkEvi-lsylbOLGp-HLJEIDgGQoLauMnw1RMPCqRkXxAkx6XHc03Fw5wmWcIxXlqw9sCewKio1IwlAcd6rk+klvoeGxEA8NRGVUUkvE0T5UorUEhXaXoBiGEYoe0k5rQcS5rmcLRBPuQ69CnMxEa+AF300cGSZ6aEKdGcYpiptb1S0GoALtFxs0pAw9UzdGyhMC4OeLJR6n1JnCagiHITRBsxdHWG2Qoj7SxR+G0dKFQFA0NdLSuJd7DZPnq0lMUGyk1ExWNl7DBTc2kctwTrdNOpc0M+27b0NkdHd8FPZhb3RRhf2guOOdzRqO3DVMTWjDhrMORZdkFxTWdi0To9mxPKAM5h7qpx+e16mzQsOV-ZWVGNXMSQ5WcFZ1mu3Tr70EV9cfoYC6mEx0Bw2QaZQ-m8D9u9KYwHc5AfbVw0GqQmomXST48J5wM8Wxn1aTZnBxurcTwKVUZQ-zK9lPgMKq9DqUTJqcuCjcsifXNKNJm3x4Y-BthjOGOAyJ707roTGjoxIHmckiGSckjZDgKqOEwfcOSRWMHqIutkeJcgAvaK4SCi6CQ0ODZyrlsEcWekFfBk4aLUXtN1JKh13wOxtDjS6G4R6oKmplIBiBLigMLLoO2bJ6iUnMkyE6NQXALyUMYBo4NpoizAJIhAlcAKMkMi-BW2glalDnC8U6cNPAzkEddXwQA */
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
                    // actions: ["deleteSelection"],
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
        return {
          selection: [...context.selection, event.id],
        };
      }),
    },
  }
);

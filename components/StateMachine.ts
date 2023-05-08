import { createMachine, assign } from "xstate";

type Event =
  | { type: "HOVER"; id: string }
  | { type: "MOVE_CURSOR"; cursor: Point }
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
  hoverId: string | null;
  cursor: Point;
};

export const stateMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcD2AnAdAYwFctZsBiAZQFEAZSgYQBUB9ABQEEA5AbQAYBdRKAAOGWOhQYAdoJAAPRABYAnAEYcKgBwB2AKw8VAJgDMWnrqUAaEAE9EJozgM8jhlSZUA2HtoUBfX1aomLiExGRUtIxMbAAiMbwCSCAiYmgS0knyCMpqmrr6xqbmVrYITgaOevpGPh5KCgYG-oEQ6Nj4RCS45GAANmB4aZJQOCgQ-aQAsgDyAGqUTHQAqgBK5NMrCTIp4lIyWQ04PGZa9QYaBh6NOiolikYOV0o8Bq4KGkouHs3grcEdYVwAAsMAA3MBYFDDHCSDAACTBENIcLmlE2-G2ol2GVAWQAtEYDAp1FojEolB4FDorscdAo7tkqTgtAYtBojDoahoVKpvgFfm0Qp12iDwZDoaKkUsOCj5ujEsIsWk9plEASTOoFKTTm4FFSVPSbHYDczDCYtAaKZ8ND8gu0hABDSQUGj0ZjLNYbLZJHbKnFyRA6alHJQ6Aw6DRB7ysowMsM8HB1NmGLQeLTplQqW1-e1Ol2RZixeIYn1K9L7RBXBnprTM5yZ-IRjwfbOCnAOiAQfNu1icb2K1Ll1UIMMMi4aRz1tyUgqqVv-DtdiI9j3reWYwcq3GKVTqbR6M1FHSWI0Ibk4KrHHhKdN6hSU+ftRejcZgKaoxarNf95JlrcBsoPAcF4jAUUDNHebkPAZCliRUTlrw5bk3B4PwflhCA4BkO0sA3bEKwQPFKQcLQFANG5dFJT5DVKPEdBwclGObV4kw8B9+RwgEujwv0CLo0NmTI-VKLJUCGTcJRTWMclvG8alqUfIVARwHp+kGKEoB4odt0I+jyUaHgdAtbVSO0BlGgnfJPmbUCyR5HRFK49pVIGIYRjGfotP-LJjwYngrgtY8PBUZwIwZL5KmvFQLVQ7xmwcjicyUrocElcVNNLTd-XxOla1I8joqM0SaMQRpa1eaTm1OckW0SttQhStKNJheFEVwzL8OHPFlEk-LhKK6joNPUDay1MxovDPVQyaOr-gakU2uatKvOytV4InLUDGeBRDKDB4tAZO862Oc5ZMpPVHMdf1fW0gCNBeHAaiMMwbjA69R1PYKPBwKkbzI69dCJJRHMXFaCNeeiQLAsiNEg9ax3g9RORC-QGjJcMQc7F9PI63jh1ZSSYzAzRuSUYwHhg-REwQikNGC1N4P8fwgA */
    tsTypes: {} as import("./stateMachine.typegen").Typegen0,

    id: "editor",

    context: {
      hoverId: null,
      cursor: { x: 0, y: 0 },
    },

    schema: {
      context: {} as Context,
      events: {} as Event,
    },

    states: {
      cursor: {
        states: {
          Selecting: {
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
    },
  }
);

export type PromiseType<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;

export type ArrayElement<T> = T extends (infer U)[] ? U : never;

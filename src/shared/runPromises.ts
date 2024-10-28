/**
 * Runs multiple promises concurrently and returns the results as an object.
 * @param promises - An object containing promises as values.
 * @returns An object with the same keys as the input object, and the resolved values of the promises as values.
 */

// biome-ignore lint/suspicious/noExplicitAny: Fine to use in generics
export const runPromises = async <Promises extends Record<string, Promise<any>>>(promises: Promises) => {
  const keys = Object.keys(promises) as Array<keyof Promises>;
  const results = await Promise.all(Object.values(promises));
  return Object.fromEntries(keys.map((key, i) => [key, results[i]])) as {
    [K in keyof Promises]: Promises[K] extends Promise<infer T> ? T : never;
  };
};

// example usage

// const {
//   item1,
//   item2
// } = await runPromises({
//   item1: (async () => "hello" as const)(),
//   item2: (async () => "world" as const)()
// })

/**
 * Runs multiple promises concurrently and returns the results as an object, including the status of each promise.
 * @param promises - An object containing promises as values.
 * @returns An object with the same keys as the input object, and the results of the promises as values, including their statuses.
 */

// biome-ignore lint/suspicious/noExplicitAny: Fine to use in generics
export const runAllPromisesSettled = async <Promises extends Record<string, Promise<any>>>(promises: Promises) => {
  const keys = Object.keys(promises) as Array<keyof Promises>;
  const results = await Promise.allSettled(Object.values(promises));
  return Object.fromEntries(keys.map((key, i) => [key, results[i]])) as {
    [K in keyof Promises]: Promises[K] extends Promise<infer T> ? { status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any } : never;
  };
};

// example usage

// const {
//   item1,
//   item2
// } = await runAllPromisesSettled({
//   item1: (async () => "hello" as const)(),
//   item2: (async () => { throw new Error("world") })()
// })

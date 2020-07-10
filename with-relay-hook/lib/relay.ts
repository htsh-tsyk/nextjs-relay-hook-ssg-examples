import { useMemo } from "react";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

let relayEnvironment: Environment;

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise
const fetchQuery: FetchFunction = async (
  operation,
  variables,
) => {
  return fetch(process.env.NEXT_PUBLIC_RELAY_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response) => response.json());
};

function createEnvironment() {
  return new Environment({
    // Create a network layer from the fetch function
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
}

export function initEnvironment(initialRecords = {}) {
  // Create a network layer from the fetch function
  const environment = relayEnvironment ?? createEnvironment();

  // If your page has Next.js data fetching methods that use Relay, the initial records
  // will get hydrated here
  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords));
  }
  // For SSG and SSR always create a new Relay environment
  if (typeof window === "undefined") return environment;
  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
}

export function useEnvironment(initialRecords = {}) {
  const store = useMemo(() => initEnvironment(initialRecords), [
    initialRecords,
  ]);
  return store;
}

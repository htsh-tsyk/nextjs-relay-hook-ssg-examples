# Relay Hook Example

[Relay Modern](https://relay.dev/) is a new version of Relay designed from the ground up to be easier to use, more extensible and, most of all, able to improve performance on mobile devices. Relay Modern accomplishes this with static queries and ahead-of-time code generation.

In this simple example, we integrate Realy and [relay-hook](https://github.com/relay-tools/relay-hooks) seamlessly with Next.js data fetching methods to fetch queries in the server and hydrate them in the browser.

This example relies on [graph.cool](https://www.graph.cool) for its GraphQL backend.

## How to use

Download schema introspection data from configured Relay endpoint

```bash
npm run schema
# or
yarn schema
```

Run Relay ahead-of-time compilation (should be re-run after any edits to components that query data with Relay)

```bash
npm run relay
# or
yarn relay
```

Run the project

```bash
npm run dev
# or
yarn dev
```

import { useEnvironment } from "../lib/relay";
import { RelayEnvironmentProvider } from "react-relay/hooks";

export default function App({ Component, pageProps }) {
  const { initialRecords, ...rest } = pageProps;
  const environment = useEnvironment(initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...rest} />
    </RelayEnvironmentProvider>
  );
}

import { useEnvironment } from "../lib/relay";
import { RelayEnvironmentProvider } from "relay-hooks";

const App = ({ Component, pageProps }) => {
  const { initialRecords, ...rest } = pageProps;
  const environment = useEnvironment(initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...rest} />
    </RelayEnvironmentProvider>
  );
};

export default App;

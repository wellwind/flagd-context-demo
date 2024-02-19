import { OpenFeature, ProviderEvents } from "@openfeature/web-sdk";
import { FlagdWebProvider } from "@openfeature/flagd-web-provider";

const run = async () => {
  const clientName = '';
  await OpenFeature.setContext(clientName, { user: "mike" });
  OpenFeature.setProvider(
    clientName,
    new FlagdWebProvider({
      host: "localhost",
      port: 8013,
      tls: false,
    })
  );

  const client = OpenFeature.getClient(clientName);

  client.addHandler(ProviderEvents.Ready, () => {
    const flag = client.getBooleanValue("my-flag", false);

    const flagElm = document.querySelector('#flag-value');
    if (flagElm) {
      flagElm.innerHTML = flag.toString();
    }
  });
};

run();

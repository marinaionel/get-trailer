const axios = require("axios").default;
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

module.exports = async function (context, req) {
  const VaultUri = "https://moviesapikeyvault.vault.azure.net/";
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(VaultUri, credential);

  let key = client.getSecret("YOUTUBE-API-KEY");
  let maxResults = 1;

  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search?key=" +
      key +
      "&type=video&part=snippet&maxResults=" +
      maxResults +
      "&q=" +
      req.query.search
  );

  context.log("JavaScript HTTP trigger function processed a request.");

  context.res = {
    body: response.data.items[0].id.videoId,
  };
};

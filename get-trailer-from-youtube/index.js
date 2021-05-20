const axios = require("axios").default;

module.exports = async function (context, req) {
  let key = "AIzaSyDNb28dex09kr0CUxGa0A9FCqU6I4iuDQw";
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
    body: response.data,
  };
};

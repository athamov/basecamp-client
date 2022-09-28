exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": "gippea-third-party=true",
      "Cache-Control": "no-cache",
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    },
    body: "alert('cookie set!');",
  };
};
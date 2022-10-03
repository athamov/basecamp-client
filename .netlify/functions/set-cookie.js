const cookie = require('cookie')

exports.handler = async (event, context) => {
  console.log(event,context);
  const hour = 3600000
  const twoWeeks = 14 * 24 * hour
  const myCookie = cookie.serialize('refreshToken', 'lolHi', {
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: twoWeeks,
  })
  const redirectUrl = 'https://basecamp-client.netlify.app'
  // Do redirects via html
  const html = `
  <html lang="en">
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <noscript>
        <meta http-equiv="refresh" content="0; url=${redirectUrl}" />
      </noscript>
    </body>
    <script>
      setTimeout(function() {
        window.location.href = ${JSON.stringify(redirectUrl)}
      }, 0)
    </script>
  </html>`

  return {
    'statusCode': 200,
    'headers': {
      'Set-Cookie': myCookie,
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html',
    },
    'body': html
  }
}
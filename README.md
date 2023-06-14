# HTTP Cookies & User Authentication

### HTTP

- HTTP is stateless - the connection between client and server stops once the response has been sent. 
- Next time you ask a server for something, the server doesn't actually know who you are or remember that you asked it for something seconds before.
- request/response cycle
- request contains a verb and a path (GET /urls)
- response must contain a status code; may or may not contain a body

### Cookies

- Allow us to store information about a user between HTTP requests
- Stored as key/value pairs in the client's browser
- Are passed to the server with every HTTP request
- Usually used to store unique value that identifies a particular user
- Domain specific ip address/port

### Reading Cookies

- Cookies come in with the request
- We could parse the request header ourselves, but it's easier to use a library like `cookie-parser`
- `cookie-parser` will parse the cookies and add them to the `request` object

```js
app.get("/protected", (req, res) => {
  const userId = req.cookies.userId;
  // do something with the userId
});
```

### Setting Cookies

- Cookies are set on the `response` object
- The browser will receive the reponse and store the cookie as directed

```js
app.post("/login", (req, res) => {
  // other authenticatey stuff
  res.cookie("userId", user.id); // set the cookie's key and value
  res.redirect("/");
});
```

### Useful Links

- [Restrictions on Cookies](https://flaviocopes.com/cookies/#restrictions-of-cookies)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
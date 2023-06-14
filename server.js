const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();

const port = 3000; //8000, 8080

// Create a database of users that can login to our website and view their profile page
// Users should be able to logout and be redirected to the login screen

// Database of users
const users ={
    1: {
        id: 1,
        email: "tommyShelby@gmail.com",
        password: "peakyblinders"
    },
    2: {
        id: 2,
        email: "lanceSweets@hotmail.com",
        password: "bones"
    },
    3: {
        id: 3,
        email: "omar@gmail.com",
        password: "thewire"
    }
}

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// View engine
app.set("view engine", "ejs")

// Routes
// Get routes
app.get('/', (req, res)=>{
    // res.send("Hello")
    res.render("index")
})
// app.get('/profile/:id', (req, res)=>{
app.get('/profile', (req, res)=>{
    // res.send("Hello")
    // console.log(req.params.id)
    // Capture the email with the id passed in via params
    // Will be undefined if no cookie is found
    const userObject = users[req.cookies.userId]
    // users["3"]
    console.log("user object", users)
    // Send it to the ejs file via templateVars
    const templateVars = {userObject: userObject}
    console.log(req.headers.cookie)
    console.log(req.cookies)
    res.render("profile", templateVars)
})

app.get('/login', (req, res)=>{
    res.render("login")
})


// Post routes
app.post("/login", (req, res)=> {
    // We need to find a way to verify that a user exists
    // Fetch the login info from the request
    const email = req.body.email;
    const password = req.body.password
    // console.log(req.body.email)
    // console.log(req.body.password)
    // Loop through the objects
    for(let userId in users){
        console.log(users[userId])
        // First verify if the email matches
        if(users[userId].email === email){
            // if the password matches as well
            if(users[userId].password === password){
                // If both match, then reroute user to the index page
                // res.cookie("cookieType", "oreos")
                // Setting the cookie to userId
                res.cookie("userId", users[userId].id)
                return res.redirect(`/profile`)
            }
            // res.send("You have misinputted your password")
        }
        // res.send("You have misinputted your email")
    }
    // Else, send an error to the user
    res.send("You have misinputted your email and/or password")
})

app.post("/logout", (req, res)=>{
    // Clearing the user cookie out
    res.clearCookie("userId")
    // Redirecting the user back to the login page
    res.redirect("/login")
})

// Check if the sever is listening
app.listen(port, ()=>{
    console.log("Hey, this server actually works! :)")
})


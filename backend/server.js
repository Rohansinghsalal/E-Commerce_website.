import {app} from "./app.js"
import {connectDb} from "./config/db.js"

// connecting to database 
connectDb();


// creating server(Listening)
const PORT = process.env.port;
const server = app.listen(PORT, () => {
    console.log(`Server is working on port :${process.env.PORT} int ${process.env.NODE_ENV} mode`);
})

// unhandled promise(error like-> MONGO_URL is wrong, etc )
// for this we intentionally shut down the server
// unhandledRejection is the event name 
// process.on("unhandledRejection", err=> {
//     console.log(`Error : ${err, message}`)
//     console.log("Shutting down server due to unhandled promise rejection")

//     //closing server
//     server.close(()=> {
//         process.exit(1);
//     })
// })
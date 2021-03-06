require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
require("./config/mongoose.config");

//require all routes
require("./routes/user.routes")(app)
const AllBlogRoutes = require("./routes/blog.routes");
AllBlogRoutes(app);
const AllUserRoutes = require("./routes/user.routes");
AllUserRoutes(app);

app.listen(process.env.MY_PORT, ()=>console.log(`Listen on port: ${process.env.MY_PORT}`));
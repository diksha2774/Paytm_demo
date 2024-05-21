const express = require("express");
const mainrouter = require("./routes/index")
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())

app.use("/app/v1",mainrouter)
app.listen(3000)


// const express = require("express");
// const app=express()
// const mainRouter=require('./routes/index')
// const cors = require("cors");


// app.use(cors())
// app.use(express.json())
// app.use('/api/v1/',mainRouter)
// app.listen(3000)
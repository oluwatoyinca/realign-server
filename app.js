const express = require('express')
const ccRouter = require('./routers/campaign-conversions')
const arvRouter = require('./routers/ads-related-visits')
const cors = require("cors");
const corsOptions = {
   origin: '*', 
   credentials: true,
   optionSuccessStatus: 200,
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use(ccRouter.router)
app.use(arvRouter.router)

module.exports = app
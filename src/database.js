const moongose = require("mongoose"); 

moongose.connect(process.env.MONGO_URL)
.then(db=> console.log("DB is conected"))
.catch(err=> console.error(err)); 
import  express  from "express";
import * as publico from "./routers/public.js"
import * as privado from "./routers/private.js"

const app = express();
app.use(express.json())
app.use('/public', publico.router)
app.use('/api', privado.router)


app.listen(3001, async () => {
    console.log('Server on PORT 3001...')

})

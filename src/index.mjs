// Load environment variables
import "./loadEnvironment.js";
import express from 'express'; 
import bodyParser from 'body-parser';
import connectDb from "./db/conn.js";

const app = express();
//app.use(cors());
//app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

import productRouter  from './routes/products.js';
app.use("/products", productRouter);


await connectDb()
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

 export const handler = async (event) => {
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
export default app
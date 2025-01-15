//import express from 'express'; 
import * as ProductController from "../controllers/products.controller.js";
import express from 'express'; 
let productRouter = express.Router();
//router.get("/:id", async (req, res) => {
//    let collection = await db.collection("products");
//    //let results = await collection.find({})
//    //  .limit(50)
//    //  .toArray();
//    //res.send(results).status(200);
//  });
productRouter.get("/", ProductController.getProductsController)
productRouter.get("/:id", ProductController.getProductByIdController)
productRouter.post("/", ProductController.createProductController)
productRouter.put("/:id", ProductController.updateProductController)
productRouter.delete("/:id", ProductController.deleteProductController)
export default productRouter ;

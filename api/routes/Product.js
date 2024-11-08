const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

// PUT update product by ID
productRoute.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, image, description, price, countInStock, rating, numReview } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
      product.rating = rating || product.rating;
      product.numReview = numReview || product.numReview;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// DELETE product by ID
productRoute.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne(); // ใช้ deleteOne() แทน remove()
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// POST สร้างสินค้าชิ้นใหม่
productRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, image, description, price, countInStock, rating, numReview } = req.body;

    // ตรวจสอบว่ามีสินค้าที่มีชื่อเดียวกันในระบบหรือไม่
    const productExists = await Product.findOne({ name });
    if (productExists) {
      res.status(400);
      throw new Error("สินค้าชิ้นนี้มีอยู่แล้ว");
    }

    // สร้างสินค้าชิ้นใหม่
    const product = new Product({
      name,
      image,
      description,
      price,
      countInStock,
      rating,
      numReview
    });

    // บันทึกสินค้าลงฐานข้อมูล
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);  // ส่งสินค้าที่สร้างเสร็จแล้วพร้อมกับสถานะ 201
  })
);


module.exports = productRoute;

# This is a Product Backend Application

This is a backend application built with Node.js and Express.js to manage products. The application connects to a MongoDB database to perform CRUD operations.

Below are the steps on how I set up and run the application locally using Node.js and Express.js:

# Creating Express Server:
Express.js is a popular and minimalist web application framework for Node.js. For this project, I set up an Express server and configured environment variables using a `.env` file.

Creating an Express server involves several steps. Let's go through them one by one:

**Step 1: Initialize Your Project**
To begin, I created a new directory for my project, opened my terminal in VScode and ran the followng command to initialize it:

```bash
npm init
```

This command prompted me to provide information about my project, such as its name, version, description, entry point (usually `index.js`), and more. After the  completion of these prompts, we had generated for us a `package.json` file with the project's configuration.

**Step 2: Installing Express**
After tthe project was initialized, I installed Express as a dependency with the following command:

```bash
npm install express
```

This command added Express to my project and updated the `dependencies` section in my `package.json` file.

**Step 3: Creating an Entry Point (index.js)**
I created an `index.js` file as the entry point for my Express application. This file serves as the starting point for my server setup. I also set up mu Express App in this file

**Step 4: Configure Your Express Application**
In my `index.js` file, I imported Express and configured my application. See below:

```javascript
import express from "express";
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`)
})
```
**Step 5: Starting the Server**

We can start the Express server by running the following command:

```bash
node index.js
```
The server will begin running and can accessed by navigating to `http://localhost:8000` in the web browser.


## Setting Up Environment Variables (.env File)

Environment variables are essential for configuring our application. I created a `.env` file in the root directory of my project to store the variables of this project.

**Step 1: Installing dotenv**
in other to use environment variables from a `.env` file, I installed the `dotenv` package by running:

```bash
npm install dotenv
```

**Step 2: Configuring `.env` File**
In my `.env` file, I defined environment-specific variables. For example:

```env
PORT=8000
MONGODB_URL=mongodb://localhost/mydb
password=mysecret

# Cloudinary
CLOUDINARY_CLOUD_NAME=cloudname
CLOUDINARY_API_KEY=apikey
CLOUDINARY_API_SECRET=cloudinarysecret
```

**Step 3: Loading the Environment Variables**
In my index.js was where I loaded the environment variables using `dotenv`;

```javascript
import dotenv from "dotenv"
dotenv.config();
```

Now, the environment variables can be accessed anywhere in this application using `process.env`.

```javascript
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URL;
```
This setup is to manage sensitive information and configuration options without exposing them in the codebase.

## File Structure Explained

Here is the file structure for my project:

- **`index.js`:** This is the entry point of my application. It's responsible for starting the server.

- **`package.json`:** This is the project configuration file that includes information about this project and its dependencies.

- **`/src`:** This directory holds all the source code.

  - **`/controllers`:** Controllers define the application's behavior. A controller is a function that is called when a route is matched, and it is responsible for handling the request and sending the response.

  - **`/helpers`:** is commonly used to store utility functions and modules that assist with various tasks throughout the application.

  - **`/models`:** Models define my data schema and interact with my database. A data model is a representation of the data that will be stored in the database and the relationships between that data. Mongoose was used to define our schema.

```javascript
import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true
    },
    ... among others,
    }
    );

export default mongoose.model("Product", productSchema);
```



  - **`/routes`:** This directory holds the route definitions for your application. Routes define the endpoints of our API and specify the HTTP methods (e.g., GET, POST) that can be used to access them.

 ```javascript
import express from 'express';
import { createProduct, getOneProduct } from '../controllers/product.js';
import { getProductBySlug } from '../controllers/product.js';
import { deleteProduct } from '../controllers/product.js';
import { getAllProducts } from '../controllers/product.js';
import { relatedProducts } from '../controllers/product.js';
import { searchProduct } from '../controllers/product.js';
import { upload } from '../helpers/multer.js';
import { updateProduct } from '../controllers/product.js';

const router = express.Router();

router.post('/create', upload.array('images', 5),  createProduct); // working
router.get("/all", getAllProducts) // working
router.get("/product/:productId", getOneProduct) // working
router.get("/slug/:slug", getProductBySlug) // working
router.delete("/delete/:productId", deleteProduct ) // working
router.put("/update/:productId", upload.array('images', 5), updateProduct) // working
router.post("/search", searchProduct) // working
router.get("/related/:productId", relatedProducts) // working

export default router;
```

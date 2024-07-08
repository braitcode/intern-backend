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

  ```javascript
  import Product from "../models/product.js"

  export const createProduct = async (req, res) => {
        // logic for creating a new product
    }

  export const getOneProduct = async (req, res) => {
        // logic for getting one product
    }

  export const getProductBySlug = async (req, res) => {
        // logic for getting one product by slug
    }

  export const deleteProduct = async (req, res) => {
        // logic for deleting a product
    }

  export const getAllProducts = async (req, res) => {
        // logic for getting all products
    }
  export const relatedProducts = async (req, res) => {
        // logic for getting related products
    }
  export const searchProduct = async (req, res) => {
        // logic to search for a product
    }
  export const updateProduct = async (req, res) => {
        // logic for updating product
    }
  ```

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

## Used packages for building this node api project

1. **express**: Express is a web application framework for Node.js that simplifies the process of building robust web applications.

    - **Installation**:
      Express was installed using npm:
      ```bash
      npm install express
      ```

    - **Usage**:
      To create an Express application, I started with the following:

      ```javascript
      import express from "express";
      const app = express();

      // Define middleware
      app.use(express.json());
      // routes
      app.use("/api/product", productRouter);

      // Start the Express server
      const port = process.env.PORT || 8000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      ```

2. **dotenv**: Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.

    - **Installation**:
      Install dotenv using npm:
      ```bash
      npm install dotenv
      ```

    - **Usage**:
      Create a `.env` file in your project's root directory and add environment variables:

      ```
        PORT=8000
        MONGODB_URL=mongodb://localhost/mydb
        password=mysecret
      ```

      Then, load the environment variables in your application:

      ```javascript
        dotenv.config();
        const port = process.env.PORT || 8000;
        const dbUrl = process.env.MONGODB_URL;
        
      ```

3. **Nodemon**: Nodemon is a utility that automatically restarts your Node.js application when source code changes are detected.

    - **Installation**:
      Install nodemon globally using npm:
      ```bash
      npm install nodemon
      ```

    - **Usage**:
      Instead of running my Node.js application with `node` from time to time while building the project, I used `nodemon`:

      ```bash
      nodemon your_app.js
      ```

      Nodemon will monitor my files for changes and automatically restart the server.

4. **Mongoose**: Mongoose is an ODM (Object Data Modeling) library for MongoDB that simplifies interactions with MongoDB.

    - **Installation**:
      Install mongoose using npm:
      ```bash
      npm install mongoose
      ```

    - **Usage**:
      Create a connection to MongoDB and define schemas and models for your data.

      ```javascript
      import mongoose from "mongoose";
        export const connectDB = (url) => {
        mongoose
        .connect(url).then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log('Error connecting to MongoDB', err.message))
        }

      const productSchema = new Schema({
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
        // ...
      });

      export default mongoose.model("Product", productSchema);
      ```

5. **Cors**: The CORS (Cross-Origin Resource Sharing) package allows you to enable or configure CORS for your Express application.

    - **Installation**:
      Install cors using npm:
      ```bash
      npm install cors
      ```

    - **Usage**:
      Add CORS middleware to your Express app:

      ```javascript
      import cors from "cors"
      app.use(cors());
      ```

6. **Cloudinary**: Cloudinary is a cloud-based service for managing and delivering media assets. It's often used for image and video upload, storage, and manipulation.

    - **Installation**:
      I installed the Cloudinary package using npm:
      ```bash
      npm install cloudinary
      ```

    - **Usage**:
      To use Cloudinary in this application, I obtained my API  credentials from my cloudinary account. Here's a basic example of how to upload an image to Cloudinary:

      ```javascript
      import { v2 as cloudinary } from 'cloudinary';
      dotenv.config();

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

7. **multer-storage-cloudinary**: multer-storage-cloudinary is a
    storage engine for multer that allows you to upload files directly
    to Cloudinary, a cloud-based image and video management service. It directly uploads to cloudinary.

    - **Installation**:
    I installed the multer-storage-cloudinary using npm:
    ```bash
    npm install multer-storage-cloudinary
    ```

    - **Usage**:
      To use multer-storage-cloudinary in this application, I created a multer.js file inside the helpers folder. Below is the code:

      ```javascript
      import multer from "multer";
      import { CloudinaryStorage } from "multer-storage-cloudinary";

      dotenv.config();

      const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          allowedFormats: ['jpg', 'png', 'gif', 'jpeg', 'svg'],
          transformation:[
              {width: 300, height:300, crop: 'fill', gravity: 'face', quality: 'auto'}
            ]
          }
        })
      export const upload = multer({storage: storage})
      ```

8. **slugify**: Slugs are typically used in URLs to create readable,
    SEO-friendly links. The slugify package ensures that the resulting slugs are lowercase, contain only URL-safe characters, and replace spaces and special characters with hyphens.

    - **Installation**:
    I installed the slugify using npm:
    ```bash
    npm install slugify
    ```

    - **Usage**:I imported slugify and used it in the controller function when creating a post. See blelow:

    ```javascript
    import slugify from "slugify"

    export const createProduct = async (req, res) => {
        // logic for creating a new product

        const slug = slugify(name);
    };

**Testing API Endpoints with Postman**

[Postman](https://www.postman.com/) is a great tool for testing your API endpoints. It allows you to send HTTP requests to your server and inspect the responses:


- **`/Create Product`:**
    
    [createProduct](http://localhost:8000/api/product/create?name=bentley&description=this%is%a%luxury%car&quantity=50&price=50000000/)

    Response:
    
    ```json
    {
    "success": true,
    "message": "Product created successfully",
    "product": {
        "name": "Nissan GT",
        "slug": "nissan-gt",
        "description": "this is a beautiful luxury car for classy youths",
        "price": 6000000,
        "quantity": 300,
        "sold": 0,
        "images": [
            {
                "url": "https://res.cloudinary.com/dww4lgcy9/image/upload/v1720385276/zedcorga9b2tjeycloxr.webp",
                "imagePublicId": "zedcorga9b2tjeycloxr",
                "_id": "668afefc693234f17754e1ba"
            }
        ],
        "isAvailable": true,
        "shipping": false,
        "ratings": [],
        "avgRating": 0,
        "_id": "668afefc693234f17754e1b9",
        "createdAt": "2024-07-07T20:47:56.503Z",
        "updatedAt": "2024-07-07T20:47:56.503Z",
        "__v": 0
       }
    }
    
- **`/Get One Product`:**

    [getOneProduct](http://localhost:8000/api/product/product/6689b10d054456675df7ae88/)

    Response:
    
    ```json
    {
    "success": true,
    "message": "Product fetched successfully",
    "product": {
        "_id": "6689b10d054456675df7ae88",
        "name": "Macbook Air M1",
        "slug": "macbook-air-m1",
        "description": "Macbook Air M1 is one beast of a laptop that is very fast and delivers well",
        "price": 1000000,
        "quantity": 1001,
        "sold": 0,
        "isAvailable": true,
        "shipping": false,
        "ratings": [],
        "avgRating": 0,
        "images": [],
        "createdAt": "2024-07-06T21:03:09.666Z",
        "updatedAt": "2024-07-06T21:03:09.666Z",
        "__v": 0
        }
    }

- **`/Get By Slug`:**

    [getBySlug](http://localhost:8000/api/product/slug/macbook-air-m1/)
    
    Response:
    
    ```json
    {
    "success": true,
    "message": "Product fetched successfully",
    "product": {
        "_id": "6689ad6e3595c194d4538831",
        "name": "Macbook Air M1",
        "slug": "macbook-air-m1",
        "description": "Macbook Air M1 is one beast of a laptop that is very fast and delivers well",
        "price": 1000000,
        "quantity": 1001,
        "sold": 0,
        "isAvailable": true,
        "shipping": false,
        "ratings": [],
        "avgRating": 0,
        "images": [],
        "createdAt": "2024-07-06T20:47:42.591Z",
        "updatedAt": "2024-07-06T20:47:42.591Z",
        "__v": 0
        }
    }

- **`/Delete Product`:**

    [deleteProduct](http://localhost:8000/api/product/delete/6689ad6e3595c194d4538831/)

    Response:
    
    ```json
    {
    "success": true,
    "message": "Product deleted successfully",
    "product": {
        "acknowledged": true,
        "deletedCount": 1
       }
    }

- **`/Get All Products`:**

    [getAllProducts](http://localhost:8000/api/product/all/)

    Response:
    
    ```json
    {
    "success": true,
    "currentPage": 1,
    "totalPages": 2,
    "productCount": 17,
    "products": [
        {
            "_id": "6689a818bbffc51d16e921a3",
            "name": "Pepsi",
            "slug": "pepsi",
            "description": "Pepsi is a good soft drink",
            "price": 350,
            "quantity": 30,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:24:56.504Z",
            "updatedAt": "2024-07-06T20:24:56.504Z",
            "__v": 0
        },
        {
            "_id": "6689ac2c3595c194d453882b",
            "name": "coke",
            "slug": "coke",
            "description": "Coke is a good soft drink",
            "price": 350,
            "quantity": 31,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:42:20.367Z",
            "updatedAt": "2024-07-06T20:42:20.367Z",
            "__v": 0
        },
        {
            "_id": "6689ac6a3595c194d453882d",
            "name": "Seven up",
            "slug": "seven-up",
            "description": "Seven up is a good soft drink for relaxation",
            "price": 300,
            "quantity": 2,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:43:22.027Z",
            "updatedAt": "2024-07-06T20:43:22.027Z",
            "__v": 0
        },
        {
            "_id": "6689ad223595c194d453882f",
            "name": "Malta Guinness",
            "slug": "malta-guinness",
            "description": "Malta Guinness does good to the body",
            "price": 600,
            "quantity": 10,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:46:26.761Z",
            "updatedAt": "2024-07-06T20:46:26.761Z",
            "__v": 0
        },
        {
            "_id": "6689b10d054456675df7ae88",
            "name": "Macbook Air M1 2020",
            "slug": "macbook-air-m1-2020",
            "description": "Macbook Air M1 is one beast of a laptop that is very fast and delivers well",
            "price": 1000000,
            "quantity": 1005,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T21:03:09.666Z",
            "updatedAt": "2024-07-07T17:21:06.384Z",
            "__v": 0
           }
           // ..........
       ]
    }

- **`/Update Product`:**

    [updateProduct](http://localhost:8000/api/product/update/668ae1dae587557329f27da2/)

    Response:

    ```json
    {
    "success": true,
    "message": "Product updated successfully",
    "product": {
        "_id": "668ae1dae587557329f27da2",
        "name": "Iphone 11 pro",
        "slug": "iphone-11-pro",
        "description": "The iPhone 11 Pro, released by Apple in September 2019, is part of the iPhone 11 series. It features a 5.8-inch Super Retina XDR OLED display, offering vibrant colors and high contrast. Powered by the A13 Bionic chip, it delivers fast performance and efficiency. The device includes a triple-camera system with 12MP ultra-wide, wide, and telephoto lenses, providing versatile photography options and improved low-light capabilities with Night mode.",
        "price": 400000,
        "quantity": 400,
        "sold": 0,
        "images": [
            {
                "url": "https://res.cloudinary.com/dww4lgcy9/image/upload/v1720378751/b13ylszjjjzpkko8zahq.jpg",
                "imagePublicId": "b13ylszjjjzpkko8zahq",
                "_id": "668ae57fbd27c9b5c6e5f87d"
            }
        ],
        "isAvailable": true,
        "shipping": false,
        "ratings": [],
        "avgRating": 0,
        "createdAt": "2024-07-07T18:43:38.659Z",
        "updatedAt": "2024-07-07T18:59:11.352Z",
        "__v": 1
       }
    }

- **`/Search Product`:**

    [searchProduct](http://localhost:8000/api/product/search?term=coke/)

    Response:

    ```json
    {
    "success": true,
    "currentPage": 1,
    "productsFound": 1,
    "totalPages": 1,
    "products": [
        {
            "_id": "6689ac2c3595c194d453882b",
            "name": "coke",
            "slug": "coke",
            "description": "Coke is a good soft drink",
            "price": 350,
            "quantity": 31,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:42:20.367Z",
            "updatedAt": "2024-07-06T20:42:20.367Z",
            "__v": 0
           }
        ]
    }

- **`/Related Products`:**

    [getRelatedProducts](http://localhost:8000/api/product/related/6689a818bbffc51d16e921a3/)

    Response:

    ```json
    {
    "success": true,
    "relatedProducts": [
        {
            "_id": "6689a83dbbffc51d16e921a5",
            "name": "Pepsi",
            "slug": "pepsi",
            "description": "Pepsi is a good soft drink",
            "price": 350,
            "quantity": 30,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:25:33.359Z",
            "updatedAt": "2024-07-06T20:25:33.359Z",
            "__v": 0
        },
        {
            "_id": "6689a8a7bbffc51d16e921a7",
            "name": "Pepsi",
            "slug": "pepsi",
            "description": "Pepsi is a good soft drink",
            "price": 350,
            "quantity": 30,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:27:19.728Z",
            "updatedAt": "2024-07-06T20:27:19.728Z",
            "__v": 0
        },
        {
            "_id": "6689a9d4bbffc51d16e921a9",
            "name": "Pepsi",
            "slug": "pepsi",
            "description": "Pepsi is a good soft drink",
            "price": 350,
            "quantity": 30,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:32:20.635Z",
            "updatedAt": "2024-07-06T20:32:20.635Z",
            "__v": 0
        },
        {
            "_id": "6689aa913c629cae0be48b85",
            "name": "Pepsi",
            "slug": "pepsi",
            "description": "Pepsi is a good soft drink",
            "price": 350,
            "quantity": 30,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:35:29.489Z",
            "updatedAt": "2024-07-06T20:35:29.489Z",
            "__v": 0
        },
        {
            "_id": "6689abd13595c194d4538828",
            "name": "Pepsi",
            "slug": "pepsi",
            "description": "Pepsi is a good soft drink",
            "price": 350,
            "quantity": 30,
            "sold": 0,
            "isAvailable": true,
            "shipping": false,
            "ratings": [],
            "avgRating": 0,
            "images": [],
            "createdAt": "2024-07-06T20:40:49.033Z",
            "updatedAt": "2024-07-06T20:40:49.033Z",
            "__v": 0
          }
      ]
    }
    

**Coded by @braitcode**
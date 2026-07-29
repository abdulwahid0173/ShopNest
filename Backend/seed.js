const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/User');
const Product = require('./model/product');
const connectDB = require('./config/db');

dotenv.config();

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound experience with advanced active noise cancellation.',
    price: 299.99,
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332887/nHeadphone_goy3lt.png',
    rating: 4.8,
    numReviews: 24,
  },
  {
    name: 'Minimalist Modern Chair',
    description: 'A stylish and comfortable addition to any contemporary living room.',
    price: 150,
    category: 'Furniture',
    stock: 30,
    imageUrl: 'https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332887/miniChair_j20puk.png',
    rating: 4.2,
    numReviews: 12,
  },
  {
    name: 'Professional DSLR Camera',
    description: 'Capture stunning moments with high-resolution clarity and speed.',
    price: 1199.99,
    category: 'Electronics',
    stock: 8,
    imageUrl: 'https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332909/DSLR_kjpbxb.png',
    rating: 4.9,
    numReviews: 50,
  },
  {
    name: 'Classic White Sneakers',
    description: 'Versatile and comfortable, a staple for any casual outfit.',
    price: 85,
    category: 'Clothing',
    stock: 50,
    imageUrl: 'https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332002/Sneakers_tv8x7z.png',
    rating: 4.5,
    numReviews: 89,
  },
  {
    name: "Apple MacBook Air M3 (13-inch)",
    description: "Apple M3 chip, 8GB RAM, 256GB SSD, Liquid Retina Display.",
    price: 114900,
    category: "Electronics",
    stock: 10,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332007/macbook_n8sgz6.png",
    rating: 4.9,
    numReviews: 152,
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    description: "6.9-inch AMOLED display, 12GB RAM, 256GB storage, 200MP camera.",
    price: 129999,
    category: "Electronics",
    stock: 20,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332007/S25_lqxjo4.png",
    rating: 4.8,
    numReviews: 231,
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation with premium sound quality.",
    price: 29990,
    category: "Electronics",
    stock: 18,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332006/headphone_xnpz5s.png",
    rating: 4.9,
    numReviews: 178,
  },
  {
    name: "Apple Watch Series 10",
    description: "GPS Smartwatch with fitness tracking and health monitoring.",
    price: 46900,
    category: "Electronics",
    stock: 22,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332005/AppleWatch_wcmknt.png",
    rating: 4.8,
    numReviews: 95,
  },
  {
    name: "Nike Air Force 1 '07",
    description: "Classic everyday sneakers with premium leather finish.",
    price: 7995,
    category: "Footwear",
    stock: 40,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332006/Nike_bvvyjp.png",
    rating: 4.7,
    numReviews: 143,
  },
  {
    name: "Levi's Men's 511 Slim Fit Jeans",
    description: "Comfortable stretch denim with a modern slim fit.",
    price: 3499,
    category: "Clothing",
    stock: 50,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332005/jeans_lqwvwf.png",
    rating: 4.5,
    numReviews: 89,
  },
  {
    name: "IKEA Ergonomic Office Chair",
    description: "Mesh back office chair with adjustable lumbar support.",
    price: 15990,
    category: "Furniture",
    stock: 15,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332005/chair_ih5mvq.png",
    rating: 4.6,
    numReviews: 64,
  },
  {
    name: "Wooden Coffee Table",
    description: "Solid wood coffee table with natural finish.",
    price: 8999,
    category: "Furniture",
    stock: 18,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332007/table_fwvd3e.png",
    rating: 4.4,
    numReviews: 31,
  },
  {
    name: "Canon EOS R50 Mirrorless Camera",
    description: "24.2MP mirrorless camera with 4K video recording.",
    price: 68990,
    category: "Electronics",
    stock: 12,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332003/Camera_duqkh4.png",
    rating: 4.8,
    numReviews: 72,
  },
  {
    name: "JBL Flip 6 Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker with powerful bass.",
    price: 11999,
    category: "Electronics",
    stock: 25,
    imageUrl: "https://res.cloudinary.com/hzpfqvbu/image/upload/v1785332002/speaker_cqtujp.png",
    rating: 4.7,
    numReviews: 118,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await User.findOneAndUpdate(
      { email: 'admin@shopnest.com' },
      {
        $set: {
          name: 'Admin User',
          password: hashedPassword,
          role: 'admin',
          verified: true,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    for (const product of products) {
      await Product.findOneAndUpdate(
        { name: product.name },
        { $set: product },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log('Data imported successfully without deleting existing records.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

seedDatabase();
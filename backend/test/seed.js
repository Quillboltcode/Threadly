import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import connection from '../config/connection.js';
const uri = connection.dbConnectionString;

const seedData = async () => {
  try {
    console.log('Starting to seed data...');

    // Connect to MongoDB
    await mongoose.connect(uri);

    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([User.deleteMany({}), Post.deleteMany({})]);
    console.log('Cleared existing collections');

    // Generate Users
    const users = Array.from({ length: 10 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }));

    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users`);

    // Generate Posts
    const posts = Array.from({ length: 30 }, () => ({
      content: faker.lorem.sentence(),
      author: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
    }));

    const createdPosts = await Post.insertMany(posts);
    console.log(`Created ${createdPosts.length} posts`);

    console.log('Seed data successfully created!');
  } catch (error) {
    console.error('Error during data seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedData();

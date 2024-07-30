import express from 'express';
import BlogRecord from '../models/BlogModel.js';

const router = express.Router();

// Save a new blog record
router.post('/', async (request, response) => {
    try {
        const { blog_title } = request.body;

        const newBlogRecord = await BlogRecord.create({
            blog_title,
        });
        return response.status(201).send(newBlogRecord);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



export default router;
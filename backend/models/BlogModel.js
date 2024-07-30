import mongoose from 'mongoose';

const BlogRecordSchema = new mongoose.Schema({
    blog_title: {
        type: String,
        required: true,
    },
    // Add other fields as needed
}, {
    timestamps: true,
});

const BlogRecord = mongoose.model('BlogRecord', BlogRecordSchema);

export default BlogRecord;

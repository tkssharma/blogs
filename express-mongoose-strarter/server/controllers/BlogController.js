const { Blog, Feedback } = require('../models');

module.exports = {
    async getAllBlogs(req, res, next) {
        try {
            const blog = await Blog.find().populate('feedback');
            res.send(blog);
        } catch (err) {
            next(err);
        }
    },
    async createBlog(req, res, next) {
        try {
            const blog = req.body;
            const newBlog = await Blog.create(blog)
            res.send(blog);
        } catch (err) {
            next(err);
        }
    },
    async assignCategory(req, res, next) {
        try {
            const { blogId } = req.params;
            const {categoryId} = req.params;
            const updatedBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    category: categoryId
                },
                { new: true, useFindAndModify: false },
            );
            res.send(updatedBlog);
        } catch (err) {
            next(err);
        }
    },
    async updateBlogwithImages(blogId, image) {
        const newBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push: {
                    images: {
                        imageurl: image.url,
                        imageName: image.name
                    }
                }
            },
            { new: true, useFindAndModify: false },
        );
        res.send(newTag);
    },
    async updateBlogwithFeedbacks(req, res, next) {
        try {
            const feed = req.body;
            const { blogId } = req.params
            const newfeedback = await Feedback.create(feed)
            const newBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $push: { feedbacks: newfeedback._id }
                },
                { new: true, useFindAndModify: false },
            );
            res.send(newTag);
        } catch (err) {
            next(err)
        }
    }
};

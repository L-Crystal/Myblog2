const blogModel = require('../models/blogModel');
module.exports = {
    index: async (ctx) => {
        //1.查文章信息
        let blogs = await blogModel.getBlogs();
        let username = ctx.session.username;
        await ctx.render('index', {
            username: username,
            blogs,
        })
    }
}
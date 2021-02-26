const blogModel = require('../models/blogModel');
module.exports = {
    index: async (ctx) => {
        //1.查文章信息
        let cateId = ctx.query.cateId;
        let blogs = [];
        if (cateId) {
            blogs = await blogModel.getBlogsByCateId(cateId);
        } else {
            blogs = await blogModel.getBlogs();
        }
        //2.查询文章分类信息
        let categories = await blogModel.getBlogCategories();
        let username = ctx.session.username;
        await ctx.render('index', {
            username: username,
            blogs,
            categories
        })
    },

}
const blogModel = require('../models/blogModel');

module.exports = {
    post: async (ctx) => {
        //1.接数据
        let blog = ctx.request.body;
        //2.验证
        //3.从session中获取用户编号
        blog.user_id = ctx.session.user_id;
        if (blog.user_id) {
            //4.存入数据库
            let res = await blogModel.saveBlog(blog);
            if (res.affectedRows > 0) {
                ctx.redirect('/');
            } else {
                await ctx.render('error', {
                    message: "上传失败！",
                })
            }
        } else {
            await ctx.render('error', {
                message: "未登录！"
            })
        }

    },
    getCategories: async (ctx) => {
        let categories = await blogModel.getBlogCategories();
        let username = ctx.session.username;
        await ctx.render('blog-post', {
            username,
            categories,
        })
    },
    detail: async (ctx) => {
        let blogId = ctx.params.blogId;
        let username = ctx.session.username;
        let res = await blogModel.getBlogByBlogId(blogId);
        let comment = await blogModel.getCommentByBlogId(blogId);
        let userId = ctx.session.user_id;
        if (res.length > 0) {
            await ctx.render('blog-detail', {
                username,
                blog: res,
                comment,
                userId,
            })
        }

    },
    postComment: async (ctx) => {
         let comment = ctx.request.body;
         let userId = ctx.session.user_id;
         if(userId){
             comment.user_id = userId;
            let res = await blogModel.saveComment(comment);
            if(res.affectedRows > 0){
                ctx.body = 'success';
            }else{
                ctx.body = 'fail';
            }
         }else{
             ctx.body = '未登录！';
         }

    }
}
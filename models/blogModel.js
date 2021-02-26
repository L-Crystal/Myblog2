const db = require('./db');
module.exports = {
    getBlogs(page){
        return db.query(
            `select b.blog_id,b.title,b.content,b.post_time,b.read_count,u.username,u.user_id
            from t_blog b,t_user u LIMIT ?,3
            where b.user_id=u.user_id`,[page]);
    },
    getBlogCategories(){
        return db.query("select * from t_category");
    },
    getBlogsByCateId(cateId){
        return db.query(`select b.blog_id,b.title,b.content,b.post_time,b.read_count,u.username,u.user_id
            from t_blog b,t_user u 
            where b.user_id=u.user_id and b.cate_id=?`,[cateId]);
    },
    saveBlog(blog){
        return db.query("insert into t_blog set ?",blog);
    },
    getBlogByBlogId(blog_id){
        return db.query("select * from t_blog where blog_id=?",[blog_id]);
    },
    getCommentByBlogId(blog_id){
        return db.query(`select c.*, u.username
        from t_comment c,t_user u
        where c.user_id=u.user_id and c.blog_id=? order by c.create_time desc`,[blog_id]);
    },
    saveComment(comment){
        return db.query("insert into t_comment set ?",comment)
    }
    
}
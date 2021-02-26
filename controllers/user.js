const userModel = require('../models/userModel')

module.exports = {
    regist:async(ctx)=>{
        //1.接收数据
        let user = ctx.request.body;
        console.log(user);
        //2.验证
        if (user.username.trim().length == 0) {
            await ctx.render('error', {
                message: "用户名不能为空！！"
            })
        }else{
            let res = await userModel.getByName(user.username);
            if(res.length > 0){
                await ctx.render('error',{
                    message:"该用户已存在！",
                });
            }else{
                //3.连接数据库
                let result = await userModel.saveUser(user);
                if (result.insertId) {
                    await ctx.render('success', {
                        message: "注册成功！"
                    });
                } else {
                    await ctx.render('error', {
                        message: "注册失败！"
                    })
                }
            }
        }
    },
    login:async(ctx)=>{
        //1.接收数据
        let user = ctx.request.body;
        //2.验证
        if (user.username.length == 0) {
            await ctx.render('error', {
                message: "请输入用户名"
            });
        } else {
            //3.连接数据库
            let results = await userModel.getUserByNameAndPass(user.username, user.pass);
            //4.根据查询的结果跳转（或输出）不同的结果页面
            if (results.length > 0) {
                //向session作用域中存放loginUser变量
                ctx.session.username = user.username;
                ctx.session.user_id = results[0].user_id;
                //redirect重定向，他会将页面的地址重新定向到指定的路由
                ctx.redirect('/');
            } else {
                await ctx.render('error', {
                    message: "登陆失败，用户名或密码不正确！！"
                })

            }

        }
    }
}
#!/usr/bin/env sh
 
# 忽略错误
set -e  #有错误抛出错误
 
# 构建
yarn run docs:build  #然后执行打包命令
 
git add .
git commit -m 'deploy'
 
git push -f https://github.com/dailyup99/blog.git  #提交到这个分支

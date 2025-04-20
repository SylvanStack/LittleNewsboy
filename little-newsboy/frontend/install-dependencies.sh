#!/bin/bash

# 使用淘宝镜像源安装依赖
echo "正在使用淘宝镜像源安装前端依赖..."
npm install --registry=https://registry.npmmirror.com antd@5.13.3 @ant-design/icons@5.3.0 react-markdown@9.0.1

echo "依赖安装完成！" 
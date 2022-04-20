# Myscanner-front

简体中文 | [english](./README.md)

> 扫描器前端项目，项目基于vue-admin
>已移除漏洞扫描和信息收集模块代码，java写这类工具太复杂，已转go实现
> 后端仓库请访问：[https://github.com/retnullyu/Myscanner.git](https://github.com/retnullyu/Myscanner.git)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/retnullyu/myscaner-front.git

# 进入项目目录
cd myscaner-front.git

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


<template>
    <div class="app">
        <router-view
                keep-alive
                transition="fade"
                transition-mode='out-in'></router-view>
    </div>
</template>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

body {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-header {
  background-color: #63d78c;
  color: #333;
  text-align: center;
  min-height: 100px;
}

.el-header {
  background-color: #63d78c;
  color: #333;
  text-align: center;
  min-height: 100px;
}

.self-app {
  background-color: #fcfcfc;
  color: #333;
  text-align: center;
  min-height: 180px;
}

.el-footer {
  background-color: #63d78c;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.title {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: left;
}

.label {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  position: relative;
  margin-top: 30px;
  min-height: 40px;
  top: 50%;
  text-align: left;
}

.vertical-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.float-right {
  float: right;
  top: 50%;
  transform: translateY(-50%);
}

.center-diverse {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  min-height: 100px;
}
</style>

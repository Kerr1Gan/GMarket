<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="title">Galaxy Lab</div>
      </el-header>

      <!-- <el-main class="self-app">
        <div>
          <img src="./assets/apkgalaxy.png" height="124px" style="display:inline-block;float:left;" />
        
          <div style="width:124px;height:124px;float:right;display:flex;align-items: center;">
            <el-button type="success" v-on:click="downloadBtnClick()">
              <p style="color:#000000">Download</p>
            </el-button>
          </div>
        </div>
      </el-main>-->

      <el-container>
        <!-- <el-aside width="200px">Aside</el-aside> -->
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="name" label="名字" width="220"></el-table-column>
            <el-table-column prop="description" label="是否在线" style="text-align:left"></el-table-column>
            <el-table-column prop="url" label="链接"></el-table-column>
            <el-table-column prop="productId" label="产品ID"></el-table-column>
          </el-table>
        </el-main>
        <!-- <el-aside width="200px">Aside</el-aside> -->
      </el-container>

      <el-row>
        <el-col :span="24">
          <div class="el-header label">产品列表</div>
        </el-col>
      </el-row>

      <el-form
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        v-for="(item) in formList"
        :key="item.id"
      >
        <el-form-item label="产品ID" prop="item.productId">
          <el-input v-model="item.productId" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="索引">
          <el-select placeholder="索引" v-model="item.cid" @change="updateSelect(item.cid,item)">
            <el-option v-for="(inner,idx) in item.index" :key="idx" :label="idx" :value="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包名" prop="item.appId">
          <el-input v-model="item.appId"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="/market/api/uploadPhoto"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
        </el-upload>
        <el-form-item label="链接" prop="item.url">
          <el-input v-model="item.url"></el-input>
        </el-form-item>
        <el-form-item label="安装方式">
          <el-radio-group v-model="item.resource" size="medium">
            <el-radio border label="谷歌商店"></el-radio>
            <el-radio border label="应用内安装"></el-radio>
            <el-radio border label="跳转浏览器"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Logo地址" prop="item.logoUrl">
          <el-input v-model="item.logoUrl"></el-input>
        </el-form-item>
        <el-form-item label="产品名" prop="item.productName">
          <el-input v-model="item.productName"></el-input>
        </el-form-item>
        <el-form-item label="标语" prop="item.slogan">
          <el-input v-model="item.slogan"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="item.amount">
          <el-input v-model="item.amount"></el-input>
        </el-form-item>
        <el-form-item label="费率" prop="item.interest">
          <el-input v-model="item.interest"></el-input>
        </el-form-item>
        <el-form-item label="审核时间" prop="item.reviewTime">
          <el-input v-model="item.reviewTime"></el-input>
        </el-form-item>
        <el-form-item label="启用" prop="item.delivery">
          <el-switch v-model="item.enable"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateProduct(item)">立即更新</el-button>
          <!-- <el-button @click="openDialog()">增加</el-button> -->
        </el-form-item>
        <div style="height:1px;background:#000000;width=100%;margin-bottom:20px;"></div>
      </el-form>

      <el-footer>@</el-footer>
    </el-container>
  </div>
</template>

<script>
import VueResource from "vue-resource";
const Vue = require("vue");
Vue.use(VueResource);
function getUrlParam(paraName) {
  let url = document.location.toString();
  let arrObj = url.split("?");
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split("&");
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}
export default {
  mounted() {
    let ctx = this;
    Vue.http.get("/market/api/app").then(
      response => {
        // get body data
        console.log(response.body);
        let array = new Array();
        let body = response.body;
        if (body["code"] == "ok") {
          let r = body.body;
          for (let i = 0; i < r.length; i++) {
            let item = {
              name: r[i]["applicationId"],
              description: r[i]["applicationId"],
              url:
                "https://play.google.com/store/apps/details?id=" +
                r[i]["applicationId"],
              productId: r[i]["productId"]
            };
            array[i] = item;
          }
          array.reverse();
        }
        ctx.tableData = array;
      },
      response => {
        // error callback
      }
    );
    Vue.http.get("/market/api/appProducts?productId=2").then(
      response => {
        // get body data
        console.log(response.body);
        let array = new Array();
        let body = response.body;
        if (body["code"] == "ok") {
          let r = body.body;
          for (let i = 0; i < r.length; i++) {
            let item = {
              id: r[i]["id"],
              productId: r[i]["productId"],
              productIndex: r[i]["productIndex"],
              applicationId: r[i]["applicationId"],
              url: r[i]["url"],
              installType: r[i]["installType"],
              logo: r[i]["logo"],
              amount: r[i]["amount"],
              interest: r[i]["interest"],
              reviewTime: r[i]["reviewTime"],
              productName: r[i]["productName"],
              slogan: r[i]["slogan"],
              referralCount: r[i]["referralCount"],
              enabled: r[i]["enabled"]
            };
            array[i] = item;
          }
          let formArray = new Array();
          let index = 0;
          for (let index in array) {
            let form = new Object();
            form.id = array[index]["id"];
            form.productId = array[index]["productId"];
            form.productIndex = array[index]["productIndex"];
            form.appId = array[index]["applicationId"];
            form.url = array[index]["url"];
            installType;
            let installType = array[index]["installType"];
            let installStr = "谷歌商店";
            if (installType == 0) {
              installStr = "谷歌商店";
            } else if (installType == 1) {
              installStr = "应用内安装";
            } else if (installType == 2) {
              installStr = "跳转浏览器";
            }
            form.resource = installStr;
            form.logoUrl = array[index]["logo"];
            form.productName = array[index]["productName"];
            form.slogan = array[index]["slogan"];
            form.amount = array[index]["amount"];
            form.interest = array[index]["interest"];
            form.reviewTime = array[index]["reviewTime"];
            form.enable = array[index]["enabled"] > 0 ? true : false;
            form.index = array.length;
            form.cid = "" + index;
            formArray[index++] = form;
          }
          let end = new Object();
          end.id = 0;
          end.productId = formArray[0]["productId"];
          end.productIndex = formArray.length + 1;
          end.appId = "";
          end.url = "";
          end.resource = "谷歌商店";
          end.logoUrl = "";
          end.productName = "";
          end.slogan = "";
          end.amount = "";
          end.interest = "";
          end.reviewTime = "";
          end.enable = true;
          end.index = formArray.length + 1;
          end.cid = "" + formArray.length;
          formArray[formArray.length] = end;
          ctx.formList = formArray;
        }
      },
      response => {
        // error callback
      }
    );
  },
  methods: {
    downloadBtnClick() {
      //获取当前域名
      let host = window.location.host;
      //下载文件
      // window.location.href = "http://" + host + "/assets/app.apk";
      let p = window.location.protocol;
      let a = document.createElement("a");
      a.setAttribute("href", `http://127.0.0.1:9555/app.apk`);
      a.setAttribute("target", "_blank");
      a.click();
      document.getElementsByTagName("body")[0].appendChild(a);
    },
    onSubmit() {
      console.log("submit!");
    },
    updateProduct(product) {
      let productDto = {
        id: product.id,
        productId: product.productId,
        productIndex: product.productIndex,
        applicationId: product.appId,
        url: product.url,
        //resource,
        logo: product.logoUrl,
        productName: product.productName,
        slogan: product.slogan,
        amount: product.amount,
        interest: product.interest,
        reviewTime: product.reviewTime,
        enabled: product.enable
      };
      if (product["resource"] == "谷歌商店") {
        productDto.installType = 0;
      } else if (product["resource"] == "应用内安装") {
        productDto.installType = 1;
      } else if (product["resource"] == "跳转浏览器") {
        productDto.installType = 2;
      }
      productDto["productIndex"] = parseInt(product["cid"]);
      console.log(productDto);
      Vue.http
        .post("/market/api/appProducts?key=" + getUrlParam("key"), productDto)
        .then(
          response => {
            // get body data
            console.log(response.body);
            if (response.body.code == "ok") {
              this.$message("操作成功");
              //location.reload();
            } else {
              this.$message("操作失败");
            }
          },
          response => {
            // error callback
            this.$message("操作失败");
          }
        );
    },
    updateSelect(p1, p2) {},
    uploadSuccess(response, file, fileList) {
      console.log(response);
      let logoUrl = response.body;
      let len = window.location.href.length;
      let url = window.location.href.substring(0, len - 1);
      url = url.substring(0, url.lastIndexOf("/"));
      url += logoUrl;
      console.log(url);
      this.$alert(url, "logo地址", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    uploadError(err, file, fileList) {
      this.$message("上传失败，请重试");
    }
  },
  data() {
    return {
      tableData: null, //Array(100).fill(item)
      rules: {
        appId: [{ required: true, message: "appId", trigger: "change" }],
        url: [{ required: true, message: "url", trigger: "change" }],
        resource: [{ required: true, message: "安装方式", trigger: "change" }],
        logoUrl: [{ required: true, message: "url", trigger: "change" }],
        productName: [{ required: true, message: "url", trigger: "change" }],
        slogan: [{ required: true, message: "url", trigger: "change" }],
        amount: [{ required: true, message: "url", trigger: "change" }],
        interest: [{ required: true, message: "url", trigger: "change" }],
        reviewTime: [{ required: true, message: "url", trigger: "change" }]
      },
      formList: null
    };
  }
};
</script>

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

<template>
  <div id="analytics">
    <el-container>
      <el-header>
        <div class="title">Galaxy Lab</div>
      </el-header>

      <div class="block" style="text-align:center">
        <el-date-picker
          v-model="value"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <span>
          <el-button @click.native="handleClick">查询</el-button>
        </span>
      </div>

      <el-container>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="220"></el-table-column>
            <el-table-column prop="appId" label="包名" style="text-align:left"></el-table-column>
            <el-table-column prop="activeDevice" label="日活跃设备"></el-table-column>
            <el-table-column prop="newDevice" label="日新增设备"></el-table-column>
            <el-table-column prop="clickProductDevice" label="点击产品设备数"></el-table-column>
            <el-table-column prop="installProductDevice" label="安装产品设备数"></el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <el-container>
        <el-main>
          <el-table :data="tableData2">
            <el-table-column prop="date" label="日期" width="220"></el-table-column>
            <el-table-column prop="appId" label="包名" style="text-align:left"></el-table-column>
            <el-table-column prop="event" label="事件"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <el-container>
        <el-main>
          <el-table :data="tableData3">
            <el-table-column prop="date" label="日期" width="220"></el-table-column>
            <el-table-column prop="productName" label="产品名" style="text-align:left"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
          </el-table>
        </el-main>
      </el-container>

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
    Vue.http.get("/market/api/cashMarketEvent").then(
      response => {
        // get body data
        console.log(response.body);
        let array = new Array();
        let body = response.body;
        if (body["code"] == "ok") {
          let r = body.body;
          for (let i = 0; i < r.length; i++) {
            let item = {
              date: r[i]["beginTime"],
              appId: r[i]["applicationId"],
              activeDevice: r[i]["openedCount"],
              newDevice: r[i]["installCount"],
              clickProductDevice: r[i]["clickProductCount"],
              installProductDevice: r[i]["installProductCount"]
            };
            array[i] = item;
          }
        }
        ctx.tableData = array;
      },
      response => {
        // error callback
      }
    );

    Vue.http.get("/market/api/cashAppEvent").then(
      response => {
        // get body data
        console.log(response.body);
        let array = new Array();
        let body = response.body;
        if (body["code"] == "ok") {
          let r = body.body;
          for (let i = 0; i < r.length; i++) {
            let item = {
              date: r[i]["beginTime"],
              appId: r[i]["applicationId"],
              event: r[i]["event"],
              count: r[i]["count"]
            };
            array[i] = item;
          }
        }
        ctx.tableData2 = array;
      },
      response => {
        // error callback
      }
    );

    Vue.http.get("/market/api/cashProductEvent").then(
      response => {
        // get body data
        console.log(response.body);
        let array = new Array();
        let body = response.body;
        if (body["code"] == "ok") {
          let r = body.body;
          for (let i = 0; i < r.length; i++) {
            let item = {
              date: r[i]["beginTime"],
              productName: r[i]["productName"],
              count: r[i]["count"]
            };
            array[i] = item;
          }
        }
        ctx.tableData3 = array;
      },
      response => {
        // error callback
      }
    );
  },
  methods: {
    handleClick() {
      console.log(this.value);
      console.log(`startTs = ${this.value[0].getTime()} endTs=${this.value[1].getTime()}`);
      if (this.value != null && this.value.length >= 2) {
        let ctx = this;
        Vue.http
          .get(
            `/market/api/cashMarketEvent?startTime=${this.value[0].getTime()}&endTime=${this.value[1].getTime()}`
          )
          .then(
            response => {
              // get body data
              console.log(response.body);
              let array = new Array();
              let body = response.body;
              if (body["code"] == "ok") {
                let r = body.body;
                for (let i = 0; i < r.length; i++) {
                  let item = {
                    date: r[i]["beginTime"],
                    appId: r[i]["applicationId"],
                    activeDevice: r[i]["openedCount"],
                    newDevice: r[i]["installCount"],
                    clickProductDevice: r[i]["clickProductCount"],
                    installProductDevice: r[i]["installProductCount"]
                  };
                  array[i] = item;
                }
              }
              ctx.tableData = array;
            },
            response => {
              // error callback
            }
          );

        Vue.http
          .get(
            `/market/api/cashAppEvent?startTime=${this.value[0].getTime()}&endTime=${this.value[1].getTime()}`
          )
          .then(
            response => {
              // get body data
              console.log(response.body);
              let array = new Array();
              let body = response.body;
              if (body["code"] == "ok") {
                let r = body.body;
                for (let i = 0; i < r.length; i++) {
                  let item = {
                    date: r[i]["beginTime"],
                    appId: r[i]["applicationId"],
                    event: r[i]["event"],
                    count: r[i]["count"]
                  };
                  array[i] = item;
                }
              }
              ctx.tableData2 = array;
            },
            response => {
              // error callback
            }
          );

        Vue.http
          .get(
            `/market/api/cashProductEvent?startTime=${this.value[0].getTime()}&endTime=${this.value[1].getTime()}`
          )
          .then(
            response => {
              // get body data
              console.log(response.body);
              let array = new Array();
              let body = response.body;
              if (body["code"] == "ok") {
                let r = body.body;
                for (let i = 0; i < r.length; i++) {
                  let item = {
                    date: r[i]["beginTime"],
                    productName: r[i]["productName"],
                    count: r[i]["count"]
                  };
                  array[i] = item;
                }
              }
              ctx.tableData3 = array;
            },
            response => {
              // error callback
            }
          );
      } else {
        let ctx = this;
        Vue.http.get("/market/api/cashMarketEvent").then(
          response => {
            // get body data
            console.log(response.body);
            let array = new Array();
            let body = response.body;
            if (body["code"] == "ok") {
              let r = body.body;
              for (let i = 0; i < r.length; i++) {
                let item = {
                  date: r[i]["beginTime"],
                  appId: r[i]["applicationId"],
                  activeDevice: r[i]["openedCount"],
                  newDevice: r[i]["installCount"],
                  clickProductDevice: r[i]["clickProductCount"],
                  installProductDevice: r[i]["installProductCount"]
                };
                array[i] = item;
              }
            }
            ctx.tableData = array;
          },
          response => {
            // error callback
          }
        );

        Vue.http.get("/market/api/cashAppEvent").then(
          response => {
            // get body data
            console.log(response.body);
            let array = new Array();
            let body = response.body;
            if (body["code"] == "ok") {
              let r = body.body;
              for (let i = 0; i < r.length; i++) {
                let item = {
                  date: r[i]["beginTime"],
                  appId: r[i]["applicationId"],
                  event: r[i]["event"],
                  count: r[i]["count"]
                };
                array[i] = item;
              }
            }
            ctx.tableData2 = array;
          },
          response => {
            // error callback
          }
        );

        Vue.http.get("/market/api/cashProductEvent").then(
          response => {
            // get body data
            console.log(response.body);
            let array = new Array();
            let body = response.body;
            if (body["code"] == "ok") {
              let r = body.body;
              for (let i = 0; i < r.length; i++) {
                let item = {
                  date: r[i]["beginTime"],
                  productName: r[i]["productName"],
                  count: r[i]["count"]
                };
                array[i] = item;
              }
            }
            ctx.tableData3 = array;
          },
          response => {
            // error callback
          }
        ); 
      }
    }
  },
  data() {
    return {
      tableData: null, //Array(100).fill(item)
      tableData2: null, //Array(100).fill(item)
      tableData3: null, //Array(100).fill(item)
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
      formList: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: null
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

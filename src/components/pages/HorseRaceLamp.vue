<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="选择时间段">
            <div class="block">
              <el-date-picker
                v-model="timeArr"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="选择服务器">
            <el-select v-model="partition" collapse-tags style="width: 100%;" placeholder="请选择">
              <el-option
                v-for="(item,index) in partitionArr"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="noticeListSearch">跑马灯列表</el-button>
            <el-button type="primary" @click="addLampVisible=true">添加跑马灯</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="tableList" v-show="noticeListShow">
      <template>
        <el-table :data="noticeList" style="width: 100%">
          <el-table-column prop="NoticeId" label="走马灯id"></el-table-column>
          <el-table-column prop="StartTime" label="开始时间"></el-table-column>
          <el-table-column prop="LastTime" label="持续时间（秒）"></el-table-column>
          <el-table-column prop="NotifyCD" label="跑马灯间隔"></el-table-column>
          <el-table-column prop="Msg" label="文本"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 添加跑马灯 -->
    <el-dialog title="添加跑马灯" :visible.sync="addLampVisible" width="30%">
      <el-form :model="addLampForm">
        <el-form-item label="服务器">
          <el-select
            v-model="addLampForm.partition"
            collapse-tags
            style="width: 100%;"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in partitionArr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="addLampForm.startTime"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="持续时间（秒）">
          <el-input-number
            v-model="addLampForm.lastTime"
            @change="lastTimeChange"
            :min="1"
            style="width: 100%;"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="跑马灯间隔">
          <el-input-number
            v-model="addLampForm.notifyCD"
            @change="notifyCDChange"
            :min="1"
            style="width: 100%;"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="文本">
          <el-input type="textarea" v-model="addLampForm.msg" style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetAddForm">取 消</el-button>
        <el-button type="primary" @click="addLamp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "horseRaceLamp",
  data() {
    return {
      noticeListShow:false,
      addLampVisible: false,
      addLampForm: {
        partition: "25001",
        startTime: "",
        lastTime: 0,
        notifyCD: 0,
        msg: ""
      },
      timeArr: [],
      pageNo: 1,
      partition: "25001",
      partitionArr: [],
      noticeList: []
    };
  },
  created() {
    let url = "api/config/serverlist";
    this.$axios({
      method: "get",
      url: url
    })
      .then(resp => {
        this.partitionArr = resp.data.msg;
        // console.log(this.partitionArr)
      })
      .catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          type: "error"
        });
      });
  },
  methods: {
    lastTimeChange(value) {
      this.addLampForm.lastTime = value;
    },
    notifyCDChange(value) {
      this.addLampForm.notifyCD = value;
    },
    // 转换
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].StartTime = this.$exchangeDate(arr[i].StartTime); //转日期
        arr[i].Msg = decodeURI(arr[i].Msg); //转日期
      }
      return arr;
    },
    // 跑马灯列表
    noticeListSearch() {
      if (this.timeArr.length !== 2 || this.partition === "") {
        this.$message({
          message: "请选择时间和服务器进行查询",
          type: "warning"
        });
      } else {
        this.noticeListShow = true
        let url = "api/gm/noticelist";
        let params = {
          partition: Number(this.partition),
          startTime:this.$dateToms(this.timeArr[0]),
          stopTime: this.$dateToms(this.timeArr[1]),
          pageNo: this.pageNo
        };
        console.log(params)
        this.$axios({
          method: "post",
          url: url,
          data: params
        })
          .then(resp => {
            this.noticeList = this.exchange(resp.data.msg.NoticeList);
          })
          .catch(err => {
            console.log(err);
            this.$message({
              showClose: true,
              type: "error"
            });
          });
      }
    },
    // 重置添加表单,取消添加
    resetAddForm() {
      this.addLampForm = {
        partition: "25001",
        startTime: "",
        lastTime: 0,
        notifyCD: 0,
        msg: ""
      };
      this.addLampVisible = false;
    },
    // 添加跑马灯
    addLamp() {
      // console.log(this.addLampForm);
      // let url = "api/gm/addnotice";
      let url = "api/gm/addnotice";
      let params = {
        partition: Number(this.addLampForm.partition),
        startTime: this.$dateToms(this.addLampForm.startTime),
        lastTime: this.addLampForm.lastTime,
        notifyCD: this.addLampForm.notifyCD,
        msg: this.addLampForm.msg
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp);
          if (resp.data.msg.Result === 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "添加失败，请重试",
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: "添加失败，请重试",
            type: "error"
          });
          console.log(err);
        });
      this.resetAddForm();
    },
    // 删除跑马灯
    handleDelete(index, row) {
      let url = "api/gm/removenotice";
      let params = {
        partition: Number(this.$store.state.serverId),
        idx: row.NoticeId
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.msg.Result === 0) {
            this.noticeListSearch();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.el-row {
  padding: 10px;
  border-radius: 20px;
}
.el-col {
  height: 100%;
  text-align: left;
}
.el-col form {
  height: 100%;
}
.el-col form div {
  height: 100%;
  line-height: 100%;
}
.el-row:nth-of-type(1) {
  background: #eaecf3;
}
.el-row:nth-of-type(1) h1 {
  padding: 20px;
}
.el-form-item {
  margin: 5px;
}
.el-input-number {
  line-height: 38px !important;
}
</style>


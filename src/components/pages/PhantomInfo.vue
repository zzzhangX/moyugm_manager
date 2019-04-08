<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :inline="true" :model="roleForm" class="demo-form-inline">
          <el-form-item label="玩家id：">
            <el-input v-model="roleForm.openId" placeholder="玩家id"></el-input>
          </el-form-item>
          <el-form-item label="角色id：">
            <el-input v-model="roleForm.roleId" placeholder="角色id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPhantomList">幻兽列表</el-button>
            <el-button type="primary" @click="searchKnightsList">圆桌骑士</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 骑士列表 -->
    <div  v-show="isShow.KnightsList">
      <el-table :data="KnightsArr" style="width: 90%;" stripe>
        <el-table-column prop="KnightId" label="骑士id" align="center"></el-table-column>
        <el-table-column prop="EudId" label="幻兽id" align="center"></el-table-column>
        <el-table-column prop="EudStar" label="幻兽星级" align="center"></el-table-column>
        <el-table-column prop="EudAdvance" label="幻兽进阶" align="center"></el-table-column>
        <el-table-column prop="EudStar" label="幻兽等级" align="center"></el-table-column>
      </el-table>
    </div>

    <!-- 幻兽列表 -->
    <div v-show="isShow.PhantomList">
      <el-table :data="phantomArr" style="width: 90%;" stripe>
        <el-table-column fixed prop="EudId" label="幻兽id" align="center"></el-table-column>
        <el-table-column fixed prop="RoleCard" label="身份牌" align="center"></el-table-column>
        <el-table-column prop="EudFight" label="幻兽战力" align="center"></el-table-column>
        <el-table-column prop="EudScore" label="幻兽等级" align="center"></el-table-column>
        <el-table-column prop="EudStar" label="幻兽星级" align="center"></el-table-column>
        <el-table-column prop="EudAdvance" label="幻兽进阶" align="center"></el-table-column>
        <el-table-column prop="Polarity" label="相性" align="center"></el-table-column>
        <el-table-column prop="PolarityAttackBouns" label="相性攻击加成" align="center"></el-table-column>
        <el-table-column prop="EudState" label="幻兽状态" align="center"></el-table-column>
        <el-table-column prop label="技能" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" width="auto">
              <p>技能1: {{ scope.row.Skill1Id}}======等级:{{ scope.row.Skill1Level}}</p>
              <p>技能2: {{ scope.row.Skill2Id}}======等级:{{ scope.row.Skill2Level}}</p>
              <p>技能3: {{ scope.row.Skill3Id}}======等级:{{ scope.row.Skill3Level}}</p>
              <p>技能4: {{ scope.row.Skill4Id}}======等级:{{ scope.row.Skill4Level}}</p>
              <p>技能5: {{ scope.row.Skill5Id}}======等级:{{ scope.row.Skill5Level}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">技能</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop label="天赋" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" width="50">
              <p>天赋1: {{ scope.row.Talent1Id}}</p>
              <p>天赋2: {{ scope.row.Talent2Id}}</p>
              <p>天赋3: {{ scope.row.Talent3Id}}</p>
              <p>天赋4: {{ scope.row.Talent4Id}}</p>
              <p>天赋5: {{ scope.row.Talent5Id}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">天赋</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="KnightAppoint" label="骑士任命" align="center"></el-table-column>
        <el-table-column align="center">
          <!-- <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>-->
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">设置幻兽信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出修改幻兽属性 -->
    <el-dialog title="设置幻兽" :visible.sync="phantomVisible" width="15%">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="phantomForm"
        class="demo-ruleForm"
      >
        <el-form-item label="幻兽序号">
          <el-input v-model="phantomForm.index" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item v-model="phantomForm.type" label="类型">
          <el-select v-model="phantomForm.type" placeholder="类型">
            <el-option label="等级" value="1"></el-option>
            <el-option label="主属性星级" value="2"></el-option>
            <el-option label="进化等级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改为">
          <el-input v-model="phantomForm.value" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editPhantom">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "phantomInfo",
  data() {
    return {
      isShow: {
        PhantomList: false,
        KnightsList: false
      },
      roleForm: {
        openId: "FE1B6793470827BF3D1987CB58ECB522",
        roleId: "61A9000001"
      },
      phantomArr: [],
      KnightsArr:[],
      labelPosition: "right",
      phantomVisible: false,
      phantomForm: {
        index: 0,
        value: 0,
        type: "请选择"
      }
    };
  },
  created() {},
  methods: {
    //加载幻兽列表
    phantomList() {
      let url = "api/gm/eudslist";
      let params = {
        partition: this.$store.state.serverId,
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          // console.log(resp.data.msg.EudList);
          this.phantomArr = this.exchange(resp.data.msg.EudList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加载圆桌骑士列表
    knightsList() {
      let url = "api/gm/knightslist";
      let params = {
        partition: this.$store.state.serverId,
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp.data);
          this.KnightsArr = resp.data(resp.data.msg.SKnightsList)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //数据转换
    exchange(arr) {
      for (let i = 0; i < arr.length; i++) {
        switch (arr[i].Polarity) {
          case 0:
            arr[i].Polarity = "雷";
            break;
          case 1:
            arr[i].Polarity = "地";
            break;
          case 2:
            arr[i].Polarity = "火";
            break;
          case 3:
            arr[i].Polarity = "水";
            break;
          case 4:
            arr[i].Polarity = "风";
            break;
          default:
        } //转换相性
        arr[i].EudState === 1
          ? (arr[i].EudState = "出战")
          : (arr[i].EudState = "待机"); //幻兽状态
        switch (arr[i].KnightAppoint) {
          case 0:
            arr[i].KnightAppoint = "没有任命";
            break;
          case 1:
            arr[i].KnightAppoint = "智慧骑士";
            break;
          case 2:
            arr[i].KnightAppoint = "雷霆骑士";
            break;
          case 3:
            arr[i].KnightAppoint = "守护骑士";
            break;
          case 4:
            arr[i].KnightAppoint = "斗魂骑士";
            break;
          case 5:
            arr[i].KnightAppoint = "裁决骑士";
            break;
          case 6:
            arr[i].KnightAppoint = "圣光骑士";
            break;
          case 7:
            arr[i].KnightAppoint = "永恒骑士";
            break;
          case 8:
            arr[i].KnightAppoint = "光辉骑士";
            break;
          case 9:
            arr[i].KnightAppoint = "圣战骑士";
            break;
          case 10:
            arr[i].KnightAppoint = "世袭骑士";
            break;
        } //转换骑士任命
      }
      return arr;
    },
    //查询幻兽按钮
    searchPhantomList() {
      this.isShow = {
        PhantomList: true,
        KnightsList: false
      };
      if (this.openId === "" || this.roleId === "") {
        this.$message({
          showClose: true,
          message: "请输入玩家id和角色id进行查询",
          type: "warning"
        });
      } else {
        this.phantomList();
      }
    },
    // 查询骑士按钮
    searchKnightsList() {
      this.isShow = {
        PhantomList: false,
        KnightsList: true
      };
      if (this.openId === "" || this.roleId === "") {
        this.$message({
          showClose: true,
          message: "请输入玩家id和角色id进行查询",
          type: "warning"
        });
      } else {
        this.knightsList();
      }
    },
    //设置幻兽按钮
    handleEdit(index, row) {
      // console.log(index, row);
      this.phantomVisible = true;
      this.phantomForm.index = row.Index;
      this.phantomForm.value = 0;
      this.phantomForm.type = "请选择";
    },
    //取消修改
    cancelEdit() {
      this.phantomVisible = false;
    },
    //修改数据
    editPhantom() {
      let url = "api/gm/updateEud";
      this.phantomVisible = false;
      this.phantomForm.type = Number(this.phantomForm.type);
      this.phantomForm.value = Number(this.phantomForm.value);
      let params = {
        partition: this.$store.state.serverId,
        openId: this.roleForm.openId,
        roleId: this.roleForm.roleId,
        index: this.phantomForm.index,
        type: this.phantomForm.type,
        value: this.phantomForm.value,
        cmdid: 4255
      };
      console.log(params);
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          console.log(resp.data);
          this.phantomList();
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
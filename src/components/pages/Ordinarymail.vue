<template>
  <div>
    <el-row class="choose">
      <el-col :span="4" :offset="1">
        <el-select v-model="tablevalue" style="width:100%" placeholder="请选择邮件类型" @change="mailchange()">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-select style="width:100%" v-model="tablepartition" placeholder="请选择服务器" @change="mailchange()">
          <el-option v-for="(item,index) in serverlist" :key="index" :label="item.id" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="12">
        <el-row>
          <el-col :offset="2">
            <el-button size="medium" type="primary" @click="dialogFormVisible = true">发送邮件</el-button>
          </el-col>
        </el-row>
        <el-dialog title="邮件发送" :visible.sync="dialogFormVisible">
          <el-form :model="mailForm" :rules="rules" ref="mailForm" label-width="140px" class="mailForm">
            <!-- 邮件类型 选择邮件类型 通用-->
            <el-row>
              <el-col :span="10" :offset="1">
                <el-form-item label="邮件类型" prop="mailtype">
                  <el-select v-model="value" style="width:100%" placeholder="请选择邮件类型" @change="changeEmpty('mailForm')">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 个人邮件服务器选择 仅限魔石，金币，绑定魔石，道具，系统邮件 -->
              <el-col :span="10" :offset="1" v-if="this.value!=4137">
                <el-form-item label="服务器" prop="partition">
                  <el-select style="width:100%" v-model="mailForm.partition" placeholder="请选择服务器">
                    <el-option v-for="(item,index) in serverlist" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <!-- 全服邮件服务器选择 仅限魔石，金币，绑定魔石，道具，系统邮件 -->
              <el-col :span="10" :offset="1" v-if="this.value==4137">
                <el-form-item label="服务器" prop="partitionlist">
                  <el-select multiple style="width:100%" v-model="mailForm.partitionList" placeholder="请选择服务器">
                    <el-option v-for="(item,index) in serverlist" v-bind:key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 发件人 仅限全服邮件 -->
              <el-col :span="10" :offset="1" v-if="this.value==4137">
                <el-form-item label="发件人" prop="from" :rules="{required: true, message: '有效期不能为空', trigger: 'blur'}">
                  <el-input v-model="mailForm.from" placeholder="请输入发件人姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.value!=4137">
              <!-- 玩家id 仅限金币、魔石、绑定魔石、道具、系统邮件-->
              <el-col :span="10" :offset="1">
                <el-form-item label="玩家Id" prop="openId">
                  <el-select class="no" style="width:100%" v-model="mailForm.openId" multiple filterable allow-create default-first-option placeholder="请输入玩家Id"></el-select>
                </el-form-item>
              </el-col>
              <!-- 角色id 仅限金币、魔石、绑定魔石、道具、系统邮件-->
              <el-col :span="10" :offset="1">
                <el-form-item label="角色Id" prop="roleId">
                  <el-select class="no" style="width:100%" v-model="mailForm.roleId" multiple filterable allow-create default-first-option placeholder="请输入角色Id"></el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <!-- 数量 魔石、金币、绑定魔石数量，仅限魔石、金币、绑定魔石 -->
              <el-col :span="10" :offset="1" v-if="this.value==4165||this.value==4167||this.value==4169">
                <el-form-item label="数量" prop="number" :rules="{required: true, message: '数量不能为空', trigger: 'blur'}">
                  <el-input type="number" v-model.number="mailForm.number" placeholder="请输入数量"></el-input>
                </el-form-item>
              </el-col>
              <!-- 邮件有效期 仅限道具、金币、魔石、绑定魔石 -->
              <el-col :span="10" :offset="1" v-if="this.value!=4119&&this.value!=4137">
                <el-form-item label="邮件有效期（秒）" prop="effectTime" :rules="{required: true, message: '有效期不能为空', trigger: 'blur'}">
                  <el-input type="number" v-model.number="mailForm.effectTime" placeholder="请输入有效期"></el-input>
                </el-form-item>
              </el-col>
              <!-- 领取角色最小等级 仅限全服邮件 -->
              <el-col :span="10" :offset="1" v-if="this.value==4137">
                <el-form-item label="领取角色最小等级" prop="minLevel" :rules="{required: true, message: '有效期不能为空', trigger: 'blur'}">
                  <el-input type="number" v-model.number="mailForm.minLevel" placeholder="请输入等级"></el-input>
                </el-form-item>
              </el-col>
              <!-- 领取角色最大等级 仅限全服邮件 -->
              <el-col :span="10" :offset="1" v-if="this.value==4137">
                <el-form-item label="领取角色最大等级" prop="maxLevel" :rules="{required: true, message: '有效期不能为空', trigger: 'blur'}">
                  <el-input type="number" v-model.number="mailForm.maxLevel" placeholder="请输入等级"></el-input>
                </el-form-item>
              </el-col>
              <!-- 角色注册开始时间 仅限全服邮件 -->
              <el-col :span="21" :offset="1" v-if="this.value==4137">
                <el-form-item label="角色注册时间" prop="regrangeTime" :rules="{required: true, message: '时间不能为空', trigger: 'blur'}">
                  <el-date-picker v-model="mailForm.regrangeTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp"></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 邮件领取时间 仅限全服邮件 -->
              <el-col :span="21" :offset="1" v-if="this.value==4137">
                <el-form-item label="邮件领取时间" prop="rangeTime" :rules="{required: true, message: '时间不能为空', trigger: 'blur'}">
                  <el-date-picker v-model="mailForm.rangeTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <!-- 邮件标题 通用 -->
              <el-col :span="21" :offset="1">
                <el-form-item label="邮件标题" prop="mailTitle">
                  <el-input v-model="mailForm.mailTitle" placeholder="请输入邮件标题"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <!-- 邮件内容 通用 -->
              <el-col :span="21" :offset="1">
                <el-form-item label="邮件内容" prop="mailContent">
                  <el-input type="textarea" :rows="8" v-model="mailForm.mailContent" placeholder="请输入邮件内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 道具/附件/奖励信息 仅限道具、系统邮件、全服邮件 -->
            <el-row v-if="this.value==4171||this.value==4119||this.value==4137">
              <el-col>
                <el-row v-for="(item, index) in mailForm.itemList" :key="item.key">
                  <!-- 道具/附件/奖励id 仅限道具、系统邮件、全服邮件 -->
                  <el-col :span="9" :offset="1">
                    <el-form-item :label="'附件' + index" :prop="'itemList.' + index + '.itemId'" :rules="{required: true, message: '附件不能为空', trigger: 'blur'}">
                      <el-input v-model="item.itemId" placeholder="请输入附件Id"></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 道具/附件/奖励数量 仅限道具、系统邮件、全服邮件 -->
                  <el-col :span="9" :offset="1">
                    <el-form-item label="数量" :prop="'itemList.' + index + '.value'" :rules="[{required: true, message: '数量不能为空', trigger: 'blur'}]">
                      <el-input type="number" v-model.number="item.value" placeholder="请输入附件数量"></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 道具/附件/奖励信息删除按钮 删除数组中一列信息 仅限道具、系统邮件、全服邮件 -->
                  <el-col :span="3">
                    <el-button type="danger" size="medium" @click.prevent="removeitem(item)">删除</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!-- 道具/附件/奖励信息添加按钮 在数组添加中一列信息 仅限道具、系统邮件、全服邮件 -->
            <el-row v-if="this.value==4171||this.value==4119||this.value==4137">
              <el-col :span="3" :offset="20">
                <el-button type="primary" size="mini" @click="additem">新增附件</el-button>
              </el-col>
            </el-row>

            <el-row>
              <!-- 提交按钮 弹出确认窗口，确认提交表单信息，通过接口发送后端 通用 -->
              <el-form-item>
                <el-col :span="4" :offset="5">
                  <el-button type="primary" @click="send('mailForm')" class="mail-btn">
                    <i class="el-icon-upload form-icon"></i>提交
                  </el-button>
                </el-col>
                <!-- 重置按钮 重置表单信息 通用 -->
                <el-col :span="4" :offset="2">
                  <el-button @click="resetForm('mailForm')" class="mail-btn">
                    <i class="el-icon-refresh form-icon"></i>重置
                  </el-button>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
    <!-- 邮件表格，显示后端传来的邮件信息 -->
    <el-row>
      <el-col>
        <el-table :data="mailtransdata.list" stripe style="width: 100%" height="610px">
          <!-- 服务器列，服务器信息，固定在左侧 -->
          <el-table-column fixed prop="partition" label="服务器" width="100px" :show-overflow-tooltip="true" align="center"></el-table-column>
          <!-- 信息列，除服务器与附件详情外的信息循环显示 -->
          <div v-for="(item,index) in maillist" :key="index">
            <el-table-column :key="Math.random()" v-if="item.show" :prop="item.prop" :label="item.label" :width="item.width" :show-overflow-tooltip="true" align="center"></el-table-column>
          </div>
          <!-- 附件详情列，点击按钮查看对应行附件详情 -->
          <el-table-column fixed="right" v-if="maillistright" prop="itemlist" label="附件详情" width="100px" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="itemlook(scope.$index)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 附件详情页，展示附件详情信息 -->
        <el-dialog title="附件详情" :visible.sync="centerDialogVisible" width="40%" center>
          <div v-for="(item,index) in dialoglist" :key="index" class="dialog">
            <el-row class="dialogrow">
              <el-col :span="7" :offset="4">
                <span>附件Id：</span>
                <span class="dialogvalue">{{item.dialogId}}</span>
              </el-col>
              <el-col :span="7" :offset="4">
                <span>附件数量：</span>
                <span class="dialogvalue">{{item.dialogValue}}</span>
              </el-col>
              <el-col>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-row>
              <el-col :span="4" :offset="7">
                <el-button class="dialogbtn" size="medium" @click="centerDialogVisible = false">取 消</el-button>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-button class="dialogbtn" size="medium" type="primary" @click="centerDialogVisible = false">确 定</el-button>
              </el-col>
            </el-row>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <!-- 分页，对邮件表格信息进行分页处理 -->
    <el-row>
      <el-col>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-sizes="pageList" :page-size="this.perPage" layout="total, sizes, prev, pager, next, jumper" :page-count="this.totalPage">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ordinarymail",
  // 数据
  data() {
    return {
      // 分页 每页信息条数
      pageList: [5, 10, 15, 20],
      // 每页页数
      perPage: 20,
      // 页码
      pageNo: 1,
      // 总页数
      totalPage: 0,
      // 附件存储数组
      dialoglist: [],
      // 附件详情界面开关
      centerDialogVisible: false,
      // 表单界面开关
      dialogFormVisible: false,
      // 表格服务器存储
      tablepartition: "",
      // 表格邮件类型存储
      tablevalue: "",
      // 转存数组，即表格实际读取数组
      mailtransdata: [],
      // 初始存储数组，未处理数据
      maildata: [],
      // 表格详情列开关
      maillistright: false,
      // 表格列信息数组
      maillist: [
        {
          label: "平台",
          prop: "detail.PlatId",
          width: "100px",
          show: true
        },
        {
          label: "大区",
          prop: "detail.AreaId",
          width: "100px",
          show: true
        },
        {
          label: "邮件状态",
          prop: "flag",
          width: "100px",
          show: true
        },
        {
          label: "发件人",
          prop: "detail.From",
          width: "100px",
          show: true
        },
        {
          label: "收件玩家",
          prop: "openId",
          width: "100px",
          show: true
        },
        {
          label: "收件角色",
          prop: "roleId",
          width: "100px",
          show: true
        },
        {
          label: "记录人",
          prop: "sender",
          width: "100px",
          show: true
        },
        {
          label: "发送时间",
          prop: "sendtime",
          width: "160px",
          show: true
        },
        {
          label: "有效时间（秒）",
          prop: "detail.EffectTime",
          width: "120px",
          show: true
        },
        {
          label: "数量",
          prop: "detail.Value",
          width: "100px",
          show: true
        },
        {
          label: "领取角色最小等级",
          prop: "detail.MinLevel",
          width: "150px",
          show: true
        },
        {
          label: "领取角色最大等级",
          prop: "detail.MaxLevel",
          width: "150px",
          show: true
        },
        {
          label: "角色注册开始时间",
          prop: "detail.RegStartTime",
          width: "160px",
          show: true
        },
        {
          label: "角色注册结束时间",
          prop: "detail.RegStopTime",
          width: "160px",
          show: true
        },
        {
          label: "邮件领取开始时间",
          prop: "detail.StartTime",
          width: "160px",
          show: true
        },
        {
          label: "邮件领取结束时间",
          prop: "detail.StopTime",
          width: "160px",
          show: true
        },
        {
          label: "邮件标题",
          prop: "title",
          width: "250px",
          show: true
        },
        {
          label: "邮件内容",
          prop: "content",
          width: "350px",
          show: true
        }
      ],
      // 服务器列表数组
      serverlist: [],
      // 邮件类型数组
      options: [
        {
          value: 4171, //cimid
          label: "道具" //select显示文字
        },
        {
          value: 4169,
          label: "金币"
        },
        {
          value: 4165,
          label: "魔石"
        },
        {
          value: 4167,
          label: "绑定魔石"
        },
        {
          value: 4119,
          label: "系统邮件"
        },
        {
          value: 4137,
          label: "全服邮件"
        }
      ],
      value: 4171, //select选中项
      // 表单信息
      mailForm: {
        partition: "",//服务器号，存储除全服邮件外其他邮件选取的服务器
        partitionList: [],//服务器数组，存储全服邮件选取的多个服务器
        openId: [],//玩家号，存储输入的多个玩家号，与角色号对应
        roleId: [],//角色号，存储输入的多个角色号，与玩家号对应
        mailTitle: "",//邮件标题
        mailContent: "",//邮件内容
        effectTime: "",//有效时间
        number: "",//数量，金币/魔石/绑定魔石数量
        minLevel: "",//最小等级，全服邮件元素
        maxLevel: "",//最大等级，全服邮件元素
        regrangeTime: "",//角色注册时间，开始时间与结束时间合为一个数组
        rangeTime: "",//邮件领取时间，开始时间与结束时间合为一个数组
        from: "",//发件人
        itemList: [],//附件数组,存储附件数组信息，道具直接使用，全服邮件，系统邮件需转存使用
        attachList: []//系统邮件、全服邮件 发送时附件转存数组
      },
      // 验证规则
      rules: {
        mailTitle: [
          { required: true, message: "请输入邮件标题", trigger: "blur" }
        ],
        mailContent: [
          { required: true, message: "请输入邮件内容", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // 每页条数改变函数
    handleSizeChange(val) {
      // 每页条数设置
      this.perPage = val;
      this.mail();
    },
    // 页码改变函数
    handleCurrentChange(val) {
      // 页码改变
      this.pageNo = val;
      this.mail();
    },
    // 详情列按钮点击事件
    itemlook(a) {
      // 初始化附件储存数组
      this.dialoglist = [];
      // 详情页开关为真，即展开详情页
      this.centerDialogVisible = true;
      // 判断邮件类型，将所需信息存储到附件储存数组（处理原因：元数据中道具邮件和系统邮件、全服邮件中附件的字段名不同，且元数据初处理后为二维数组，遂决定转存数据，统一字段名）
      // 将道具邮件附件数组的值转存到详情页数组中
      if (this.tablevalue == 4171) {
        for (
          let i = 0;
          i < this.mailtransdata.list[a].detail.ItemList.length;
          i++
        ) {
          this.dialoglist.push({
            dialogId: this.mailtransdata.list[a].detail.ItemList[i].itemId,
            dialogValue: this.mailtransdata.list[a].detail.ItemList[i].value
          });
        }
        // 将系统邮件、全服邮件附件数组的值转存
      } else if (this.tablevalue == 4119 || this.tablevalue == 4137) {
        for (let m = 0; m < this.mailtransdata.list[a].detail.AttachList.length; m++) {
          this.dialoglist.push({
            dialogId: this.mailtransdata.list[a].detail.AttachList[m].awardId,
            dialogValue: this.mailtransdata.list[a].detail.AttachList[m].awardNum
          });
        }
      }
    },
    // 查询选择筛选列，获取邮件信息
    mailchange() {
      // 表格邮件类型或服务器改变后，初始化页码
      this.pageNo = 1;
      // 循环表格列信息数组，通过开关判断在不同邮件类型下表格信息的显示
      for (let i = 0; i < this.maillist.length; i++) {
        // 道具邮件不显示：发件人、数量、最小等级、最大等级、注册开始时间、注册结束时间、邮件开始时间、邮件结束时间
        if (this.tablevalue == 4171) {
          if (
            this.maillist[i].prop == "detail.From" ||
            this.maillist[i].prop == "detail.Value" ||
            this.maillist[i].prop == "detail.MinLevel" ||
            this.maillist[i].prop == "detail.MaxLevel" ||
            this.maillist[i].prop == "detail.RegStartTime" ||
            this.maillist[i].prop == "detail.RegStopTime" ||
            this.maillist[i].prop == "detail.StartTime" ||
            this.maillist[i].prop == "detail.StopTime"
          ) {
            this.maillist[i].show = false;
          } else {
            this.maillist[i].show = true;
            this.maillistright = true;//显示附件详情
          }
          // 金币、魔石、绑定魔石邮件不显示：发件人、最小等级、最大等级、注册开始时间、注册结束时间、邮件开始时间、邮件结束时间、附件详情页
        } else if (
          this.tablevalue == 4169 ||
          this.tablevalue == 4165 ||
          this.tablevalue == 4167
        ) {
          if (
            this.maillist[i].prop == "detail.From" ||
            this.maillist[i].prop == "detail.MinLevel" ||
            this.maillist[i].prop == "detail.MaxLevel" ||
            this.maillist[i].prop == "detail.RegStartTime" ||
            this.maillist[i].prop == "detail.RegStopTime" ||
            this.maillist[i].prop == "detail.StartTime" ||
            this.maillist[i].prop == "detail.StopTime"
          ) {
            this.maillist[i].show = false;
            this.maillistright = false;//不显示附件详情
          } else {
            this.maillist[i].show = true;
          }
          // 系统邮件不显示：有效时间、发件人、数量、最小等级、最大等级、注册开始时间、注册结束时间、邮件开始时间、邮件结束时间
        } else if (this.tablevalue == 4119) {
          if (
            this.maillist[i].prop == "detail.EffectTime" ||
            this.maillist[i].prop == "detail.From" ||
            this.maillist[i].prop == "detail.Value" ||
            this.maillist[i].prop == "detail.MinLevel" ||
            this.maillist[i].prop == "detail.MaxLevel" ||
            this.maillist[i].prop == "detail.RegStartTime" ||
            this.maillist[i].prop == "detail.RegStopTime" ||
            this.maillist[i].prop == "detail.StartTime" ||
            this.maillist[i].prop == "detail.StopTime"
          ) {
            this.maillist[i].show = false;
          } else {
            this.maillist[i].show = true;
            this.maillistright = true;//显示附件详情
          }
          // 全服邮件不显示：有效时间、数量、玩家id、角色id
        } else if (this.tablevalue == 4137) {
          if (
            this.maillist[i].prop == "detail.EffectTime" ||
            this.maillist[i].prop == "detail.Value" ||
            this.maillist[i].prop == "openId" ||
            this.maillist[i].prop == "roleId"
          ) {
            this.maillist[i].show = false;
          } else {
            this.maillist[i].show = true;
            this.maillistright = true;//显示附件详情
          }
        }
      }
      this.mail();
    },
    // 删除指定列道具信息
    removeitem(item) {
      var index = this.mailForm.itemList.indexOf(item);
      if (index !== -1) {
        this.mailForm.itemList.splice(index, 1);
      }
    },
    // 添加一列道具信息
    additem() {
      //在道具数组中添加一列空的考据信息数组
      this.mailForm.itemList.push({
        itemId: "",
        value: ""
      });
    },
    // 邮件类型值改变
    changeEmpty(formName) {
      //表单邮件类型切换后，清空表单
      this.resetForm(formName);
    },
    // 提交表单
    send(formName) {
      // 提示框弹出，确认后无问题执行转存函数与验证函数
      this.$confirm("确认发送邮件？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.attach();
              this.mailsend();
            } else {
              this.mailError();
              return false;
            }
          });
        })
        .catch(() => { });
    },
    // 发送邮件验证
    mailsend() {
      if (
        this.value != "" &&
        this.mailForm.mailTitle != "" &&
        this.mailForm.mailContent != ""
      ) {
        if (
          this.mailForm.partition != "" &&
          this.mailForm.openId != "" &&
          this.mailForm.roleId != "" &&
          this.mailForm.openId.length == this.mailForm.roleId.length
        ) {
          if (
            this.value == 4171 &&
            this.mailForm.effectTime != "" &&
            this.mailForm.itemList.length != 0
          ) {
            let stu = 0;
            for (let i = 0; i < this.mailForm.itemList.length; i++) {
              if (
                this.mailForm.itemList[i].itemId == "" ||
                this.mailForm.itemList[i].value == ""
              ) {
                stu = 1;
              }
            }
            if (stu == 0) {
              this.mailItemSend();
            } else {
              this.mailError();
            }
          } else if (
            this.mailForm.number != "" &&
            this.mailForm.effectTime != ""
          ) {
            if (this.value == 4169) {
              this.mailMoneySend();
            } else if (this.value == 4165) {
              this.mailMagicSend();
            } else if (this.value == 4167) {
              this.mailBoundMagicSend();
            }
          } else if (
            this.value == 4119 &&
            this.mailForm.attachList.length != 0
          ) {
            let stu = 0;
            for (let i = 0; i < this.mailForm.attachList.length; i++) {
              if (
                this.mailForm.attachList[i].awardId == "" ||
                this.mailForm.attachList[i].awardNum == ""
              ) {
                stu = 1;
              }
            }
            if (stu == 0) {
              this.mailSystemSend();
            } else {
              this.mailError();
            }
          } else {
            this.mailError();
          }
        } else if (
          this.mailForm.partitionList.length != 0 &&
          this.value == 4137 &&
          this.mailForm.regrangeTime != "" &&
          this.mailForm.rangeTime != "" &&
          this.mailForm.from != "" &&
          this.mailForm.attachList.length != 0 &&
          this.mailForm.minLevel != "" &&
          this.mailForm.maxLevel != "" &&
          this.mailForm.minLevel >=0 &&
          this.mailForm.minLevel <= this.mailForm.maxLevel
        ) {
          let stu = 0;
          for (let i = 0; i < this.mailForm.attachList.length; i++) {
            if (
              this.mailForm.attachList[i].awardId == "" ||
              this.mailForm.attachList[i].awardNum == ""
            ) {
              stu = 1;
            }
          }
          if (stu == 0) {
            this.mailAllServerSend();
          } else {
            this.mailError();
          }
        } else {
          this.mailError();
        }
      } else {
        this.mailError();
      }
    },
    // 金币邮件，之后的接口函数参照本函数注释
    mailMoneySend() {
      let url = "api/gm/sendmailtoroles";
      let params = {
        type: this.value,
        partition: this.mailForm.partition,
        openId: this.mailForm.openId,
        roleId: this.mailForm.roleId,
        mailTitle: this.mailForm.mailTitle,
        mailContent: this.mailForm.mailContent,
        value: this.mailForm.number,
        effectTime: this.mailForm.effectTime
      };
      this.$axios({
        method: "post",//连接方式
        url: url,//接口地址
        data: params//参数
      })
      //回调函数
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            // 提示成功消息
            this.mailSuccess();
            // 清空表单
            this.resetForm("mailForm");
            // 邮件发送完毕后重新查一次信息
            this.mail();
            // 关闭表单页
            this.dialogFormVisible = false;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 魔石邮件
    mailMagicSend() {
      let url = "api/gm/sendmailtoroles";
      let params = {
        type: this.value,
        partition: this.mailForm.partition,
        openId: this.mailForm.openId,
        roleId: this.mailForm.roleId,
        mailTitle: this.mailForm.mailTitle,
        mailContent: this.mailForm.mailContent,
        value: this.mailForm.number,
        effectTime: this.mailForm.effectTime
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            // console.log(params);
            this.mailSuccess();
            this.resetForm("mailForm");
            this.mail();
            this.dialogFormVisible = false;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 绑定魔石邮件
    mailBoundMagicSend() {
      let url = "api/gm/sendmailtoroles";
      let params = {
        type: this.value,
        partition: this.mailForm.partition,
        openId: this.mailForm.openId,
        roleId: this.mailForm.roleId,
        mailTitle: this.mailForm.mailTitle,
        mailContent: this.mailForm.mailContent,
        value: this.mailForm.number,
        effectTime: this.mailForm.effectTime
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            // console.log(params);
            this.mailSuccess();
            this.resetForm("mailForm");
            this.mail();
            this.dialogFormVisible = false;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 道具邮件
    mailItemSend() {
      let url = "api/gm/sendmailtoroles";
      let params = {
        type: this.value,
        partition: this.mailForm.partition,
        openId: this.mailForm.openId,
        roleId: this.mailForm.roleId,
        mailTitle: this.mailForm.mailTitle,
        mailContent: this.mailForm.mailContent,
        itemList_count: this.mailForm.itemList.length,
        effectTime: this.mailForm.effectTime,
        itemList: this.mailForm.itemList
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            // console.log(params);
            this.mailSuccess();
            this.resetForm("mailForm");
            this.mail();
            this.dialogFormVisible = false;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 系统邮件
    mailSystemSend() {
      let url = "api/gm/sendmailtoroles";
      let params = {
        type: this.value,
        partition: this.mailForm.partition,
        openId: this.mailForm.openId,
        roleId: this.mailForm.roleId,
        mailTitle: this.mailForm.mailTitle,
        mailContent: this.mailForm.mailContent,
        attachList_count: this.mailForm.attachList.length,
        attachList: this.mailForm.attachList
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            // console.log(params);
            this.mailSuccess();
            this.resetForm("mailForm");
            this.mail();
            this.dialogFormVisible = false;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 全服邮件
    mailAllServerSend() {
      let url = "api/gm/sendmailtoservers";
      let params = {
        partition: this.mailForm.partitionList,
        mailTitle: this.mailForm.mailTitle,
        mailContent: this.mailForm.mailContent,
        minLevel: this.mailForm.minLevel,
        maxLevel: this.mailForm.maxLevel,
        regStartTime: this.mailForm.regrangeTime[0] / 1000,
        regStopTime: this.mailForm.regrangeTime[1] / 1000,
        startTime: this.mailForm.rangeTime[0] / 1000,
        stopTime: this.mailForm.rangeTime[1] / 1000,
        from: this.mailForm.from,
        attachList_count: this.mailForm.attachList.length,
        attachList: this.mailForm.attachList
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            console.log(resp.data);
            // console.log(params);
            this.mailSuccess();
            this.resetForm("mailForm");
            this.mail();
            this.dialogFormVisible = false;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取服务器列表
    serverList() {
      let url = "api/config/serverlist";
      let params = {};
      this.$axios({
        method: "get",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            // console.log(resp);
            this.serverlist = resp.data.msg;
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 表单清空
    resetForm(formName) {
      // 清空表单信息
      this.$refs[formName].resetFields();
      // 清空道具数组
      this.mailForm.itemList.splice(0, this.mailForm.itemList.length);
      // 清空已选取的服务器数组
      this.mailForm.partitionList.splice(0, this.mailForm.partitionList.length);
    },
    // 邮件信息错误提示
    mailError() {
      this.$message.error("信息有误，请检查修改后再提交");
    },
    // 邮件发送成功提示
    mailSuccess() {
      this.$message({
        message: "邮件发送成功",
        type: "success"
      });
    },
    //获取邮件信息
    mail() {
      // 清空邮件信息初始存储数组和转存数组
      this.maildata = [];
      this.mailtransdata = [];
      let url = "api/gm/getmaillist";
      let params = {
        partition: this.tablepartition,
        type: this.tablevalue,
        pageNo: this.pageNo,
        perPage: this.perPage
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(resp => {
          if (resp.data.code == 200) {
            // console.log(resp.data.msg);
            this.maildata = resp.data.msg;
            //获取总页数
            this.totalPage = resp.data.msg.totalPage;
            // 转存邮件信息，detail由字符串转为对象，flag转为指定字符，四个时间由时间戳转为函数定义的时间格式
            for (let m = 0; m < this.maildata.list.length; m++) {
              this.$set(
                this.maildata.list[m],
                "detail",
                JSON.parse(this.maildata.list[m].detail)
              );
              if (this.maildata.list[m].flag == 1) {
                this.maildata.list[m].flag = "发送成功";
              } else if (this.maildata.list[m].flag == 2) {
                this.maildata.list[m].flag = "发送失败";
              }
              let regstartdate = this.maildata.list[m].detail.RegStartTime;
              let regstopdate = this.maildata.list[m].detail.RegStopTime;
              let startdate = this.maildata.list[m].detail.StartTime;
              let stopdate = this.maildata.list[m].detail.StopTime;
              if (
                regstartdate != null &&
                regstartdate != undefined &&
                regstartdate.toString().length == 10
              ) {
                regstartdate = this.timestampToTime(regstartdate * 1000);
              }
              if (
                regstopdate != null &&
                regstopdate != undefined &&
                regstopdate.toString().length == 10
              ) {
                regstopdate = this.timestampToTime(regstopdate * 1000);
              }
              if (
                startdate != null &&
                startdate != undefined &&
                startdate.toString().length == 10
              ) {
                startdate = this.timestampToTime(startdate * 1000);
              }
              if (
                stopdate != null &&
                stopdate != undefined &&
                stopdate.toString().length == 10
              ) {
                stopdate = this.timestampToTime(stopdate * 1000);
              }
              this.$set(
                this.maildata.list[m].detail,
                "RegStartTime",
                regstartdate
              );
              this.$set(
                this.maildata.list[m].detail,
                "RegStopTime",
                regstopdate
              );
              this.$set(this.maildata.list[m].detail, "StartTime", startdate);
              this.$set(this.maildata.list[m].detail, "StopTime", stopdate);
            }
            this.$set(this.mailtransdata, "list", this.maildata.list);
            this.$set(this.mailtransdata, "totalPage", this.maildata.totalPage);
          } else {
            console.error("获取数据失败" + err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 时间戳转换时间
    timestampToTime(param) {
      var date = new Date(param); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";//如果当月数字小于10，在其前方加数字0，并在其值基础上+1
      var D =
        (date.getDate() + 1 < 10
          ? "0" + (date.getDate() + 1)
          : date.getDate() + 1) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 系统邮件、全服邮件发送时附件数组转存函数
    attach() {
      // 附近转存数组清空
      this.mailForm.attachList = [];
      for (let i = 0; i < this.mailForm.itemList.length; i++) {
        this.mailForm.attachList.push({
          awardId: this.mailForm.itemList[i].itemId,
          awardNum: this.mailForm.itemList[i].value
        });
      }
    }
  },
  mounted: function () {
    // 加载服务器列表
    this.serverList();
  }
};
</script>
<style scoped>
/* 表单样式 */
.mailForm {
  padding: 3%;
}
/* 玩家id，角色id下拉框，下拉箭头隐藏 */
.no .el-input__suffix-inner {
  display: none;
}
/* 提交按钮，重置按钮样式 */
.mail-btn {
  width: 100%;
  margin-top: 40%;
  padding-left: 15%;
}
/* 提交按钮，重置按钮icon样式 */
.form-icon {
  margin-right: 5%;
  font-size: 15px;
}
/* input type="number"时，隐藏输入框的加减按钮 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
/* 作用/缺陷：给部分label补齐星号 原因：部分框rule不管用 */
.el-form-item > .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
/* 顶部表格间隔 */
.el-table {
  margin-top: 1%;
}
/* 表格选择框顶部间隔 */
.choose {
  margin-top: 2%;
}
/* 选择框宽度 */
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
/* 详情页字体大小 */
.dialog {
  font-size: 17px;
}
/* 详情内部组件间隔 */
.dialogrow,
.dialogbtn {
  margin-bottom: 20px;
}
/* 分页顶部间隔 */
.block {
  margin-top: 30px;
}
</style>
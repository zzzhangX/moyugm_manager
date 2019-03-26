<template>
  <div class="language">
    <!-- <el-select v-model="value" @change="changeLanguage()">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>-->
    <el-dropdown size="mini" @command="changeLanguage">
      <span class="el-dropdown-link">
        {{value}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in options"
          :key="item.value"
          :command="item.value"
        >{{item.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "language",
  data() {
    return {
      options: [
        {
          value: "en",
          label: "English"
        },
        {
          value: "zhCHS",
          label: "简体中文"
        },
        {
          value: "zhCHT",
          label: "繁體中文"
        }
      ],
      value: ""
    };
  },
  created() {
    this.chooseLang();
  },
  methods: {
    changeLanguage(command) {
      this.$i18n.locale = command;
      this.chooseLang();
    },
    chooseLang() {
      if (this.$i18n.locale === "en") {
        this.value = "English";
      } else if (this.$i18n.locale === "zhCHS") {
        this.value = "简体中文";
      } else if (this.$i18n.locale === "zhCHT") {
        this.value = "繁體中文";
      }
    }
  }
};
</script>

<style scoped>
.language {
  padding: 5px 20px;
  width: auto;
}
.el-dropdown-link {
  cursor: pointer;
  font-weight: bold;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

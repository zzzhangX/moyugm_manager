import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    // 在state中去声明全局变量，可以通过 this.$store.state 访问
    state: {
        serverId: '25001'
    },
    // 在getters中声明state中变量的计算函数，缓存计算后的数据， 通过 this.$store.getters 调用
    getters: {
        // 接受state作为参数，每次 count发生变化时 ， 都会被调用
        consoleCount: state => {
            console.log('the state count : ' + state.count);
        }
    },
    // 只能执行同步方法，不要去执行异步方法 通过 this.$store.commit 方法去调用
    mutations: {
        // mutations的第一个参数即为 state对象，并且可以向mutation传入额外的参数
        changeServe: (state,n) => {
            state.serverId=n;
        },
    },
    // 借助actions的手去 执行 mutations ， 通过  this.$store.dispatch 的方式调用
    // 可以用来执行异步操作，可以跟踪异步数据状态变化
    // actions: {
    //     addCount: context => {
    //         // 调用 mutation
    //         context.commit('addCount');
    //     },
    //     addNumCount: (context, n) => {
    //         context.commit('addNumCount', n);
    //     }
    // }
})
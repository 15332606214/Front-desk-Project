<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ active: currentIndex === index }" @mouseenter="showSubList(index)">
                <h3>
                  <a href="javascript:" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                      c1.categoryName
                  }}</a>
                  <!-- 使用编程式导航，每个分类项都绑定了监听，数量太多 -->
                  <!-- <a href="javascript:" @click="router.$push(`/search?categoryName=${c1.categoryName}&categoryId1=${c1.categoryId}`)">{{c1.categoryName}}</a> -->
                  <!-- 使用声明式导航<router-link>太多，导致显示慢 -->
                  <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&categoryId1=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a href="javascript:" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                            c2.categoryName
                        }}</a>
                        <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c2.categoryName}&categoryId2=${c2.categoryId}`)">{{c2.categoryName}}</a> -->
                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&categoryId2=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a href="javascript:" :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                          <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c3.categoryName}&categoryId3=${c3.categoryId}`)">{{c3.categoryName}}</a> -->
                          <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&categoryId3=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
/* 
1，dispatch()触发发请求的异步actions调用 => 数据从后台接口请求到vuex的state中
2，store.state / mapState()读取vuex的state数据 ==> 数据从state到组件的computed
3，在模板中动态显示
*/
import { mapState } from "vuex";
// import _ from "lodash"; //整体引入太大(4m)，按需引入
import throttle from "lodash/throttle"; //按需引入，减小打包文件

export default {
  name: 'TypeNav',
  data() {
    return {
      isShowFirst: false,//是否显示一级列表
      currentIndex: -2
    }
  },
  created() {
    const path = this.$route.path
    if (path === '/') {
      this.isShowFirst = true
    }
  },
  computed: {
    // categoryList() {
    //   return this.$store.state.home.categoryList
    // }
    ...mapState({
      categoryList: state => state.home.categoryList //函数接收的是总状态，返回值作为计算属性· 
    })
  },
  methods: {
    // 显示一级列表
    showFirst() {
      // 标识当前已经进入包含分类的div
      this.currentIndex = -1
      // 鼠标进入显示一级分类
      this.isShowFirst = true
    },
    // 隐藏一级列表
    hideFirst() {
      // 表示当前已经离开div
      this.currentIndex = -2
      // 如果当前不是首页隐藏一级列表
      if (this.$route.path !== '/') {
        this.isShowFirst = false
      }

    },


    // 显式指定下标的子分类
    showSubList: throttle(function (index) { //这个事件监听回调函数调用频率太高,下载引入lodash解决这个问题
      // 只有当没有离开整个分类的div时才更新下标
      if (this.currentIndex !== -2)
        this.currentIndex = index;
    }, 100,/* {
      trailing:false, //最后一次事件不延迟处理
    } */),

    // 跳转到搜索页
    toSearch(event) {
      const target = event.target
      // alert(target.tagName)
      console.dir(target)
      // 取出data自定义属性值
      const { categoryname, category1id, category2id, category3id } = target.dataset
      // if(target.tagName.toUpperCase()==='A'){
      if (categoryname) {
        // 准备query参数
        const query = {
          categoryname: categoryname
        }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }

        const location = {
          name: 'search',
          query,
          params: this.$route.params //需要携带上当前已有params参数
        }

        // 跳转到search
        // 从其他页跳转到搜索页:push()
        // 从搜索页跳转到搜索页:replace()
        if (this.$route.name === "search") {
          this.$router.replace(location)
        } else {
          this.$router.push(location)
        }

      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      // 指定过度样式
      &.slide-enter-active,
      &slide-leave-active {
        transition: all .5s
      }

      // 指定隐藏样式
      &.slide-enter,
      &slide-leave-to {
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background-color: #ccc;

            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
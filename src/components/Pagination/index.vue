<template>
    <div class="pagination">
        <button :disabled="(myCurrentPage===1)" :class="{disable:myCurrentPage===1}" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
        <button v-if="(startEnd.start>1)" @click="setCurrentPage(1)">1</button>
        <button class="disable">...</button>
        
        <!-- 多执行了从1到start-1的v-for遍历和v-if的判断 -->
            <!-- <button v-for="item in startEnd.end" :key="item" v-if="item>=startEnd.start"
            :class="{active:item===myCurrentPage}"
            @click="setCurrentPage(item)">{{item}}</button> -->
            <button v-for="item in startEndArr" :key="item"
            :class="{active:item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>
 
        <button class="disable" v-if="(startEnd.end<totalPages-1)">...</button>
        <button v-if="(startEnd.end<totalPages)" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
        <button :class="{disable:myCurrentPage===totalPages}" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
        <button class="disable">共 {{total}} 条</button>
    </div>
</template>
  
<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: { //当前页码
            type: Number,
            default: 1
        },
        total: {        //所有数据的总数量
            type: Number,
            default: 0
        },
        pageSize: {     //每页的最大数量
            type: Number,
            default: 10
        },
        showPageNo: {   //最大的连续页码数
            type: Number,
            default: 5,
            // 要求传入值为基数
            validator: function (value) {
                return value % 2 === 1
            }
        }
    },

    data() {
        return {
            myCurrentPage: this.currentPage //初始页码由父组件决定
        }
    },

    computed: {
        /* 
        总页数 
        */
        totalPages() {
            const { total, pageSize } = this
            return Math.ceil(total / pageSize)
        },

        /*
        包含从start到end的数组  
        */
        startEndArr () {
            const arr = []
            const {start,end} = this.startEnd
            for (let page = start; page <= end; page++) {
                arr.push(page);
            }
            return arr
        },

        /* 
        start/end:连续页码数的开始页码与结束页码{start:3,end:7} 
        */
        startEnd() {
            let start, end
            const { myCurrentPage, showPageNo, totalPages } = this
            // 计算start
            start = myCurrentPage - Math.floor(showPageNo / 2)
            if (start < 1) {
                start = 1
            }
            // 计算end
            end = start + showPageNo - 1
            if (end > totalPages) {
                end = totalPages
                // 修正start
                start = end - showPageNo + 1
                // 当总页数小于最大连续页码数 ==> start<1
                if (start < 1) {
                    start = 1
                }
            }
            return { start, end }
        },
    },

    watch:{
        /* 
        子组件监视父组件传入的数据变化 
        */
       currentPage (value) {
        this.myCurrentPage = value
       }
    },


    methods:{
        /* 
        设置新的当前页码 
        */
       setCurrentPage(page) {
            // 如果页码没有变化，直接结束
            if(page===this.myCurrentPage) return

            this.myCurrentPage = page

            // 分发自定义事件通知父组件
            this.$emit('currentChange',page)
       }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &.disable {
            color: #ccc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: blue;
            color: #fff;
        }
    }
}
</style>
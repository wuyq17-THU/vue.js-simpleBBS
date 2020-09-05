<template>
  <el-container>
    <el-header height=150px>
      <h1>欢迎来到清软论坛</h1>
      <el-button type="primary" @click="postNew">   发帖   </el-button>
      <el-button type="success"  @click="login">登录</el-button>
      <el-button type="danger" @click="logout">退出登录</el-button>
    </el-header>
  
    
    <el-main id="list">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @row-click="openDetail">    
        <el-table-column
          prop="nickname"
          label="发帖人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="300">
            <template slot-scope="scope">
                <p v-html='scope.row.title'></p>
            </template>
        </el-table-column>
    
        <el-table-column
          prop="created"
          label="发帖时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="lastRepliedNickname"
          label="最新回复"
          width="120">      
        </el-table-column>
        <el-table-column
          prop="lastRepliedTime"
          label="最新回复时间"
          width="200">      
        </el-table-column>
      </el-table>
    </el-main>


    <el-footer height="200px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        id="pagi">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  export default {

    data() {
      return {
        tableData: [],

      }
    },
    mounted() {
      this.axios.get('/api/v1/post',
      {
          headers:{'Authorization':localStorage.getItem('token')},
          params:{
            'page':1,
            'size':1000,
            'orderByReply':true
          }
      }).then((response) => {
            console.log(response.data);
            this.tableData=response.data.posts;            
      });
    },
    methods:{
      login:function(){
      this.$router.push({name:'login'});
    },

      

      openDetail(row){
        console.log(row.id);
        this.$router.push({name:'showDetail',query:{id:row.id}});
      },
      postNew: function () {
        this.$router.push({name:'postNew'});
      },
      logout: function () {
        this.axios.patch('/api/v1/logout',
        {},
        {
          headers:{'Authorization':localStorage.getItem('token')}
        }
        ).then((response) => {
          if(response.data.message === 'ok')
          {
            this.$message({
								type: 'success',
								message: '登出成功'
            });
            this.$router.push({name:'login'});
          }
        });
      }
    }
  }
</script>

<style>
#list{
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
#pagi{
  margin-top: 80px;
}
</style>
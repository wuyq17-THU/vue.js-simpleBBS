<template>
<div>
<el-container>
    
    <el-main id="main">        
        <h1>主题：{{title}}</h1>
        <p>发帖人：{{nickname}}
            <el-button type="success" plain size="medium" id="mainUser">只看楼主</el-button>
            <el-button type="primary" plain size="medium" id="editmain" icon="el-icon-edit" @click="editmain">编辑主帖</el-button>
        </p>
        <p>发帖时间：{{created}}</p>
        <p id='content' v-html='content'>内容：</p>
    </el-main>
</el-container>
<el-container>
    <el-main>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="changeReplyId"
      >
      <el-table-column
        prop="id"
        label="Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="created"
        label="时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column        
        prop="content"
        label="content">
            <template slot-scope="scope">
                <p v-html='scope.row.content'></p>
            </template>    
      </el-table-column>
      <el-table-column
        prop="replyId"
        label="replyID">        
      </el-table-column>
      <el-table-column
        prop="replyContent"
        label="replyContent">
            <template slot-scope="scope">
                <p v-html='scope.row.replyContent'></p>
            </template>        
      </el-table-column>
      <el-table-column>
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
            </template>    
      </el-table-column>
    </el-table>
    </el-main>
    <el-footer height="120px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        id="pagi">
      </el-pagination>
    </el-footer>
</el-container>
    <div id="input">
        <div ref="editor" style="text-align:left"></div>
        <el-button type="primary" v-on:click="replyMain" id="replyButton1">回复主帖</el-button>
        <el-button type="primary" v-on:click="replyReply" id="replyButton2">回复第{{replyById}}帖（点击以选择要回复的帖子）</el-button>
    </div>
</div>
</template>

<script>

import E from 'wangeditor'
    export default {

      data() {
        return {
          tableData: [],
          title:'',
          content:'',
          editorContent: '',
          replyById:' n '
        }
      },
      methods:{
            getContent: function () {
                alert(this.editorContent)
            },
            changeReplyId(row){
                console.log(row.id);
                this.replyById = row.id;
            },
            replyMain: function () {
                this.axios.post(`/api/v1/post/${this.$route.query.id}/reply`,
                {                  
                    'content':this.editorContent
                },
                {
                    headers:{'Authorization':localStorage.getItem('token')}
                }
                ).then((response) => {
                    if(response.data.message === 'ok'){
                        this.$message({
								type: 'success',
								message: '回复成功'
                        });
                        
                    }
                    this.$router.go(0);
                });
            },
            replyReply: function () {
                if(this.replyById !== ' n '){
                this.axios.post(`/api/v1/post/${this.$route.query.id}/reply`,
                {                  
                    'content':this.editorContent,
                    'replyId':this.replyById
                },
                {
                    headers:{'Authorization':localStorage.getItem('token')}
                }
                ).then((response) => {
                    if(response.data.message === 'ok'){
                        this.$message({
								type: 'success',
								message: '回复成功'
                        });
                        this.$router.go(0);
                    }
                    
                });}
                else{
                    this.$message({
						type: 'error',
						message: '回复失败，未选择要回复的楼层'
                    });
                    this.$router.go(0);
                }
            },
            edit(replyid){
                this.$router.push({name:'editreply',query:{id:this.$route.query.id,replyId:replyid}});
                
            },
            editmain(){
                this.$router.push({name:'editmain',query:{id:this.$route.query.id}});
            }
      },
      mounted() {

          let id = this.$route.query.id;
          console.log(`当前页面id为${id}`);
          console.log("当前页面id为"+id);
          this.axios.get(`/api/v1/post/${id}`,
          {
              headers:{'Authorization':localStorage.getItem('token')}
          }).then((response)=>{
              //console.log(response.data);
                this.tableData=response.data.reply;
                console.log(this.tableData);
                this.title=response.data.title;
                this.content=response.data.content;
                this.nickname=response.data.nickname;
                this.created=response.data.created;

          for(let i=0;i<this.tableData.length;i++){
              
              if(this.tableData[i].replyId !== 0)
              {
                  for(let j=0; j<this.tableData.length;j++){
                      if(this.tableData[j].id === this.tableData[i].replyId){
                          this.tableData[i].replyContent = "回复楼内容："+this.tableData[j].content;
                      }
                  }
              }else{
                  this.tableData[i].replyContent = "<p>回复主贴</p>";
              }
          }
          });
            var editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
            this.editorContent = html
            }
            editor.create()
      }
    
}
</script>

<style>
#header{
    text-align: left;
}
#main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    
}
#mainUser{
    position: relative;
    left: 20px;
}
#editmain{
    position: relative;
    left: 20px;
}
#content{
    text-align: left;
}
#input{
    width:800px;
    padding-top: 100px;
    margin: auto;
}
#replyButton1{
    margin-top: 20px;
    margin-bottom: 50px;
    position: absolute;
    right:560px;
}
#replyButton2{
    margin-top: 20px;
    margin-bottom: 50px;
    position: absolute;
    right:680px;
}
</style>
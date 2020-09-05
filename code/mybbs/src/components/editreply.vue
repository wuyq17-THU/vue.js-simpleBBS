<template>
<el-container>
    <el-header>
        <h1>修改回复</h1>
    </el-header>
   
    <div style="margin: 40px 0;text-align:left;"><p style="position:absolute;margin-top:15px;">内容：</p></div>
    <div>
        <div ref="editor" style="text-align:left"></div>
         <el-button type="primary" v-on:click="post" id="replyButton3">修改回复</el-button>
        
    </div>
</el-container>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
           
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        },
        post: function () {
            this.axios.put(`/api/v1/post/${this.$route.query.id}/reply/${this.$route.query.replyId}`,
                {                  
                    'content':this.editorContent,
                    
                },
                {
                    headers:{'Authorization':localStorage.getItem('token')}
                }
                ).then((response) => {
                    if(response.data.message === 'ok'){
                        this.$message({
								type: 'success',
								message: '修改成功'
                        });
                        this.$router.push({name:'showDetail',query:{id:this.$route.query.id}});
                    }else{
                        this.$message({
								type: 'error',
								message: '无法修改'
                        });
                        this.$router.push({name:'showDetail',query:{id:this.$route.query.id}});
                    }
                    
                });
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style>
#replyButton3{
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    
}
el-input{
    font-size: 32px;
}
</style>
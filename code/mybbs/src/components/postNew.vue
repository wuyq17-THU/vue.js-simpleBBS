<template>
<el-container>
    <el-header>
        <h1>发布新帖</h1>
    </el-header>
    <div style="margin: 40px 0;text-align:left;"><p style="position:absolute;margin-top:15px;">标题：</p></div>
    <el-input
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4}"
        placeholder="请输入标题"
        v-model="inputTitle">
    </el-input>
    <div style="margin: 40px 0;text-align:left;"><p style="position:absolute;margin-top:15px;">内容：</p></div>
    <div>
        <div ref="editor" style="text-align:left"></div>
         <el-button type="primary" v-on:click="post" id="replyButton3">发布新帖</el-button>
        
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
            inputTitle:''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        },
        post: function () {
            this.axios.post('/api/v1/post',
                {                  
                    'content':this.editorContent,
                    'title':this.inputTitle
                },
                {
                    headers:{'Authorization':localStorage.getItem('token')}
                }
                ).then((response) => {
                    if(response.data.message === 'ok'){
                        this.$message({
								type: 'success',
								message: '发表成功'
                        });
                        this.$router.push({name:'List'});
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
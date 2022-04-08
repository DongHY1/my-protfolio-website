<template>
  <div class="note">
    <div class="note-info">
      <ul v-for="(item, id) in state.notes" :key="id">
        <li>{{ item.content }}</li>
      </ul>
      <form @submit="handleContentSubmit">
        <input v-model="inputContent" type="text" placeholder="今日目标" />
        <button type="submit">保存</button>
      </form>
    </div>
    <!-- <div class="login-form">
      <form method="POST">
        <div class="form-item">
          <label for="username">用户名</label>
          <input type="text" name="username" id="username" placeholder="用户名"  required />
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <input type="password" name="password" id="password" placeholder="密码" required />
        </div>
        <div class="form-button">
          <input type="submit" value="登录">
        </div>
      </form>
    </div>-->
  </div>
</template>

<script setup>
import { ref, onMounted, reactive} from 'vue';
import axios from 'axios'
const inputContent = ref('')
const isSuccess = ref(false)
let state = reactive({
  notes: []
})
function handleContentSubmit() {
  const noteObject = {
    id: state.notes.length + 1,
    content: inputContent.value
  }
  axios
    .post('http://localhost:3001/api/notes', noteObject)
    .then(response => {
      state.notes = state.notes.concat(response.data)
      inputContent.value = ''
      isSuccess.value = true
    }).catch((err=>{
      isSuccess.value = false
    }))
}
onMounted(() => {
  axios.get('http://localhost:3001/api/notes').then((response) => {
    state.notes = response.data
    console.log(response.data)
  }).catch((err) => {
    console.log(err)
  })
})
</script>
<style scoped lang="scss">
.note {
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  .note-info {
    display: flex;
    background-color: aqua;
    width: 500px;
    height: 500px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  ul {
    height: 40px;
  }
  input {
    height: 40px;
  }
  button {
    height: 40px;
  }

  //   .login-form {
  //     width: 500px;
  //     height: 500px;
  //     background-color: aquamarine;
  //     display: flex;
  //     flex-direction: column;
  //     overflow: hidden;
  //     .form-item{
  //       height: 100px;
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       margin:20px 20px;

  //     }
  //     .form-button{
  //       height: 100px;
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //     }
  //   }
}
</style>
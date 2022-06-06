<template>
  <div id="login">
    <div class="bg"></div>
    <b-container>
      <b-card>
        <h4>เข้าสู่ระบบ</h4>
        <b-form>
          <b-form-group label="ชื่อผู้ใช้ :"
            ><b-form-input
              v-model="add.username"
              type="text"
              placeholder="ชื่อผู้ใช้"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="รหัสผ่าน :"
            ><b-form-input
              v-model="add.password"
              type="password"
              placeholder="รหัสผ่าน"
              required
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col>
              <div class="reg">
                <b-nav-item href="/register">สมัครสมาชิก</b-nav-item>
              </div>
            </b-col>
            <b-col>
              <b-button variant="primary" @click="postData()">เข้าสู่ระบบ</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'login',
  data() {
    return {
      login: [],
      users:[],
      add: {
        username: '',
        password: '',
      },
      apiURL: 'http://localhost:3000/login',
      apiURL2: 'http://localhost:3000/user'
    }
  },
async mounted(){
  const result = await axios.get(this.apiURL2)
  this.users = result.data
},
  methods: {
    async postData() {
      await axios.post(this.apiURL, this.add).then((res)=>{
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem('accessToken',res.data.data.accessToken)
          localStorage.setItem('id',res.data.data.id)
          localStorage.setItem('username',res.data.data.username)    
          localStorage.setItem('status','true')
          this.$router.push('/homes')   
        }
            
      }).catch((err)=>{
        console.log(err.response);
        if (err.response.status == 404) {
          alert('ชื่อผู้ใช้ หรือ รหัสผ่าน ผิดพลาด\nกรุณากรอกข้อมูลอีกครั้ง')
        }
      })
    },
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#login{
   font-family: 'Kanit', sans-serif;
}
.bg {
  background-image: url(.././img/T.png);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  filter: blur(1px);
}
h4 {
  text-align: center;
}
.card {
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 3%;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
button {
  float: right;
}
li a.nav-link {
  color: rgb(255, 255, 255);
}
li a.nav-link:hover {
  text-decoration: underline;
}
.reg {
  list-style: none;
  margin-top: 5px;
}
.nav-link {
  padding: 0;
}
.btn-primary {
  color: rgb(0, 0, 0);
  background: #b7dbc3;
  border-color: #b7dbc3;
}

.btn-primary:not(:disabled):not(.disabled):active {
  color: #fff;
  border-color: #38443c;
  background-color: #38443c;
}

.btn-primary:hover {
  color: #fff;
  border-color: #38443c;
  background-color: #38443c;
}
</style>

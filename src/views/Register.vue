<template>
  <div id="register">
    <div class="bg"></div>
    <b-container>
      <b-card>
        <h4>สมัครสมาชิก</h4>
        <b-form>
          <b-form-group label="ชื่อ :"
            ><b-form-input
              v-model="add.name"
              type="text"
              placeholder="ชื่อ"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="นามสกุล :"
            ><b-form-input
              v-model="add.sname"
              type="text"
              placeholder="นามสกุล"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="เบอร์ติดต่อ :"
            ><b-form-input
              v-model="add.phone"
              type="text"
              placeholder="เบอร์ติดต่อ"
              required
            ></b-form-input>
          </b-form-group>
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
          <b-form-group label="ยืนยันรหัสผ่าน :"
            ><b-form-input
              v-model="cf_password"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              required
            ></b-form-input>
          </b-form-group>
          <b-button variant="primary" @click="confirmPassword"
            >สมัครสมาชิก</b-button
          >
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data() {
    return {
      cf_password: '',
      apiURL: 'http://localhost:3000/user/',
      add: {
        name: '',
        sname: '',
        phone: '',
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async postData() {
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      location.replace('http://localhost:8080/login')
    },
    confirmPassword() {
      if (this.cf_password == this.add.password) {
        this.postData()
      } else {
        alert('Error')
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#register{
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

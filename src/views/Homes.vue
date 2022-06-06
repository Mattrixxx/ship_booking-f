<template>
  <div class="container-fluid m-0 p-0">
    <div id="home-page" class="full-height p-4">
      <div class="topleft">
        <b-img :src="require('../img/4.png')" width="200px"></b-img>
      </div>
      <div class="middle">
        <h1>ท่องเที่ยวเชี่ยวหลานไทย</h1>
        <hr />
        <p>Promtong Yai</p>
      </div>
      <div class="topright">
        <b-row>
          <b-nav-item href="/wraft">ข้อมูลแพ </b-nav-item>
          <b-nav-item href="/wpackage1">แพ็คเกจ </b-nav-item>
          <b-nav-item href="/wbooking">จองแพ็คเกจ </b-nav-item>
          <b-nav-item href="/wreview">รีวิว </b-nav-item>
          <div v-if="this.status != null">
            <b-dropdown right variant="link" no-caret>
              <template #button-content>
                <div id="login">
                  <b-nav-item>{{ username }} </b-nav-item>
                </div>
              </template>
              <b-dropdown-item @click="logout()" href="/login"
                >ออกจากระบบ</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div v-else><b-nav-item href="/login">เข้าสู่ระบบ </b-nav-item></div>
        </b-row>
      </div>
    </div>
    <div id="package" class="package p-4">
      <h1 id="headpackage">แพ็คเกจแนะนำ</h1>
      <div class="row">
        <div class="column">
          <div class="card">
            <img src="../img/RP001.png" alt="RP" style="width: 100%" />
            <div class="container">
              <h2 id="headpk">แพ็คเกจ ไป - กลับ</h2>
              <p class="title">ราคา 450 บาท / ท่าน</p>
              <p>
                แพ็คเกจ ไป - กลับ RP001 ราคา 450/ท่าน ล่องเรือชมเขาสามเกลอ
                ชมกุ้ยหลินเมืองไทย ชมปลาวังแพนางไพร ล่องเรือชมวิว
                ชมธรรมชาติที่สวยงาม
              </p>
              <p><button class="button" @click="tobk()">จองแพ็คเกจ</button></p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src="../img/TO001.png" alt="TO" style="width: 100%" />
            <div class="container">
              <h2 id="headpk">แพ็คเกจ 2 วัน 1 คืน</h2>
              <p class="title">ราคา 1,250 บาท / ท่าน</p>
              <p>
                แพ็คเกจ 2 วัน 1 คืน TO001 ราคา 1,250/ท่าน ล่องเรือชมเขาสามเกลอ
                ชมกุ้ยหลินเมืองไทย ชมปลาวังแพนางไพร นอนพักที่แพนางไพร 1 คืน
                รับประทานอาหาร 2 มื้อ
              </p>
              <p><button class="button" @click="tobk()">จองแพ็คเกจ</button></p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src="../img/TR001.png" alt="TR" style="width: 100%" />
            <div class="container">
              <h2 id="headpk">แพ็คเกจ 3 วัน 2 คืน</h2>
              <p class="title">ราคา 1,990 บาท / ท่าน</p>
              <p>
                แพ็คเกจ 3 วัน 2 คืน TR001 ราคา 1,990/ท่าน ล่องเรือชมเขาสามเกลอ
                ชมกุ้ยหลินเมืองไทย ชมวิวที่จุดชมวิวไกรสร ชมสัตว์ที่ต้นน้ำคลองแสง
                นอนพักที่แพภูผาวารี 2 คืน รับประทานอาหาร 2 มื้อ
              </p>

              <p><button class="button" @click="tobk()">จองแพ็คเกจ</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" class="footer p-4">
      <b-row id="contact">
        <p>เบอร์ติดต่อ : 0612200701</p>
        <p>Facebook : เชี่ยวหลานพรมทองใหญ่ทัวร์</p>
        <p>Email : promtongyai@gmail.com</p>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: '',
      username: '',
    }
  },
  async mounted() {
    this.status = localStorage.getItem('status')
    this.username = localStorage.getItem('username')
  },
  methods:{
    tobk(){
      location.replace('http://localhost:8080/wbooking')
    },
    logout() {
      localStorage.clear()
      this.$router.go()
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.full-height {
  min-height: 80vh;
}
#home-page {
  background-image: url('.././img/T.png');
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-size: 25px;
}
.topleft {
  position: absolute;
  top: 0;
  left: 16px;
  margin-left: 50px;
  margin-top: 30px;
}
.topright {
  position: absolute;
  top: 0;
  right: 16px;
  list-style: none;
  margin-right: 50px;
  margin-top: 30px;
}
.topright li a:hover {
  text-decoration: underline;
}
.topright li a {
  color: #ffff;
  padding: 10px;
  margin-right: 20px;
  font-size: 20px;
  font-family: 'Kanit', sans-serif;
  text-decoration: none;
}
.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'Kanit', sans-serif;
  border: 5px solid #ffff;
  border-radius: 3px;
  padding: 50px;
}
hr {
  margin: auto;
  width: 40%;
}

.package {
  min-height: 100vh;
  font-family: 'Kanit', sans-serif;
  background: rgb(255, 255, 255);
  margin-left: 50px;
  margin-right: 50px;
}
.package h1 {
  font-size: 36px;
}
.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}
.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}
.button:hover {
  background-color: #555;
}
#headpackage {
  margin-top: 20px;
  margin-bottom: 20px;
}
#headpk {
  font-size: 24px;
  margin-top: 20px;
}
.footer {
  background-color: #000;
  min-height: 10vh;
}
.footer #contact {
  color: #ffff;
  float: right;
}
.footer #contact p {
  margin-right: 20px;
  margin-left: 30px;
}
#login{
  margin-top: -7px;
}
</style>

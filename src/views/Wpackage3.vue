<template>
  <div id="wpk3">
    <webtab />
    <b-container>
      <div id="head">
        <router-link to="/wpackage1">ไป - กลับ </router-link>
        <a> | </a>
        <router-link to="/wpackage2"> 2 วัน 1 คืน </router-link>
        <a> | </a>
        <router-link to="/wpackage3"> 3 วัน 2 คืน</router-link>
      </div>
      <div v-for="wpackage in wpackage3" :key="wpackage.id" class="wpackage3">
        
          <div class="column" v-if="wpackage.name[1] == 'R'">
            <div class="card">
              <img :src="wpackage.img" alt="TR" style="width: 100%" />
              <div class="container">
                <h2 id="headpk">{{ wpackage.name }}</h2>
                <p class="title">ราคา {{ wpackage.price }} บาท / ท่าน</p>
                <p>
                  {{ wpackage.des }}
                </p>
                <p><button class="button" @click="booking">จองแพ็คเกจ</button></p>
              </div>
            </div>
          </div>
        
      </div>
    </b-container>
  </div>
</template>

<script>
import webtab from '../components/web.vue'
import axios from 'axios'
export default {
  components: { webtab },
  name: 'Wpackage3',
  data() {
    return {
      apiURL: 'http://localhost:3000/package/',
      wpackage3: [],
    }
  },
  //  fun show
  async mounted() {
    const result = await axios.get(this.apiURL)
    this.wpackage3 = result.data
  },
  methods:{
    booking(){
      location.replace('http://localhost:8080/wbooking')
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#wpk3 {
  font-family: 'Kanit', sans-serif;
}
#head a {
  color: rgb(51, 83, 80);
  font-size: 0.7cm;
}
#head a:hover {
  color: #7e9686;
  text-decoration: none;
}

#head {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
}
.wpackage2 {
  margin-bottom: 40px;
  margin-top: 40px;
}
.wpackage {
  padding: 150px 0;
}
h2 {
  text-align: center;
  margin-top: 1%;
}
h3,
p {
  color: #000;
  text-align: center;
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
.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}
</style>


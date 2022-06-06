<template>
  <div id="wbooking">
    <webtab />
    <h2>การจอง</h2>
    <div class="container">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
          style="margin-left: 50px"
        > 
          <b-form-group
            label="แพ็จเกจที่จอง :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            
            <b-form-select 
            v-model="add1"
            @change ="yaydata(add1)"
            :options="options"></b-form-select>
          </b-form-group>

          <b-form-group
            label="ราคาต่อท่าน :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input disabled v-model="perprice" >
        
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="จำนวนที่นั่งที่จอง :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-spinbutton
              id="sb-inline"
              min="1"
              :max="add1.value"
              v-model="add.value"
              @change="price_total()"
              inline
              placeholder="-"
            ></b-form-spinbutton>
          </b-form-group>

          <b-form-group
            label="วันที่ออกเรือ :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-datepicker
              id="example-datepicker"
              class="mb-2"
              v-model="date"
              @change ="datetime()"
            ></b-form-datepicker>

            <b-form-select
            :options = "options1"
            v-model="time"
            @change ="datetime()"
            >

            </b-form-select>
          </b-form-group>

          <b-form-group 
            label="วันที่กลับ :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-datepicker
              id="example-datepicker"
              class="mb-2"
              readonly
              locale="th"
              v-model="add.travelback_date"
            ></b-form-datepicker>
           <h6>ยอดราคารวม {{pricetotal}} บาท</h6></b-form-group>
        </b-form-group>
      </b-card>
      <b-button id="btn-slip" @click="postData"
        >จองแพ็คเกจ</b-button
      >
    </div>
  </div>
</template>

<script>
import webtab from '../components/web.vue'
import axios from 'axios'
export default {
  components: { webtab },
  name: 'Wbooking',

  data() {
    return {
      username:'ชื่อผู้ใช้',
      packages:[],
      date:'',
      date2:'',
      url:null,
      time:'',
      add: {
        package_id: null,
        user_id : null,
        value:1,
        price:0,
        travelback_date:'',
        travel_date:'',
        payment: 'https://media.discordapp.net/attachments/761274701094977546/954747759695646801/IMG_7663.jpg?width=663&height=663',
      },
      add1: {
        value:'',
        price:'',
        id:''
      },
      apiURL: 'http://localhost:3000/booking/',
      apiURL2 : 'http://localhost:3000/package',
      bookings:[],
      options:[],
      options1:[{value:'07:00:00',text:'07:00'},{value:'10:00:00',text:'10:00'}],
      pricetotal:0,
      perprice: 0,
    }
  },

  async mounted() {
    this.username = localStorage.getItem('username')
    const result1 = await axios.get(this.apiURL)
    this.bookings = result1.data
    const result2 = await axios.get(this.apiURL2)
    this.packages = result2.data
    this.option()
    console.log(localStorage.id);
  },
  methods: {
    async postData(){
      this.add.user_id = localStorage.id
      this.add.price = this.pricetotal
      let newdate  = new Date(this.date + ' ' + this.time)
      this.add.travel_date = newdate
      console.log(this.add); 
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.packages = result1.data
      location.replace('http://localhost:8080/wuser')
    },
    showmodal() {
      this.$refs['modalupload'].show()
    },
    async option(){
      for (const value of this.packages){
        this.options.push({value: value,text:value.name})
      }
    },
    yaydata(data) {
      console.log(data);
      this.perprice = data.price;
      this.add.package_id = data.id;
      this.add.price = this.perprice * this.add.value
      this.price_total()
    },
    price_total() {
      this.pricetotal = this.add.price * this.add.value
    },
    datetime(){
      let TO = 0
      if (this.add1.name[1] == 'O') {
        TO = 2 
      }
      if (this.add1.name[1] == 'R') {
        TO = 3
      }
      let newdate  = new Date(this.date)
      newdate.setDate(newdate.getDate()+TO)
      this.add.travelback_date = newdate
    },
    handleFileUpload() {
      this.url =  URL.createObjectURL(event.target.files[0])
    },
    
  },
}
</script>
   
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#wbooking{
   font-family: 'Kanit', sans-serif;
}
.container {
  margin: 0 auto;
}
.card {
  margin: 0 auto;
  float: none;
  margin-top: 50px;
}
h2 {
  text-align: center;
  margin-top: 40px;
}

#btn-slip {
  float: right;
  margin-top: 20px;
}
h6 {
  text-align: right;
  margin-top: 60px;
}
#btn-upload {
  margin-top: 20px;
  float: right;
}
</style>

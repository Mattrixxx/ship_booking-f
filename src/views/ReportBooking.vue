<template>
  <div>
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ออกรายงาน</h1>
      <b-card-group columns>
        <b-card id="tt">
          <b-card-title><i class="fas fa-book fa-3x"></i></b-card-title>
          <b-card-text id="cont"> ยอดการจองทั้งหมด </b-card-text>
          <b-card-text id="result">
            {{ tt_booking }} ครั้ง ยอด 
            {{ pricetotal }} บาท
          </b-card-text>
        </b-card>
        <b-card id="np">
          <b-card-title><i class="fas fa-book fa-3x"></i></b-card-title>
          <b-card-text id="cont"> ยอดที่ยังไม่ทำการชำระเงิน </b-card-text>
          <b-card-text id="result">
            {{ np_booking }}
          </b-card-text>
        </b-card>
        <b-card id="ss">
          <b-card-title><i class="fas fa-book fa-3x"></i></b-card-title>
          <b-card-text id="cont"> ยอดที่ชำระเงินแล้ว </b-card-text>
          <b-card-text id="result">
            {{ ss_booking }} ครั้ง ยอด
            {{ pricess }} บาท
          </b-card-text>
        </b-card>

        <b-card id="wt">
          <b-card-title><i class="fas fa-book fa-3x"></i></b-card-title>
          <b-card-text id="cont"> ยอดที่รอการพิจารณา </b-card-text>
          <b-card-text id="result">
            {{ wt_booking }}
          </b-card-text>
        </b-card>
        <b-card id="cc">
          <b-card-title><i class="fas fa-book fa-3x"></i></b-card-title>
          <b-card-text id="cont"> ยอดที่ยกเลิกการจอง </b-card-text>
          <b-card-text id="result">
            <b-row>
              {{ cc_booking }} ครั้ง ยอด {{ pricecc }} บาท
            </b-row>
          </b-card-text>
        </b-card>
        <b-card id="bk">
          <b-card-title><i class="fas fa-book fa-3x"></i></b-card-title>
          <b-card-text id="cont"> ยอดที่ลูกค้าขอยกเลิก </b-card-text>
          <b-card-text id="result">
            {{ bk_booking }}
          </b-card-text>
        </b-card>
      </b-card-group>
      <b-card-group columns>
        <b-card id="dv">
          <b-card-title><i class="fas fa-book fa-3x"></i></b-card-title>
          <b-card-text id="cont"> ยอดที่คนขับทำรายได้ให้แก่บริษัท </b-card-text>
          <b-card-text id="total">
            <div>สมบัติ ดีใจ {{ icSm }} บาท</div>
            <div>สมชาย มีขัน {{ icMh }} บาท</div>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tabuser from '../components/TabUser.vue'
export default {
  components: { tabuser },
  name: 'Booking',
  props: ['items'],
  data() {
    return {
      ss_booking: 0,
      np_booking: 0,
      wt_booking: 0,
      bk_booking: 0,
      cc_booking: 0,
      tt_booking: 0,
      pricetotal: 0,
      pricess: 0,
      pricecc: 0,
      icSm: 0,
      icMh: 0,
      bookings: [],
      packages: [],
      confirm: [],
      apiURL: 'http://localhost:3000/booking/',
      apiURL2: 'http://localhost:3000/package/',
      apiURL3: 'http://localhost:3000/confirm/',
    }
  },
  computed: {},
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.bookings = result1.data
    const result2 = await axios.get(this.apiURL2)
    this.packages = result2.data
    const result3 = await axios.get(this.apiURL3)
    this.confirm = result3.data
    this.check()
    this.checkdv()
  },
  methods: {
    check() {
      this.tt_booking = this.bookings.length
      for (let i = 0; i < this.bookings.length; i++) {
        if (this.bookings[i].status == 'ยังไม่ทำการชำระเงิน') {
          this.np_booking = this.np_booking + 1
          this.pricetotal = this.bookings[i].price + this.pricetotal
        } else if (this.bookings[i].status == 'รอการพิจารณา') {
          this.wt_booking = this.wt_booking + 1
          this.pricetotal = this.bookings[i].price + this.pricetotal
        } else if (this.bookings[i].status == 'ชำระเงินแล้ว') {
          this.ss_booking = this.ss_booking + 1
          this.pricetotal = this.bookings[i].price + this.pricetotal
          this.pricess = this.bookings[i].price + this.pricess
        } else if (this.bookings[i].status == 'ลูกค้าขอยกเลิก') {
          this.bk_booking = this.bk_booking + 1
          this.pricetotal = this.bookings[i].price + this.pricetotal
        } else if (this.bookings[i].status == 'ยกเลิกการจอง') {
          this.cc_booking = this.cc_booking + 1
          this.pricetotal = this.bookings[i].price + this.pricetotal
          this.pricecc = this.bookings[i].price + this.pricecc
        }
      }
    },
    checkdv() {
      console.log(this.confirm[0].sailing.name)
      for (let i = 0; i < this.confirm.length; i++) {
        if (
          this.confirm[i].sailing.name[0] == 'S' &&
          this.confirm[i].sailing.name[1] == 'M' &&
          this.confirm[i].status == 'ออกเรือสำเร็จ'
        ) {
          this.icSm = this.icSm + this.confirm[i].booking.price
        } else if (
          this.confirm[i].sailing.name[0] == 'M' &&
          this.confirm[i].sailing.name[1] == 'H' &&
          this.confirm[i].status == 'ออกเรือสำเร็จ'
        ) {
          this.icMh = this.icMh + this.confirm[i].booking.price
        }
      }
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#Table {
  font-family: 'Kanit', sans-serif;
}
.fa-book {
  margin-top: 20px;
  color: white;
}
#cont {
  font-size: 24px;
}
#result {
  font-size: 32px;
}
h1 {
  color: rgb(84, 105, 124);
  margin-bottom: 30px;
}
#np {
  background-color: #f47721;
  color: #ffff;
}
#cc {
  background-color: #0cb9c1;
  color: #ffff;
}
#ss {
  background-color: #00c16e;
  color: #ffff;
}
#bk {
  background-color: #7552cc;
  color: #ffff;
}
#wt {
  background-color: #ffc845;
  color: #ffff;
}
#tt {
  background-color: #037ef3;
  color: #ffff;
}
#dv {
  background-color: #8db9ca;
  color: #ffff;
  margin-left: 479px;
}
#total{
  font-size: 20px;
  text-align: right;
}
#price {
  float: right;
}
</style>

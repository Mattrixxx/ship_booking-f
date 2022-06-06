<template>
  <div id="booking">
    <div></div>
    <div id="Table">
      <h1>ยอดการทำรายได้ของคนขับเรือ</h1>
      <div id="Add">
        <b-form-group>
          <b-form-select
            class="w-25 p-1 mb-1"
            id="filter"
            size="sm"
            v-model="filter"
            :options="options1"
            >ค้นหา...</b-form-select
          >
        </b-form-group>
      </div>
      <div id="Table2">
        <b-table
          responsive="xl"
          striped
          bordered
          outlined
          hover
          :items="bookings"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template #cell(payment)="row">
            <img :src="row.value" width="200" />
          </template>
          <template #cell(id)="row">
            {{ row.value }}
          </template>
        </b-table>
      </div>
      <b-row>
        <b-col>
          <!-- กำหนดจำนวนการแสดง -->
          <b-pagination
            v-model="currentPage"
            :total-rows="row"
            :per-page="perPage"
            align="right"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Booking',
  props: ['items'],
  data() {
    return {
      bookings: [],
      packages: [],
      apiURL: 'http://localhost:3000/booking/',
      apiURL2: 'http://localhost:3000/package/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: 'id',
          label: 'ลำดับ',
          sortable: true,
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'user.username',
          label: 'ชื่อผู้ใช้งาน',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'user.phone',
          label: 'เบอร์ติดต่อ',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'package.name',
          label: 'ชื่อแพ็คเกจ',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'value',
          label: 'จำนวนที่นั่ง',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'price',
          label: 'ราคา',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'travel_date',
          label: 'วันออกเรือ',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'travelback_date',
          label: 'วันที่เดินทางกลับ',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'status',
          label: 'สถานะการชำระเงิน',
          class: 'text-center',
          tdClass: 'center',
        },
      ],
      select: '',
      options: [],
      options1: [
        { value: '', text: 'ค้นหา...', disabled: true },
        { value: 'ยังไม่ทำการชำระเงิน', text: 'ยังไม่ทำการชำระเงิน' },
        { value: 'รอการพิจารณา', text: 'รอการพิจารณา' },
        { value: 'ชำระเงินแล้ว', text: 'ชำระเงินแล้ว' },
        { value: 'ลูกค้าขอยกเลิก', text: 'ลูกค้าขอยกเลิก' },
        { value: 'ยกเลิกการจอง', text: 'ยกเลิกการจอง' },
      ],
      getdate:{
        startOfDay:'',
        endOfDay:'',
      }
      
    }
  },
  computed: {
    row() {
      return this.bookings.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.bookings = result1.data
    const result2 = await axios.get(this.apiURL2)
    this.packages = result2.data
    this.option()

  },
  methods: {
    async option() {
      for (const value of this.packages) {
        this.options.push({ value: value, text: value.name })
      }
    },
    async search(){
      console.log(this.getdate);
      const bk = await axios.get(this.apiURL,this.getdate)
      this.bookings = bk.data
      console.log(bk.data);
    }
  },
}
</script>
<style>
#Table {
  margin-top: 30px;
  margin-right: 50px;
  margin-left: 50px;
}
#Table2 {
  margin-top: 30px;
  text-align: center;
}
#Table h1 {
  text-align: center;
  color: rgb(84, 105, 124);
}
.center {
  vertical-align: middle !important;
}
#filter {
  margin-right: 10px;
}
h6 {
  float: right;
}
</style>

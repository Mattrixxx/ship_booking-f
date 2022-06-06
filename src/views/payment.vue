<template>
  <div id="payment" ref="content">
    <div>
      <tabuser />
    </div>
    <div id="Table" >
      <h1>Payment</h1>
       <div id="Add">
        <!-- buttonAdd -->
        <b-button variant="success" size="sm" @click="showModal_add"
          ><b-icon icon="plus-square-fill"></b-icon
        ></b-button>
      </div>
      <div id="Table2">
        <b-table
          striped
          hover
          :items="payments"
          :filter="filter"
          :fields="fields"
        >
        </b-table>
        <b-modal ref="modal-add" hide-footer title="เพิ่มข้อมูลแพ">
              <div class="d-block text-center"></div>
              <b-form-group label="BookingID :"
                ><b-form-input
                  v-model="add.booking_id"
                  type="text"
                  placeholder="ชื่อแพ"
                ></b-form-input
              ></b-form-group>
              <b-form-group label="หลักฐานการชำระเงิน :">
                <b-form-file
                  ref="file"
                  v-model="add.img"
                  placeholder="อัพโหลดรูปภาพแพ..."
                  @change="handleFileUpload"
                ></b-form-file
              ></b-form-group>
              <b-form-group label="status :">
                <b-form-input
                  type="text"
                  v-model="add.status"
                  placeholder="คำอธิบายแพ"
                >
                </b-form-input>
              </b-form-group>
              <div id="btn_add">
                <b-button
                  id="bta_add"
                  variant="success"
                  size="sm"
                  @click="postData()"
                  >เพิ่มข้อมูล</b-button
                ><b-button variant="danger" size="sm" @click="hideModal_add()"
                  >ยกเลิก</b-button
                >
              </div>
            </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tabuser from '../components/TabUser.vue'

export default {
  components: { tabuser },
  name: 'Payment',
  props: ['items'],
  data() {
    return {
      bookings: [],
      packages: [],
      users:[],
      payments:[],
      apiURL1: 'http://localhost:3000/booking/',
      apiURL2: 'http://localhost:3000/package/',
      apiURL3: 'http://localhost:3000/user/',
      apiURL4: 'http://localhost:3000/payment/',
      filter: '',
      add:{
        booking_id:'',
        img: null,
        status:'',
      },
      fields: [
        {
          key: 'id',
          label: 'ลำดับ',
          sortable: true,
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'booking.user.username',
          label: 'ชื่อผู้ใช้งาน',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'booking.id',
          label: 'รหัสการจอง',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'booking.price',
          label: 'จำนวนเงิน',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: '',
          label: 'หลักฐานการชำระเงิน',
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
    }
  },
  computed: {
    row() {
      return this.payments.length
    },
   
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL1)
    this.bookings = result1.data
    const result2 = await axios.get(this.apiURL2)
    this.packages = result2.data
    const result3 = await axios.get(this.apiURL3)
    this.users = result3.data
    const result4 = await axios.get(this.apiURL4)
    this.payments = result4.data
    console.log(this.bookings);
  },
  methods: {
    async postData() {
      this.hideModal_add()
      let formData = new FormData()
      formData.append('file', this.add.img)
      formData.append('booking_id', this.add.booking_id)
      formData.append('status', this.add.status)
      const result = await axios.post(this.apiURL4, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(result)
      const result1 = await axios.get(this.apiURL4)
      this.payments = result1.data
    },
    //  fun delete
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    showModal_add() {
      this.$refs['modal-add'].show()
    },
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
    handleFileUpload() {
      this.add.img = this.$refs.file.files[0]
    },
  },
}
</script>
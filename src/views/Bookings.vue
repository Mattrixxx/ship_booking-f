<template>
  <div id="booking">
    <div>
      <tabuser />
    </div>
    <b-toast id="my-toast" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">ทำการจองไม่สำเร็จ !</strong>
        </div>
      </template>
        กรุณากรอกข้อมูลให้ถูกต้อง
    </b-toast>
    <div id="Table">
      <h1>ข้อมูลการจอง</h1>
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
          <b-button variant="success" size="sm" @click="showModal_add"
            ><b-icon icon="plus-square-fill"></b-icon
          ></b-button>
        </b-form-group>
        <!-- buttonAdd -->
      </div>

      <div id="Table2">
        <b-table
          bordered
          outlined
          striped
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
          <template v-slot:cell(actions)="data">
            <!-- buttonDelete -->
            <b-button
              variant="warning"
              size="sm"
              @click="showModal_edit(data.item)"
              ><b-icon icon="pencil-square"></b-icon
            ></b-button>
            <b-button
              variant="danger"
              size="sm"
              @click="showModal_del(data.item)"
              ><b-icon icon="trash-fill"></b-icon
            ></b-button>
            <b-modal
              ref="modal-del"
              hide-footer
              title="คุณต้องการลบข้อมูลต่อไปนี้หรือไม่"
            >
              <p>ลำดับ : {{delItem.id}}</p>
              <div id="btn_delete">
                <b-button
                  id="btd_delete"
                  variant="danger"
                  size="sm"
                  @click="delConfirm()"
                  >ลบข้อมูล</b-button
                >
                <b-button variant="success" size="sm" @click="hideModal_del()"
                  >ยกเลิก</b-button
                >
              </div>
            </b-modal>
            <!-- textAdd -->
            <b-modal ref="modal-add" hide-footer title="เพิ่มข้อมูลการจอง">
              <div class="d-block text-center"></div>
              <b-form-group label="แพ็คเกจที่จอง :"
                ><b-form-select
                  v-model="add1"
                  @change="yaydata(add1)"
                  :options="options"
                ></b-form-select
              ></b-form-group>

              <b-form-group label="ราคาต่อท่าน :">
                <b-form-input disabled v-model="perprice"></b-form-input
              ></b-form-group>

              <b-form-group label="จำนวนที่นั่งที่จอง :">
                <b-form-spinbutton
                  id="sb-default"
                  min="1"
                  :max="add1.value"
                  v-model="add.value"
                  placeholder="-"
                  @change="price_total()"
                ></b-form-spinbutton>
              </b-form-group>

              <b-form-group label="วันที่ออกเรือ :">
                <b-form-datepicker
                  id="example-datepicker"
                  class="mb-2"
                  v-model="date"
                  locale="th"
                  @change="datetime()"
                ></b-form-datepicker>

                <b-form-select
                  :options="options2"
                  v-model="time"
                  @change="datetime()"
                >
                </b-form-select>
              </b-form-group>
              <b-form-group label="วันที่กลับ :">
                <b-form-datepicker
                  id="example-datepicker"
                  class="mb-2"
                  readonly
                  locale="th"
                  v-model="add.travelback_date"
                ></b-form-datepicker>
              </b-form-group>
              <b-form-group>
                <div id="total">
                  <h6>ยอดราคารวม {{ add.price }} บาท</h6>
                </div>
              </b-form-group>
              <!-- btnAdd -->
              <div id="btn_add">
                <b-button
                  variant="success"
                  size="sm"
                  @click="postData()"
                  id="bta_add"
                  >จองแพ็คเกจ</b-button
                ><b-button variant="danger" size="sm" @click="hideModal_add()"
                  >ยกเลิก</b-button
                >
              </div>
            </b-modal>
            <b-modal ref="modal-edit" hide-footer title="แก้ไขข้อมูลการจอง">
              <b-form-group label="สถานะการชำระเงิน :"
                ><b-form-select
                  v-model="editItem.status"
                  :options="options1"
                ></b-form-select
              ></b-form-group>
              <b-form-group label="หลักฐานการชำระเงิน :">
                <b-form-file
                  v-model="editItem.paymant"
                  :placeholder="
                    editItem.payment == null
                      ? 'อัพโหลดรูปภาพเรือ...'
                      : editItem.payment
                  "
                ></b-form-file
              ></b-form-group>
              <div id="btn_add">
                <b-button
                  id="bta_add"
                  variant="success"
                  size="sm"
                  @click="editData()"
                  >แก้ไข</b-button
                ><b-button variant="danger" size="sm" @click="hideModal_edit()"
                  >ยกเลิก</b-button
                >
              </div>
            </b-modal>
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
import tabuser from '../components/TabUser.vue'
export default {
  components: { tabuser },
  name: 'Booking',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      bookings: [],
      packages: [],
      add: {
        package_id: null,
        user_id: null,
        value: 1,
        price: 0,
        travelback_date: '',
        travel_date: '',
        payment:
          'https://media.discordapp.net/attachments/761274701094977546/954747759695646801/IMG_7663.jpg?width=663&height=663',
      },
      add1: {
        value: '',
        price: '',
        id: '',
      },
      editItem: {
        status: '',
        payment: null,
        id: '',
      },
      delItem:{
        id:'',
        username:'',
        name:'',
        phone:'',
        value:'',
        price: '',
        travel_date:'',
        travelback_date:'',
      },
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
          key: 'payment',
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
        {
          key: 'actions',
          label: 'การดำเนินการ',
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
      options2: [
        { value: '07:00:00', text: '07:00' },
        { value: '10:00:00', text: '10:00' },
      ],
      perprice: 0,
      date: '',
      date2: '',
      url: null,
      time: '',
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
    //  fun add
    async postData() {
      this.add.user_id = localStorage.id
      let newdate = new Date(this.date + ' ' + this.time)
      this.add.travel_date = newdate
      await axios
        .post(this.apiURL, this.add)
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            const result1 = axios.get(this.apiURL)
            this.packages = result1.data
            this.$router.go()
          }
        })
        .catch((err) => {
          console.log(err.response)
          if (err.response.status == 400) {
            this.$bvToast.show('my-toast')
            this.hideModal_add()
          }
        })
    },
    async editData() {
      console.log(this.editItem)
      let formData = new FormData()
      formData.append('file', this.editItem.paymant)
      formData.append('status', this.editItem.status)
      formData.append('id', this.editItem.id)
      const edit = await axios.put(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(edit)
      this.$router.go()
    },
    //  fun delete
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    // show popup delete
    showModal_del(item) {
      this.$refs['modal-del'].show()
      console.log(item);
      const {id } = item
      this.delItem.id = id

    },
    // delete confirm
    delConfirm() {
      this.deleteData(this.deleteItem)
      // close popup
    },
    hideModal_del() {
      this.$refs['modal-del'].hide()
    },
    // show popup add
    showModal_add() {
      this.$refs['modal-add'].show()
    },
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
    yaydata(data) {
      console.log(data)
      this.perprice = data.price
      this.add.package_id = data.id
      this.add.price = this.perprice * this.add.value
    },
    async option() {
      for (const value of this.packages) {
        this.options.push({ value: value, text: value.name })
      }
    },
    price_total() {
      this.add.price = this.perprice * this.add.value
    },
    datetime() {
      let TO = 0
      if (this.add1.name[1] == 'O') {
        TO = 2
      }
      if (this.add1.name[1] == 'R') {
        TO = 3
      }
      let newdate = new Date(this.date)
      newdate.setDate(newdate.getDate() + TO)
      this.add.travelback_date = newdate
    },
    showModal_edit(item) {
      const { status, payment, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.status = status
      this.editItem.payment = payment
      this.editItem.id = id
    },
    hideModal_edit() {
      this.$refs['modal-edit'].hide()
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#booking{
   font-family: 'Kanit', sans-serif;
}
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

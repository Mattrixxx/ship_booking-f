<template>
  <div id="user">
    <webtab />
    <b-container>
      <!-- <h2>ข้อมูลส่วนตัว</h2> -->
      <div id="name">
        <b-card bg-variant="light" class="port">
          <b-form-group
            label-cols-lg="3"
            label-size="lg"
            label="ข้อมูลส่วนตัว"
            label-class="font-weight-bold pt-0"
            class="mb-0"
            style="margin-left: 50px"
          >
            <b-row id="row1">
              <b-col sm="2" id="col1"> </b-col>
              <b-col sm="8" id="col2">
                <h5>{{ username }}</h5>
                <h5>ชื่อ {{ users.name }}  {{ users.sname }}</h5>
                <h5>เบอร์โทรศัพท์ {{ users.phone }}</h5>
                <div id="edit">
                  <b-button
                    v-b-modal.modal-center
                    variant="warning"
                    @click="showModal_edit(users)"
                    >แก้ไขข้อมูล</b-button
                  >
                  <b-modal
                    ref="modal-edit"
                    hide-footer
                    title="แก้ไขข้อมูลผู้ใช้"
                  >
                    <b-form-group label="ชื่อ :"
                      ><b-form-input
                        v-model="edituser.name"
                        type="text"
                        placeholder="ชื่อ"
                      ></b-form-input
                    ></b-form-group>
                    <b-form-group label="นามสกุล :">
                      <b-form-input
                        v-model="edituser.sname"
                        type="text"
                        placeholder="นามสกุล"
                      ></b-form-input
                    ></b-form-group>
                    <b-form-group label="เบอร์ติดต่อ :">
                      <b-form-input
                        type="text"
                        v-model="edituser.phone"
                        placeholder="เบอร์ติดต่อ"
                      >
                      </b-form-input>
                    </b-form-group>
                    <div id="btn_add">
                      <b-button
                        id="bta_add"
                        variant="success"
                        size="sm"
                        @click="editUser()"
                        >แก้ไข</b-button
                      ><b-button
                        variant="danger"
                        size="sm"
                        @click="hideModal_edit()"
                        >ยกเลิก</b-button
                      >
                    </div>
                  </b-modal>
                </div>
              </b-col>
            </b-row>
          </b-form-group>
        </b-card>
        <b-card bg-variant="light" class="his">
          <!-- <b-row> -->
          <h4>ประวัติการจอง</h4>
          <!-- </b-row> -->

          <div id="Table">
            <b-table
              bordered
              outlined
              striped
              hover
              :items="bookings"
              :fields="fields"
              :filter="filter"
            >
              <template v-slot:cell(actions)="data">
                <b-button
                  variant="success"
                  size="sm"
                  @click="showModal_payment(data.item)"
                  >อัพโหลดหลักฐานการชำระเงิน</b-button
                >
                <b-button
                  variant="warning"
                  size="sm"
                  @click="showModal_review()"
                  >รีวิว</b-button
                >
                <b-button
                  variant="danger"
                  size="sm"
                  @click="showModal_cancel(data.item)"
                  >ยกเลิกการจอง</b-button
                >
              </template>
            </b-table>
          </div>
        </b-card>

        <b-modal ref="modal-review" hide-footer title="รีวิว">
          <div class="d-block text-center"></div>
          <b-form-group label="อัพโหลดรูปภาพ: ">
            <b-form-file
              ref="file"
              placeholder="อัพโหลดไฟล์"
              v-model="add.img"
              accept="image/jpeg, image/png"
              @change="handleFileUpload()"
            ></b-form-file>

            <div class="row">
              <b-img
                v-if="add.img"
                :src="url"
                class="mt-3"
                style="max-width: 50%; height: auto; margin-left: 25%"
                fluid
                block
                rounded
              ></b-img>
            </div>
          </b-form-group>

          <b-form-group>
            <b-row>
              <b-col sm="2">
                <label for="textarea-auto-height">รีวิว :</label>
              </b-col>
              <b-col sm="10">
                <b-form-textarea
                  v-model="add.detail"
                  id="textarea-auto-height"
                  placeholder="ข้อความที่ต้องงการรีวิว"
                  rows="3"
                  max-rows="8"
                ></b-form-textarea>
              </b-col>
            </b-row>
          </b-form-group>

          <label>คะแนนการรีวิว :</label>
          <b-form-rating v-model="add.rank"></b-form-rating>

          <b-button @click="postData()">ส่ง</b-button>
        </b-modal>

        <b-modal
          ref="modal-payment"
          hide-footer
          title="อัพโหลดหลักฐานการชำระเงิน"
        >
          <div class="d-block text-center"></div>
          <b-form-group label="อัพโหลดรูปภาพ: ">
            <b-form-file
              ref="file"
              placeholder="อัพโหลดไฟล์"
              v-model="editItem.payment"
              accept="image/jpeg, image/png"
              @change="handleFileUpload()"
            ></b-form-file>

            <div class="row">
              <b-img
                v-if="editItem.payment"
                :src="url"
                class="mt-3"
                style="max-width: 50%; height: auto; margin-left: 25%"
                fluid
                block
                rounded
              ></b-img>
            </div>
          </b-form-group>
          <b-button @click="editData()">ส่ง</b-button>
        </b-modal>
        <b-modal
          ref="modal-cancel"
          hide-footer
          title="คุณต้องการยกเลิกการจองใช่หรือไม่?"
        >
          <!-- btnDel-Cancel -->
          <b-button
            class="mt-3"
            block
            variant="outline-success"
            @click="hideModal_cancel"
            >ไม่ใช่</b-button
          >
          <!-- btnDel-Del -->
          <b-button
            class="mt-2"
            block
            variant="outline-danger"
            @click="cancelData()"
            >ใช่</b-button
          >
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import webtab from '../components/web.vue'
import axios from 'axios'
export default {
  components: { webtab },
  name: 'Wuser',
  props: ['items'],
  data() {
    return {
      url: null,
      add: {
        detail: '',
        rank: '',
        img: null,
      },
      editItem: {
        paymant: null,
        status: '',
        id: '',
      },
      edituser: {
        name: '',
        sname: '',
        phone: '',
        id: '',
      },
      username: '',
      id: '',
      bookings: [],
      users: [],
      reviews: [],
      apiURL: 'http://localhost:3000/booking/',
      apiURL1: 'http://localhost:3000/user',
      apiUrl2: 'http://localhost:3000/review',
      fields: [
        { key: 'id', label: 'Id', sortable: true, tdClass: 'center' },
        { key: 'user.username', label: 'ชื่อผู้ใช้', tdClass: 'center' },
        { key: 'travel_date', label: 'วันเดินทาง', tdClass: 'center' },
        { key: 'status', label: 'สถานะ', tdClass: 'center' },
        {
          key: 'actions',
          label: 'การดำเนินการ',
          class: 'text-center',
          tdClass: 'center',
        },
      ],
      filter: '',
    }
  },

  //  fun show
  async mounted() {
    this.username = localStorage.getItem('username')
    this.id = localStorage.getItem('id')
    const result = await axios.get(this.apiURL)
    this.bookings = result.data
    const result2 = await axios.get(this.apiURL1 + '/' + this.id)
    this.users = result2.data.data
    const result3 = await axios.get(this.apiUrl2)
    this.reviews = result3.data
    this.filter = localStorage.getItem('username')
  },
  methods: {
    async postData() {
      this.hideModal_review()
      let formData = new FormData()
      formData.append('file', this.add.img)
      formData.append('detail', this.add.detail)
      formData.append('rank', this.add.rank)
      formData.append('user_id', this.id)
      console.log(formData)
      const postReview = await axios.post(this.apiUrl2, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(postReview)
      const result1 = await axios.get(this.apiURL2)
      this.reviews = result1.data
      this.$router.go()
    },
    async editData() {
      this.editItem.status = 'รอการพิจารณา'
      console.log(this.editItem)
      let formData = new FormData()
      formData.append('file', this.editItem.payment)
      formData.append('status', this.editItem.status)
      formData.append('id', this.editItem.id)
      const edit = await axios.put(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(edit)
      this.$router.go()
    },
    async editUser() {
      const edit = await axios.put(this.apiURL1, this.edituser)
      console.log(edit)
      this.$router.go()
    },
    async cancelData() {
      this.editItem.status = 'ลูกค้าขอยกเลิกการจอง'
      console.log(this.editItem)
      let formData = new FormData()
      formData.append('file', this.editItem.payment)
      formData.append('status', this.editItem.status)
      formData.append('id', this.editItem.id)
      const edit = await axios.put(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(edit)
      this.$router.go()
    },
    showModal_edit(item) {
      console.log(item)
      const { name, sname, id, phone } = item
      this.$refs['modal-edit'].show()
      this.edituser.name = name
      this.edituser.sname = sname
      this.edituser.phone = phone
      this.edituser.id = id
    },
    hideModal_edit() {
      this.$refs['modal-edit'].hide()
    },
    showModal_review() {
      this.$refs['modal-review'].show()
    },
    hideModal_review() {
      this.$refs['modal-review'].hide()
    },
    showModal_payment(item) {
      const { payment, id } = item
      console.log(item)
      this.$refs['modal-payment'].show()
      this.editItem.payment = payment
      this.editItem.id = id
    },
    hideModal_payment() {
      this.$refs['modal-payment'].hide()
    },
    showModal_cancel(item) {
      const { payment, id } = item
      console.log(item)
      this.$refs['modal-cancel'].show()
      this.editItem.payment = payment
      this.editItem.id = id
    },
    hideModal_cancel() {
      this.$refs['modal-cancel'].hide()
    },
    handleFileUpload() {
      this.url = URL.createObjectURL(event.target.files[0])
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#user{
   font-family: 'Kanit', sans-serif;
}
#user h2 {
  margin-top: 40px;
  text-align: center;
}
#col1 {
  margin-left: 45px;
  margin-top: 5px;
  padding: 20px;
  text-align: center;
  /* border: 4px solid rgb(241, 213, 213); */
}
#col2 {
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
  /* border: 4px solid rgb(241, 213, 213); */
}
#row1 {
  margin-bottom: 30px;
  margin-left: 30px;
  /* border :1px solid red; */
}
#Table {
  /* border: 4px solid rgb(241, 213, 213); */
  padding: 50px;
}
.container {
  /* border :1px solid rgb(38, 48, 189); */
  margin-right: 200px;
  margin-left: 200px;
}
#edit {
  padding-top: 20px;

  float: right;
}
#pass {
  padding-top: 20px;
  padding-right: 20px;
  float: right;
}
.port {
  margin-top: 100px;
  margin-bottom: 50px;
}
h4 {
  text-align: center;
  margin-bottom: -20px;
}
.his {
  margin-bottom: 100px;
}
</style>

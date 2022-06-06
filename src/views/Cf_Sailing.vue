<template>
  <div id="cfsailing">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ยืนยันการออกเรือ</h1>

      <div id="Add">
        <b-button variant="success" size="sm" @click="showModal_add"
          ><b-icon icon="plus-square-fill"></b-icon
        ></b-button>
      </div>

      <div id="Table2">
        <b-table
          bordered
          outlined
          striped
          hover
          :items="confirm"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template v-slot:cell(actions)="data">
            <b-button
              variant="warning"
              size="sm"
              @click="showModal_edit(data.item)"
              ><b-icon icon="pencil-square"></b-icon
            ></b-button>
            <b-modal
              ref="modal-add"
              hide-footer
              title="เพิ่มข้อมูลการยืนยันการออกเรือ"
            >
              <div class="d-block text-center"></div>
              <b-form-group label="ลำดับการจอง :"
                ><b-form-select
                  v-model="add1"
                  :options="options"
                ></b-form-select
              ></b-form-group>
              <b-form-group label="รหัสการออกเรือ :"
                ><b-form-select
                  v-model="add2"
                  :options="options1"
                ></b-form-select
              ></b-form-group>
              <b-form-group label="สถานะการออกเรือ :"
                ><b-form-select
                  v-model="add.status"
                  :options="options2"
                ></b-form-select
              ></b-form-group>
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
            <b-modal
              ref="modal-edit"
              hide-footer
              title="แก้ไขข้อมูลการยืนยันการออกเรือ"
            >
              <b-form-group label="สถานะการออกเรือ :"
                ><b-form-select
                  v-model="editItem.status"
                  :options="options2"
                ></b-form-select
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
  name: 'CfSailing',
  props: ['items'],
  data() {
    return {
      bookings: [],
      sailings: [],
      confirm: [],
      apiURL: 'http://localhost:3000/confirm/',
      apiURL2: 'http://localhost:3000/booking',
      apiURL3: 'http://localhost:3000/sailing',
      add: {
        status: '',
        booking_id: '',
        sailing_id: '',
      },
      add1: {
        id: '',
        value: '',
        travel_date: '',
      },
      add2: {
        id: '',
        name: '',
      },
      editItem: {
        id: '',
        status: '',
      },
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'ลำดับ', sortable: true, tdClass: 'center' },
        { key: 'booking.id', label: 'ลำดับการจอง', tdClass: 'center' },
        { key: 'booking.value', label: 'จำนวนที่นั่ง', tdClass: 'center' },
        { key: 'booking.travel_date', label: 'วันออกเรือ', tdClass: 'center' },
        { key: 'booking.travel_date', label: 'วันออกเรือ', tdClass: 'center' },
        { key: 'sailing.name', label: 'รหัสการออกเรือ', tdClass: 'center' },
        { key: 'status', label: 'สถานะการออกเรือ', tdClass: 'center' },
        { key: 'actions', label: 'การดำเนินการ', tdClass: 'center' },
      ],
      options: [],
      options1: [],
      options2: [
        { value: 'ออกเรือสำเร็จ', text: 'ออกเรือสำเร็จ' },
        { value: 'ยังไม่มีการออกเรือ', text: 'ยังไม่มีการออกเรือ' },
        { value: 'ยกเลิกการออกเรือ', text: 'ยกเลิกการออกเรือ' },
      ],
    }
  },
  computed: {
    row() {
      return this.sailings.length
    },
  },
  //  fun show
  async mounted() {
    const result = await axios.get(this.apiURL)
    this.confirm = result.data
    const result1 = await axios.get(this.apiURL2)
    this.bookings = result1.data
    const result2 = await axios.get(this.apiURL3)
    this.sailings = result2.data
    this.option()
    this.option1()
  },
  methods: {
    //  fun add
    async postData() {
      this.hideModal_add()
      this.add.booking_id = this.add1.id
      this.add.sailing_id = this.add2.id
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.sailings = result1.data
      this.$router.go()
    },
    async editData() {
      const edit = await axios.put(this.apiURL, this.editItem)
      console.log(edit)
      this.$router.go()
    },
    // show popup add
    showModal_add() {
      this.$refs['modal-add'].show()
    },
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
    showModal_edit(item) {
      const { status, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.status = status
      this.editItem.id = id
    },
    async option() {
      for (const value of this.bookings) {
        this.options.push({ value: value, text: value.id })
      }
    },
    async option1() {
      for (const value of this.sailings) {
        this.options1.push({ value: value, text: value.name })
      }
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#cfsailing{
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
/* #search-add{
  float: right;
} */
#Table h1 {
  text-align: center;
  color: rgb(84, 105, 124);
}
#Add{
  float: right;
  margin-bottom: 10px;
}
</style>

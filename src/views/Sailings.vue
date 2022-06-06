<template>
  <div id="sailing">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ข้อมูลการออกเรือ</h1>

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
          :items="sailings"
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
              <p>ลำดับ : {{ delItem.id }}</p>
              <p>ชื่อคนขับเรือ : {{ delItem.dname }}</p>
              <p>ชื่อเรือ : {{ delItem.bname }}</p>
              <p>ชื่อการออกเรือ : {{ delItem.name }}</p>
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
            <b-modal ref="modal-add" hide-footer title="เพิ่มข้อมูลการออกเรือ">
              <div class="d-block text-center"></div>
              <b-form-group
                label="คนขับเรือ :"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-select v-model="add_driver" :options="options">
                </b-form-select>
              </b-form-group>
              <b-form-group
                label="ชื่อเรือ :"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-select v-model="add_boat" :options="options1">
                </b-form-select>
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
            <b-modal ref="modal-edit" hide-footer title="แก้ไขข้อมูลการออกเรือ">
              <div class="d-block text-center"></div>
              <b-form-group
                label="คนขับเรือ :"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-select v-model="edit_driver" :options="options">
                </b-form-select>
              </b-form-group>
              <b-form-group
                label="ชื่อเรือ :"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-select v-model="edit_boat" :options="options1">
                </b-form-select>
              </b-form-group>
              <b-form-group
                label="ชื่อการออกเรือ :"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  type="text"
                  v-model="editItem.name"
                  placeholder="ชื่อการออกเรือ"
                >
                </b-form-input>
              </b-form-group>
              <div id="btn_add">
                <b-button
                  id="bta_add"
                  variant="success"
                  size="sm"
                  @click="editData()"
                  >แก้ไขข้อมูลการออกเรือ</b-button
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
  name: 'Sailing',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      sailings: [],
      drivers: [],
      boats: [],
      add: {
        boat_id: '',
        driver_id: '',
        name: '',
      },
      add_driver: {
        id: '',
        short: '',
      },
      add_boat: {
        id: '',
        name: '',
      },
      editItem: {
        id: '',
        boatId: '',
        driverId: '',
        name: '',
      },
      edit_driver: {
        id: '',
        short: '',
      },
      edit_boat: {
        id: '',
        name: '',
      },
      delItem: {
        id: '',
        name: '',
        dname: '',
        bname: '',
      },
      apiURL: 'http://localhost:3000/sailing/',
      apiURL2: 'http://localhost:3000/driver/',
      apiURL3: 'http://localhost:3000/boat/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true, tdClass: 'center' },
        { key: 'driver.name', label: 'ชื่อคนขับเรือ', tdClass: 'center' },
        { key: 'driver.sname', label: 'นามสกุลคนขับเรือ', tdClass: 'center' },
        { key: 'boat.name', label: 'ชื่อเรือ', tdClass: 'center' },
        { key: 'name', label: 'ชื่อการออกเรือ', tdClass: 'center' },
        { key: 'actions', label: 'การดำเนินการ', tdClass: 'center' },
      ],
      options: [],
      options1: [],
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
    this.sailings = result.data
    const result1 = await axios.get(this.apiURL2)
    this.drivers = result1.data.data
    const result2 = await axios.get(this.apiURL3)
    this.boats = result2.data.data
    this.option()
    this.option2()
  },
  methods: {
    //  fun add
    async postData() {
      this.hideModal_add()
      this.add.driver_id = this.add_driver.id
      this.add.boat_id = this.add_boat.id
      this.add.name = this.add_driver.short + this.add_boat.name
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.sailings = result1.data
      // this.$router.go()
    },
    async editData() {
      this.hideModal_edit()
      console.log(this.edit_driver)
      this.editItem.driverId = this.edit_driver.id
      this.editItem.boatId = this.edit_boat.id
      const result = await axios.put(this.apiURL, this.editItem)
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.sailings = result1.data
    },
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    delConfirm() {
      this.deleteData(this.delItem.id)
    },
    showModal_add() {
      this.$refs['modal-add'].show()
    },
    showModal_edit(item) {
      const { boat, driver, name, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.boat_id = boat.id
      this.editItem.driver_id = driver.id
      this.editItem.name = name
      this.editItem.id = id
    },
    showModal_del(item) {
      this.$refs['modal-del'].show()
      const { boat, driver, name, id } = item
      this.delItem.bname = boat.name
      this.delItem.dname = driver.name + ' ' + driver.sname
      this.delItem.name = name
      this.delItem.id = id
    },
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
    hideModal_edit() {
      this.$refs['modal-edit'].hide()
    },
    hideModal_del() {
      this.$refs['modal-del'].hide()
    },
    async option() {
      for (const value of this.drivers) {
        this.options.push({
          value: value,
          text: value.name + ' ' + value.sname,
        })
      }
    },
    async option2() {
      for (const value of this.boats) {
        this.options1.push({ value: value, text: value.name })
      }
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#sailing{
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

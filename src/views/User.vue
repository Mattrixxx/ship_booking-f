<template>
  <div id="user">
    <div>
      <tabuser />
    </div>

    <div id="Table">
      <h1>ข้อมูลผู้ใช้</h1>
      <div id="search">
        <b-row>
          <b-col md="10">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="ค้นหา..."
            ></b-form-input>
          </b-col>
          <b-button variant="success" size="sm" @click="showModal_add"
            ><b-icon icon="plus-square-fill"></b-icon
          ></b-button>
        </b-row>
      </div>
      <b-row>
        <b-col>
          <div id="Table2">
            <b-table
              bordered
              outlined
              striped
              hover
              :items="users"
              :filter="filter"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="fields"
            >
              <template v-slot:cell(actions)="data"
                ><b-button
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
                  <p>ชื่อ-สกุล : {{ delItem.name }} {{ delItem.sname }}</p>
                  <p>เบอร์ติดต่อ : {{ delItem.phone }}</p>
                  <p>ชื่อผู้ใช้ : {{ delItem.username }}</p>
                  <div id="btn_delete">
                    <b-button
                      id="btd_delete"
                      variant="danger"
                      size="sm"
                      @click="delConfirm"
                      >ลบข้อมูล</b-button
                    >
                    <b-button
                      variant="success"
                      size="sm"
                      @click="hideModal_del()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>
                <b-modal
                  ref="modal-add"
                  hide-footer
                  title="เพิ่มข้อมูลผู้ใช้"
                  class="modalAdd"
                >
                  <div class="d-block text-center"></div>
                  <b-form-group label="ชื่อ :"
                    ><b-form-input
                      v-model="add.name"
                      type="text"
                      placeholder="ชื่อ"
                    ></b-form-input
                  ></b-form-group>
                  <b-form-group label="นามสกุล :">
                    <b-form-input
                      v-model="add.sname"
                      type="text"
                      placeholder="นามสกุล"
                    ></b-form-input
                  ></b-form-group>
                  <b-form-group label="เบอร์ติดต่อ :">
                    <b-form-input
                      type="text"
                      v-model="add.phone"
                      placeholder="เบอร์ติดต่อ"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="ชื่อผู้ใช้ :">
                    <b-form-input
                      type="text"
                      v-model="add.username"
                      placeholder="ชื่อผู้ใช้"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="รหัสผ่าน :">
                    <b-form-input
                      type="password"
                      v-model="add.password"
                      placeholder="รหัสผ่าน"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="ยืนยันรหัสผ่าน :">
                    <b-form-input
                      type="password"
                      v-model="cf_password"
                      placeholder="ยืนยันรหัสผ่าน"
                    >
                    </b-form-input>
                  </b-form-group>
                  <div id="btn_add">
                    <b-button
                      id="bta_add"
                      variant="success"
                      size="sm"
                      @click="confirmPassword()"
                      >เพิ่มข้อมูล</b-button
                    ><b-button
                      variant="danger"
                      size="sm"
                      @click="hideModal_add()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>
                <b-modal
                  ref="modal-cfadd"
                  hide-footer
                  title="คุณต้องการเพิ่มข้อมูลต่อไปนี้ใช่หรือไม่"
                  class="modalCfAdd"
                >
                  <p>ชื่อ-สกุล : {{ add.name }} {{ add.sname }}</p>
                  <p>เบอร์ติดต่อ : {{ add.phone }}</p>
                  <p>ชื่อผู้ใช้ : {{ add.username }}</p>
                  <div id="btn_add">
                    <b-button
                      id="bta_add"
                      variant="success"
                      size="sm"
                      @click="postData(), hideModal_cfadd()"
                      >เพิ่มข้อมูล</b-button
                    ><b-button
                      variant="danger"
                      size="sm"
                      @click="hideModal_cfadd(), showModal_add()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>
                <b-modal ref="modal-edit" hide-footer title="แก้ไขข้อมูลผู้ใช้">
                  <b-form-group label="ชื่อ :"
                    ><b-form-input
                      v-model="editItem.name"
                      type="text"
                      placeholder="ชื่อ"
                    ></b-form-input
                  ></b-form-group>
                  <b-form-group label="นามสกุล :">
                    <b-form-input
                      v-model="editItem.sname"
                      type="text"
                      placeholder="นามสกุล"
                    ></b-form-input
                  ></b-form-group>
                  <b-form-group label="เบอร์ติดต่อ :">
                    <b-form-input
                      type="text"
                      v-model="editItem.phone"
                      placeholder="เบอร์ติดต่อ"
                    >
                    </b-form-input>
                  </b-form-group>
                  <div id="btn_add">
                    <b-button
                      id="bta_add"
                      variant="success"
                      size="sm"
                      @click="editData()"
                      >แก้ไข</b-button
                    ><b-button
                      variant="danger"
                      size="sm"
                      @click="hideModal_edit()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>
              </template>
            </b-table>
          </div>

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
  name: 'User',
  props: ['items'],
  data() {
    return {
      cf_password: '',
      deleteItem: null,
      users: [],
      add: {
        name: '',
        sname: '',
        phone: '',
        username: '',
        password: '',
      },
      editItem: {
        id: '',
        name: '',
        sname: '',
        phone: '',
      },
      delItem: {
        id: '',
        name: '',
        sname: '',
        phone: '',
        username: '',
      },
      apiURL: 'http://localhost:3000/user/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'ลำดับ', sortable: true, tdClass: 'center' },
        { key: 'name', label: 'ชื่อ', tdClass: 'center' },
        { key: 'sname', label: 'นามสกุล', tdClass: 'center' },
        { key: 'phone', label: 'เบอร์ติดต่อ', tdClass: 'center' },
        { key: 'username', label: 'ชื่อผู้ใช้', tdClass: 'center' },
        { key: 'actions', label: 'การดำเนินการ', tdClass: 'center' },
      ],
    }
  },
  computed: {
    row() {
      return this.users.length
    },
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.users = result1.data.data
  },
  methods: {
    async postData() {
      this.hideModal_add()
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.users = result1.data.data
    },
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    async editData() {
      const edit = await axios.put(this.apiURL, this.editItem)
      console.log(edit)
      this.$router.go()
    },
    showModal_del(item) {
      this.$refs['modal-del'].show()
      const { name, sname, id, phone, username } = item
      this.delItem.name = name
      this.delItem.sname = sname
      this.delItem.phone = phone
      this.delItem.id = id
      this.delItem.username = username
      this.deleteItem = id
    },
    delConfirm() {
      this.deleteData(this.deleteItem)
    },
    hideModal_del() {
      this.$refs['modal-del'].hide()
    },
    showModal_add() {
      this.$refs['modal-add'].show()
    },
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
    showModal_cfadd() {
      this.$refs['modal-cfadd'].show()
    },
    hideModal_cfadd() {
      this.$refs['modal-cfadd'].hide()
    },
    showModal_edit(item) {
      const { name, sname, id, phone } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      this.editItem.sname = sname
      this.editItem.phone = phone
      this.editItem.id = id
    },
    hideModal_edit() {
      this.$refs['modal-edit'].hide()
    },
    confirmPassword() {
      if (this.cf_password == this.add.password) {
        this.hideModal_add()
        this.showModal_cfadd()
      } else {
        alert('Error')
      }
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#user{
   font-family: 'Kanit', sans-serif;
}
#search {
  margin-left: 85%;
  margin-bottom: 10px;
}
#Table {
  /* margin-top: 30px; */
  margin-right: 50px;
  margin-left: 50px;
  /* border: 1px solid red; */
}
#Table2 {
  margin-top: 0px;
  text-align: center;
}
h1 {
  text-align: center;
}
#bta_add,
#btd_delete {
  margin-right: 10px;
}
#btn_add,
#btn_delete {
  float: right;
}
#btn_add button,
#btn_edit button,
#btn_delete button {
  padding: 8px;
}
</style>

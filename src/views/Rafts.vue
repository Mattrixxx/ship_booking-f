<template>
  <div id="raft">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ข้อมูลแพ</h1>
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
          :items="rafts"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template #cell(img)="row">
            <img :src="row.value" width="200" />
          </template>
          <template #cell(des)="row">
            <div v-if="row.value.length < 150">{{ row.value }}</div>
            <div v-else>{{ row.value.substring(0,150)+".." }}</div>
          </template>
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
              <p>ชื่อเรือ : {{ delItem.name }}</p>
              <p>คำอธิบาย : {{ delItem.des }}</p>
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
            <b-modal ref="modal-add" hide-footer title="เพิ่มข้อมูลแพ">
              <div class="d-block text-center"></div>
              <b-form-group label="ชื่อแพ :"
                ><b-form-input
                  v-model="add.name"
                  type="text"
                  placeholder="ชื่อแพ"
                ></b-form-input
              ></b-form-group>
              <b-form-group label="รูปภาพแพ :">
                <b-form-file
                  ref="file"
                  v-model="add.img"
                  placeholder="อัพโหลดรูปภาพแพ..."
                  @change="handleFileUpload"
                ></b-form-file
              ></b-form-group>
              <b-form-group label="คำอธิบายแพ :">
                <b-form-input
                  type="text"
                  v-model="add.des"
                  placeholder="คำอธิบายแพ"
                >
                </b-form-input>
              </b-form-group>
              <div id="btn_add">
                <b-button
                  id="bta_add"
                  variant="success"
                  size="sm"
                  @click="hideModal_add(), showModal_cfadd()"
                  >เพิ่มข้อมูล</b-button
                ><b-button variant="danger" size="sm" @click="hideModal_add()"
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
              <p>ชื่อแพ : {{ add.name }}</p>
              <p>คำอธิบาย : {{ add.des }}</p>
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
            <b-modal ref="modal-edit" hide-footer title="แก้ไขข้อมูลแพ">
              <b-form-group label="ชื่อแพ :"
                ><b-form-input
                  v-model="editItem.name"
                  type="text"
                  placeholder="ชื่อแพ"
                ></b-form-input
              ></b-form-group>
              <b-form-group label="รูปภาพแพ :">
                <b-form-file
                  v-model="editItem.img"
                  :placeholder="
                    editItem.img == null ? 'อัพโหลดรูปภาพเรือ...' : editItem.img
                  "
                ></b-form-file
              ></b-form-group>
              <b-form-group label="คำอธิบาย :">
                <b-form-input
                  type="text"
                  v-model="editItem.des"
                  placeholder="คำอธิบาย"
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
  name: 'Raft',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      rafts: [],
      add: {
        name: '',
        des: '',
        img: null,
      },
      editItem: {
        id: '',
        name: '',
        des: '',
        img: null,
      },
      delItem: {
        id: '',
        name: '',
        des: '',
      },
      apiURL: 'http://localhost:3000/raft/',
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
          key: 'name',
          label: 'ชื่อแพ',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'img',
          label: 'รูปภาพ',
          class: 'text-center',
          tdClass: 'center',
        },
        {
          key: 'des',
          label: 'คำอธิบาย',
          class: 'des',
          tdClass: 'center',
        },
        {
          key: 'actions',
          label: 'การดำเนินการ',
          class: 'text-center',
          tdClass: 'center',
        },
      ],
    }
  },
  computed: {
    row() {
      return this.rafts.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.rafts = result1.data.data
  },
  methods: {
    //  fun add
    async postData() {
      this.hideModal_add()
      let formData = new FormData()
      formData.append('file', this.add.img)
      formData.append('name', this.add.name)
      formData.append('des', this.add.des)
      const result = await axios.post(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.rafts = result1.data.data
    },
    //  fun delete
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    //  fun edit
    async editData() {
      console.log(this.editItem)
      let formData = new FormData()
      formData.append('file', this.editItem.img)
      formData.append('name', this.editItem.name)
      formData.append('des', this.editItem.des)
      formData.append('id', this.editItem.id)
      const edit = await axios.put(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(edit)
      this.$router.go()
    },
    // show popup delete
    showModal_del(item) {
      this.$refs['modal-del'].show()
      const { name, des, id } = item
      this.delItem.name = name
      this.delItem.des = des
      this.delItem.id = id
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
      const { name, des, id, img } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      this.editItem.img = img
      this.editItem.des = des
      this.editItem.id = id
    },
    hideModal_edit() {
      this.$refs['modal-edit'].hide()
    },
    handleFileUpload() {
      this.add.img = this.$refs.file.files[0]
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#raft{
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
.des{
  max-width: 600px;
}
#Add{
  float: right;
  margin-bottom: 10px;
}
</style>

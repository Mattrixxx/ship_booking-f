<template>
  <div id="package">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ข้อมูลแพ็คเกจ</h1>
      <div id="Add">
        <b-button variant="success" size="sm" @click="showModal_add"
          ><b-icon icon="plus-square-fill"></b-icon
        ></b-button>
      </div>

      <b-row>
        <b-col>
          <div id="Table2">
            <b-table
              bordered
              outlined
              striped
              hover
              :items="packages"
              :filter="filter"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="fields"
            >
              <!-- Set IMG -->
              <template #cell(img)="row">
                <img :src="row.value" width="200" />
              </template>
              <template v-slot:cell(actions)="data">
                <!-- buttonEdit -->
                <b-button
                  variant="warning"
                  size="sm"
                  @click="showModal_edit(data.item)"
                  ><b-icon icon="pencil-square"></b-icon
                ></b-button>
                <!-- buttonDelete -->
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
                  <p>ชื่อแพ็คเกจ : {{ delItem.name }}</p>
                  <p>จำนวนที่นั่ง : {{ delItem.value }}</p>
                  <p>ราคาแพ็คเกจ : {{ delItem.price }}</p>
                  <p>คำอธิบาย : {{ delItem.des }}</p>
                  <div id="btn_delete">
                    <b-button
                      id="btd_delete"
                      variant="danger"
                      size="sm"
                      @click="delConfirm()"
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
                <!-- textAdd -->
                <b-modal ref="modal-add" hide-footer title="เพิ่มข้อมูลแพ็คเกจ">
                  <div class="d-block text-center"></div>

                  <b-form-group label="ชื่อแพ็คเกจ :">
                    <b-form-input
                      type="text"
                      v-model="add.name"
                      placeholder="ชื่อแพ็คเกจ"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="ชื่อแพ :">
                    <b-form-select
                      v-model="add.raftId"
                      :options="options"
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group label="รูปภาพแพ็คเกจ :">
                    <b-form-file
                      ref="file"
                      v-model="add.img"
                      placeholder="อัพโหลดรูปภาพแพ็คเกจ..."
                      @change="handleFileUpload"
                    ></b-form-file
                  ></b-form-group>
                  <b-form-group label="จำนวนที่นั่ง :">
                    <b-form-input
                      type="text"
                      v-model="add.value"
                      placeholder="จำนวนที่นั่ง"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="ราคาแพ็คเกจ :">
                    <b-form-input
                      type="text"
                      v-model="add.price"
                      placeholder="ราคาแพ็คเกจ"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="คำอธิบาย :">
                    <b-form-input
                      type="text"
                      v-model="add.des"
                      placeholder="คำอธิบาย"
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
                  <p>ชื่อแพ็คเกจ : {{ add.name }}</p>
                  <p>จำนวนที่นั่ง : {{ add.value }}</p>
                  <p>ราคา : {{ add.price }}</p>
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
                <b-modal
                  ref="modal-edit"
                  hide-footer
                  title="แก้ไขข้อมูลแพ็คเกจ"
                >
                  <b-form-group label="ชื่อแพ็คเกจ :"
                    ><b-form-input
                      v-model="editItem.name"
                      type="text"
                      placeholder="ชื่อแพ็คเกจ"
                    ></b-form-input
                  ></b-form-group>
                  <b-form-group label="ชื่อแพ :">
                    <b-form-select
                      v-model="editItem.raftId"
                      :options="options"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group label="รูปภาพแพ็คเกจ :">
                    <b-form-file
                      v-model="editItem.img"
                      :placeholder="
                        editItem.img == null
                          ? 'อัพโหลดรูปภาพเรือ...'
                          : editItem.img
                      "
                    ></b-form-file
                  ></b-form-group>
                  <b-form-group label="จำนวนที่นั่ง :">
                    <b-form-input
                      type="text"
                      v-model="editItem.value"
                      placeholder="จำนวนที่นั่ง"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="ราคาแพ็คเกจ :">
                    <b-form-input
                      type="text"
                      v-model="editItem.price"
                      placeholder="ราคาแพ็คเกจ"
                    >
                    </b-form-input>
                  </b-form-group>
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
  name: 'Package',
  props: ['items'],
  data() {
    return {
      rafts: [],
      deleteItem: null,
      packages: [],
      add: {
        name: '',
        raftId: null,
        img: null,
        value: '',
        price: '',
        des: '',
      },
      editItem: {
        id: '',
        name: '',
        raftId: null,
        img: null,
        price: '',
        value: '',
        des: '',
      },
      delItem: {
        id: '',
        name: '',
        //img: [],
        price: '',
        value: '',
        des: '',
      },
      apiURL: 'http://localhost:3000/package/',
      apiURL2: 'http://localhost:3000/raft/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'ลำดับ', sortable: true, tdClass: 'center' },
        { key: 'name', label: 'ชื่อแพ็คเกจ', tdClass: 'center' },
        { key: 'raft.name', label: 'ชื่อแพ', tdClass: 'center' },
        { key: 'img', label: 'รูปภาพ', tdClass: 'center' },
        { key: 'value', label: 'จำนวนที่นั่ง', tdClass: 'center' },
        { key: 'price', label: 'ราคา', tdClass: 'center' },
        { key: 'des', label: 'คำอธิบาย', tdClass: 'center',class: 'des' },
        { key: 'actions', label: 'การดำเนินการ', tdClass: 'center' },
      ],
      options: [{ value: null, text: 'null', disabled: true }],
    }
  },
  computed: {
    row() {
      return this.packages.length
    },
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.packages = result1.data
    const result2 = await axios.get(this.apiURL2)
    this.rafts = result2.data.data
    this.option()
  },
  methods: {
    async postData() {
      let formData = new FormData()
      formData.append('name', this.add.name)
      formData.append('file', this.add.img)
      formData.append('raft_id', this.add.raftId)
      formData.append('des', this.add.des)
      formData.append('value', this.add.value)
      formData.append('price', this.add.price)
      const result = await axios.post(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.packages = result1.data
    },
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    async editData() {
      console.log(this.editItem)
      let formData = new FormData()
      formData.append('file', this.editItem.img)
      formData.append('name', this.editItem.name)
      formData.append('price', this.editItem.price)
      formData.append('value', this.editItem.value)
      formData.append('des', this.editItem.des)
      formData.append('raft_id', this.editItem.raftId)
      formData.append('id', this.editItem.id)
      const edit = await axios.put(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(edit)
      this.$router.go()
    },
    showModal_del(item) {
      this.$refs['modal-del'].show()
      const { name, des, id, value, price } = item
      this.delItem.name = name
      this.delItem.des = des
      this.delItem.value = value
      this.delItem.price = price
      this.delItem.id = id
      this.deleteItem = id
    },
    delConfirm() {
      this.deleteData(this.deleteItem)
    },
    hideModal_del() {
      this.$refs['modal-del'].hide()
    },
    async showModal_add() {
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
      console.log(item)
      const { name, price, value, id, des, img } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      this.editItem.img = img
      this.editItem.price = price
      this.editItem.value = value
      this.editItem.des = des
      this.editItem.id = id
    },
    handleFileUpload() {
      this.add.img = this.$refs.file.files[0]
    },
    async option() {
      for (const value of this.rafts) {
        this.options.push({ value: value.id, text: value.name })
      }
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#package{
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
}
#Table #Add {
  text-align: right;
}
.des{
  max-width: 200px;
}
</style>

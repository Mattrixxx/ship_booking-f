<template>
  <div id="review">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ข้อมูลการรีวิว</h1>

      <div id="Table2">
        <b-table
          bordered
          outlined
          striped
          hover
          :items="reviews"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template #cell(img)="row">
            <img :src="row.value" width="200" />
          </template>
          <template #cell(id)="row">
            {{ row.value }}
          </template>
          <template #cell(rank)="row">
            <b-form-rating v-model="row.value" no-border readonly variant="success"></b-form-rating>
          </template>
          <template v-slot:cell(actions)="data">
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
              <p>รีวิว : {{ delItem.detail }}</p>
              <p>คะแนน : {{ delItem.rank }}</p>
              <div id="btn_delete">
                <b-button
                  id="btd_delete"
                  variant="danger"
                  size="sm"
                  @click="delConfirm"
                  >ลบข้อมูล</b-button
                >
                <b-button variant="success" size="sm" @click="hideModal_del()"
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
  name: 'Review',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      reviews: [],
      apiURL: 'http://localhost:3000/review/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'ลำดับ', sortable: true, tdClass: 'center' },
        { key: 'detail', label: 'รีวิว', tdClass: 'center' },
        { key: 'img', label: 'รูป', tdClass: 'center' },
        { key: 'rank', label: 'คะแนน', tdClass: 'center' },
        { key: 'user.username', label: 'ชื่อผู้ใช้งาน', tdClass: 'center' },
        { key: 'actions', label: 'การดำเนินการ', tdClass: 'center' },
      ],
      delItem: {
        id: '',
        detail: '',
        rank: '',
      },
    }
  },
  computed: {
    row() {
      return this.reviews.length
    },
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.reviews = result1.data
  },
  methods: {
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    showModal_del(item) {
      this.$refs['modal-del'].show()
      const { id, detail, rank } = item
      this.delItem.name = name
      this.delItem.detail = detail
      this.delItem.rank = rank
      this.deleteItem = id
    },
    delConfirm() {
      this.deleteData(this.deleteItem)
    },
    hideModal_del() {
      this.$refs['modal-del'].hide()
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#review{
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
</style>

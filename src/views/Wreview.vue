<template>
  <div id="wreview">
    <webtab />
    <div id="Table">
      <h2>ข้อมูลการรีวิว</h2>

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
          <template #cell(rank)="row">
            <b-form-rating v-model="row.value" no-border readonly variant="success"></b-form-rating>
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
import webtab from '../components/web.vue'
export default {
  components: { webtab },
  name: 'Review',
  props: ['items'],
  data() {
    return {
      reviews: [],
      apiURL: 'http://localhost:3000/review/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'user.username', label: 'ชื่อผู้ใช้งาน', tdClass: 'center' },
        { key: 'detail', label: 'รีวิว', tdClass: 'center' },
        { key: 'img', label: 'รูป', tdClass: 'center' },
        { key: 'rank', label: 'คะแนน', tdClass: 'center' },
      ],
    }
  },
  computed: {
    row() {
      return this.reviews.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.reviews = result1.data
  },
  methods: {},
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#wreview{
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
#Table h2 {
  text-align: center;
}
</style>

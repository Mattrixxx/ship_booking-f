<template>
  <div class="table2">
    <!-- <b-button size="sm" variant="danger" @click="deleteData()"
      ><b-icon icon="trash-fill"></b-icon
    ></b-button> -->
    <b-table
      striped
      hover
      small
      head-variant="dark"
      table-variant="light"
      :items="items"
      :filter="search"
      :fields="fields"
    >
      <template #cell(actions)="row">
        <b-button size="sm" variant="warning"
          ><b-icon icon="pencil-square"></b-icon
        ></b-button>
        <b-button size="sm" variant="danger" @click="deleteData(row.items.id)"
          ><b-icon icon="trash-fill"></b-icon
        ></b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'Table2',
  props: ['items', 'search', 'fields'],
  methods: {
    async deleteData(id) {
      console.log(id)
    },
  },
}
</script>

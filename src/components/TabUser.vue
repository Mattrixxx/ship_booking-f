<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <sidebar/>
      <b-collapse id="nav-collapse" is-nav >
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{username}}</em>
            </template>
            <b-dropdown-item @click="logout()" href="/login">ออกจากระบบ</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import sidebar from '../components/Sidebar.vue'

export default {
  components:{sidebar},
  data() {
    return {
      username:'ชื่อผู้ใช้',
    }
  },
  async mounted(){
    this.username = localStorage.getItem('username')
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$router.go()
      console.log(this.username);
    }
  }
}
</script>

<style scoped>
.navbar {
    padding:0px;
}
.navbar-collapse {
    padding-right: 2.5%;
}
.bg-info {
    background-color:#000!important;
}
</style>
<template>
  <div id="web">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-collapse id="nav-collapse" is-nav>
      <b-nav-item href="/homes"
          > <b-img :src="require('../img/4.png')" height="70px"></b-img>
          </b-nav-item>
     
        <b-nav id="navbar-nav">
        <b-nav-item href="/wraft">ข้อมูลแพ </b-nav-item>
        <b-nav-item href="/wpackage1">แพ็คเกจ </b-nav-item>
        <b-nav-item href="/wbooking">จองแพ็คเกจ </b-nav-item>
        <b-nav-item href="/wreview">รีวิว </b-nav-item>
        <b-nav-item-dropdown no-caret right>
            <template #button-content>
              <em>{{username}}</em>
              <em></em>
            </template>
            <b-dropdown-item href="/wuser">ข้อมูลส่วนตัว</b-dropdown-item>
            <b-dropdown-item @click="logout" href="/home">ออกจากระบบ </b-dropdown-item>
          </b-nav-item-dropdown>
    </b-nav>
   
        
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  data() {
    return {
      username:'ชื่อผู้ใช้',
      status:'',
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
    },
  }
}  
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#web{
   font-family: 'Kanit', sans-serif;
}
.navbar {
    padding:0px;
    
}
.navbar-collapse {
    padding-left: 2.5%;
    padding-right: 2%;
}
.bg-info {
    background-color: #000!important;
    
}
a ,em{
    color: #f3e8ee;
}
#navbar-nav li a:hover{
  background-color: #f3e8ee;
  color: #000;
  border-radius: 0.5rem;
  
}
.nav{
    margin-left: 55%;
}
li {
  list-style-type: none;
}
</style>
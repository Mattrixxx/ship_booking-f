<template>
  <div id="con">
    <b-button v-b-toggle.sidebar-no-header variant="success" id="side"
      ><i class="fas fa-bars"></i
    ></b-button>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
      backdrop
      backdrop-variant="dark"
    >
      <template #footer="{ hide }">
        <div class="d-flex text-light align-items-center px-3 py-2">
          <strong class="mr-auto"></strong>
          <b-button size="lg" @click="hide" variant="link"
            ><i class="fas fa-angle-double-left"></i
          ></b-button>
        </div>
      </template>
      <div class="p-3">
        <div class="d-flex align-items-center flex-column">
          <!-- <h4 id="sidebar-no-header-title" class="mt-3 mb-3">Promtongyai</h4> -->
          <div>
            <b-img :src="require('../img/3.png')" height="100px"></b-img>
          </div>
        </div>
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item href="/users"
              ><i class="fas fa-user"></i> ข้อมูลผู้ใช้</b-nav-item
            >
            <b-nav-item href="/drivers"
              ><i class="fas fa-user-tie"></i> ข้อมูลคนขับเรือ</b-nav-item
            >
            <b-nav-item href="/boats"
              ><i class="fas fa-ship"></i> ข้อมูลเรือ</b-nav-item
            >
            <b-nav-item href="/rafts"
              ><i class="fas fa-bed"></i> ข้อมูลแพ</b-nav-item
            >
            <b-nav-item href="/packages"
              ><i class="fas fa-suitcase-rolling"></i> ข้อมูลแพ็คเกจ</b-nav-item
            >
            <b-nav-item href="/bookings"
              ><i class="fas fa-list-alt"></i> ข้อมูลการจอง</b-nav-item
            >
            <b-nav-item href="/sailings"
              ><i class="fas fa-receipt"></i> ข้อมูลการออกเรือ</b-nav-item
            >
            <b-nav-item href="/cf-sailings"
              ><i class="fas fa-receipt"></i> ยืนยันการออกเรือ</b-nav-item
            >
            <b-nav-item href="/reviews"
              ><i class="fas fa-star"></i> ข้อมูลการรีวิว</b-nav-item
            >
            <b-nav-item href="/report-booking"
              ><i class="fas fa-file"></i> รายงาน</b-nav-item
            >
  
            
          </b-nav>
        </nav>
      </div>
    </b-sidebar>

    <router-view />
  </div>
</template>

<script></script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#con{
   font-family: 'Kanit', sans-serif;
}
.nav {
  margin: 0;
}
.nav-item > .nav-link {
  color: #38443c;
  font-size: 20px;
}
.report .nav-item > .nav-link{
  color: #38443c;
  font-size: 16px;
  margin-left:7px ;
}
.nav-item > .nav-link:hover {
  background-color: rgb(196, 196, 196);
  color: white;
}
.btn-link {
  color:#000;
}
.btn-link:hover {
  color: rgb(199, 199, 199);
}
button#side {
  width: 60px;
  height: 60px;
}
.svg-inline--fa {
  font-size: 20px;
}
.btn-success {
  color: #fff;
  border-color:#000 !important;
  background: #000 !important;
  box-shadow: 0 0 0 0rem;
}
.btn-success:focus {
  color: #fff;
  border-color:#000 !important;
  background: #000 !important;
  box-shadow: 0 0 0 0rem;
}
a {
  margin-top: 10px;
  margin-bottom: 9px;
}
img {
  margin-bottom: 20px;
}
</style>

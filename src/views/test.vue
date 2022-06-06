<template>
  <div class="container-fluid m-0 p-0">
    <div id="home-page" class="full-height p-4">
      <div class="container pt-3">
        <div class="row pb-5">
          <div class="col-lg-6 pt-4 my-auto">
            <img src=".././img/3.png" id="logo" class="img-fluig" />
          </div>
          <div class="nav">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" href="/wraft">ข้อมูลแพ</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/wpackage">ข้อมูลแพ็คเกจ</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/wbooking">จองแพ็คเกจ</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/wreview">รีวิว</a>
                  </li>
                </ul>
                <li class="nav-item dropdown">
                  <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown"
                    >Dropdown</a
                  >
                  <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Action</a>
                    <a href="#" class="dropdown-item">Another action</a>
                  </div>
                </li>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div id="about" class="bg-warning p-4">
      
    </div>

    <div id="contact" class="bg-info p-4"></div>

    <div id="footer" class="bg-primary p-4"></div>
  </div>
</template>

<script>
export default {
  data() {},
}
</script>

<style scoped>
.full-height {
  min-height: 100vh;
}
#logo{
  width: 200px;
}
#home-page {
  background-color: #90d2f9;
  background: url('.././img/OIHFFD0.jpg') no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.nav {
  margin-left: 12px;
  margin-top: 20px;
}
li {
  margin-right: 10px;
}
a{
  color: rgba(0, 0, 0, 0.5);;
}
</style>

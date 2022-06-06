import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import Raft from '../views/Rafts.vue'
import Boat from '../views/Boats.vue'
import Driver from '../views/Drivers.vue'
import Review from '../views/Reviews.vue'
import Package from '../views/Packages.vue'
import Booking from '../views/Bookings.vue'
import Sailing from '../views/Sailings.vue'
import Wraft from '../views/Wraft.vue'
import Wuser from '../views/Wuser.vue'
import Wbooking from '../views/Wbooking.vue'
import Wreview from '../views/Wreview.vue'
import Wpackage1 from '../views/Wpackage1.vue'
import Wpackage2 from '../views/Wpackage2.vue'
import Wpackage3 from '../views/Wpackage3.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import ReportBooking from '../views/ReportBooking.vue'
import ReportDriver from '../views/ReportDriver.vue'
import CfSailing from '../views/Cf_Sailing.vue'
import Homes from '../views/Homes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users',
    name: 'User',
    component: User,
  },
  {
    path: '/rafts',
    name: 'Raft',
    component: Raft,
  },
  {
    path: '/boats',
    name: 'Boat',
    component: Boat,
  },
  {
    path: '/drivers',
    name: 'Driver',
    component: Driver,
  },
  {
    path: '/reviews',
    name: 'Review',
    component: Review,
  },
  {
    path: '/packages',
    name: 'Package',
    component: Package,
  },
  {
    path: '/bookings',
    name: 'Booking',
    component: Booking,
  },
  {
    path: '/sailings',
    name: 'Sailing',
    component: Sailing,
  },
  {
    path: '/wraft',
    name: 'Wraft',
    component: Wraft,
  },
  {
    path: '/wuser',
    name: 'Wuser',
    component: Wuser,
  },
  {
    path: '/wbooking',
    name: 'Wbooking',
    component: Wbooking,
  },
  {
    path: '/wreview',
    name: 'Wreview',
    component: Wreview,
  },
  {
    path: '/wpackage1',
    name: 'Wpackage1',
    component: Wpackage1,
  },
  {
    path: '/wpackage2',
    name: 'Wpackage2',
    component: Wpackage2,
  },
  {
    path: '/wpackage3',
    name: 'Wpackage3',
    component: Wpackage3,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/report-booking',
    name: 'ReportBooking',
    component: ReportBooking,
  },
  {
    path: '/report-driver',
    name: 'ReportDriver',
    component: ReportDriver,
  },
  {
    path: '/cf-sailings',
    name: 'Cfsailing',
    component: CfSailing,
  },
  {
    path: '/homes',
    name: 'homes',
    component: Homes,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

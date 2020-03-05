<template>
  <div >
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top" v-if="checkLoggedIn()">
      <router_link class="navbar-brand"  href="#">
          <button class="btn btn-light ml-2" type="button" v-on:click="openNav()">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div id="anvil-side-nav" class="sidenav shadow-lg bg-white rounded small">
            <div class="row">
                <img class="ml-4 " style="width: 150px ;height: auto" src="@/assets/full_logo.png">  
                <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a> 
                <div class="ml-2 dropdown-item" >{{username}}</div>  
                <a href="#" class=" ml-2 dropdown-item" v-on:click="logOut()">log out</a>                  
            </div>            
            <hr>
            <!-- members nav on mobile -->
            <router-link class="nav-link" :to="{name: 'memberList'}">                      
              <span  v-on:click="doAJAX(); closeNav()">
                  <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-people-48.png">
                  members
              </span>              
            </router-link> 
            <!-- groups side nav -->
            <router-link class="nav-link" :to="{name: 'groupsLanding'}">
              <span  v-on:click="doAJAX(); closeNav()">
                  <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-user-groups-48.png">
                groups
              </span>
            </router-link>
            <!-- events side nav -->
            <router-link class="nav-link" :to="{name: 'events'}">
              <span  v-on:click="doAJAX(); closeNav()">
                <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-schedule-64.png">
              events
            </span>
            </router-link>
            <!-- finace side nav -->
            <router-link class="nav-link" :to="{name: 'generalFinance'}">
              <span  v-on:click="doAJAX(); closeNav()">
                <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-money-48.png">
              finances
            </span>
            </router-link>
            <hr>
            <!-- more side nav -->
            <router-link class="nav-link" :to="{name: 'services'}">
            <span  v-on:click="doAJAX(); closeNav()">
              services
            </span>          
            </router-link> 
            <hr>
            <router-link class="nav-link" :to="{name: 'smsAnalytics'}">
            <span  v-on:click="doAJAX(); closeNav()">
                sms outbox
            </span>          
            </router-link>                                                                   
            <router-link class="nav-link" :to="{name: 'news'}">
            <span  v-on:click="doAJAX(); closeNav()">
              news & announcements
            </span>          
            </router-link>
            <hr>
            <router-link class="nav-link" :to="{name: 'myAccount'}">
            <span  v-on:click="doAJAX(); closeNav()">
              church account
            </span>        
            </router-link>                         
          </div>
                   
          <img class="mr-0" style="width: 150px ;height: auto" src="@/assets/text_logo.png">      
      </router_link>
      <div class="text-center col-lg-8">
        <generalsearch class="mr-2"/>
      </div>      
  </nav>
  <div class="vld-parent">
      <loading :active.sync="isLoading" 
               :can-cancel="false" 
                :on-cancel="onCancel"
                :is-full-page="fullPage">
      </loading>
      
  </div>
  <div id="main-app">
      <!-- the entire app lives here -->
      <router-view />
  </div>    
  </div>
</template>

<script>
import router from "./router";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import generalsearch from '@/subcomponents/generalsearch.vue'
export default {
  name: 'App',
  data () {
        return{                    
          fullPage: true,
          client_detail_available :false,
          client_details : localStorage.getItem('church_details')
        }
  },
  components: {
      Loading,generalsearch
  },
  created(){
    this.username = this.$session.get("username") 
    this.checkLoggedIn()    
  },
  computed: {
    username(){
      return this.$store.getters.logged_in_member      
    },
    isLoading (){
      return this.$store.getters.isLoading
    }
  },
  methods: {
    checkLoggedIn() {      
      if (!this.$session.has("token")) {          
          router.push("/login")
          return false
      }        
      this.$store.dispatch('update_logged_in_member', this.$session.get("username"))       
      return true                 
    },
    logOut() {      
      this.$session.destroy()
      router.push("/login")                 
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    doAJAX : function (){       
      this.isLoading = true
    },
    /* Set the width of the side navigation to 250px */
    openNav:function() {
      document.getElementById("anvil-side-nav").style.width = "250px"      
      document.getElementById("main-app").style.marginLeft = "100px"    
    },

    /* Set the width of the side navigation to 0 */
    closeNav:function() {
      document.getElementById("anvil-side-nav").style.width = "0"
      document.getElementById("main-app").style.marginLeft = "0"
      
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles/church-is.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

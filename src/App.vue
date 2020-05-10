<template>
  <div >
      <!-- when this div is hovered on , display side nav -->
    <div  v-if="checkLoggedIn()"
          style="position: fixed ;height: 100%; z-index: 9998;"
          class="d-flex flex-column justify-content-center p-1 "
          v-on:mouseover="openNav()">            
    </div>
    <section class="navbar navbar-expand-lg navbar-light sticky-top shadow-sm bg-frost" v-if="checkLoggedIn()">
      <button class="btn btn-light ml-3" type="button" v-on:click="openNav()">
          <span class="navbar-toggler-icon"></span>
      </button>      
      <!-- select logo  -->
      <img class="ml-4 " style="width: 150px ;height: auto" src="@/assets/text_logo.png" alt="logo not found"
            v-if="$host_name == 'my-domain' || $host_name == 'anvilchurch'" > 
      <img class="ml-4 " style="width: 100px ;height: auto ;border-radius: 5px" src="@/assets/methodist_logo3.png" alt="logo not found"
            v-if="$host_name == 'methodistkenya' " >        
      <div class="mt-2 col-sm-12 col-lg-8">
          <generalsearch />
      </div>           
    </section>
    <nav>        
      <div id="anvil-side-nav" class="sidenav shadow-lg bg-white rounded">
        <div class="row">            
            <a href="javascript:void(0)" class="closebtn text-secondary" v-on:click="closeNav()">&times;</a> 
            <h3 class="ml-4 mr-2 d-flex flex-wrap font-weight-bold" id=church-name-heading> church</h3>
            <div class="ml-1 dropdown-item" >{{username}}</div>  
            <a href="#" class=" ml-1 dropdown-item" v-on:click="logOut()">log out</a>                  
        </div>            
        <hr>
        <!-- members nav on mobile -->
        <router-link class="nav-link" :to="{name: 'memberList'}">                      
          <span  v-on:click="doAJAX(); closeNav()">
              <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-contacts-208.png">
              members
          </span>              
        </router-link> 
        <!-- groups side nav -->
        <router-link class="nav-link" :to="{name: 'groupsLanding'}">
          <span  v-on:click="doAJAX(); closeNav()">
              <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-user-groups-208.png">
            groups
          </span>
        </router-link>
        <!-- events side nav -->
        <router-link class="nav-link" :to="{name: 'events'}">
          <span  v-on:click="doAJAX(); closeNav()">
            <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-schedule-filled-100.png">
          events
        </span>
        </router-link>
        <!-- finace side nav -->
        <router-link class="nav-link" :to="{name: 'generalFinance'}">
          <span  v-on:click="doAJAX(); closeNav()">
            <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-expensive-filled-50.png">
          finances
        </span>
        </router-link>
        <hr>
        <!-- more side nav -->
        <router-link class="nav-link" :to="{name: 'services'}">
        <span  v-on:click="doAJAX(); closeNav()">
          <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-lecture-50.png">
          services
        </span>          
        </router-link> 
        <hr>
        <router-link class="nav-link" :to="{name: 'smsAnalytics'}">
        <span  v-on:click="doAJAX(); closeNav()">
            <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-outbox-50.png">
            sms outbox
        </span>          
        </router-link>                                                                   
        <router-link class="nav-link" :to="{name: 'news'}">
        <span  v-on:click="doAJAX(); closeNav()">
            <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-google-news-50.png">
          news & announcements
        </span>          
        </router-link>
        <hr>
        <router-link class="nav-link" :to="{name: 'myAccount'}">
        <span  v-on:click="doAJAX(); closeNav()">
          <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-resume-website-50.png">
          account & website
        </span>        
        </router-link>    
        <hr>
        <div class="mb-5 ml-2 mt-5 text-center bg-dark rounded"> 
          <p class="text-white">powered by</p>
          <img class="ml-4 " style="width: 150px ;height: auto" src="@/assets/full_logo.png">
        </div> 
        <!-- icons8 -->
        <div class="ml-4 mb-2">
          Icons by <a target="_blank" class="text-success" href="https://icons8.com">Icons8</a>
        </div>                      
      </div>                                
    </nav> 
    <!-- nav frost overlay -->
    <div id="nav-frost-overlay" class="d-none nav-frost-overlay" v-on:mouseover="closeNav()"></div>
    <!-- loader overlay -->
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
                :can-cancel="true" 
                :on-cancel="onCancel"
                :is-full-page="fullPage">
        </loading>      
    </div>
  <!-- the entire app lives here -->
  <section id="main-app" >     
      <router-view />
  </section>   
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
          church_detail : JSON.parse(localStorage.getItem('church_details')),
          // DOM
          anvil_side_nav:null,
          main_app:null,
          nav_frost_overlay:null
        }
  },
  components: {
      Loading,generalsearch
  },
  created(){
    this.username = this.$session.get("username") 
    this.checkLoggedIn()    
  },
  // when DOM is ready
  mounted(){
    //show nav menu
    this.anvil_side_nav = document.getElementById("anvil-side-nav")
    this.main_app = document.getElementById("main-app")
    this.nav_frost_overlay = document.getElementById("nav-frost-overlay")
        
    if (this.church_detail){
      var church_name_heading = document.getElementById("church-name-heading") 
      church_name_heading.innerHTML = this.church_detail[0].name
    }   
  },
  
  computed: {
    username:{
      get() {
        return this.$store.getters.logged_in_member 
      },      
      set(value){
        this.$store.commit('logged_in_member', value)
      }
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
      this.anvil_side_nav.style.width = "250px"      
      this.main_app.style.marginLeft = "100px"          
      this.nav_frost_overlay.classList.add("bg-frost")      
      this.nav_frost_overlay.classList.remove("d-none")
    },

    /* Set the width of the side navigation to 0 */
    closeNav:function() {
      this.anvil_side_nav.style.width = "0"
      this.main_app.style.marginLeft = "0"
      this.nav_frost_overlay.classList.remove("bg-frost")
      this.nav_frost_overlay.classList.add("d-none")
      
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles/church-is.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

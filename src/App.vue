<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="checkLoggedIn()">
      <router_link class="navbar-brand text-success"  href="#">
          <button class="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <img class="mr-0" style="width: 150px ;height: auto" src="@/assets/full_logo.png">      
      </router_link>
      <div class="row">
        <generalsearch class="mr-2  col-sm-12"/>
      </div>
      <div id="navbarNavDropdown" class="navbar-collapse collapse">

          <ul class="navbar-nav mr-auto" style="padding: 10px 10px 10px 10px">
              <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'memberList'}">                      
                    <span class="navButton" v-on:click="doAJAX">
                        <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-people-48.png">
                        members
                    </span>
                  </router-link> 
              </li>

              <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'groupsLanding'}">
                    <span class="navButton" v-on:click="doAJAX">
                        <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-user-groups-48.png">
                      groups
                    </span>
                  </router-link> 
              </li>

              <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'events'}">
                      <span class="navButton" v-on:click="doAJAX">
                        <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-schedule-64.png">
                      events
                    </span>
                  </router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'generalFinance'}">
                    <span class="navButton" v-on:click="doAJAX">
                      <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-money-48.png">
                    finances
                  </span>
                </router-link> 
            </li>
   
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                  more
                </a>
                <div class="dropdown-menu" style="padding: 5px 5px" aria-labelledby="navbarDropdownMenuLink">
                    
                    <router-link class="dropdown-item" :to="{name: 'services'}">services</router-link> 
                    <router-link class="dropdown-item" :to="{name: 'smsAnalytics'}">sms center</router-link>                                                                   
                    <hr>
                    <router-link class="dropdown-item" :to="{name: 'myAccount'}">church account</router-link> 
                </div>
            </li>

          </ul>
          <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" 
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    session
                  </a>
                  <div class="dropdown-menu" style="padding: 5px 5px" aria-labelledby="navbarDropdownMenuLink">
                                                                 
                      <div class="dropdown-item" >{{username}}</div>  
                      <a href="#" class="dropdown-item" v-on:click="logOut()">log out</a>                  
                  </div>
              </li>              
          </ul>
      </div>
  </nav>
  <div class="vld-parent">
      <loading :active.sync="isLoading" 
      :can-cancel="false" 
      :on-cancel="onCancel"
      :is-full-page="fullPage"></loading>
      
  </div>
    <div>
        <router-view/>
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
          client_details : null
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
  }
}
</script>

<style lang="scss">
  @import './assets/styles/church-is.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

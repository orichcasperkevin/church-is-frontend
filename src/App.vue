<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router_link class="navbar-brand text-success"  href="#" :to="{name: 'groupsLanding'}" >
        <img class="mr-0" style="width: 150px ;height: auto" src="@/assets/full_logo.png">|admin
      </router_link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
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
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-on:click="getClientDetail()">
                  more
                </a>
                <div class="dropdown-menu" style="padding: 5px 5px" aria-labelledby="navbarDropdownMenuLink">
                    
                    <router-link class="d-none dropdown-item" :to="{name: 'dailyVerse'}">daily verses</router-link>
                    <router-link class="d-none dropdown-item" :to="{name: 'sermons'}">sermons</router-link>                            
                    <router-link class="dropdown-item" :to="{name: 'services'}">services</router-link> 
                    <br><br>                    
                    
                    <div class="card" style="width: 18rem;" v-if="client_detail_available" >                      
                      <div class="card-body" v-if="client_details.length">
                        <h5 class="card-title">
                          {{client_details[0].client.name}}
                           <span class="badge badge-light">{{client_details[0].number_of_members}} members</span>
                           <span class="badge badge-light">{{client_details[0].number_of_sms}} sms since last credit</span>
                         </h5>
                       
                        <h6 class="card-subtitle mb-2">
                          church code
                          <span class="badge badge-light text-info">
                            <h5>{{client_details[0].church_code}}</h5></span>                       
                        </h6>
              
                        <p class="card-text">{{client_details[0].city_or_town | }},{{client_details[0].road_or_street}} {{client_details[0].location_description}}</p>
                        <p class="card-text">website: {{client_details[0].website | none given}}</p>  
                        <div >
                            <button disabled type="button" class="btn btn-success">
                                credit <span class="badge badge-light">
                                   {{client_details[0].credit}}
                                </span>
                            </button>

                             <p><i> apprx {{client_details[0].apprx_number_of_days_left}} days left</i></p>
                        </div>                       
                                            
                      </div>
                    </div>

                </div>
            </li>

          </ul>
          <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
      Loading
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
    getClientDetail: function(){
      this.client_detail_available = true
      var church_id = localStorage.getItem('church_id')
      this.$http.get(this.$BASE_URL + '/api/clients/client-detail/' + church_id +'/')
        .then(response => {
          this.client_details = response.data   
          console.log(this.client_details)                                    
        
        })
        .catch((err) => {
          this.login_error.push("church code not set")        
        })
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles/church-is.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

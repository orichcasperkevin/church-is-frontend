<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router_link class="navbar-brand"  href="#" :to="{name: 'groupsLanding'}" >nanocomputing ChMs</router_link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavDropdown" class="navbar-collapse collapse">

          <ul class="navbar-nav mr-auto" style="padding: 10px 10px 10px 10px">
              <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'memberList'}"><span class="navButton">members</span></router-link> 
              </li>

              <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'groupsLanding'}"><span class="navButton">groups</span></router-link> 
              </li>

                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'events'}"><span class="navButton">events</span></router-link> 
                </li>
   
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  more
                </a>
                <div class="dropdown-menu" style="padding: 5px 5px" aria-labelledby="navbarDropdownMenuLink">
                    
                    
                    <router-link class="dropdown-item" :to="{name: 'projectList'}">                      
                        <img style="width: 20%; height: auto" src="@/assets/icons/icons8-group-of-projects-filled-50.png">
                        projects
                    </router-link>
                    <router-link class="dropdown-item" :to="{name: 'generalFinance'}">
                        <img style="width: 20%; height: auto" src="@/assets/icons/icons8-expensive-filled-50.png">
                        finances
                    </router-link>
                    <hr/>
                    <router-link class="dropdown-item" :to="{name: 'dailyVerse'}">daily verses</router-link>
                    <router-link class="dropdown-item" :to="{name: 'sermons'}">sermons</router-link>                            
                    <router-link class="dropdown-item" :to="{name: 'services'}">services</router-link>                  
                    <hr/>
                    <router-link class="dropdown-item" :to="{name: 'login'}">logout {{username}}</router-link>                     
                 


                </div>
            </li>
          </ul>
      </div>
  </nav>
    <router-view/>
  </div>
</template>

<script>
import router from "./router";
export default {
  name: 'App',
  data () {
        return{
          username: null
        }
    },
  created(){
    this.checkLoggedIn()
  },
  watch: {
    username: function(){      
      this.username = this.$session.get("username")      
    }
  },
  methods: {
    checkLoggedIn() {      
      if (!this.$session.has("token")) {          
          router.push("/login")
          return false
      }      
      return true                 
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles/church-is.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

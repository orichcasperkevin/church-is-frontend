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
              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'generalFinance'}"><span class="navButton">finances</span></router-link> 
            </li>
   
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  more
                </a>
                <div class="dropdown-menu" style="padding: 5px 5px" aria-labelledby="navbarDropdownMenuLink">
                    
                    <router-link class="dropdown-item" :to="{name: 'dailyVerse'}">daily verses</router-link>
                    <router-link class="dropdown-item" :to="{name: 'sermons'}">sermons</router-link>                            
                    <router-link class="dropdown-item" :to="{name: 'services'}">services</router-link>                  
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
    <router-view/>
  </div>
</template>

<script>
import router from "./router";
export default {
  name: 'App',
  data () {
        return{
          username: null, 
        }
    },
  created(){
    this.username = this.$session.get("username") 
    this.checkLoggedIn()    
  },
  methods: {
    checkLoggedIn() {      
      if (!this.$session.has("token")) {          
          router.push("/login")
          return false
      }  
      this.username = this.$session.get("username")       
      return true                 
    },
    logOut() {      
      this.$session.destroy()
      router.push("/login")                 
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles/church-is.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<template>
    <div class="Home">
        <div class="container">
            <div class="church-is-home row align-items-center">
              <div class="col-sm">
                  <router-link :to="{name: 'memberList'}">
                      <div class="home-menu-item border-0">
                          <img style = "height: 64px "src="@/assets/icons/icons8-contacts-208.png">
                        <p>members</p>
                      </div>
                  </router-link>  
                <div>
                    <ul class="list-group list-group-flush">
                      
                      </ul>
                </div>
              </div>
              <div class="col-sm">
                  <router-link :to="{name: 'groupsLanding'}">
                      <div class="home-menu-item border-0">
                        <img style = "height: 64px "src="@/assets/icons/icons8-user-groups-208.png"> 
                        <p>groups</p>
                      </div> 
                  </router-link>
                  <div>
                      <ul class="list-group list-group-flush">
                         
                        </ul>
                  </div>
                </div>
                <div class="col-sm">
                    <a href="#">
                        <div class="home-menu-item border-0">
                            <img style = "height: 64px "src="@/assets/icons/icons8-schedule-filled-100.png">
                          <p>events</p>
                        </div>
                    </a>  
                    <div>
                        <ul class="list-group list-group-flush">
                  
                          </ul>
                    </div>
                  </div>
            </div>
          </div>
    </div>
  </template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>


<style >
</style>

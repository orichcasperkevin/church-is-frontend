<template>
    <div class="Home">
        <div class="container">
            <div class="church-is-home row align-items-center">
              <div class="col-sm">
                  <router-link :to="{name: 'memberList'}">
                      <div class="home-menu-item border-0">
                        members
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
                        groups
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
                          events
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

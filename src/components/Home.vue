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
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Morbi leo risus</li>
                        <li class="list-group-item">Porta ac consectetur ac</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                      </ul>
                </div>
              </div>
              <div class="col-sm">
                  <a href="#">
                    <div class="home-menu-item border-0">
                      groups
                    </div>
                  </a>  
                  <div>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">Cras justo odio</li>
                          <li class="list-group-item">Dapibus ac facilisis in</li>
                          <li class="list-group-item">Morbi leo risus</li>
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
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
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

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavDropdown" class="navbar-collapse collapse">

          <ul class="navbar-nav mr-auto" style="padding: 10px 10px 10px 10px">
              <li class="nav-item">
                  <a class="nav-link" href="#">members</a>
              </li>

              <li class="nav-item">
                  <a class="nav-link" href="#">groups</a>
              </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">events</a>
                </li>
   
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  more
                </a>
                <div class="dropdown-menu" style="padding: 5px 5px" aria-labelledby="navbarDropdownMenuLink">
                    <a class=" church-is-dropdown-item dropdown-item " href="#">finances</a>
                    <a class="dropdown-item" href="#">members & roles</a>
                    <hr/>
                    <a class="dropdown-item" href="#">daily verses</a>
                    <a class="dropdown-item" href="#">sermons</a>
                    <a class="dropdown-item" href="#">services</a>
                    <hr/>
                    <a class="dropdown-item" href="#">news</a>
                    <a class="dropdown-item" href="#">blog</a>


                </div>
            </li>
          </ul>
      </div>
  </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './assets/styles/church-is.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

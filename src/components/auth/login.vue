<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-12 col-sm-10 col-md-8 col-lg-1"></div>
        <div style="padding: 10px">
          <div class="card" style="background-color: ghostwhite">
            <div class="card-header">
              <p>Nano Computing ChMs login</p>
            </div>
            <div class="card-body">
              <form>
                <div>
                  <ul v-if="login_error.length">

                    <li v-for="error in login_error">
                      <small class="text-danger">{{ error }}</small>
                    </li>
                  </ul>

                  <ul v-if="login_info.length">
                    <li v-for="error in login_info" class="text-info">
                      <small>{{ error }}</small>
                    </li>
                  </ul>

                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">username</label>
                  <input @keyup.enter="getToken()"
                         type="text" class="form-control"
                         id="exampleInputEmail1" aria-describedby="emailHelp"
                         placeholder="Enter username" v-model="username">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input @keyup.enter="getToken()"
                         type="password" class="form-control"
                         id="exampleInputPassword1" placeholder="Password"
                         v-model="password">
                </div>
                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">stay logged in</label>
                </div>
                <a href=# v-on:click="getToken()" style="text-decoration: none">
                  <div class="add-button">
                    <span>login</span>
                  </div>
                </a>
              </form>
            </div>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>

  import router from "../../router";

  export default {
    name: 'login',
    data() {
      return {
        username: null,
        password: null,
        login_error: [],
        login_info: []

      }
    },
    methods: {
      getToken: function () {
        this.login_info = []
        this.login_error = []
        this.login_info.push("authenticating...")
        this.$http({
          method: 'post',
          url: this.$BASE_URL + '/api/token/',
          data: {
            username: this.username,
            password: this.password
          }
        }).then(response => {
          this.login_info = []
          this.login_error = []
          this.login_info.push("logging you in...")
          this.$session.start();
          this.$session.set('token', response.data.access)
          this.$session.set('username', this.username)
          //get logged in member data
          this.$http.get(this.$BASE_URL + '/api/members/member/' + this.$session.get('username') + '/')
            .then(response => {
              console.log(response.data[0].member.id)
              this.$session.set('member_id', response.data[0].member.id)
              console.log("finished")
            })
            .catch((err) => {
              this.fetch_data_error.push(err)
            })
          router.push('/');
        })
          .catch((err) => {
            this.login_info = []
            this.login_error = []
            this.login_error.push("LOGIN ERROR. check your username password combination")

          })
      }
    }
  }
</script>


<style>
</style>

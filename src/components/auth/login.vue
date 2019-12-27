<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        
        <div style="padding: 10px">
          <div class="card w-400" style="background-color: ghostwhite">
            <div class="card-header text-center">
              <img class="mr-0 " style="width: 50px ;height: auto" src="@/assets/app_logo.png">
              <p>church admin login</p>
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
                  <label for="exampleInputEmail1">church code</label>
                  <input @keyup.enter="getToken()"
                         type="number" class="form-control"                         
                         placeholder="000" v-model="church_code">
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
        church_code: null,
        username: null,
        password: null,
        login_error: [],
        login_info: []

      }
    },
    watch: {
      church_code:function(){ 
        this.login_info = []
        this.login_error = []             
        if (this.church_code.toString().length == 3){                  
          var church_id = parseInt(this.church_code)
          this.$http.get(this.$DOMAIN.value + '/api/clients/client/' + church_id + '/')
            .then(response => {
              var data = response.data              
              this.$BASE_URL.value = "http://"+ data[0].domain_url                  
              localStorage.setItem('church_id', church_id )
            })
            .catch((err) => {
              this.login_error.push("church code not set")        
            })
        }
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
          this.getLoggedInMemberData()
          router.push('/');
        })
          .catch((err) => {
            this.login_info = []
            this.login_error = []
            this.login_error.push("invalid credentials!")

          })
      },
      getLoggedInMemberData: function(){
        this.$http.get(this.$BASE_URL + '/api/members/member/' + this.$session.get('username') + '/')
            .then(response => {
              this.$session.set('member_id', response.data[0].member.id)
            })
            .catch((err) => {
              this.fetch_data_error.push(err)
            })
      }
    }
  }
</script>


<style>
</style>

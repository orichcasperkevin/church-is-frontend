<template>
    <div style="background-color: gainsboro">
        <div class="center-div col-4" style="padding: 40px">
              <div class="card">
                <div class="card-header">
                  nanocomputing church MS login
                </div>
                <div class="card-body">
                    <form>
                        <div>
                                <p v-if="login_error.length">
                                        <ul>
                                                <small><li v-for="error in login_error"><p class="text-danger">{{ error }}</p></li></small>
                                        </ul>
                                </p>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail1">username</label>
                          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" v-model="username">                        
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                        </div>
                        <div class="form-group form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1">
                          <label class="form-check-label" for="exampleCheck1">stay logged in</label>
                        </div>
                        <a href=# v-on:click="getToken()">                        
                            <div class="add-button" style="text-align: center">
                                login 
                            </div>
                        </a>
                      </form>
                </div>
              </div>              
        </div>
    </div>
</template>

<script>

import router from "../../router";

export default {
    name: 'login',
    data () {
        return{
            username: null,
            password: null,
            login_error: []

        }
    },
    created () {
        this.fetchdata()
    },
    watch: {
        '$route': 'fetchData',
    },
    methods: {
        getToken: function (){
            this.$http({
                        method:'post',
                        url: this.$BASE_URL + '/api/token/',
                        data: {
                             username: this.username,
                             password: this.password
                        }
                }).then(response => {
                    this.login_error = []
                    this.$session.start();
                    this.$session.set('token', response.data.access);
                    this.$session.set('username', this.username) 
                    router.push('/');  
                })
                    .catch((err) => {
                        this.login_error = []
                        this.login_error.push("LOGIN ERROR !!. check your username password combination")

                })
        }
    }
}
</script>


<style >
</style>
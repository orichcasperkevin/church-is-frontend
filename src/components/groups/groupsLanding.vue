<template>
    <div class="groupsLanding">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
                <li class="breadcrumb-item active" aria-current="page">groups</li>
            </ol>
    </nav>
    <div class="container">
            <div class="row">
              <div class="col-sm-10 col-md-5 col-lg-3">
                    <div class="list-group ">
                            <router-link :to="`/groupList/`+ `fellowship`" class="action-list list-group-item list-group-item-action border-0"><img  class= "church-is-menu" src="@/assets/icons/icons8-user-groups-40.png"> fellowships</router-link>
                            <router-link :to="`/groupList/`+ `church-group`" class="list-group-item list-group-item-action border-0"><img  class="church-is-menu" src="@/assets/icons/icons8-user-groups-40.png">  church groups</router-link>
                            <router-link :to="`/groupList/`+ `ministrie`" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-user-groups-40.png">  ministries </router-link>
                            <router-link :to="`/groupList/`+ `cell-group`"class="list-group-item list-group-item-action border-0"><img  class="church-is-menu" src="@/assets/icons/icons8-user-groups-40.png"> cell groups</router-link>
                            
                    </div>  
                    <div class="list-group" style="padding: 20px 0px 20px 0px">
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-cancel-26.png"> delete</router-link>
                    </div>
              </div>
              <div class="col-sm-10 col-md-8 col-lg-9">
                <router-view >

                </router-view>
              </div>
            </div>
          </div>
    </div>
  </template>

<script>
import router from "../../router";
export default {
  name: 'groupsLanding',
  data () {
    return {
        
    }
  },
  created() {
        console.log("dsiuhodjsoijed")
        this.checkLoggedIn()       
    },
  watch: {
        '$route': 'fetchData'
    },
  methods: {
    checkLoggedIn() {
            if (!this.$session.has("token")) {
                router.push("/login")
            }
        }
}
}
</script>


<style >
</style>
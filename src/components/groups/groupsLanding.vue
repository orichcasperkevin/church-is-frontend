<template>
    <div class="groupsLanding">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name: 'Home'}">Home</router-link> 
                <li class="breadcrumb-item active" aria-current="page">groups</li>
            </ol>
    </nav>
    <div class="container">
            <div class="row">
              <div class="col-3">
                    <div class="list-group ">
                            <router-link :to="`/groupList/`+ `fellowship`" class="action-list list-group-item list-group-item-action border-0"><img  src="@/assets/icons/icons8-user-groups-40.png"> fellowships</router-link>
                            <router-link :to="`/groupList/`+ `church-group`" class="list-group-item list-group-item-action border-0"><img  src="@/assets/icons/icons8-user-groups-40.png">  church groups</router-link>
                            <router-link :to="`/groupList/`+ `ministry`" class="list-group-item list-group-item-action border-0"><img  src="@/assets/icons/icons8-user-groups-40.png">  ministries </router-link>
                            <router-link :to="`/groupList/`+ `cell-group`"class="list-group-item list-group-item-action border-0"><img  src="@/assets/icons/icons8-user-groups-40.png"> cell groups</router-link>
                            
                    </div>  
                    <div class="list-group" style="padding: 20px 0px 20px 0px">
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-cancel-26.png"> delete</router-link>
                    </div>
              </div>
              <router-view class="col-9">

              </router-view>
            </div>
          </div>
    </div>
  </template>

<script>
export default {
  name: 'groupsLanding',
  data () {
    return {
        
    }
  },
  created() {
        this.fetchData()
    },

  watch: {
        '$route': 'fetchData'
    },
  methods: {
        fetchData() {
            
            
        }
      
    }

}
</script>


<style >
</style>
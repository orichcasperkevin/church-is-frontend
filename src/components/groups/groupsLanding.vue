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
        <div class="col">
            <h3 class="row">                                     
              Groups    
            </h3>
            <p class="row">
              folders |<b class="text-info">{{foundItems}}</b>|  groups |<b class="text-info">{{foundItems_independent}}</b>|
            </p>          
        </div>
      </div>
      <hr>
    </div>
    <div class="container">      
      <div class="row">
        <div class="col-sm-10 col-md-5 col-lg-3"> 
              <b>folders  
                |<a class="text-success" href="#" data-toggle="modal" data-target="#addModal" style="text-decoration: none" v-on:click="selectFolder()">
                 + add 
                </a>|
              </b>
              <div class="list-group" v-for="data in groups.response">
                <router-link :to="`/groupList/`+ data.id + `/` + data.name"class="list-group-item list-group-item-action border-0" >
                  <img  class="church-is-menu" src="@/assets/icons/icons8-user-groups-40.png">
                    {{data.name}} <span class="badge badge-pill badge-secondary">{{data.number_of_groups}}</span>  
                </router-link>
              </div>  
              <hr>
              <b>groups
                |<a class="text-success" href="#" data-toggle="modal" data-target="#addModal" style="text-decoration: none">
                  + add 
                </a>|
              </b> 
              <div class="list-group" v-for="data in independent_groups.response">
                <router-link  :to="`/groupDetail/`+ data.id" class="list-group-item list-group-item-action border-0" >
                  {{data.name}} <span class="badge badge-pill badge-secondary">{{data.number_of_members}}</span>
                </router-link>
              </div>            
        </div>
      <div class="col-sm-10 col-md-8 col-lg-9">
          <router-view >

          </router-view>
      </div>
        <!-- Modal add group -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">add group / folder</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fetchData()">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">                    
                    <div class="form-group">
                            <label for="addGroup"> name</label>
                            <input type="text" class="form-control" id="addGroup" autofocus v-model="name"></input>
                            <p v-if="name_errors.length">
                                    <ul>
                                            <small><li v-for="error in name_errors"><p class="text-danger">{{ error }}</p></li></small>
                                    </ul>
                            </p>
                    </div>
                    <div class="form-group">
                        <label for="addGroupDescription">description</label>
                        <textarea class="form-control" id="addGroupDescription" rows="3" v-model="description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchData()">Close</button>
                    <button type="button" class="btn btn-success" v-on:click="addGroup()"><b>+</b> add </button>
                </div>
                </div>
            </div>
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
      groups: null,independent_groups: null,
      foundItems: null,foundItems_independent: null,
      fetch_data_error: [],
      //add group
      group_type: 'group',
      name: '',name_errors: [],description: '',
      add_group_error: null
    }
  },
  created() {        
        this.checkLoggedIn()       
        this.fetchData()
    },
  watch: {
        '$route': 'fetchData'
    },
  methods: {
    checkLoggedIn() {
      if (!this.$session.has("token")) {
          router.push("/login")
      }
    },
    fetchData() {
      this.fetch_data_error = []
      // get folders (group of groups)
      this.$http.get(this.$BASE_URL + '/api/groups/group-of-church-groups-list')
      .then(response => {
          this.groups = {"response": response.data } 
          var array = this.groups.response
          this.foundItems = array.length
      })
      .catch((err) => {
          this.fetch_data_error.push(err)
      })
      // get independent groups
      this.$http.get(this.$BASE_URL + '/api/groups/church-groups-not-in-group/')
      .then(response => {
          this.independent_groups = {"response": response.data } 
          var array = this.independent_groups.response
          this.foundItems_independent = array.length
      })
      .catch((err) => {
          this.fetch_data_error.push(err)
      })
    },
    selectFolder: function(){
      this.group_type = 'folder'
    },
    addGroup: function(){
        var url = ''
        this.name_errors = [],
        this.description_errors = []

        if (! this.name){
            this.name_errors.push('you must have a name for the group')
        }
        if (! this.description){
            this.description = 'none given'
        }
        if (this.group_type == 'folder'){
          url = '/api/groups/group-of-church-groups-list/'
        } 
        if (this.group_type == 'group'){
          url = '/api/groups/add-group/'
        }           
        this.$http({ method: 'post', url: this.$BASE_URL + url,
        data: {
            group_of_groups_id: null,
            name: this.name,
            description: this.description
        }
        }).then(response => {                 
            this.name = ''
            this.description = ''
            this.group_type = 'group'
            if (this.group_type == 'folder'){
              alert("folder succesfully added")
            }
            if (this.group_type == 'group'){
              alert("group succesfully added")
            }            
        })
            .catch((err) => {
            this.group_type = 'group'
            this.add_group_error.push(err)
        })            
    }
      
  }
}
</script>


<style >
</style>
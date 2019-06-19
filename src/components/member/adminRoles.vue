<template>
    <div >
        <nav aria-label="breadcrumb" >
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'memberList'}">members</router-link></span> 
                <li class="breadcrumb-item active" aria-current="page">admin roles</li>
            </ol>
          </nav>
          <div class="container">
            <div class="row">
                <div class="col-3">
                        <button class="btn btn-primary" v-if="member_found" v-on:click="backToSearch()"><< back to search</button>
                </div>
                <div class="col">
                    <div class="form-group" v-if="! member_found">
                        <label class=""><b>search member:</b></label>

                        <div class="">                       
                              <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch" autofocus>   
                              <div style="padding: 10px 10px 10px 10px" class="text-info" >{{memberSearch_status}}</div> 

                              <div class="pre-scrollable searchedItemsDiv border " style="  max-height: 185px; overflow-y: scroll;" v-if="showMemberInput">
                                <table class="table border-0" >
                                <tbody>
                                    <tr class="searchedItem border-0" v-for="data in found_members.response">
                                    <a href="#" style="text-decoration: none" v-on:click="selectMember(data.member.id,data.member.first_name,data.member.last_name)"> 
                                    <td class="border-0">
                                        
                                            <img v-if = "data.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                            <img v-if = "data.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                                            <img v-if = "data.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                                            
                                        <span class = "text-secondary">{{data.member.first_name}} {{data.member.last_name}}</span>                                                                      
                                        </td>
                                    </a>                                                                                                                                  
                                    </tr>
                                </tbody>
                                </table>
                            </div>                                                    
                        </div>                                                                   
                      </div>
                     

                    <div v-if = "member_found">                                            
                        <div  >                    
                            <div class="home-menu-item">
                                <h3> {{memberSearch_status}} <span class="text-info"></span></h3>
                            </div>
                            <hr/>
                            <div class="row">
                              <div style="padding: 10px">                                                              
                                <div class=" row">                                       
                                    <table class="table">
                                        <thead>
                                            <tr> </tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <th> role</th>                                                
                                                <th> member admin</th>
                                                <th> group admin</th>
                                                <th> event admin</th>
                                                <th> projects admin</th>
                                                <th> finance admin</th>
                                                <th> site admin</th>
                                            </tr>                                             
                                            <tr v-for="data in roles.response">
                                                <td><span v-for="data2 in roles_for_member.response">
                                                    <span v-if =" data2.role.role == data.role"><input multiple class="form-check-input" type="checkbox" :value=data.id v-model="selected_role" disabled ></span>
                                                    <span v-else>  <input multiple class="form-check-input" type="checkbox" :value=data.id v-model="selected_role"> </span>
                                                </span></td>                                                
                                                <td>{{data.role}}</td>                                                
                                                <td v-if="data.member_admin"><span class="badge badge-pill badge-success"> yes</span> </td>
                                                <td v-else><span class="badge badge-pill badge-danger">no</span></td>
                                                <td v-if="data.member_admin"><span class="badge badge-pill badge-success"> yes</span> </td>
                                                <td v-else><span class="badge badge-pill badge-danger">no</span></td>
                                                <td v-if="data.event_admin"><span class="badge badge-pill badge-success"> yes</span> </td>
                                                <td v-else><span class="badge badge-pill badge-danger">no</span></td>
                                                <td v-if="data.projects_admin"><span class="badge badge-pill badge-success"> yes</span> </td>
                                                <td v-else><span class="badge badge-pill badge-danger">no</span></td>
                                                <td v-if="data.finance_admin"><span class="badge badge-pill badge-success"> yes</span> </td>                                                
                                                <td v-else><span class="badge badge-pill badge-danger">no</span></td>
                                                <td v-if="data.site_admin"><span class="badge badge-pill badge-success"> yes</span> </td>
                                                <td v-else><span class="badge badge-pill badge-danger">no</span></td>
                                            </tr>                                                                               
                                        </tbody>
                                    </table>
                            </div>                                                           
                              </div>
                              <hr/>                          
                            </div>                            
                        </div>
                    </div>
                    <hr/>
                    <div style="padding: 0px 0px 25px 0px" v-if = "member_found">
                            <a href="#" v-on:click = "selectRole()" style="text-decoration: none" >
                                <div class="add-button">
                                    assign role(s)
                                </div>
                            </a>
                    </div>     
                </div>
                <div class="col-3">                     
                </div>
            </div>
          </div>
    </div>
</template>

<script>

import router from "../../router";

export default {
    name: 'adminRoles',
    data () {
        return{
            fetch_data_error: [],
            roles: null,
            selected_role: [],
            roles_for_member: null,            
            memberSearch: '',found_members:[],
            memberSearch_status: '',selectedMember: null,
            showMemberInput: false,
            member_found: false
        }
    },
    created () {
        this.fetchdata()
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    watch: {
    // whenever member search changes, this function will run
    memberSearch: function () {
            if (this.memberSearch.length > 0){
                this.showMemberInput = true
                this.memberSearch_status = 'typing...'
                this.debouncedGetAnswer()
            }else{
                this.memberSearch_status = ''
                this.found_members = []
                this.showMemberInput = false
                this.fetchData()
            }
        }
     },
     methods: {
        fetchdata () {
            this.fetch_data_error = []
            this.$http.get(this.$BASE_URL +'/api/members/role-list/')
                .then(response => {
                this.roles = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })                  
            
        },
        get_roles_for_member: function (){
            this.$http.get(this.$BASE_URL +'/api/members/roles-for-member/'+ this.selectedMember + '/')
                .then(response => {
                this.roles_for_member = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        },
        backToSearch: function () {
            this.member_found = false
            this.memberSearch = ''
        },
        getAnswer: function () {
          var vm = this
          if (this.memberSearch.length > 0){
            this.found_members = []
            this.memberSearch_status = 'searching...'
            this.$http.get(this.$BASE_URL + '/api/members/filter-by-first_name/' + this.memberSearch +'/')
              .then(function (response) {
                vm.found_members = {"response": response.data } 
                vm.memberSearch_status = ''
              })
              .catch(function (error) {
              })
            }
        },
        selectMember: function(id,first_name,last_name) {
          this.selectedMember = id          
          this.memberSearch_status = 'assign role(s) for ' + first_name + ' ' + last_name + '.'
          this.showMemberInput = false
          this.member_found = true
          this.get_roles_for_member()
        },
    }
}
</script>


<style >
</style>
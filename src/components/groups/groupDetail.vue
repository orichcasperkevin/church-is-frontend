<template>
    <div>
        <!-- this compnent requires text message modal -->
        <textmessage :memberIds="member_ids"/> 

        <nav aria-label="breadcrumb" class="container">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>
                  <li class="breadcrumb-item"><span class="backButton"><router-link href="#" style="text-decoration: none" :to="{name: 'groupsLanding'}">groups</router-link></span>
                <li class="breadcrumb-item active" aria-current="page" v-for="data in group.response">{{data.name}}</li>
            </ol>
        </nav>
        <body>
            <div class="container">
                <div class="row ml-2">
                  <div class="col" v-for="data in group.response">
                      <h3 class="row">
                        <b>{{data.name}}</b>
                      </h3>
                      <p class="row small">{{data.description}}  </p>
                  </div>
                </div>
                <hr>
              </div>
            <div class="container">
            <div class="row">

            <div class="col-sm-10 col-md-8 col-lg-2 mb-3" style="padding: 0px 0px 0px 0px">
                <nav class="nav nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a class="action-list list-group-item list-group-item-action border-0 active"
                    data-toggle="pill" href="#member" role="tab" aria-controls="members" aria-selected="true" >
                    <img  style="width: 30px; height: auto; " src="@/assets/icons/icons8-user-groups-40.png"> members
                  </a>
                  <a class="action-list list-group-item list-group-item-action border-0 "
                    data-toggle="pill" href="#activity" role="tab" aria-controls="activity" v-on:click="getGroupActivity()">
                      <img style="width: 30px; height: auto;" src="@/assets/icons/icons8-activity-history-48.png">  activity
                  </a>
                </nav>
                               

            </div>

            <div class="tab-content col" >
              <!-- GROUP MEMBERS -->
              <div class="tab-pane fade show active" id="member" role="tabpanel" aria-labelledby="profile-tab">
                <div class = "center-div" v-if = "fetch_data_error.length > 0">
                  <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
                  <p class="text-info">check your connection</p>
                </div>
                <div v-if = "fetch_data_error.length == 0">
                <div>                   
                    <span aria-current="page" v-for="data in group.response" class="row">
                      <hr class="d-sm-block d-lg-none">  
                      <h3 class="ml-3">
                         members
                      </h3>
                      <!-- on small devices -->
                      <span class=" btn btn-success  d-sm-block d-md-none mx-auto"
                            data-toggle="modal" data-target="#addMemberToGroup">                        
                            + add member
                      </span> 
                    </span>                   
                    <hr/>
                  <div class="row mb-1">
                      <p class="ml-4">
                      found <span class="badge badge-pill badge-secondary">{{foundItems}}</span>
                      </p>
                      <div class="btn-group d-sm-block d-md-none ml-2">
                          <a href="#" style="text-decoration: none">
                              <div class="btn btn-light">
                                actions
                              </div>
                            </a>
                          <button type="button" class="btn btn-sm btn-light dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                            <span class="sr-only">Toggle Dropdown</span>
                          </button>
                          <div class="dropdown-menu border-light" aria-labelledby="dropdownMenuReference">
                            <!-- when device is a phone -->
                            <div class="list-group ">
                                <button type="button" class="action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" >
                                  <img src="@/assets/app_logo.png" style="width: 25px; height:auto">
                                  anvil channels
                                </button>
                                <button type="button" class="d-none action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/icons/icons8-email-64.png">email</button>
                                <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter">
                                  <img src="@/assets/icons/icons8-comments-64.png" style="width: 25px; height:auto">
                                  text members
                                </button>
          
                            </div>                           
                          </div>
                      </div>
                  </div>                  
                </div>
                </div>
                    <div v-if="! members.response.length" class="text-center text-muted">
                        <h3>Oops!</h3>
                        <h3>Group has no members added</h3>
                        <p>add members to group so that we can list them</p>
                    </div>
                    <table class="table">
                      <tbody>
                        <tr>                            
                            <th class="anvil-checkbox">                                
                                  <label class="anvil-checkbox">all
                                      <input type="checkbox" :value=true v-model="all_members">
                                      <span class="anvil-checkmark"></span>
                                  </label>
                            </th>
                            <th>names</th>
                            <th>role</th>
                        </tr>
                        <tr v-for="data in members.response">   
                          <td >                                  
                                <label class="anvil-checkbox">
                                    <input multiple type="checkbox" :value=data.member.member.id v-model="member_ids">
                                    <span class="anvil-checkmark"></span>
                                </label>
                          </td>                                               
                          <td >
                            <img v-if = "data.member.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                            <img v-if = "data.member.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                            <img v-if = "data.member.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                            <router-link :to="`/memberDetail/`+ data.member.member.id">
                              <span class = "text-secondary">{{data.member.member.first_name}} {{data.member.member.last_name}} </span>
                            </router-link>
                           </td>
                           <td class="text-muted">
                             {{data.role.role}}
                           </td>
                        </tr>
                      </tbody>
                    </table>
              </div>
               <!-- GROUP ACTIVITY -->
              <div class="tab-pane fade" id="activity" role="tabpanel" >   
                <hr class="d-sm-block d-lg-none">  
                <h3>Activity</h3>            
                <hr>
                <div v-if="group_meetings">
                    <div v-if="group_meetings.length">                        
                        <table class="table table-responsive-sm">
                            <thead>
                              <tr>                                
                                <th scope="col">event</th>
                                <th scope="col">start</th>
                                <th scope="col">end</th>
                                <th scope="col">attenders</th>
                              </tr>
                            </thead>                                                      
                            <tbody>
                              <tr v-for="meeting in group_meetings" class="text-muted">                                
                                <td>                                    
                                    <router-link class="text-muted"  :to="`/eventDetail/`+ meeting.event.id + `/`">                                                         
                                      {{meeting.event.title}}
                                    </router-link>
                                </td>
                                <td>{{meeting.event.start}}</td>
                                <td>{{meeting.event.end}}</td>
                                <td>
                                    <span class="badge badge-pill badge-secondary">
                                        {{meeting.event.attendees}}
                                    </span>
                                    of
                                    <span class="badge badge-pill badge-secondary">
                                        {{meeting.group.number_of_members}}
                                    </span>
                                </td>
                              </tr>                              
                            </tbody>
                          </table>
                    </div>
                    <div class="text-muted text-center" v-else>
                        <h3>Oops!</h3>
                        <h3>Group has not had any meetings recently</h3>
                        <p>mark event registers by this group to get content here</p>
                    </div>
                </div>                  
              </div>
              </div>
              <div class="col-12 col-sm-10 col-md-8 col-lg-3 d-sm-none d-md-block">
                <div class="btn-group" style="padding: 0px 0px 25px 0px">
                  <a href="#" data-toggle="modal" data-target="#addMemberToGroup" style="text-decoration: none">
                      <div class="add-button">
                      <span> <b>+</b> Add member to group</span>
                      </div>
                  </a>                 
                  <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                      <a class="d-none dropdown-item" href="#" data-toggle="modal" data-target="#importCSV"><b>+</b> import from csv</a>
                  </div>
                </div>
                  <div class="list-group ">
                      <button type="button" class="action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/app_logo.png" style="width: 55px; height:auto">. anvil channels</button>
                      <button type="button" class="d-none action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/icons/icons8-email-64.png">email</button>
                      <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter"><img src="@/assets/icons/icons8-comments-64.png">text members</button>

                  </div>
                <!-- Modal add member to group -->
                  <div class="modal fade" id="addMemberToGroup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalCenterTitle">add member to group</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fetchData()">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">                            
                            <div class="form-group">
                                <label><b>member :</b></label>
                                <searchmember v-on:memberSelected="onMemberSelected" />
                                <label><b>role :</b></label>
                                <div class="container row">
                                    <select class="col-8 form-control" v-model="role" >
                                        <option v-for="data in roles.response" :value="data.id" >{{data.role}}</option>
                                    </select>
                                    <button class="ml-2 col-3 btn btn-outline-success" data-toggle="modal" data-target="#addRole">
                                      + add
                                    </button>
                                </div>                                
                              </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchData()">Close</button>
                          <button type="button" class="btn btn-success " v-on:click="addMemberToGroup()">
                            <b>+</b> add member to group
                            <span v-if="adding_member"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- add role Modal -->
                <div class="modal fade" id="addRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add a role</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">                                
                                <form >
                                        <div class=" row form-group">
                                        <label class="col-3"><b>name:</b></label>
                                        <input type="text" class="col-8 form-control" placeholder="enter name of the role" v-model="role_name">                                        
                                        </div>
                                        <div class="row form-group">
                                                <label class="col-3"><b>description:</b></label>
                                                <textarea type="text" class="col-8 form-control" rows='3' v-model="role_description"></textarea>                                                   
                                        </div>                                                                                                                                                                                                                            
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                        
                        <button type="button" class="btn btn-success" v-on:click="addRole()">
                           {{add_role_button_text}} 
                           <span v-if="adding_member"
                             class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                          </span>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- Modal email -->
                <div class="modal fade" id="emailModatCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalCenterTitle">new {{group.response[0].name}} channel notice</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                              </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-success" v-on:click="addChannelNotification()">
                            send
                            <span v-if="sending_message"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                </div>              
              </div>
            </div>
            </div>
          </body>

    </div>

  </template>

<script>
import searchmember from '@/subcomponents/searchmember.vue'
import textmessage from '@/subcomponents/textmessage.vue'
export default {
  name: 'groupDetail',
  components: { searchmember,textmessage },
  data () {
    return {
      group: null,
      fetch_data_error: [],
      members: null,
      foundItems: null,
      fetch_group_activity_data_error: [],
      group_meetings: null,
      activity_selected: false,
      //add member
      role: null,
      selectedMember: null, 
      roles: null,
      added_member: [],
      member_ids: [],
      message: "",
      sms_status: [],
      sending_message:false,
      adding_member:false,
      //add role
      role_name: null,
      role_description: null,
      enable_role_button: false,
      add_role_button_text: '+ add role',
      added_role: [],
      //all members
      all_members:true
    }
  },
  created() {
        this.fetchData()  
    },
  watch: {
    role_name: function (){
        if (this.role_name.length > 0 && this.role_description.length > 0){
            this.enable_role_button = true
        }
    },
    role_description: function (){
        if (this.role_description.length > 0 && this.role_name.length > 0){
            this.enable_role_button = true
        }
    },
    all_members: function(){
          if (this.all_members != true){
              this.member_ids = []
          }
          else{
            this.member_ids = this.all_member_ids
          }
        }
  },
  methods: {
      goBack: function() {
          window.history.back();
      },
      //select member
      onMemberSelected (value) {
            this.selectedMember = value
      },
      addMemberToGroup: function(){      
        if (this.selectedMember && this.role){
          var group_id
          var obj = this.group.response
          group_id = obj["0"].id
          
          this.adding_member = true
          this.$http({ method: 'post', url: this.$BASE_URL + '/api/groups/add-member-to-group/',
          data: {           
            group_id: group_id,
            member_id: this.selectedMember,
            role_id: this.role
          }
          }).then(response => {
            this.adding_member = false                        
            this.role = ''
            alert("member successfully added")
          })
          .catch((err) => {
            this.adding_member = false
            alert("an error occered while attempting to add member, check your data and try again" + err)            
          })
        }
        else{
          alert("error adding member to group")
        }
      },
      getGroupActivity: function() {
        this.activity_selected = true        
        this.$http.get(this.$BASE_URL + '/api/events/events-by-group/' + this.$route.params.id + '/')
        .then(response => {
          this.group_meetings = response.data 
        })
        .catch((err) => {
          alert(err)
        })
      },
      
      addChannelNotification: function(){
        this.sending_message = true
        this.$http({ method: 'post', url: this.$BASE_URL + '/api/social/add-channel-notification/',
        data: {
          sender_id: this.$session.get('member_id'),
          group_name: this.group.response[0].name,
          message: this.message,
          website: true,
        }
        }).then(response => {
          this.sending_message = false
           alert("notification sent succesfully")
        })
        .catch((err) => {
          this.sending_message = false
          alert(err)
        })
      },
      //add role        
      addRole: function() {
        this.enable_role_button = false
        this.add_role_button_text = 'adding role...'            
        this.$http({ method: 'post', url: this.$BASE_URL + '/api/members/role-list/',
            data: {
              role: this.role_name,
              description: this.role_description,  
              member_admin: this.member_admin,
              site_admin: this.site_admin,
              group_admin: this.group_admin,
              event_admin: this.event_admin,
              projects_admin: this.projects_admin,
              finance_admin: this.finance_admin               
            }
          }).then(response => {
            this.getRoles()
            this.added_role.push(response.data)                    
            this.role_name = ''
            this.role_description = '' 
            this.add_role_button_text = '+ add role'
            this.enable_role_button = true
            alert("role succesfuly added")                                 
            })
            .catch((err) => {
              this.enable_role_button = true 
            })                
    },
      getRoles: function(){
      this.$store.dispatch('update_isLoading', true)
        this.$http.get(this.$BASE_URL + '/api/members/role-list/')
        .then(response => {
          this.roles = {"response": response.data }
          this.$store.dispatch('update_isLoading', false)
        })
        .catch((err) => {
          this.fetch_data_error.push(err)
          this.$store.dispatch('update_isLoading', false)
        })
    },
      fetchData() {
        this.$store.dispatch('update_isLoading', true)
        this.$http.get(this.$BASE_URL + '/api/members/role-list/')
        .then(response => {
          this.roles = {"response": response.data }          
        })
        .catch((err) => {
          this.fetch_data_error.push(err)          
        })

        this.fetch_data_error = []
        this.$store.dispatch('update_isLoading', true)
        this.$http.get(this.$BASE_URL + '/api/groups/church-group/' + this.$route.params.id + '/')
        .then(response => {
          this.group = {"response": response.data }          
        })
        .catch((err) => {
          this.fetch_data_error.push(err)          
        })

        this.$store.dispatch('update_isLoading', true)
        this.$http.get(this.$BASE_URL + '/api/groups/church-group-members/' + this.$route.params.id + '/')
        .then(response => {          
          this.members = {"response": response.data }
          var array = this.members.response
          this.foundItems = array.length        
          for (var data in this.members.response){
            this.member_ids.push(this.members.response[data].member.id)            
          }
          this.all_member_ids = this.member_ids
          this.$store.dispatch('update_isLoading', false)
        })
        .catch((err) => {
          this.fetch_data_error.push(err)
          this.$store.dispatch('update_isLoading', false)
        })
  }

  }
}
</script>


<style >
</style>

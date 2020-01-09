<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>
                  <li class="breadcrumb-item"><span class="backButton"><a href="#" style="text-decoration: none" v-on:click="goBack()">groups</a></span>
                <li class="breadcrumb-item active" aria-current="page" v-for="data in group.response">{{data.name}}</li>
            </ol>
        </nav>
        <body>
            <div class="container">
                <div class="row">
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

            <div class="filters  col-sm-10 col-md-8 col-lg-2" style="padding: 0px 0px 0px 0px">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#member" role="tab" aria-controls="members" aria-selected="true">
                    <img  style="width: 30px; height: auto; " src="@/assets/icons/icons8-user-groups-40.png"> members
                  </a>
                  <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#activity" role="tab" aria-controls="activity" aria-selected="false" v-on:click="getGroupActivity()">
                      <img style="width: 30px; height: auto;" src="@/assets/icons/icons8-activity-history-48.png">  activity
                  </a>
                </div>
            </div>

            <div class="tab-content col" style="padding: 5px 60px 60px 60px">
              <div class="tab-pane fade show active" id="member" role="tabpanel" aria-labelledby="profile-tab">
                <div class = "center-div" v-if = "fetch_data_error.length > 0">
                  <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
                  <p class="text-info">check your connection</p>
                </div>
                <div v-if = "fetch_data_error.length == 0">
                <div>
                    <span aria-current="page" v-for="data in group.response">
                      <h3>
                         members <span>({{foundItems}})</span>
                      </h3>
                    </span>
                    <hr/>
                  <p>
                  found <span class="badge badge-pill badge-info">{{foundItems}}</span>
                  </p>
                </div>
                </div>
                    <table class="table">
                      <tbody>
                        <tr v-for="data in members.response">

                          <th scope="row"></th>
                          <td ><img v-if = "data.member.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
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
              <div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="v-pills-messages-tab">

                <div v-if = "activity_selected == true">
                    <div class = "center-div" v-if = "fetch_group_activity_data_error.length > 0">
                        <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
                        <p class="text-info">check your connection</p>
                      </div>
                      <div v-if = "fetch_group_activity_data_error.length == 0">
                      <div>
                          <h3  v-for="data in group.response">
                              activity
                          </h3>
                      </div>
                      </div>
                  <table class="table">
                      <thead v-if = "group_meetings.response.length > 0">
                        <tr>

                          <th scope="col">date</th>
                          <th scope="col">location</th>
                          <th scope="col">host</th>
                          <th scope="col">attendees</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for = "data in group_meetings.response">
                          <td >{{data.date}}</td>
                          <td>{{data.location}}</td>
                          <td>{{data.host.member.first_name}} {{data.host.member.last_name}}</td>
                          <td><span class="badge badge-pill badge-info">{{data.number_of_attendees}}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
              </div>
              <div class="col-12 col-sm-10 col-md-8 col-lg-3">
                <div class="btn-group" style="padding: 0px 0px 25px 0px">
                  <a href="#" data-toggle="modal" data-target="#addMemberToGroup" style="text-decoration: none">
                      <div class="add-button">
                      <span> <b>+</b> Add member</span>
                      </div>
                  </a>
                  <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                      <a class="dropdown-item" href="#" data-toggle="modal" data-target="#importCSV"><b>+</b> import from csv</a>
                  </div>
                </div>
                  <div class="list-group ">
                      <button type="button" class="action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/app_logo.png" style="width: 55px; height:auto">. anvil channels</button>
                      <button type="button" class="d-none action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/icons/icons8-email-64.png">email</button>
                      <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter"><img src="@/assets/icons/icons8-comments-64.png">text</button>

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
                                <input type = "text" class="form-control" placeholder="search" v-model="memberSearch" autofocus></input>
                                <div style="padding: 10px 10px 10px 10px" class="text-info" >{{memberSearch_status}}</div>

                                <div class="pre-scrollable searchedItemsDiv border " style="  max-height: 185px; overflow-y: scroll;" v-if="showMemberInput">
                                    <table class="table border-0" >
                                      <tbody>
                                        <tr class="searchedItem border-0" v-for="data in found_members.response">
                                          <a href="#" style="text-decoration: none" v-on:click="selectMember(data.id,data.member.first_name,data.member.last_name)">
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
                                <label><b>role :</b></label>
                                <select class=" form-control" v-model="role" >
                                    <option v-for="data in roles.response" :value="data.id" >{{data.role}}</option>
                                </select>
                              </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchData()">Close</button>
                          <button type="button" class="btn btn-success " v-on:click="addMemberToGroup()"><b>+</b> add</button>
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
                          <button type="button" class="btn btn-success" v-on:click="addChannelNotification()">send</button>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- Modal text people -->
                <div class="modal fade" id="textModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" >text group members</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group" v-if="sms_status.length == 0">
                                <label for="exampleFormControlTextarea1">message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model = "message"></textarea>
                              </div>
                              <div v-if="sms_status.length > 0">
                                <p class="text-info">!! </p>
                                <p class="text-info"> The members will receive your message.</p>
                                <p> check sms status later as it may take a while</p>
                                </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeSmsModal()">Close</button>
                          <span v-if = "message.length > 5 && sms_status.length == 0"><button type="button" class="btn btn-primary" v-on:click=sendMessage()>send text</button></span>
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
export default {
  name: 'groupDetail',
  data () {
    return {
      group: null,
      fetch_data_error: [],
      members: null,
      foundItems: null,
      fetch_group_activity_data_error: [],
      group_meetings: null,
      activity_selected: false,
      memberSearch: '',found_members:[],role: null,
      memberSearch_status: '',selectedMember: null,
      showMemberInput: true,roles: null,
      added_member: [],
      member_ids: [],
      message: "",
      sms_status: []
    }
  },
  created() {
        this.fetchData()
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
  watch: {
    // whenever question changes, this function will run
    memberSearch: function () {
      var array = this.memberSearch.split(" ")
      if (this.memberSearch.length > 0 && array.length == 1){
        this.showMemberInput = true
        this.memberSearch_status = 'typing...'
        this.debouncedGetAnswer()
      }else{
          this.memberSearch_status = ''
          this.found_members = []
          this.fetchData()
      }
    }
  },
  methods: {
      goBack: function() {
          window.history.back();
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
                vm.memberSearch_status = ''
                vm.showMemberInput = false
              })
            }
        },
      selectMember: function(id,first_name,last_name) {
        this.selectedMember = id
        this.memberSearch = first_name + ' ' + last_name
        this.showMemberInput = false
      },
      addMemberToGroup: function(){
        if (this.selectMember && this.role){
          var group_id
          var obj = this.group.response
          group_id = obj["0"].id
  
          this.$http({ method: 'post', url: this.$BASE_URL + '/api/groups/add-member-to-group/',
          data: {           
            group_id: group_id,
            member_id: this.selectedMember,
            role_id: this.role
          }
          }).then(response => {
            this.added_member.push(response.data )
            this.memberSearch = ''
            this.role = ''
            alert("member successfully added")
          })
          .catch((err) => {
            alert("an error occered while attempting to add member, check your data and try again")
            this.add_group_error.push(err)
          })
        }
      },
      getGroupActivity: function() {
        this.activity_selected = true
        this.fetch_group_activity_data_error = []
        this.$http.get(this.$BASE_URL + '/api/groups/church-group-meeting-list/' + this.$route.params.id + '/')
        .then(response => {
          this.group_meetings = {"response": response.data }
        })
        .catch((err) => {
          this.fetch_group_activity_data_error.push(err)
        })
      },
      sendMessage: function (){
        this.$http({ method: 'post', url: this.$BASE_URL + '/api/sms/add-sms/',
        data: {
          sending_member_id: this.$session.get('member_id'),
          app: "members-admin",
          message: this.message,
          website: true,
          receipient_member_ids: this.member_ids
        }
        }).then(response => {
          this.sms_status.push(response.data)
        })
        .catch((err) => {
        })
      },
      addChannelNotification: function(){
        this.$http({ method: 'post', url: this.$BASE_URL + '/api/social/add-channel-notification/',
        data: {
          sender_id: this.$session.get('member_id'),
          group_name: this.group.response[0].name,
          message: this.message,
          website: true,
        }
        }).then(response => {
           alert("notification sent succesfully")
        })
        .catch((err) => {
          alert(err)
        })
      },
      closeSmsModal: function (){
        this.sms_status = []
        this.message = ""
      },
      fetchData() {
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

        this.fetch_data_error = []
        this.$store.dispatch('update_isLoading', true)
        this.$http.get(this.$BASE_URL + '/api/groups/church-group/' + this.$route.params.id + '/')
        .then(response => {
          this.group = {"response": response.data }
          this.$store.dispatch('update_isLoading', false)
        })
        .catch((err) => {
          this.fetch_data_error.push(err)
          this.$store.dispatch('update_isLoading', false)
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

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

            <div class="filters  col-sm-10 col-md-8 col-lg-2" style="padding: 0px 0px 0px 0px">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#member" role="tab" aria-controls="members" aria-selected="true">
                    <img  src="@/assets/icons/icons8-user-groups-40.png"> members
                  </a>
                  <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#activity" role="tab" aria-controls="activity" aria-selected="false" v-on:click="getGroupActivity()">
                      <img  src="@/assets/icons/icons8-activity-history-48.png">  activity
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
                    <span class="breadcrumb-item active" aria-current="page" v-for="data in group.response">
                      <h3>
                        <span class="backButton">
                        <a href="#" v-on:click="goBack()" class="text-muted" style="text-decoration: none;">
                            <img  src="@/assets/icons/icons8-back-filled-50.png" style=" width: 4%;height: auto;"> {{data.name}} 
                        </a>
                      </span>/ members
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
                           <td>
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
                          <span class="breadcrumb-item active" aria-current="page" v-for="data in group.response">
                            <h3>
                              <span class="backButton">
                              <a href="#" v-on:click="goBack()" class="text-muted" style="text-decoration: none;">
                                  <img  src="@/assets/icons/icons8-back-filled-50.png" style=" width: 4%;height: auto;"> {{data.name}} 
                              </a>
                            </span>/ activity
                          </h3>
                          </span>
                          <hr/>
                        <p>
                        found <span class="badge badge-pill badge-info">{{foundItems}}</span>
                        </p>
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
                <div style="padding: 0px 0px 25px 0px">
                  <router-link :to="{name: 'memberAdd'}">
                      <div class="add-button">
                        + Add member
                      </div>
                  </router-link>
                </div>
                  <div class="list-group ">
                      <button type="button" class="action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/icons/icons8-email-64.png">email people</button>
                      <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter"><img src="@/assets/icons/icons8-comments-64.png">text people</button>
                    
                  </div>  
              <!-- Modal email -->
              <div class="modal fade" id="emailModatCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">email people</h5>
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
                        <button type="button" class="btn btn-primary">Send email</button>
                      </div>
                    </div>
                  </div>
                </div> 
                <!-- Modal text people --> 
                <div class="modal fade" id="textModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" >text people</h5>
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
                          <button type="button" class="btn btn-primary">send text</button>
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
      activity_selected: false
    }
  },
  created() {
        this.fetchData()
    },

  watch: {
        '$route': 'fetchData'
    },
  methods: {
        goBack: function() {
          window.history.back();
        },
        getGroupActivity: function() {
          this.activity_selected = true
          if (this.$route.params.group_type == 'fellowship'){
                this.fetch_group_activity_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/fellowship-meeting-list/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group_meetings = {"response": response.data } 
                    var array = this.group_meetings.response
                    this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_group_activity_data_error.push(err)
                    })

            }
            if (this.$route.params.group_type == 'church-group'){
                this.fetch_group_activity_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/church-group-meeting-list/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group_meetings = {"response": response.data } 
                    var array = this.group_meetings.response
                    this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_group_activity_data_error.push(err)
                    })

            }
            if (this.$route.params.group_type == 'ministry'){
                this.fetch_group_activity_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/ministry-meeting-list/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group_meetings = {"response": response.data }
                    var array = this.group_meetings.response
                    this.foundItems = array.length 
                    })
                    .catch((err) => {
                        this.fetch_group_activity_data_error.push(err)
                    })

            }
            if (this.$route.params.group_type == 'cell-group'){
                this.fetch_group_activity_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/cell-group-meeting-list/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group_meetings = {"response": response.data } 
                    var array = this.group_meetings.response
                    this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_group_activity_data_error.push(err)
                    })
            } 
        },
        fetchData() {

            if (this.$route.params.group_type == 'fellowship'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/fellowship/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group = {"response": response.data } 
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })

                this.$http.get('http://127.0.0.1:8000/api/groups/fellowship-members/' + this.$route.params.id + '/')
                    .then(response => {
                      this.members = {"response": response.data } 
                      var array = this.members.response
                      this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    }) 

            }
            if (this.$route.params.group_type == 'church-group'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/church-group/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group = {"response": response.data } 
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
                    
                this.$http.get('http://127.0.0.1:8000/api/groups/church-group-members/' + this.$route.params.id + '/')
                    .then(response => {
                      this.members = {"response": response.data } 
                      var array = this.members.response
                      this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
            }
            if (this.$route.params.group_type == 'ministry'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/ministry/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group = {"response": response.data } 
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
                this.$http.get('http://127.0.0.1:8000/api/groups/ministry-members/' + this.$route.params.id + '/')
                    .then(response => {
                      this.members = {"response": response.data } 
                      var array = this.members.response
                      this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
            }
            if (this.$route.params.group_type == 'cell-group'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/cell-group/' + this.$route.params.id + '/')
                    .then(response => {
                    this.group = {"response": response.data } 
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })

                this.$http.get('http://127.0.0.1:8000/api/groups/cell-group-members/' + this.$route.params.id + '/')
                    .then(response => {
                      this.members = {"response": response.data } 
                      var array = this.members.response
                      this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
            }  
        },
    }

}
</script>


<style >
</style>
<template>
    <div class="memberList">
      <nav aria-label="breadcrumb" >
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
          <li class="breadcrumb-item active" aria-current="page">members</li>
        </ol>
      </nav>
      <body>
        <div class="container">
        <div class="row">
        <div class="filters col-12 col-sm-8 col-md-8 col-lg-2" style="padding: 3px 3px 3px 3px">
            <div class="form-group">
                <label for="searchInput"><b>search by first name</b></label>
                <input type="text" class="form-control"  aria-describedby="searchHelp" placeholder="e.g John,Brian etc" v-model="firstnamesearch" autofocus>
                <div style="padding: 10px 10px 10px 10px" class="text-info">{{firstnamesearch_status}}</div>
                <small id="searchHelp" class="form-text text-muted">search members by their first names</small>
            </div>
          <p>
              <a class="" data-toggle="collapse" href="#collapseMoreFilters" role="button" aria-expanded="false" aria-controls="collapseMoreFilters">
                <div class="moreButton">
                  <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-down-arrow-64.png">
                 <b> more filters</b>
                </div>
              </a>
          </p>
          
          <div class="collapse"  id="collapseMoreFilters">
              <div id="container row" >
                  <div class="accordion">
                    <label for="tm" class="accordionitem"><b>age</b> <span class="arrow">&raquo;</span></label>
                    <input type="checkbox" id="tm"/>
                      <div class="row" style="padding : 10px">
                        <div class="col">
                        <div class="form-group">
                            <small><b>min age :</b></small>
                            <input type="number" class="form-control" id="searchInput"  placeholder="min age" v-model = "min_age">
                        </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                              <small><b>max age :</b></small>
                              <input type="number" class="form-control" id="searchInput" placeholder="max age" v-model = "max_age">
                          </div>
                        </div>
                      </div>
                  </div>
                  
                  <div class="accordion">
                    <label for="tn" class="accordionitem"><b>gender</b> <span class="arrow">&raquo;</span></label>
                    <input type="checkbox" id="tn"/>
                    <div class="row" style="padding : 10px">
                      <div class="col">
                        <div class="radio">
                            <input type="radio" name="optradio" value="M" v-model="gendersearch"> male
                          </div>
                        </div>
                        <div class="col">
                          <div class="radio">
                            <input type="radio" name="optradio" value ="F" v-model="gendersearch"> female
                          </div>
                        </div>
                    </div>
                  </div>

                </div>  
          </div>
        

        </div>
          <div class="col" >
            <div class = "center-div" v-if = "fetch_data_error.length > 0">
              <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
              <p class="text-info">check your connection</p>
            </div>
            <div v-if = "fetch_data_error.length == 0">
            <div>
                <h3>Members</h3>
                <hr/>
              <p>
              found <span class="badge badge-pill badge-info">{{foundItems}}</span>
              </p>
            </div>
              <table class="table" v-if = "min_age == 0 || min_age == '' || max_age == 150 || max_age  == ''">
                  <tbody>
                    <tr v-for="data in members.response">
                      <th scope="row"></th>
                      <td ><img v-if = "data.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                           <img v-if = "data.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                           <img v-if = "data.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                           
                        <router-link :to="`/memberDetail/`+ data.member.id">
                          <span class = "text-secondary">{{data.member.first_name}} {{data.member.last_name}}</span>
                        </router-link>
                       </td>
                     
                   
                    </tr>
                  </tbody>
                </table>
                </div>
                <table class="table" v-if = "min_age > 0  || max_age != 150 ">
                  <tbody>
                    <tr v-for="data in members.response">
                     
                      <th scope="row"></th>
                      <td ><img v-if = "data.member.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                           <img v-if = "data.member.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                           <img v-if = "data.member.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                        <router-link :to="`/memberDetail/`+ data.member.member.id">
                          <span class = "text-secondary">{{data.member.member.first_name}} {{data.member.member.last_name}}</span>
                        </router-link>
                       </td>
                     
                     
                   
                    </tr>
                  </tbody>
                </table>
          </div>
          <div class="col-12 col-sm-10 col-md-5 col-lg-3">
            <div class="btn-group" style="padding: 0px 0px 25px 0px">
              <router-link :to="{name: 'memberAdd'}" style="text-decoration: none">
                  <div class="add-button">
                    + Add member
                  </div>
              </router-link>
              <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                  <router-link class="dropdown-item" :to="{name: 'adminRoles'}"><b>+</b> assign roles</router-link>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addIncome"><b>+</b> manage roles</a>                                                                
              </div>
            </div>
              <div class="list-group ">
                  <button type="button" class="action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/icons/icons8-email-64.png">email all members</button>
                  <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter"><img src="@/assets/icons/icons8-comments-64.png">{{text_button_name}}</button>
                  <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#assignModalCenter"><img src="@/assets/icons/icons8-add-user-group-man-man-64.png">assign group</button>
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
                          <p class = "text-info"> !! this feature is still under development</p>
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
                      <h5 class="modal-title" >{{text_button_name}}</h5>
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
              <!-- Modal assign group -->
              <div class="modal fade" id="assignModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">assign groups</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p class="text-info">!! this feature is under development</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">assign</button>
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
import router from "../../router";

export default {
  name: 'memberList',
  data () {
    return {
      fetch_data_error: [],
      members: null,
      foundItems: null,
      firstnamesearch: null,
      firstnamesearch_status: null,
      gendersearch: null,
      min_age: 0,
      max_age:150,
      member_ids: [],
      text_button_name: "",
      message: " ",
      sms_status: []

    }
  },
  watch: {
    firstnamesearch: function () {
      if (this.firstnamesearch.length > 0){
        this.firstnamesearch_status = 'typing...'
        this.debouncedGetAnswer()
      }else{
          this.firstnamesearch_status = ''
          this.fetchData()
      }
    },
    gendersearch: function (){
      this.searchByGender()
    },
    min_age: function(){
      if (this.min_age != '' && this.min_age > 0){
        this.searchByAge()
      }else{
        this.fetchData()
      }
    },
    max_age:function(){
      if (this.max_age != ''){
        this.searchByAge()
      }else{
        this.fetchData()
      }
    }
  },
  created(){
    this.checkLoggedIn()
    this.fetchData()
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  methods: {
    checkLoggedIn() {
      if (!this.$session.has("token")) {
          router.push("/login")
      }
    },
    fetchData() {
      this.fetch_data_error = []
      this.$http.get(this.$BASE_URL + '/api/members/member-list/')
            .then(response => {
              this.members = {"response": response.data } 
              var array = this.members.response
              this.foundItems = array.length
              for (var data in this.members.response){
                this.member_ids.push(this.members.response[data].member.id)
              }
              this.text_button_name = "Text All Members"
            })
            .catch((err) => {
                this.fetch_data_error.push(err)
            })  
    },
    sendMessage: function (){
      this.$http({
                    method: 'post',
                    url: this.$BASE_URL + '/api/sms/add-sms/',
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
    closeSmsModal: function (){
      this.sms_status = []
      this.message = ""
    },
    getAnswer: function () {
      var vm = this
      if (this.firstnamesearch.length > 0){
        this.firstnamesearch_status = 'searching...'
        this.$http.get(this.$BASE_URL + '/api/members/filter-by-first_name/' + this.firstnamesearch +'/')
          .then(function (response) {
            vm.members = {"response": response.data } 
            vm.firstnamesearch_status = ''
            var array = vm.members.response
            vm.foundItems = array.length
          })
          .catch(function (error) {
          })
        }
    },
    searchByGender() {
      this.$http.get(this.$BASE_URL + '/api/members/filter-by-gender/'+ this.gendersearch)
            .then(response => {
              this.members = {"response": response.data } 
              var array = this.members.response
              this.foundItems = array.length
              for (var data in this.members.response){
                this.member_ids.push(this.members.response[data].member.id)
              }
              if (this.gendersearch == "F"){
                  this.text_button_name = "text all Females"
                }
                else{
                  this.text_button_name = "text all Males"
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    searchByAge() {
      if (this.min_age != '' && this.max_age != ''){
      this.$http.get(this.$BASE_URL + '/api/members/filter-by-age/'+ this.min_age +'/' + this.max_age + '/')
            .then(response => {
              this.members = {"response": response.data } 
              var array = this.members.response
              this.foundItems = array.length
              for (var data in this.members.response){
                this.member_ids.push(this.members.response[data].member.id)
              }
              this.text_button_name = "Text members between ages " + this.min_age + " and " + this.max_age
            })
            .catch((err) => {
                console.log(err)
            })
      }
    }
  }

}
</script>


<style >
</style>
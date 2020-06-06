<template>
    <div>
        <!-- this compnent requires text message modal -->
        <textmessage :memberIds="member_ids"/>
      <!-- NAVBAR -->
      <nav aria-label="breadcrumb" class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <span class="backButton">
                <router-link style="text-decoration: none" :to="{name: 'Home'}">
                  Home
              </router-link>
            </span>
          <li class="breadcrumb-item active" aria-current="page">
            members
          </li>
        </ol>
      </nav>
      <!-- BOdY -->
      <body class="main-content">
        <div class="container">
          <div class="row">
            <!-- FILTERS TAB ON THE LEFT -->
            <div class="filters col-12 col-sm-0 col-md-8 col-lg-2 " style="padding: 3px 3px 3px 3px">
                <div class="form-group d-none d-lg-block">
                    <label for="searchInput">
                      <b>
                      <img style="width: 20px ;height: auto" src="@/assets/icons/icons8-search-80.png">
                      search by first name
                      </b>
                    </label>
                    <input type="text" class="form-control"  aria-describedby="searchHelp" placeholder="e.g John,Brian etc" v-model="firstnamesearch" autofocus>
                    <div style="padding: 10px 10px 10px 10px" class="text-info">{{firstnamesearch_status}}</div>
                    <small id="searchHelp" class="form-text text-muted">search members by their first names</small>
                </div>
              <p>
                  <a class="d-none d-lg-block" data-toggle="collapse" href="#collapseMoreFilters" role="button" aria-expanded="false" aria-controls="collapseMoreFilters">
                    <div class="moreButton">
                      <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-down-arrow-64.png">
                    <b> more filters</b>
                    </div>
                  </a>
              </p>
              <div class="collapse"  id="collapseMoreFilters">
                  <div id="container row" >
                      <div class="accordion">
                        <div class="d-flex justify-content-between">
                            <label for="tm" class="accordionitem"><b>age</b></label>
                            <a href="#" v-on:click="resetAge" class="text-success">reset</a>
                        </div>
                          <div class="d-flex flex-row justify-content-about">
                              <div class="form-group p-1 ">
                                <small><b>max age :</b></small>
                                <input type="number" class="form-control" id="searchInput" placeholder="max age" v-model = "max_age">
                              </div>
                              <div class="form-group p-1">
                                  <small><b>min age :</b></small>
                                  <input type="number" class="form-control" id="searchInput"  placeholder="min age" v-model = "min_age">
                              </div>
                          </div>
                      </div>
                      <div class="accordion">
                          <div class="d-flex justify-content-between">
                              <label for="tn" class="accordionitem"><b>gender</b></label>
                              <a href="#" v-on:click="resetGender" class="text-success">reset</a>
                          </div>
                        <div class="row" style="padding : 10px">
                          <div class="col">
                            <div>
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
            <!-- CONTENT TAB IN THE MIDDLE -->
            <div class="col" >

              <div class = "center-div" v-if = "fetch_data_error.length > 0">
                <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
                <p class="text-info">check your connection</p>
              </div>
              <div v-if = "fetch_data_error.length == 0">
              <div>
                  <h3 class="font-weight-bold">
                    Members
                  </h3>
                  <div class="btn-group d-sm-block d-md-none ml-5 mb-2">
                      <a href="#" v-on:click="openAction()">
                          <div class="btn btn-light">
                            actions
                          </div>
                        </a>
                      <button v-on:click="openAction()" type="button" class="btn btn-sm btn-light dropdown-toggle dropdown-toggle-split">
                        <span class="sr-only" >Toggle Dropdown</span>
                      </button>
                  </div>
                  <hr/>
                <div class="mb-2 d-flex flex-row justify-content-center">
                   <span class="mt-2 mr-2 text-secondary"> found <b>{{foundItems}}</b></span>
                    <a class="btn btn-outline-secondary dropdown-toggle mr-1" data-toggle="collapse" href="#statsTab" role="button" aria-expanded="false" aria-controls="statsTab">
                        more stats
                    </a>
                </div>

              </div>
              <div class="collapse" id="statsTab">
                  <div class="card card-body outline-0">
                      <memberstats msg="expenditure stats"/>
                  </div>
              </div>
                <table class="table table-responsive-sm table-borderless" 
                    v-if = "(min_age == 0 || min_age == '') && (max_age == 150 || max_age  == '')">
                  <thead>
                    <tr>
                      <th></th>
                      <th class="row ml-1">
                              <label class="anvil-checkbox">all
                                  <input type="checkbox":value=true v-model="all_members">
                                  <span class="anvil-checkmark"></span>
                              </label>
                        <!-- actions drop down on phone -->
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                    <tbody>
                      <tr v-for="data in members.response.slice(0,100)">
                        <th scope="row"></th>
                        <td>
                          <label class="anvil-checkbox">
                              <input multiple type="checkbox" :value=data.member.id v-model="member_ids">
                              <span class="anvil-checkmark"></span>
                          </label>
                        </td>
                        <td >
                          <img v-if = "data.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                              <img v-if = "data.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                              <img v-if = "data.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                          <router-link :to="`/memberDetail/`+ data.member.id">
                            <span class = "text-secondary">{{data.member.first_name}} {{data.member.last_name}}</span>
                            <span class="ml-4 text-secondary"><i v-if="data.phone_number">({{data.phone_number}})</i></span>
                          </router-link>
                          </td>
                      </tr>
                    </tbody>
                  </table>

                  </div>
                  <table class="table table-responsive-sm table-borderless" v-if = "min_age > 0  || max_age != 150 ">
                    <tbody>
                      <tr v-for="data in members.response.slice(0,100)">
                        <th scope="row"></th>
                        <td>
                            <label class="anvil-checkbox">
                                <input multiple type="checkbox" :value=data.member.member.id v-model="member_ids">
                                <span class="anvil-checkmark"></span>
                            </label>
                          </td>
                        <td ><img v-if = "data.member.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                              <img v-if = "data.member.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                              <img v-if = "! data.member.gender" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                          <router-link :to="`/memberDetail/`+ data.member.member.id">
                            <span class = "text-secondary">{{data.member.member.first_name}} {{data.member.member.last_name}}</span>
                          </router-link>
                          </td>
                      </tr>
                    </tbody>
                  </table>
            </div>
            <!-- ACTIONS TAB ON THE RIGHT -->
            <div class="col-12 col-sm-10 col-md-5 col-lg-3">
              <hr class="d-sm-block d-lg-none">
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
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#importCSV"><b>+</b> import from csv</a>
                    <div class="dropdown-divider"></div>
                    <router-link class="d-none dropdown-item" :to="{name: 'adminRoles'}"> assign roles</router-link>
                </div>
              </div>
                <div class="list-group font-weight-bold">
                    <button type="button" class="d-none action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#anvilModal" >
                      <img src="@/assets/app_logo.png" style="width: 55px; height:auto">. Anvil message
                    </button>
                    <button type="button" class="d-none action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/icons/icons8-email-64.png">
                      email ({{foundItems}})
                    </button>
                    <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter">
                      <img src="@/assets/icons/icons8-comments-64.png" style="width: 35px; height:auto">
                      text members
                    </button>
                    <button
                      type="button" class="list-group-item list-group-item-action border-0"
                      data-toggle="modal" data-target="#assignModalCenter"
                      v-on:click="getGroups()">
                      <img src="@/assets/icons/icons8-add-user-group-man-man-64.png" style="width: 35px; height:auto">
                      assign group
                    </button>
                    <button type="button" class="list-group-item list-group-item-action border-0"
                            data-toggle="modal" data-target="#deleteMemberModal">
                      <img src="@/assets/icons/icons8-delete-64.png" style="width: 35px; height:auto">
                      delete members
                    </button>
                </div>
              <!-- Modal send anvil message -->
              <div class="modal fade " id="anvilModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">send anvil message</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                          <div class="form-group">
                              <label for="exampleFormControlTextarea1">message</label>
                              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="message"></textarea>
                            </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">close</button>
                        <button type="button" class="btn btn-success" v-on:click="sendAnvilMessage()">
                          Send message
                          <span v-if="sending_anvil_message"
                              class="spinner-border spinner-border-sm"
                              role="status" aria-hidden="true">
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
              <!-- Modal assign group -->
              <div class="modal fade" id="assignModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">assign selected members to group</h5>
                        <button type="button" class="close" v-on:click="setAssignGroupButtonText('assign group')" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="container mt-5 mb-5">
                        <span class="d-flex fex-row"><h3 class="text-muted">{{member_ids.length}} </h3>members</span>
                        <label><b>select group :</b></label>
                        <select class=" form-control" v-model="group_id" >
                            <option v-for="data in groups.response" :value="data.id" >{{data.name}}</option>
                        </select>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="setAssignGroupButtonText('assign group')">Close</button>
                        <button type="button" class="btn btn-success" v-on:click="assignGroup()">
                          assign group
                          <span v-if="adding_members_to_group"
                                class="spinner-border spinner-border-sm"
                                role="status" aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
                <!-- Modal delete member-->
                <div class="modal fade" id="deleteMemberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalCenterTitle">delete members</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="container mt-5 mb-5">
                          <span class="d-flex fex-row"><h2 class="text-muted font-weight-bold">{{member_ids.length}} </h2>members</span>
                          <h4 class="text-danger">These members alongside with all their data will be deleted</h4>
                          <i>this action is irreversible, are you sure that this is what you want??</i>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="setAssignGroupButtonText('assign group')">Close</button>
                          <button type="button" class="btn btn-danger" v-on:click="deleteMembers()">
                            delete members
                            <span v-if="deleting_member"
                                  class="spinner-border spinner-border-sm"
                                  role="status" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
              <!-- Modal import CSV -->
              <div class="modal fade bd-example-modal-xl" id="importCSV" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">import from CSV</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <h3 class="text-muted">demo</h3>
                          <div class="container">
                              <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">names</th>
                                      <th scope="col">gender</th>
                                      <th scope="col">date of birth <br/>(YYYY-MM-DD)</th>
                                      <th scope="col">phone number</th>
                                      <th scope="col">email</th>
                                      <th scope="col">marital status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>John The Baptist</td>
                                      <td>M</td>
                                      <td>1997-07-17</td>
                                      <td>07********</td>
                                      <td>example@nano.com</td>
                                      <td>M</td>
                                    </tr>
                                    <tr>
                                      <td>Mark Laboso</td>
                                      <td>M</td>
                                      <td>1990-12-03</td>
                                      <td>07********</td>
                                      <td>example@nano.com</td>
                                      <td>S</td>
                                    </tr>
                                    <tr>
                                      <td>Martha Kari</td>
                                      <td>F</td>
                                      <td>1984-02-20</td>
                                      <td>07********</td>
                                      <td>example@nano.com</td>
                                      <td>D</td>
                                    </tr>
                                    <td>Maria Desa malibo</td>
                                      <td>F</td>
                                      <td>1990-07-29</td>
                                      <td>07********</td>
                                      <td>example@nano.com</td>
                                      <td>W</td>
                                    </tr>
                                  </tbody>
                                </table>
                              <hr/>
                              <h3 class="text-muted">your csv :</h3>
                              <h3 class="text-muted">{{get_data_status}}</h3>
                              <small  v-if="this.csv_data.length < 0">showing only the first 5 lines</small>

                              <table class="table">
                                <thead>
                                  <tr v-for="data in csv_data.slice(0,1)">
                                    <th scope="col" v-for="(value,key) in data">
                                      {{key}}
                                      <select class="form-control"  v-model='csv_columns[key]'>
                                          <option selected disabled>import as ...</option>
                                          <option >names</option>
                                          <option>gender</option>
                                          <option>date of birth</option>
                                          <option>phone number</option>
                                          <option>email</option>
                                          <option>marital status</option>
                                        </select>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="data in csv_data">
                                    <td v-for="(value,key) in data">{{value}}</td>
                                  </tr>
                                </tbody>
                              </table>

                              <div class="large-12 medium-12 small-12 cell">
                                <label><b>file: </b>
                                  <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                                </label>
                              </div>
                              <p v-if="test_csv_errors.length">
                                <ul>
                                        <small><li v-for="error in test_csv_errors"><p class="text-danger">{{error}}</p></li></small>
                                </ul>
                              </p>
                              <p class="text-success" v-if="file_format_okay">file okay, proceed to import</p>
                              <p v-if="error_500.length">
                                  <ul>
                                          <small><li v-for="error in error_500">
                                            <p class="text-danger">unexpected data format in your file, make sure your CSV or EXCEL file matches the demo</p>
                                            <p class="text-danger">select how you want to import your csv above</p>
                                          </li></small>
                                  </ul>
                              </p>
                              <hr>

                              <p class="text-muted">gender: <b>M</b> => male, <b>F</b> => female</p>
                              <p class="text-muted">marital status: <b>M</b> => married, <b>S</b> => single, <b>D</b> => divorced, <b>W</b> => widowed</p>
                            </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success"
                                v-on:click="submitFile()">
                                submit file
                                <span v-if="submitting_file"
                                      class="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true">
                                </span>
                        </button>
                        <button type="button" class="btn btn-success"
                                v-if="this.uploaded_file.length != 0"
                                v-on:click="checkCSV()">
                                check CSV file
                                <span v-if = "checking_csv"
                                      class="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"></span>
                        </button>
                        <button type="button" class="btn btn-success"
                                v-if="file_format_okay"
                                v-on:click="extractData()">
                                {{extract_data_button_text}}
                                <span v-if = "extracting_data"
                                      class="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </body>

      <!-- bottom navigation -->
      <div id="bottom-actions-tab" class="bottom-action-tab bg-light shadow-lg"
           style="border-radius: 5%">
        <h2 class="text-right mr-3 ">
          <a href="javascript:void(0)" class="closebtn text-secondary" v-on:click="closeActions()">&times;</a>
        </h2>
        <!-- more filters -->
        <div class="ml-5 mr-5">
            <h4>filters</h4>
            <hr>
            <div class="form-group">
                <label for="searchInput">
                  <b>
                  <img style="width: 20px ;height: auto" src="@/assets/icons/icons8-search-80.png">
                  search by first name
                  </b>
                </label>
                <input type="text" class="form-control"  aria-describedby="searchHelp" placeholder="e.g John,Brian etc" v-model="firstnamesearch" autofocus>
                <div style="padding: 10px 10px 10px 10px" class="text-info">{{firstnamesearch_status}}</div>
                <small id="searchHelp" class="form-text text-muted">search members by their first names</small>
            </div>
            <div id="container row" >
                <div class="accordion">
                  <div class="d-flex justify-content-between">
                      <label for="tm" class="accordionitem"><b>age</b></label>
                      <a href="#" v-on:click="resetAge" class="text-success">reset</a>
                  </div>
                    <div class="d-flex flex-row justify-content-about">

                        <div class="form-group p-1 ">
                          <small><b>max age :</b></small>
                          <input type="number" class="form-control" id="searchInput" placeholder="max age" v-model = "max_age">
                      </div>
                        <div class="form-group p-1">
                            <small><b>min age :</b></small>
                            <input type="number" class="form-control" id="searchInput"  placeholder="min age" v-model = "min_age">
                        </div>

                    </div>
                </div>

                <div class="accordion">
                    <div class="d-flex justify-content-between">
                        <label for="tn" class="accordionitem"><b>gender</b></label>
                        <a href="#" v-on:click="resetGender" class="text-success">reset</a>
                    </div>
                  <div class="row" style="padding : 10px">
                    <div class="col">
                      <div>
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
        <h4 class="ml-5">actions</h4>
        <hr class="ml-5">
        <button type="button" class="d-none action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#anvilModal" >
          <img src="@/assets/app_logo.png" style="width: 25px; height:auto"> anvil message
        </button>
        <button v-on:click="closeActions()" type="button" class="p-3 ml-4 mr-4 list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter">
          <img style="width: 25px; height:auto" src="@/assets/icons/icons8-comments-64.png" >
          text members
        </button>
        <button v-on:click="closeActions()" type="button" class="p-3 ml-4 mr-4 list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#assignModalCenter">
          <img style="width: 25px; height:auto" src="@/assets/icons/icons8-add-user-group-man-man-64.png">
          assign group
        </button>
        <button type="button" class="p-3 ml-4 list-group-item list-group-item-action border-0"
                v-on:click="closeActions()" data-toggle="modal" data-target="#deleteMemberModal">
          <img style="width: 25px; height:auto" src="@/assets/icons/icons8-delete-64.png">
          delete members
        </button>
        <div class="text-right mr-5 mt-2 mb-5">
          <router-link :to="{name: 'memberAdd'}" class="mt-2 ml-2 mr-2">
            <div class="btn btn-success">
              + Add member
            </div>
        </router-link>
        </div>
      </div>
    </div>
  </template>

<script>
import router from "../../router";
import memberstats from '@/subcomponents/statistics/memberstats.vue'
import textmessage from '@/subcomponents/textmessage.vue'
export default {
  name: 'memberList',
  components: {memberstats,textmessage},
  data () {
    return {
      fetch_data_error: [],
      all_members: true,
      all_member_ids: [],
      members: null,
      foundItems: null,
      groups:null,
      group_id:null,
      //search for member
      firstnamesearch: null,
      firstnamesearch_status: null,
      gendersearch: null,
      min_age: 0,
      max_age:150,
      member_ids: [],
      //text messaging
      text_button_name: "",
      message: " ",
      sending_anvil_message:false,
      
      // csv file upload
      submitting_file: false,
      checking_csv: false,
      extracting_data: false,
      extract_data_button_text: "import data",
      file: '',
      error_500: [],
      test_csv_errors: [],
      uploaded_file: '',
      csv_data: [],get_data_status: '',
      file_format_okay: false,
      csv_columns: {},

      //assigning groups
      adding_members_to_group: false,
      assign_group_button_text: "assign group",
      deleting_member:false

    }
  },
  watch: {
  //search for member
    all_members: function(){
      if (this.all_members != true){
        this.member_ids = []
      }
      else{
        this.member_ids = this.all_member_ids
      }
    },
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
      if (this.min_age !=0 && this.min_age != '' && this.min_age > 0){
        this.searchByAge()
      }
      else{
        this.searchByGender()
      }
    },
    min_age: function(){
      if (this.min_age != '' && this.min_age > 0){
        this.searchByAge()
      }else{
        this.fetchData()
      }
    },
    max_age:function(){
      if (this.max_age != '' || this.max_age != 150){
        this.searchByAge()
      }else{
        this.fetchData()
      }
    }
  },
  created(){
    this.checkLoggedIn()
    this.fetchData()
    this.getGroups()
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  methods: {
    checkLoggedIn() {
      if (!this.$session.has("token")) {
          router.push("/login")
      }
    },
    /* Set the height of the bottom navigation to 300px */
    openAction: function() {
      document.getElementById('bottom-actions-tab').style.height = "300px"
    },

    /* Set the height of the bottom navigation to 0 */
    closeActions:function() {
      document.getElementById('bottom-actions-tab').style.height = "0px"
    },
    resetAge: function(){
      this.min_age= 0
      this.max_age=150
      this.fetchData()
    },
    resetGender: function(){
      this.gendersearch =  null
      this.fetchData()
    },
    fetchData() {
      this.all_member_ids = []
      this.fetch_data_error = []
      this.$store.dispatch('update_isLoading', true)
      // try local storage
      this.members = JSON.parse(localStorage.getItem('member_list'))
      if (this.members){
        var array = this.members.response
        this.foundItems = array.length
        this.member_ids = []
        for (var data in this.members.response){
          this.member_ids.push(this.members.response[data].member.id)
          this.all_member_ids = this.member_ids
        }
        this.text_button_name = "Text Members" + "(" + this.foundItems + ")"
        this.$store.dispatch('update_isLoading', false)
      }

      const currentVersion = this.$store.getters.member_list_version
      var version  = localStorage.getItem('member_list_version')

      //else try the network
      if (!version || version < currentVersion) {
      this.$http.get(this.$BASE_URL + '/api/members/member-list/')
      .then(response => {
        this.members = {"response": response.data }
        var array = this.members.response
        this.foundItems = array.length
        this.member_ids = []
        for (var data in this.members.response){
          this.member_ids.push(this.members.response[data].member.id)
        }
        this.text_button_name = "Text Members" + "(" + this.foundItems + ")"

        localStorage.setItem('member_list',JSON.stringify({"response": response.data }))
        localStorage.setItem('member_list_version', currentVersion)
        this.$store.dispatch('update_isLoading', false)
      })
      .catch((err) => {
          this.fetch_data_error.push(err)
          this.$store.dispatch('update_isLoading', false)
      })
      }
    },

    sendAnvilMessage: function(){
      this.sending_anvil_message = true
      this.$http({
        method: 'post',
        url: this.$BASE_URL + '/api/social/add-peer-to-peer-bulk/',
        data: {
          sender_id: this.$session.get('member_id'),
          message: this.message,
          receiver_ids: this.member_ids
        }
        }).then(response => {
          this.sending_anvil_message = false
          alert("messages sent succesfuly")
        })
        .catch((err) => {
          this.sending_anvil_message = false
        })
    },
  //assign groups
    assignGroup: function(){
      var group_id = this.group_id
      var member_ids = this.member_ids
      this.assign_group_button_text = "assigning to group ..."
      this.adding_members_to_group = true
      this.$http({ method: 'post', url: this.$BASE_URL + '/api/groups/bulk-add-member-to-group/',
      data: {
        group_id: group_id,
        member_ids: this.member_ids,
        role_id: null
      }
      }).then(response => {
        this.adding_members_to_group = false
        alert("members assigned to group")
      })
      .catch((err) => {
        alert(err)

      })

    },
    setAssignGroupButtonText: function(text){
      this.assign_group_button_text = text
    },
    closeSmsModal: function (){
      this.sms_status = []
      this.message = ""
    },
  // search for member
    getAnswer: function () {
      var vm = this
      if (this.firstnamesearch.length > 0){
        this.firstnamesearch_status = 'searching...'
        this.$store.dispatch('update_isLoading', true)
        this.$http.get(this.$BASE_URL + '/api/members/filter-by-first_name/' + this.firstnamesearch +'/')
          .then(function (response) {
            vm.min_age = 0
            vm.max_age = 150
            vm.members = {"response": response.data }
            vm.member_ids = []
            for (var data in vm.members.response){
              vm.member_ids.push(vm.members.response[data].member.id)
            }
            vm.firstnamesearch_status = ''
            var array = vm.members.response
            vm.foundItems = array.length
            vm.closeActions()
            vm.$store.dispatch('update_isLoading', false)
          })
          .catch(function (error) {
            this.$store.dispatch('update_isLoading', false)
          })
        }
    },
    searchByGender() {
      this.$store.dispatch('update_isLoading', true)
      this.$http.get(this.$BASE_URL + '/api/members/filter-by-gender/'+ this.gendersearch)
            .then(response => {
              this.min_age = 0
              this.max_age = 150
              this.members = {"response": response.data }
              var array = this.members.response
              this.foundItems = array.length
              this.member_ids = []
              for (var data in this.members.response){
                this.member_ids.push(this.members.response[data].member.id)
              }
              this.closeActions()
              this.$store.dispatch('update_isLoading', false)
            })
            .catch((err) => {
              this.$store.dispatch('update_isLoading', false)
            })
    },
    searchByAge() {
      if (this.min_age != '' && this.max_age != ''){
        var gender = "all"
        if (this.gendersearch){
          gender = this.gendersearch
        }
        this.$store.dispatch('update_isLoading', true)
        this.$http.get(this.$BASE_URL + '/api/members/filter-by-age/'+ this.min_age +'/' + this.max_age + '/' + gender + "/")
        .then(response => {
          this.members = {"response": response.data }
          var array = this.members.response
          this.foundItems = array.length
          this.member_ids = []
          for (var data in this.members.response){
            this.member_ids.push(this.members.response[data].member.member.id)
          }
          this.closeActions()
          this.$store.dispatch('update_isLoading', false)
        })
        .catch((err) => {
          this.$store.dispatch('update_isLoading', false)
        })
      }
    },

  //Submits the file to the server
    submitFile: function(){
        this.file_format_okay = false
		this.error_500 = []
		this.test_csv_errors = []
		let formData = new FormData();
		formData.append('csv', this.file);

		this.submitting_file = true
		this.$http.post( this.$BASE_URL + '/api/members/upload-csv/',
			formData,
			{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(response =>{
			var data = response.data
			//if data is not array there are no errors
			if (! data.length){
			this.uploaded_file = data.csv
			alert("file uploaded")
			this.previewCSV()
			this.submitting_file = false
			}
		})
		.catch((err) =>{
			this.error_500.push(err)
			this.submitting_file = false
		});
    },
  // handle the case that the file changes
    handleFileUpload: function(){
      this.file = this.$refs.file.files[0];
    },
  //preview the csv file
    previewCSV: function(){
     	this.get_data_status = 'setting up preview ...'
		var file_name = this.uploaded_file.split("/")[1]
		this.$http.get(this.$BASE_URL + '/api/members/preview-csv/'+ file_name + '/')
		.then(response => {
			this.csv_data = response.data
			this.get_data_status = ''
		})
		.catch((err) => {
			this.get_data_status = ''
		})
    },
  // extract data from the csv file
  // check that the csv file is of the required format
    checkCSV: function(){
      this.test_csv_errors = []
      this.file_format_okay = false
      var file_name = this.uploaded_file.split("/")[1]

      this.checking_csv = true
      this.$http({ 
		  	method: 'post',
			url: this.$BASE_URL + '/api/members/check-csv/',
			data: {
				file_name: file_name,
				column_config: this.csv_columns
			},
      }).then(response => {
			var data = response.data
			//if data is not array there are no errors
			if (! data.length){
				this.file_format_okay = true
			}
			else{
				this.test_csv_errors = data
			}
			this.checking_csv = false
      }).catch((err) => {
        	this.error_500.push(err)
        	this.checking_csv = false
      })
    },
    extractData: function(){
      this.extract_data_button_text = "extracting..."
      var file_name = this.uploaded_file.split("/")[1]

      this.extracting_data = true
      this.$http({
			method: 'post',
			url: this.$BASE_URL + '/api/members/import-data-from-csv/',
			data: {
			file_name: file_name,
			}
      }).then(response => {
			this.extract_data_button_text = "import data"
			var new_version = parseInt(localStorage.getItem('member_list_version')) + 1
			this.$store.dispatch('update_member_list_version', new_version)
			this.fetchData()
			this.extracting_data = false
			alert("data extracted succesfully")
      }).catch((err) => {
        alert("something went wrong while trying to extract data.\n Check the file and try again")
        this.extract_data_button_text = "import data"
        this.extracting_data = false
      })
    },
    
	//get groups
	getGroups: function(){      
      const currentVersion = this.$store.getters.group_list_version
      var version  = localStorage.getItem('group_list_version')

      this.groups = JSON.parse(localStorage.getItem('group_list_all'))

      if (!version || version <= currentVersion) {
        this.$http.get(this.$BASE_URL + '/api/groups/church-group-list/')
          .then(response => {
              this.groups = {"response": response.data }
              localStorage.setItem('group_list_all',JSON.stringify({"response": response.data }))
          })
          .catch((err) => {
              this.fetch_data_error.push(err)
          })
      }

    },
    deleteMembers:function(){
        this.deleting_member = true
        this.$http.post(this.$BASE_URL + '/api/members/bulk-delete-members/',
          {
            member_ids:this.member_ids
          }
        )
        .then(response => {
            this.deleting_member = false
            alert("members deleted")
            localStorage.removeItem("member_list_version");
            localStorage.removeItem("member_list");
            this.fetchData()
        })
        .catch((err)=> {
            alert(err)
            this.deleting_member = false
        })
    }
}

}
</script>


<style >
</style>

<template>
    <div class="memberDetail">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'memberList'}">members</router-link> </span>
                <li class="breadcrumb-item active" aria-current="page">member detail</li>
            </ol>
    </nav>
    <div class="container">
        <div class="row">
                <div class="col" v-if="member_info != null">
                <h3 class="row" v-for="data in member_info.member">                                     
                {{data.member.first_name}} {{data.member.last_name}}
                </h3>
                <p class="row">
                member <b class="text-info"></b>
                </p>          
                </div>
        </div>
        <hr>
    </div>
    <div class="container">
            <div class="row">
              <div class="col-12 col-sm-8 col-md-8 col-lg-3">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active list-group-item list-group-item-action border-0" id="pill-detail-tab" data-toggle="pill" href="#pill-detail" role="tab" aria-controls="pill-detail" aria-selected="true">
                                <img class="church-is-menu" src="@/assets/icons/icons8-user-groups-208.png"> detail
                        </a>
                        <!-- <a class="nav-link list-group-item list-group-item-action border-0" id="pill-delete-tab" data-toggle="pill" href="#pill-delete" role="tab" aria-controls="pill-delete" aria-selected="false">
                                <img class="church-is-menu" src="@/assets/icons/icons8-cancel-26.png"> family
                        </a>                                             -->
                        <a class="nav-link list-group-item list-group-item-action border-0" id="pill-groups-tab" data-toggle="pill" href="#pill-groups" role="tab" aria-controls="pill-groups" aria-selected="false" v-on:click = "getMemberGroups()">
                                <img class="church-is-menu" src="@/assets/icons/icons8-user-groups-filled-50.png"> groups
                        </a> 
                        <!-- <a class="nav-link list-group-item list-group-item-action border-0" id="pill-dates-tab" data-toggle="pill" href="#pill-dates" role="tab" aria-controls="pill-dates" aria-selected="false">
                                <img class="church-is-menu" src="@/assets/icons/icons8-donate-filled-50.png"> important dates
                        </a>   -->
                        <a class="nav-link list-group-item list-group-item-action border-0" id="pill-contributions-tab" data-toggle="pill" href="#pill-contributions" role="tab" aria-controls="pill-contributions" aria-selected="false" v-on:click = "getMemberFinances()">
                                <img class="church-is-menu" src="@/assets/icons/icons8-donate-filled-50.png"> finances
                        </a>                            
                    </div> 
              </div>
              <div class="col-9">
                <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="pill-detail" role="tabpanel" aria-labelledby="pill-detail-tab">                                
                                <div style="padding: 10px 10px 10px 10px">
                                </div>
                                <div class="mx-auto" style="width: 200px;">
                                <div class="row">
                                        <div class="col border " style=" height: 100px ;border-radius: 15px">
                                                <div style="padding: 25px 25px 25px 25px">
                                                <img src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                                </div>
                                        </div>
                                        <div style="padding : 10px">
                                                <span v-for = "data in member_info">
                                                        <span v-for = "data in data">
                                                        <div class=" row mx-auto"><b>name :</b> {{data.member.first_name}}  {{data.member.last_name}}</div>
                                                        </span>
                                                </span>                                                 
                                        </div>
                                </div>
                                </div>
                                <hr/>
                                <div class="row" style="padding: 25px 25px 25px 25px">
                                <div class="col">
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0">personal</div>
                                                <div class="card-body">
                                                <span v-for = "data in member_info">
                                                <span v-for = "data in data">
                                                        <p><b>username:</b> {{data.member.username}}</p>
                                                </span>
                                                </span>
                                                <span v-for = "data in member_info">
                                                        <span v-for = "data in data">
                                                        <p v-if = "data.gender == 'M'"><b>gender :</b> male </p>
                                                        <p v-if = "data.gender == 'F'"><b>gender :</b> female </p>
                                                        </span>
                                                </span>
                                                <p v-if = "marital_status_info.marital_status.length == 0"><b>marital status :</b> none given</p>
                                                <span v-for = "data in marital_status_info" >
                                                        <span v-for = "data in data">
                                                        <p v-if = "data.status == 'M'"><b>marital status :</b> married </p>
                                                        <p v-if = "data.status == 'S'"><b>marital status :</b> single </p>
                                                        <p v-if = "data.status == 'D'"><b>marital status :</b> divorced </p>
                                                        <p v-if = "data.status == 'W'"><b>marital status :</b> widowed </p>
                                                        </span>
                                                </span>
                                                </span>
                                                <p v-if = "age_errors.length > 0"><b>age :</b> none given</p>

                                                <span v-for = "data in age_info">
                                                        <p><b>age :</b> {{data.age}}  <small class="text-info">({{data.d_o_b}})</small></p>
                                                </span>
                                                </div>
                                        </div>
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0">residence </div>
                                                <div class="card-body">
                                                <p v-if = "residence_info.residence.length == 0 "> none given </p>
                                                        <span v-for = "data in residence_info">
                                                        <span v-for = "data in data">
                                                                <p><b>town:</b> {{data.town}}</p>
                                                        </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>road:</b> {{data.road}}</p>
                                                                </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>street / drive:</b> {{data.street}}</p>
                                                                </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>area name:</b> {{data.village_estate}}</p>
                                                                </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>description:</b> {{data.description}}</p>
                                                                </span>
                                                        </span>
                                                </div>
                                        </div>                                       
                                </div>
                                <div class="col">
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0"> contact </div>
                                                <div class="card-body">
                                                        <p v-if = "contact_info.contact.length == 0 "> none given </p>
                                                        <span v-for = "data in contact_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>phone number:</b> {{data.phone}}</p>
                                                                </span>
                                                                <span v-for = "data in member_info">
                                                                        <span v-for = "data in data">
                                                                        <div v-if = "data.member.email == ''"><b>email :</b> none given</div>
                                                                        <div v-if = "data.member.email != ''"><b>email :</b> {{data.member.email}}</div>
                                                                        </span>
                                                                </span>
                                                        </span>                               
                                                </div>
                                        </div>
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0">Family</div>
                                                <div class="card-body">
                                                        <p v-if = "family_info.family.length == 0 "> none given </p>

                                                        <table class="table" v-if = "min_age > 0  || max_age != 150 ">
                                                                <tbody>
                                                                <tr v-for="data in family_info.family">
                                                                <span  v-for = "data in data" >
                                                                        <span  >{{data.name}}</span>
                                                                        <div v-for = "data in data.members">
                                                                        <td>
                                                                                <img v-if = "data.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                                                                <img v-if = "data.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                                                                                <img v-if = "data.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                                                                        
                                                                        <span class="text-secondary">{{data.member.first_name}} {{data.member.last_name}}</span>
                                                        
                                                                        </td>
                                                                        </div>
                                                                        </span>
                                                                
                                                                
                                                                
                                                                </tr>
                                                                </tbody>
                                                        </table>
                                                </div>
                                        </div>
                                </div>
                                </div>                             
                        </div>
                        <div class="tab-pane fade" id="pill-groups" role="tabpanel" aria-labelledby="pill-groups-tab">                                                                                                 
                        
                        <h3>church groups</h3>
                        <table class="table" v-if = "groups_selected == true">
                        <thead class=""  v-if = "church_groups.response.length > 0">
                                <tr>
                                        <th>group</th>
                                        <th>joined</th>
                                        <th>role</th>
                                </tr>
                        </thead>
                                <tr v-for = "data in church_groups.response">
                                        <td>{{data.church_group.name}}</td>
                                        <td>{{data.date_joined}}</td>
                                        <td>{{data.role.role}}</td>
                                </tr>

                        </table>
                        <div v-if = "groups_selected == true">
                        <div v-if = "church_groups.response.length == 0 ">
                        <p class="text-info center-div">none</p> 
                        </div>
                        </div>
                        </div>
                        <div class="tab-pane fade" id="pill-dates" role="tabpanel" aria-labelledby="pill-dates-tab">
                                        <ul class="progressbar">
                                                        <li class="active">login</li>
                                                       <li class="active">choose interest</li>
                                                        <li>add friends</li>
                                                        <li>View map</li>
                                        </ul> 
                        </div>
                        <div class=" tab-pane fade" id="pill-contributions" role="tabpanel" aria-labelledby="pill-contributions-tab">
                                <div class="row">
                                <div class="col-2"></div>
                                <div class="col-8">
                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li class="nav-item">
                                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">contributions</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Pledges</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link" id="pills-tithes-tab" data-toggle="pill" href="#pills-tithes" role="tab" aria-controls="pills-tithes" aria-selected="false">Tithes</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link" id="pills-offerings-tab" data-toggle="pill" href="#pills-offerings" role="tab" aria-controls="pills-offerings" aria-selected="false">Offerings</a>
                                        </li>
                                </ul>
                                </div>
                                <div class="col-2"></div>
                                </div>
                                <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" v-if="finances_selected">
                                                        <h3 >contributions</h3>                                                      
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>project</th>
                                                                    <th>amount</th>
                                                                    <th>date</th>                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for = "data in contribution_info.contribution">
                                                                    <td>{{data.project.name}}</td>
                                                                    <td><p class="text-muted">{{humanize(data.amount)}}</p></td>
                                                                    <td>{{data.recorded_at}}</td>                                                                    
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                        </div>
                                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" v-if="finances_selected">
                                                        <h3>pledges</h3>                                                      
                                                        <table class="table">
                                                        
                                                                <thead>
                                                                        <tr>
                                                                        <th>project</th>
                                                                        <th>amount pledged</th>
                                                                        <th>amount raised</th>
                                                                        <th>amount remaining</th>
                                                                        <th>percentage funded</th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <tr v-for = "data in pledges_info.pledges">
                                                                        <td>{{data.project.name}} </td>
                                                                        <td>{{humanize(data.amount)}}</td>
                                                                        <td><p class="text-muted">{{humanize(data.amount_so_far)}}</p></td>
                                                                        <td><p  >{{humanize(data.remaining_amount)}}</p></td>
                                                                        <td><span class="text-muted">{{data.percentage_funded}}</span></td>
                                                                        
                                                                        </tr>
                                                                </tbody>
                                                        </table>
                                        </div>
                                        <div class="tab-pane fade" id="pills-tithes" role="tabpanel" aria-labelledby="pills-tithes-tab" v-if = "finances_selected">                                                        
                                                        <h3>tithes</h3>                                                         
                                                        <div class="row" v-for = "data in tithe_stats.stats">
                                                                <p class="card-text" style="padding: 5px"><small class="text-muted">total this month |<span class="text-info">{{humanize(data.total_this_month)}}</span>|</small> </p>                                                                                     
                                                                <p class="card-text" style="padding: 5px"><small class="text-muted">total this year |<span class="text-info">{{humanize(data.total_this_year)}}|</span></small> </p>
                                                        </div>                                                                                                                                                                                     
                                                        
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>amount</th>
                                                                    <th>narration</th>                                                                    
                                                                    <th>date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for = "data in tithe_info.tithes">                                                                    
                                                                    <td><p class="text-muted">{{humanize(data.amount)}}</p></td>
                                                                    <td class="small"> {{data.narration}}</td>
                                                                    <td>{{data.date}}</td>                                                         
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                        </div>
                                        <div class="tab-pane fade" id="pills-offerings" role="tabpanel" aria-labelledby="pills-offerings-tab" v-if = "finances_selected">                                                      
                                                        <h3>offerings </h3> 
                                                        <div class="row" v-for = "data in offering_stats.stats">
                                                                <p class="card-text" style="padding: 5px"><small class="text-muted">total this month |<span class="text-info">{{humanize(data.total_this_month)}}</span>|</small> </p>                                                                                     
                                                                <p class="card-text" style="padding: 5px"><small class="text-muted">total this year |<span class="text-info">{{humanize(data.total_this_year)}}|</span></small> </p>
                                                        </div> 
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>amount</th>
                                                                    <th>narration</th>                                        
                                                                    <th>date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for = "data in offering_info.offerings">                                                                    
                                                                    <td><p class="text-muted">{{humanize(data.amount)}}</p></td>
                                                                    <td> {{data.narration}}</td>
                                                                    <td>{{data.date}}</td>                                                         
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                        </div>
                                </div>                          
                        </div>
                        <div class="tab-pane fade" id="pill-delete" role="tabpanel" aria-labelledby="pill-delete-tab">                                                                             
                                <div class="tree">
                                        <ul>
                                        <li>
                                        <div class="family">
                                                <div class="person child male">
                                                        <div class="name">Grandfather</div>
                                                </div>
                                            <div class="parent">
                                              <div class="person female">
                                                <div class="name">Grandmother</div>
                                              </div>
                                              <ul>
                                                <li>
                                                  <div class="family" style="width: 172px">
                                                    <div class="person child male">
                                                      <div class="name">Uncle</div>
                                                    </div>
                                                    <div class="parent">
                                                      <div class="person female">
                                                        <div class="name">Wife of Uncle</div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </li>
                                                <li>
                                                  <div class="family" style="width: 172px">
                                                    <div class="person child female">
                                                      <div class="name">Aunt</div>
                                                    </div>
                                                    <div class="parent">
                                                      <div class="person male">
                                                        <div class="name">Husband of Aunt</div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </li>
                                                <li>
                                                  <div class="family" style="width: 344px">
                                                    <div class="person child female">
                                                      <div class="name">Mother</div>
                                                    </div>
                                                    <div class="parent">
                                                      <div class="person male">
                                                        <div class="name">Father</div>
                                                      </div>
                                                      <ul>
                                                        <li>
                                                          <div class="person child male">
                                                            <div class="name">Me</div>
                                                          </div>
                                                        </li>                                                        
                                                        <li>
                                                          <div class="person child female">
                                                            <div class="name">Sister</div>
                                                          </div>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                    <div class="person spouse male">
                                                      <div class="name">Spouse</div>
                                                    </div>
                                                  </div>
                                                </li>
                                              </ul>
                                            </div>
                                                </div>
                                        </li>
                                        </ul>
                                        </div>
                                        <div class="tree">
                                                {{family_tree}} 
                                                <ul >
                                                <li v-for="data in family_tree.tree" v-if="data.member.level == 0">
                                                        <div class="person child male">
                                                                <div class="name">{{data.member.member}}</div>
                                                        </div>
                                                        <div class="parent">
                                                                <div class="person female">
                                                                        <div class="name" v-if="data.member.spouse != null">
                                                                                {{data.member.spouse}}
                                                                        </div>
                                                                        <div class="name" v-if="data.member.spouse == null">
                                                                                no spouse
                                                                        </div>
                                                                </div>                                                                                                        
                                                        </div>
                                                        <ul>
                                                        <span v-for="child in data.member.children">                                                                
                                                                <li v-for="data in family_tree.tree" v-if="data.member.level == 1 && data.member.member == child">
                                                                        <div class="person child male">
                                                                                <div class="name">{{data.member.member}}</div>
                                                                        </div>  
                                                                        <div class="parent">
                                                                                <div class="person female">
                                                                                        <div class="name" v-if="data.member.spouse != null">
                                                                                                {{data.member.spouse}}
                                                                                        </div>
                                                                                        <div class="name" v-if="data.member.spouse == null">
                                                                                                no spouse
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <ul>
                                                                                <span v-for="child in data.member.children">       
                                                                                        <li  v-for="data in family_tree.tree" v-if="data.member.level == 2 && data.member.member == child">
                                                                                                <div class="person child male">
                                                                                                        <div class="name">{{data.member.member}}</div>
                                                                                                </div>  
                                                                                        </li>
                                                                                </span>
                                                                        </ul>                                                                  
                                                                </li>                                                             
                                                        </span>
                                                        </ul>                                                        
                                                </li>
                                                </ul>                                        
                                        </div>
                        </div>

                </div>
              </div>
            </div>
          </div>
    </div>
  </template>

<script>
export default {
  name: 'memberDetail',
  data () {
    return {
        contact_info: null, contact_errors: [],
        age_info: null, age_errors: [],
        residence_info: null, residence_errors: [],
        roles_info: null, roles_errors: [],
        marital_status_info: null, marital_status_errors: [],
        family_info: null, family_errors: [],
        groups_selected: false,
        church_groups: null,
        finances_selected: false, contribution_info:null, pledges_info: null,
        offering_info: null,tithe_info: null,tithe_stats: null,offering_stats: null,
        family_tree: null      
    }
  },
  created() {
        this.fetchData()
    },

  watch: {
        '$route': 'fetchData'
    },
  methods: {
        humanize: function(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getMemberGroups: function(){                
                this.groups_selected = true                
                this.$http.get(this.$BASE_URL + '/api/groups/church-groups-for-a-member/'+this.$route.params.id+'/')
                .then(response => {
                this.church_groups = {"response": response.data }
                })
                .catch(error=> {
                this.groups_errors.push(error)
                })            
        },
        getMemberFinances: function() {

                this.finances_selected = true
                this.$http.get(this.$BASE_URL + '/api/projects/contributions-by-member/'+this.$route.params.id+'/')
                .then(response => {
                this.contribution_info = {"contribution": response.data }
                
                })
                .catch(error=> {
                
                })       
                this.$http.get(this.$BASE_URL + '/api/projects/pledges-by-member/'+this.$route.params.id+'/')
                .then(response => {
                this.pledges_info = {"pledges": response.data }
                })
                .catch(error=> {
                
                })  
                this.$http.get(this.$BASE_URL + '/api/finance/tithe-stats-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.tithe_stats = {"stats": response.data }
                })
                .catch(error=> {
                
                }) 
                this.$http.get(this.$BASE_URL + '/api/finance/tithe-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.tithe_info = {"tithes": response.data }
                })
                .catch(error=> {
                
                }) 
                this.$http.get(this.$BASE_URL + '/api/finance/offering-stats-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.offering_stats = {"stats": response.data }
                })
                .catch(error=> {
                
                }) 
                this.$http.get(this.$BASE_URL + '/api/finance/offerings-by-member/'+this.$route.params.id+'/')
                .then(response => {
                this.offering_info = {"offerings": response.data }
                })
                .catch(error=> {
                
                }) 

        },
        fetchData() {
                this.$http.get(this.$BASE_URL + '/api/members/member/'+this.$route.params.id+'/')
                .then(response => {
                this.member_info = {"member": response.data }
                })
                .catch(error=> {
                this.contact_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/contact-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.contact_info = {"contact": response.data }
                })
                .catch(error=> {
                this.contact_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/age-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.age_info = {"age": response.data }
                })
                .catch(error=> {
                this.age_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/residence-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.residence_info = {"residence": response.data }
                })
                .catch(error=> {
                this.residence_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/roles-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.roles_info = {"roles": response.data }
                })
                .catch(error=> {
                this.roles_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/marital-status-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.marital_status_info = {"marital_status": response.data }
                })
                .catch(error=> {
                this.marital_status_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/family-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.family_info = {"family": response.data }
                })
                .catch(error=> {
                this.family_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/family-tree-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.family_tree = {"tree": response.data }
                })
                .catch(error=> {
                this.family_errors.push(error)
                })
            
        }
      
    }

}
</script>


<style >
</style>
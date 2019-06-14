<template>
    <div >
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'projectList'}">projects</router-link></span> 
                    <li class="breadcrumb-item active" aria-current="page"><span v-for = "data in context.response">{{data.name}}</span></li>
                </ol>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-10 col-md-8 col-lg-2">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-contributions-tab" data-toggle="pill" href="#v-pills-contributions" role="tab" aria-controls="v-pills-contributions" aria-selected="true" v-on:click="getContributions()">Contributions</a>
                                <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-pledges-tab" data-toggle="pill" href="#v-pills-pledges" role="tab" aria-controls="v-pills-pledges" aria-selected="false" v-on:click="getPledges()">Pledges</a>
                            
                        </div>
                        <div style="padding:40px 0px 20px 0px">
                                <div class="home-menu-item">
                                        <div class="row" v-for = "data in context.response " >
                                                <p class="breadcrumb-item active"><b><span v-for = "data in context.response">{{data.name}}</span></b></p>
                                                <p class="card-text" style="padding: 5px">
                                                        <small class="text-muted">required amount-</small>
                                                        <span class="badge badge-pill badge-info">{{data.required_amount}}</span>
                                                </p>
                                                <p class="card-text" style="padding: 5px">
                                                        <small class="text-muted">raised amount-</small>
                                                        <span class="badge badge-pill badge-success">{{data.raised_amount}}</span>
                                                </p>
                                                <p class="card-text" style="padding: 5px">
                                                        <small class="text-muted">percentage funded-</small>
                                                        <span class="badge badge-pill badge-danger">{{data.percentage_funded}} %</span>
                                                </p>
                                        </div>
                                </div>
                        </div>                
                </div>
                <div class="col">
                        <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-contributions" role="tabpanel" aria-labelledby="v-pills-contributions-tab">
                                    <h3 class="breadcrumb-item active"><span v-for = "data in context.response">{{data.name}} /</span> contributions</h3>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>name</th>
                                                <th>amount</th>
                                                <th>date</th>
                                                <th>recorded by</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for = "data in contributions.response">
                                                
                                                <td v-if = "data.member != null">{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                <td v-if = "data.names != ''"><span class="text-info">(N.M)</span> {{data.names}}</td>
                                                <td><p class="text-success">{{data.amount}}</p></td>
                                                <td>{{data.recorded_at}}</td>
                                                <td><p class="text-info">{{data.recorded_by.member.first_name}} {{data.recorded_by.member.last_name}}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-pledges" role="tabpanel" aria-labelledby="v-pills-pledges-tab">
                                    <div v-if = "pledges_selected">
                                        <h3 class="breadcrumb-item active"><span v-for = "data in context.response">{{data.name}} /</span> contributions</h3>
                                        <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>name</th>
                                                        <th>amount pledged</th>
                                                        <th>amount raised</th>
                                                        <th>amount remaining</th>
                                                        <th>percentage funded</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for = "data in pledges.response">                                                        
                                                        <td v-if = "data.member != null">{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                        <td v-if = "data.names != ''"><span class="text-info">(N.M)</span> {{data.names}}</td>
                                                        <td>{{data.amount}}</td>
                                                        <td><p class="text-success">{{data.amount_so_far}}</p></td>
                                                        <td><p class="text-danger">{{data.remaining_amount}}</p></td>
                                                        <td><span class="badge badge-pill badge-info">{{data.percentage_funded}}</span></td>
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                    </div>
                                </div>
                               
                        </div>
                </div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-3">
                        <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if=" tab == 'contributions'">
                                <a href="#" data-toggle="modal" data-target="#addContribution" style="text-decoration: none">
                                    <div class="add-button" >
                                        <b>+</b> add contribution
                                    </div>
                                </a>
                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                        <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addPledge"><b>+</b> add pledge</a>                                        
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#settlePledge"><b>+</b> settle pledge</a>                                                                                                                
                                </div>
                        </div>
                        <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if=" tab == 'pledges'">
                                <a href="#" data-toggle="modal" data-target="#addPledge" style="text-decoration: none">
                                    <div class="add-button" >
                                        <b>+</b> add pledge
                                    </div>
                                </a>
                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                        <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#settlePledge"><b>+</b> settle pledge</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addContribution"><b>+</b> add contribution</a>                                                                                                                
                                </div>
                        </div>
                </div>
                <!-- add contribution Modal -->
                <div class="modal fade" id="addContribution" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add contribution</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> non-member </label>
                                                    </div>                                                    
                                            </div>
                                            <hr/>

                                            <div class=" row form-group" v-if="! non_member">
                                              <label class="col-3"><b>member:</b></label>
                                              <div class="col-8">
                                                    <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch" autofocus>   
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
                                              </div>                                           
                                              
                                            </div>
                                
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>names:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of conributor" autofocus>                                        
                                            </div>
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>phone:</b></label>                                                    
                                                    <div class="col-8">
                                                            <div class="row">
                                                                    <span class="col-4">
                                                                            <label><b>code :</b></label>
                                                                            <input class="form-control" type="text" placeholder="+254" v-model = "country_code">
                                                                    </span>
                                                                    <span class="col-8">
                                                                            <label><b>number :</b></label>
                                                                            <input type="text" class="form-control"  placeholder="712345678" v-model = "phone_number">
                                                                    </span>
                                                            </div> 
                                                    </div>                                                                                                                                         
                                            </div>                                                    
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>
                                                    <input type="number" class=" col-8 form-control" placeholder="enter KSh value of the contribution">                                                    
                                            </div>                                                                                   
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"><b>+</b> add contribution</button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- add pledge Modal -->
                <div class="modal fade" id="addPledge" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add pledge</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> non-member </label>
                                                    </div>                                                    
                                            </div>
                                            <hr/>

                                            <div class=" row form-group" v-if="! non_member">
                                              <label class="col-3"><b>member:</b></label>
                                              <div class="col-8">
                                                    <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch" autofocus>   
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
                                              </div>                                           
                                              
                                            </div>
                                
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>names:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of person pledging" autofocus>                                        
                                            </div>
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>phone:</b></label>                                                    
                                                    <div class="col-8">
                                                            <div class="row">
                                                                    <span class="col-4">
                                                                            <label><b>code :</b></label>
                                                                            <input class="form-control" type="text" placeholder="+254" v-model = "country_code">
                                                                    </span>
                                                                    <span class="col-8">
                                                                            <label><b>number :</b></label>
                                                                            <input type="text" class="form-control"  placeholder="712345678" v-model = "phone_number">
                                                                    </span>
                                                            </div> 
                                                    </div>                                                                                                                                         
                                            </div>                                                    
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>
                                                    <input type="number" class=" col-8 form-control" placeholder="enter the amount pledged">                                                    
                                            </div>                                                                                   
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"><b>+</b> add pledge</button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- settle pledge Modal -->
                <div class="modal fade" id="settlePledge" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">settle pledge</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> settle for non-member </label>
                                                    </div>                                                    
                                            </div>
                                            <hr/>

                                            <div class=" row form-group" v-if="! non_member">
                                                <label class="col-3"><b>member:</b></label>
                                                <div class="col-8">
                                                    <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch" autofocus>   
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
                                                </div>                                           
                                                
                                            </div>
                                
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>names:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of person pledging" autofocus>                                        
                                            </div>
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>phone:</b></label>                                                    
                                                    <div class="col-8">
                                                            <div class="row">
                                                                    <span class="col-4">
                                                                            <label><b>code :</b></label>
                                                                            <input class="form-control" type="text" placeholder="+254" v-model = "country_code">
                                                                    </span>
                                                                    <span class="col-8">
                                                                            <label><b>number :</b></label>
                                                                            <input type="text" class="form-control"  placeholder="712345678" v-model = "phone_number">
                                                                    </span>
                                                            </div> 
                                                    </div>                                                                                                                                         
                                            </div>                                                    
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>
                                                    <input type="number" class=" col-8 form-control" placeholder="enter the amount">                                                    
                                            </div>                                                                                   
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">settle pledge</button>
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
    name : 'projectDetail',
    data () {
        return {
            context: null,
            tab: 'contributions',
            non_member: false,
            contributions: null,
            pledges: null,
            pledges_selected: false,
            foundItems: null,
            fetch_data_error: [],
            memberSearch: '',found_members:[],
            memberSearch_status: '',selectedMember: null,
            showMemberInput: true,
            member_ids: [],

        }
    },
    created () {
        this.fetchdata()
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    watch: {
    // whenever question changes, this function will run
    memberSearch: function () {
            if (this.memberSearch.length > 0){
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
        fetchdata () {
            this.fetch_data_error = []
            this.$http.get(this.$BASE_URL +'/api/projects/project-list/')
                .then(response => {
                this.context = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })

            this.$http.get(this.$BASE_URL +'/api/projects/contribution-for-project/'+ this.$route.params.id + '/')
                .then(response => {
                this.contributions = {"response": response.data } 
                })
                .catch((err) => {
                    
                })
        },
        getPledges: function(){
            this.tab = 'pledges'
            this.pledges_selected = true
            this.$http.get(this.$BASE_URL +'/api/projects/pledges-for-project/'+ this.$route.params.id + '/')
                .then(response => {
                this.pledges = {"response": response.data } 
                })
                .catch((err) => {
                    
                })
        },
        getContributions: function(){
            this.tab = 'contributions'
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
          this.memberSearch_status = first_name + ' ' + last_name + ' selected'
          this.showMemberInput = false
        },
    }

}
</script>


<style >
</style>
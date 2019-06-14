<template>
    <div>
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                    <li class="breadcrumb-item active" aria-current="page">finances</li>
                </ol>
        </nav>
        <div class = "container">
            <div class = "row">
                <div class = "col-12 col-sm-10 col-md-8 col-lg-2">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-income-tab" data-toggle="pill" href="#v-pills-income" role="tab" aria-controls="v-pills-income" aria-selected="true">Income</a>
                                <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" data-toggle="pill" href="#v-pills-expenditure" role="tab" aria-controls="v-pills-expenditure" aria-selected="false" v-on:click="getExpenditures()">Expenditure</a>  
                        </div>
                        <div style="padding:40px 0px 20px 0px">                                                               
                            <div class="home-menu-item">
                                    <div class="row" v-if = "tithes_selected">
                                            <p class="breadcrumb-item active" ><b>tithe totals:</b></p>
                                            <p class="card-text" style="padding: 5px"><small class="text-muted">this month-</small> <span class="badge badge-pill badge-info">{{tithe_stats.response.total_in_tithe_this_month}}</span></p>
                                            <p class="card-text" style="padding: 5px"><small class="text-muted">this year-</small> <span class="badge badge-pill badge-success">{{tithe_stats.response.total_in_tithe_this_year}}</span></p>
                                    </div>
                                    
                                    <div class="row" v-if = "offerings_selected">
                                            <p class="breadcrumb-item active"><b>offering totals:</b></p>
                                            <p class="card-text" style="padding: 5px"><small class="text-muted">this month-</small> <span class="badge badge-pill badge-info">{{offering_stats.response.total_in_offerings_this_month}}</span></p>
                                            <p class="card-text" style="padding: 5px"><small class="text-muted">this year-</small> <span class="badge badge-pill badge-success">{{offering_stats.response.total_in_offerings_this_year}}</span></p>
                                    </div> 
                                    
                                    <div class="row" v-if = "any_other_selected">
                                            <p class="breadcrumb-item active"><b>others totals:</b></p>
                                            <p class="card-text" style="padding: 5px"><small class="text-muted">this month-</small> <span class="badge badge-pill badge-info">{{income_stats.response.total_this_month}}</span></p>
                                            <p class="card-text" style="padding: 5px"><small class="text-muted">this year-</small> <span class="badge badge-pill badge-success">{{income_stats.response.total_this_year}}</span></p>
                                    </div>                                   
                            </div>
                        </div>
                </div>
                <div class = "col">
                    <div class="tab-content" id="v-pills-tabContent">
                       
                        <div class="tab-pane fade show active" id="v-pills-income" role="tabpanel" aria-labelledby="v-pills-income-tab">
                                <div class="container">
                                        <div class="row">
                                          <div class="col-2">                                            
                                          </div>
                                          <div class="col-8">
                                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                        <li class="nav-item">
                                                          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" v-on:click = "getTithes()">Tithes</a>
                                                        </li>
                                                        <li class="nav-item">
                                                          <a class="nav-link" id="pills-offerings-tab" data-toggle="pill" href="#pills-offerings" role="tab" aria-controls="pills-offerings" aria-selected="false" v-on:click = "getOfferings()">Offerings</a>
                                                        </li>
                                                        <li class="nav-item">
                                                          <a class="nav-link" id="pills-anyOther-tab" data-toggle="pill" href="#pills-anyOther" role="tab" aria-controls="pills-anyOther" aria-selected="false" v-on:click = "getAnyOther()">Others</a>
                                                        </li>
                                                </ul>
                                          </div>
                                          <div class="col-2">                                            
                                          </div>
                                        </div>
                                      </div>                                                       
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">                                          
                                            <div>
                                                <h3 class="breadcrumb-item active">tithes</h3>
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>name</th>
                                                            <th>amount</th>
                                                            <th>date</th>
                                                            <th>total this month</th>
                                                            <th>total this year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for = "data in tithes.response">
                                                            <td>{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                            <td><p class="text-success">{{data.amount}}</p></td>
                                                            <td>{{data.date}}</td>
                                                            <td><p class="text-info">{{data.total_this_month}}</p></td>
                                                            <td><p class="text-secondary">{{data.total_this_year}}</p></td>                                                          
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-offerings" role="tabpanel" aria-labelledby="pills-offerings-tab">                                                                                  
                                            <div v-if = "offerings_selected">
                                                <h3 class="breadcrumb-item active">offerings</h3>
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>name</th>
                                                            <th>amount</th>
                                                            <th>date</th>
                                                            <th>total this month</th>
                                                            <th>total this year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for = "data in offerings.response">
                                                            <td v-if = "data.member != null">{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                            <td v-if = "data.name_if_not_member != null"><span class="text-info">(N.M)</span> {{data.name_if_not_member}}</td>
                                                            <td><p class="text-success">{{data.amount}}</p></td>
                                                            <td>{{data.date}}</td>
                                                            <td><p class="text-info">{{data.total_this_month}}</p></td>
                                                            <td><p class="text-secondary">{{data.total_this_year}}</p></td>                                                          
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-anyOther" role="tabpanel" aria-labelledby="pills-anyOther-tab">                                        
                                            <div v-if = "any_other_selected">
                                                    <h3 class="breadcrumb-item active">others</h3>
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>name</th>
                                                                <th>description</th>
                                                                <th>total this month</th>
                                                                <th>total this year</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for = "data in incomes.response">
                                                                <td>{{data.type_name}}</td>
                                                                <td><p class="text-success">{{data.description}}</p></td>
                                                                <td><p class="text-info">{{data.total_this_month}}</p></td>
                                                                <td><p class="text-secondary">{{data.total_this_year}}</p></td>                                                          
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                    </div>
                                </div>
                        </div>
                        <div class="tab-pane fade show " id="v-pills-expenditure" role="tabpanel" aria-labelledby="v-pills-expenditure-tab">
                            <p class="text-info"> feature still under development</p>
                        </div>
                    </div>
                </div>
                <div class = "col-12 col-sm-10 col-md-8 col-lg-3">
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "tithes_selected">
                            <a href="#" data-toggle="modal" data-target="#addTithe" style="text-decoration: none">
                                <div class="add-button" style="text-align: center">
                                    <b>+</b> add tithe 
                                </div>                                
                            </a>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addOffering"><b>+</b> add offering</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#"><b>+</b> add income</a>                                                                
                                <a class="dropdown-item" href="#"><b>+</b> add a type of income</a>
                            </div>
                    </div>
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "offerings_selected">
                            <a href="#" data-toggle="modal" data-target="#addOffering" style="text-decoration: none">
                                <div class="add-button">
                                    <b>+</b> add offering
                                </div>
                            </a>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                    <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addTithe"><b>+</b> add tithe</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#"><b>+</b> add income</a>                                                                
                                <a class="dropdown-item" href="#"><b>+</b> add a type of income</a>
                            </div>
                    </div>
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "any_other_selected">
                            <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                                <div class="add-button">
                                    <b>+</b> add income
                                </div>
                            </a>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                    <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">                            
                                <a class="dropdown-item" href="#"><b>+</b> add a type of income</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addTithe"><b>+</b> add tithe</a>
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addOffering"><b>+</b> add offering</a>                                                                
                            </div>
                    </div>
                </div>
            </div>
                <!-- add tithe modal -->
                <div class="modal fade" id="addTithe" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add tithe for member</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>                                            
                                            <div class=" row form-group">
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
                                                                                  
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>
                                                    <input type="number" class=" col-8 form-control" placeholder="enter the amount">                                                    
                                            </div>                                                                                   
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"><b>+</b> add tithe</button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- add offering -->
                <div class="modal fade" id="addOffering" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add offering</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> offering from non-member </label>                                                            
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
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of person offering" autofocus>                                        
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
                            <button type="button" class="btn btn-primary"><b>+</b> add offering</button>
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
    name: 'generalFinance',
    data () {
        return{
            tithe_stats: null,    
            tithes: null,
            non_member: false,
            group: false,
            fetch_data_error: [],
            tithes_selected: false,
            offerings_selected: false,
            any_other_selected: false,
            offering_stats: null,
            offerings: null,
            income_stats: null,
            incomes: null,
            memberSearch: '',found_members:[],
            memberSearch_status: '',selectedMember: null,
            showMemberInput: true,
        }
    },
    created () {
        this.checkLoggedIn()
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
        checkLoggedIn() {
            if (!this.$session.has("token")) {
                router.push("/login")
            }
        },
        fetchdata () {
            this.tithes_selected = true
            this.fetch_data_error = []
            this.$http.get(this.$BASE_URL + '/api/finance/tithe-stats/')
                .then(response => {
                this.tithe_stats = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get(this.$BASE_URL + '/api/finance/tithe-by-members-this-month/')
                .then(response => {
                this.tithes = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        },
        getTithes: function(){
            this.offerings_selected = false
            this.any_other_selected = false
            this.tithes_selected = true
        },
        getOfferings: function(){
            this.tithes_selected = false
            this.any_other_selected = false
            this.offerings_selected = true
            this.$http.get(this.$BASE_URL + '/api/finance/offering-stats/')
                .then(response => {
                this.offering_stats = {"response": response.data }             
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get(this.$BASE_URL + '/api/finance/offerings-by-members-this-month/')
                .then(response => {
                this.offerings = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            
        },
        getAnyOther: function(){
            this.tithes_selected = false            
            this.offerings_selected = false
            this.any_other_selected = true
            this.$http.get(this.$BASE_URL + '/api/finance/income-stats/')
                .then(response => {
                this.income_stats = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get(this.$BASE_URL + '/api/finance/income-type-list/')
                .then(response => {
                this.incomes = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
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
          this.memberSearch_status =  first_name + ' ' + last_name + ' selected'
          this.showMemberInput = false
        },
    }
}
</script>


<style >
</style>
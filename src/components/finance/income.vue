<template>
        <div>
            <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                            <li class="breadcrumb-item"><span class="backButton"><a href=# style="text-decoration: none" v-on:click="goBack()" >finances</a></span>
                        <li class="breadcrumb-item active" aria-current="page">
                            <span v-for="data in income_type.response">{{data.type_name}}</span>
                        </li>
                    </ol>
            </nav>
            <div class = "container">  
                <div class="row">
                        <div class="filters col-12 col-sm-8 col-md-8 col-lg-3" style="padding: 3px 3px 3px 3px">
                                <a href="#" v-on:click="goBack()" role="button" aria-expanded="false">
                                        <div class="moreButton">                                
                                            <b> Back to finances</b>
                                        </div>
                                    </a>
                            </div>
                            <div class="col-9">
                                    <div class="row">
                                        <div class="col-4"></div>
                                        <div class="col-4"></div>
                                        <div class="col-4">
                                                <div class="btn-group" style="padding: 0px 0px 25px 10px" >
                                                        <a href="#" data-toggle="modal" data-target="#addIncome" style="text-decoration: none">
                                                            <div class="add-button">
                                                                <b>+</b> add income 
                                                            </div>
                                                        </a>
                                                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                                                <span class="sr-only">Toggle Dropdown</span>
                                                        </button>                                                        
                                                </div>
                                        </div>                                        
                                    </div>
                                    <div class="home-menu-item">
                                                                    
                                            <div class="row" v-for="data in income_type.response">
                                                    <div class=" col-6 card-text" style=" padding: 5px">
                                                            <small class="text-muted">total this month</small>                                                                
                                                            <h3 class="text-info">KSh {{data.total_this_month}}</h3>
                                                    </div>  
                                                    <div class=" col-6 card-text" style=" padding: 5px">
                                                            <small class="text-muted">total this year</small>                                                                
                                                            <h3 class="text-info">KSh {{humanize(data.total_this_year)}}</h3>
                                                    </div>                                                                  
                                            </div>                                   
                                    </div>
                                    <hr/>
                                    <p class="col-8">
                                            <span class="badge badge-pill badge-info">{{foundItems}}</span> entries found
                                    </p>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>amount</th>                                                                
                                                <th>date</th>
                                                <th>narration</th>                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for = "data in incomes.response">
                                                <td>
                                                    <router-link class="text-secondary" style="text-decoration: none;"  :to="`/income/`+ data.id + `/`">                                                         
                                                        {{humanize(data.amount)}}
                                                    </router-link>
                                                </td>                                                               
                                                <td><p class="text-info">{{data.date}}</p></td>
                                                <td><p class="text-secondary">{{data.narration}}</p></td>                                                                                                                                                                        
                                            </tr>
                                        </tbody>
                                    </table>
                          </div>
                <!-- add income modal -->
                <div class="modal fade" id="addIncome" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add income</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body"> 
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if ="added_income.length > 0">
                                            <strong>
                                                <span v-for="data in added_income">
                                                    income of type {{data.type.type_name}} and amount {{humanize(data.amount)}} succesfuly added
                                                </span>
                                            </strong> 
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                          </div>                               
                                    <form>                                            
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>
                                                    <input type="number" class=" col-3 form-control" placeholder="amount" v-model="income_amount">
                                                    <div class="col-6 text-success" v-if ="income_amount > 0"><h3>KSh {{humanize(income_amount)}}</h3></div>                                               
                                                    <p v-if="income_amount_errors.length">
                                                        <ul>
                                                                <small><li v-for="error in income_amount_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                        </ul>
                                                    </p> 
                                            </div>
                                            <hr/>   
                                            <div class="row form-group">
                                                <label class="col-3"><b>narration:</b></label>
                                                <textarea type="text" class="col-8 form-control" rows='3' v-model="income_narration"></textarea>                                                   
                                            </div>                                                                                
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" v-on:click="addIncome()"><b>+</b> add income</button>
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
        name: 'income',
        data () {
            return{
            //get data                                                                
                fetch_data_error: [],            
                foundItems: 0,
                income_type: null,
                incomes: null,
            //add income
                income_narration: null,
                income_type_errors: [],
                income_amount: null,
                income_amount_errors: [],
                added_income: []
            }
        },
        created () {
            this.checkLoggedIn()
            this.fetchdata()
        },
        watch: {
            '$route': 'fetchdata',
        },
        methods: {
            //check if member is logged in
            checkLoggedIn() {
                if (!this.$session.has("token")) {
                    router.push("/login")
                }
            },
            humanize: function(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            //go back to previous window
            goBack: function() {
                window.history.back();
            },
            //fetch data
            fetchdata () {
                this.fetch_data_error = []
                this.$http.get(this.$BASE_URL + '/api/finance/income-type/' + this.$route.params.id + "/")
                    .then(response => {
                    this.income_type = {"response": response.data } 
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
                this.$http.get(this.$BASE_URL + '/api/finance/income-of-type/' + this.$route.params.id + "/")
                    .then(response => {
                    this.incomes = {"response": response.data } 
                    var array = this.incomes.response
                    this.foundItems = array.length
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
            },
            incomeFormOK: function(){
            this.added_income = []
            this.income_amount_errors = []
            this.income_type_errors = []

            if (this.income_type != null 
                && this.income_amount != null){
                    return true
                }
            if (this.income_type == null){
                    this.income_type_errors.push("select an income type or add one ")
                    return false
                }
            if (! this.income_amount > 0
                || this.income_amount == null){
                this.income_amount_errors.push("enter an amount")
                return false
            }
        },
            addIncome: function(){           
            if (this.incomeFormOK()){
                this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/add-income/',
                        data: {                                                               
                                recording_member_id: this.$session.get('member_id'),                             
                                income_type_id: this.$route.params.id,                        
                                narration: this.income_narration,                        
                                amount: this.income_amount                                    
                        }
                        }).then(response => {
                            this.added_income.push(response.data)
                            this.income_amount = null,
                            this.income_narration = ''
                            alert("income successfully added")   
                            this.fetchdata()               
                        })
                        .catch((err) => {
                                
                        })
            }
        }

        },
    
    }
    </script>
    
    
    <style >
    </style>
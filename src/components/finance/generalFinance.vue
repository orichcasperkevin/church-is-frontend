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
                </div>
                <div class = "col">
                    <div class="tab-content" id="v-pills-tabContent">
                       
                        <div class="tab-pane fade show active" id="v-pills-income" role="tabpanel" aria-labelledby="v-pills-income-tab">
                            
                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li class="nav-item">
                                          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Tithes</a>
                                        </li>
                                        <li class="nav-item">
                                          <a class="nav-link" id="pills-offerings-tab" data-toggle="pill" href="#pills-offerings" role="tab" aria-controls="pills-offerings" aria-selected="false" v-on:click = "getOfferings()">Offering</a>
                                        </li>
                                        <li class="nav-item">
                                          <a class="nav-link" id="pills-anyOther-tab" data-toggle="pill" href="#pills-anyOther" role="tab" aria-controls="pills-anyOther" aria-selected="false" v-on:click = "getAnyOther()">Any Other</a>
                                        </li>
                                </ul>
                            
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <div class="row" >
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">total this month-</small> <span class="badge badge-pill badge-info">{{tithe_stats.response.total_in_tithe_this_month}}</span></p>
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">total this year-</small> <span class="badge badge-pill badge-success">{{tithe_stats.response.total_in_tithe_this_year}}</span></p>
                                            </div>
                                            <div>
                                                <h3 class="breadcrumb-item active">tithes by members this month</h3>
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
                                            <div class="row" v-if = "offerings_selected">
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">total this month-</small> <span class="badge badge-pill badge-info">{{offering_stats.response.total_in_offerings_this_month}}</span></p>
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">total this year-</small> <span class="badge badge-pill badge-success">{{offering_stats.response.total_in_offerings_this_year}}</span></p>
                                            </div>
                                            <div v-if = "offerings_selected">
                                                <h3 class="breadcrumb-item active">offerings by members this month</h3>
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
                                    <div class="tab-pane fade" id="pills-anyOther" role="tabpanel" aria-labelledby="pills-anyOther-tab">
                                            <div class="row" v-if = "any_other_selected">
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">total this month-</small> <span class="badge badge-pill badge-info">{{income_stats.response.total_this_month}}</span></p>
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">total this year-</small> <span class="badge badge-pill badge-success">{{income_stats.response.total_this_year}}</span></p>
                                            </div>
                                            <div v-if = "any_other_selected">
                                                    <h3 class="breadcrumb-item active">other sources of income</h3>
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
                            osiuj..............
                        </div>
                    </div>
                </div>
                <div class = "col-12 col-sm-10 col-md-8 col-lg-3">
                    <div style="padding: 0px 0px 25px 10px">
                            <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                                <div class="add-button">
                                    + add 
                                </div>
                            </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'generalFinance',
    data () {
        return{
            tithe_stats: null,
            tithes: null,
            fetch_data_error: [],
            offerings_selected: false,
            any_other_selected: false,
            offering_stats: null,
            offerings: null,
            income_stats: null,
            incomes: null
        }
    },
    created () {
        this.fetchdata()
    },
    methods: {
        fetchdata () {
            this.fetch_data_error = []
            this.$http.get('http://127.0.0.1:8000/api/finance/tithe-stats/')
                .then(response => {
                this.tithe_stats = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get('http://127.0.0.1:8000/api/finance/tithe-by-members-this-month/')
                .then(response => {
                this.tithes = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        },
        getOfferings: function(){
            this.offerings_selected = true
            this.$http.get('http://127.0.0.1:8000/api/finance/offering-stats/')
                .then(response => {
                this.offering_stats = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get('http://127.0.0.1:8000/api/finance/offerings-by-members-this-month/')
                .then(response => {
                this.offerings = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            
        },
        getAnyOther: function(){
            this.any_other_selected = true
            this.$http.get('http://127.0.0.1:8000/api/finance/income-stats/')
                .then(response => {
                this.income_stats = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get('http://127.0.0.1:8000/api/finance/income-type-list/')
                .then(response => {
                this.incomes = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        }
    }
}
</script>


<style >
</style>
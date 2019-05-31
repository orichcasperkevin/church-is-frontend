<template>
        <div>
            <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                        <li class="breadcrumb-item active" aria-current="page">sermons</li>
                    </ol>
            </nav>        
            <div class = "container">
                <div class="row">
                    <div  class = "col-12 col-sm-10 col-md-8 col-lg-2">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-income-tab" data-toggle="pill" href="#v-pills-today" role="tab" aria-controls="v-pills-today" aria-selected="true">today</a>
                                    <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" data-toggle="pill" href="#v-pills-this-month" role="tab" aria-controls="v-pills-this-month" aria-selected="false" v-on:click="getSermonsThisMonth()">this month</a>  
                            </div>
                    </div>
                    <div class="col">
                            <div class="tab-content" id="v-pills-tabContent">
                       
                                    <div class="tab-pane fade show active" id="v-pills-today" role="tabpanel" aria-labelledby="v-pills-today-tab">
                                        <div v-if = "! sermons_available">
                                            no sermons available today
                                        </div>
                                        <div v-if = "sermons_available">
                                            <div v-for = "data in sermons_today.response">
                                                                                                
                                                <div>{{data.title}}</div>
                                                <hr/>
                                                <div class = "row">
                                                    <div class="col-12 col-sm-10 col-md-8 col-lg-2"><img :src="data.featured_image"></div>
                                                    <div class="col text-secondary">{{data.sermon}}</div>
                                                </div>
                                                <div>
                                                        <div class="card-body">
                                                                <p class="card-text text-muted">by --{{data.preached_by_member.member.first_name}} {{data.preached_by_member.member.last_name}}--</p>                                                                                                                            
                                                                <p class="card-text"><small class="text-muted">date - <b>{{data.date}}</b></small> </p>
                                                        </div>
                                                </div>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade show " id="v-pills-this-month" role="tabpanel" aria-labelledby="v-pills-this-month-tab">
                                            <div v-if = "this_month_selected">
                                                    <div v-for = "data in sermons_this_month.response">
                                                                                                        
                                                        <div>{{data.title}}</div>
                                                        <hr/>
                                                        <div class = "row">
                                                            <div class="col-12 col-sm-10 col-md-8 col-lg-2"><img :src="data.featured_image"></div>
                                                            <div class="col text-secondary">{{data.sermon}}</div>
                                                        </div>
                                                        <div>
                                                                <div class="card-body">
                                                                        <p class="card-text text-muted">by --{{data.preached_by_member.member.first_name}} {{data.preached_by_member.member.last_name}}--</p>                                                                                                                            
                                                                        <p class="card-text"><small class="text-muted">date - <b>{{data.date}}</b></small> </p>
                                                                </div>
                                                        </div>
                                                        <hr/>
                                                    </div>
                                            </div>
                                    </div>
                                </div>
                    </div>
                    <div class = "col-12 col-sm-10 col-md-8 col-lg-3" >
                            <div style="padding: 0px 0px 25px 10px">
                                    <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                                        <div class="add-button">
                                            + add sermon
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
        name: 'sermons',
        data () {
            return{
                fetch_data_errors: null,
                sermons_available: false,
                sermons_today: null,
                this_month_selected: false,
                sermons_this_month: null
            }
        },
        created () {
           this.fetchData() 
        },
        methods: {
            fetchData () {
                this.fetch_data_error = []
                this.$http.get(this.$BASE_URL + '/api/sermons/sermons-today/')
                    .then(response => {
                    this.sermons_today = {"response": response.data }
                    if (this.sermons_today.response.length > 0){
                        this.sermons_available = true
                    }
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
            },
            getSermonsThisMonth: function () {
                this.this_month_selected = true
                this.$http.get(this.$BASE_URL + '/api/sermons/sermons-this-month/')
                    .then(response => {
                    this.sermons_this_month = {"response": response.data }
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
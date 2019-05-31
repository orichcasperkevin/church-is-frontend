<template>
        <div>
            <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                        <li class="breadcrumb-item active" aria-current="page">services</li>
                    </ol>
            </nav> 
            <div class = "container">
                <div class = "row">
                    <div class = "col-12 col-sm-10 col-md-8 col-lg-2">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-income-tab" data-toggle="pill" href="#v-pills-today" role="tab" aria-controls="v-pills-today" aria-selected="true">today</a>
                                    <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" data-toggle="pill" href="#v-pills-this-month" role="tab" aria-controls="v-pills-this-month" aria-selected="false" v-on:click="getServicesThisMonth()">this month</a>  
                            </div>
                    </div>
                    <div class = "col">
                            <div class="tab-content" id="v-pills-tabContent">
                       
                                    <div class="tab-pane fade show active" id="v-pills-today" role="tabpanel" aria-labelledby="v-pills-today-tab">
                                        <div v-if = "! services_available">
                                            <div class="center-div">
                                                <p class = "text-info">no services available today</p>
                                            </div>
                                        </div>
                                        <div v-if = "services_available">
                                        <div v-for = "data in services_today.response">
                                            <div>
                                                <h3 class="home-menu-item">{{data.service.name}}</h3>
                                                <p class="text-info small" v-if ="data.service.church_group.name">
                                                    {{data.service.church_group.name}}
                                                </p>
                                                <p class="text-info small" v-if ="! data.service.church_group.name">
                                                    open to all
                                                </p>
                                                <hr/>
                                            </div>
                                            <div>
                                                <div>action: <span class="text-muted">{{data.action}}</span></div>
                                                <div>value: <span class="text-muted">{{data.value}}</span></div>
                                            </div>
                                            <div class="row" style="padding: 10px">
                                                <div class = "col-6">
                                                    
                                                </div>
                                                <div class = "col-6">
                                                    <p class="small">venue: <span class="text-info">
                                                        {{data.venue}}</span>
                                                    </p>
                                                    <p class="small">time: <span class="text-info">
                                                            {{data.start}} - {{data.end}}</span>
                                                        </p>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade show " id="v-pills-this-month" role="tabpanel" aria-labelledby="v-pills-this-month-tab">
                                        <div v-if = "this_month_selected">
                                            <div v-for = "data in services_this_month.response">
                                                    <div>
                                                        <h3 class="home-menu-item">{{data.service.name}}</h3>
                                                        <p class="text-info small" v-if ="data.service.church_group.name">
                                                            {{data.service.church_group.name}}
                                                        </p>
                                                        <p class="text-info small" v-if ="! data.service.church_group.name">
                                                            open to all
                                                        </p>
                                                        <hr/>
                                                    </div>
                                                    <div>
                                                        <div ><b>date: <span class="text-muted">{{data.date}}</span></b></div>
                                                        <p></p>
                                                        <div>action: <span class="text-muted">{{data.action}}</span></div>
                                                        <div>value: <span class="text-muted">{{data.value}}</span></div>
                                                    </div>
                                                    <div class="row" style="padding: 10px">
                                                        <div class = "col-6">
                                                            
                                                        </div>
                                                        <div class = "col-6">
                                                            <p class="small">venue: <span class="text-info">
                                                                {{data.venue}}</span>
                                                            </p>
                                                            <p class="small">time: <span class="text-info">
                                                                    {{data.start}} - {{data.end}}</span>
                                                                </p>
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
                                            + add service
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
        name: 'services',
        data () {
            return{
                fetch_data_error: [],
                services_today: null,
                services_available: false,
                this_month_selected: false,
                services_this_month: null
            }
        },
        created () {
           this.fetchData() 
        },
        methods: {
            fetchData () {
                this.fetch_data_error = []
                this.$http.get(this.$BASE_URL + '/api/services/services-today/')
                    .then(response => {
                    this.services_today = {"response": response.data }
                    if (this.services_today.response.length > 0){
                        this.services_available = true
                    }
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
            },
            getServicesThisMonth: function () {
                this.this_month_selected = true
                this.$http.get(this.$BASE_URL + '/api/services/services-this-month/')
                    .then(response => {
                    this.services_this_month = {"response": response.data }
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
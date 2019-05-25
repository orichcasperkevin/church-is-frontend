<template>
        <div>
            <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                        <li class="breadcrumb-item active" aria-current="page">events</li>
                    </ol>
            </nav> 
            <div class = "container">
                <div class = "row">
                    <div class = "col-12 col-sm-10 col-md-8 col-lg-2">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-income-tab" data-toggle="pill" href="#v-pills-today" role="tab" aria-controls="v-pills-today" aria-selected="true">up coming</a>
                                    <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" data-toggle="pill" href="#v-pills-this-month" role="tab" aria-controls="v-pills-this-month" aria-selected="false" >past events</a>  
                            </div>
                    </div>
                    <div class = "col">
                            <div class="tab-content" id="v-pills-tabContent">
                       
                                    <div class="tab-pane fade show active" id="v-pills-today" role="tabpanel" aria-labelledby="v-pills-today-tab">

                                        <div v-if = "events_available">                                            
                                            <div v-for = "data in events.response" v-if = "! data.past">                    
                                                <div class="home-menu-item">
                                                    <h3> {{data.name}} - <span class="text-info">{{data.date}}</span></h3>
                                                </div>
                                                <div>
                                                    <div class="small">location: 
                                                        <span class="small text-info">{{data.location}}</span>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-3">
                                                        <img :src="data.poster">
                                                    </div>
                                                    <div class="col-9">
                                                        <div class="text-muted">
                                                            {{data.description}}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p></p>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade show " id="v-pills-this-month" role="tabpanel" aria-labelledby="v-pills-this-month-tab">
                                        <div>
                                                <div >                                            
                                                        <div v-for = "data in events.response" v-if = " data.past ">                                                            
                                                            <div class="home-menu-item">
                                                                <h3> {{data.name}} - <span class="text-info">{{data.date}}</span></h3>
                                                            </div>
                                                            <div>
                                                                <div class="small">location: 
                                                                    <span class="small text-info">{{data.location}}</span>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <div class="row">
                                                                <div class="col-3">
                                                                    <img :src="data.poster">
                                                                </div>
                                                                <div class="col-9">
                                                                    <div class="text-muted">
                                                                        {{data.description}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p></p>
            
                                                        </div>
                                                    </div>
                                        </div>
                                    </div>
                            </div>
                    </div>
                    <div class = "col-12 col-sm-10 col-md-8 col-lg-3" >
                            <div style="padding: 0px 0px 25px 10px">
                                    <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                                        <div class="add-button">
                                            + add event
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
        name: 'events',
        data () {
            return{
                fetch_data_error: [],
                events: null,
                events_available: false,
            }
        },
        created () {
           this.fetchData() 
        },
        methods: {
            fetchData () {
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/events/event-list/')
                    .then(response => {
                    this.events = {"response": response.data }
                    if (this.events.response.length > 0){
                        this.events_available = true
                    }
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                    })
            },
        }
    }
    </script>
    
    
    <style >
    </style>
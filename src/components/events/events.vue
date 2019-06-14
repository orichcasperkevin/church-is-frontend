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
                                    <a href="#" data-toggle="modal" data-target="#addEvent" style="text-decoration: none">
                                        <div class="add-button">
                                            <b>+</b> add upcoming event
                                        </div>
                                    </a>
                            </div>
                    </div>
                    <!--add event Modal -->
                    <div class="modal fade" id="addEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add an upcoming event</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>
                                            <div class=" row form-group">
                                              <label class="col-3"><b>name:</b></label>
                                              <input type="text" class="col-8 form-control" placeholder="enter name of the event" autofocus>                                        
                                            </div>
                                            
                                            <div class="row form-group">
                                                    <label class="col-3"><b>location:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter event location" autofocus>                                        
                                            </div>
                                            <hr/>
                                            <div class="form-group">
                                                    <div class="row">
                                                            <label class="col-3"><b>date</b></label>
                                                            <div class="col-8">
                                                                <div class="row">
                                                                        <span class="col">
                                                                                <label><b>year :</b></label>
                                                                                <input type="number" class="form-control" v-model="year">
                                                                        </span>
                                                                        <span class="col">
                                                                                <label><b>month :</b></label>
                                                                                <input type="number" class="form-control" v-model="month">
                                                                        </span>
                                                                        <span class="col">
                                                                                <label><b>day :</b></label>
                                                                                <input type="number" class="form-control" v-model="day">
                                                                        </span> 
                                                                </div>                                                           
                                                            </div>
                                                    </div>
                                            </div>
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>slug:</b></label>
                                                    <input type="text" class=" col-8 form-control" placeholder="enter SEO friendly slug ">                                                    
                                            </div>
                                            
                                            <div class="row form-group">
                                                    <label class="col-3"><b>description:</b></label>
                                                    <textarea type="text" class="col-8 form-control" rows='3'></textarea>                                                   
                                            </div>
                                            
                                            <div class="row form-group">
                                                    <label class="col-3"><b>poster:</b></label>
                                                    <input type="file" class="col-8 form-control-file">
                                            </div>                                       
                                
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"><b>+</b> add event</button>
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
        name: 'events',
        data () {
            return{
                fetch_data_error: [],
                events: null,
                events_available: false,
            }
        },
        created () {
           this.checkLoggedIn()
           this.fetchData() 
        },
        methods: {
            checkLoggedIn() {
                if (!this.$session.has("token")) {
                    router.push("/login")
                }
            },
            fetchData () {               
                this.fetch_data_error = []
                this.$http.get(this.$BASE_URL + '/api/events/event-list/')
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
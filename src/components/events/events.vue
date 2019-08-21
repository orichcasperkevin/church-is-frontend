<template>
        <div>
            <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                        <li class="breadcrumb-item active" aria-current="page">events</li>
                    </ol>
            </nav> 
            <div class = "container">
            <div class="row">
                <div class="col">
                    <vue-cal                
                        :disable-views="['years', 'year']"
                        default-view="month"                
                        events-on-month-view="short"                        
                        :events="events"
                        :on-event-create="onEventCreate"
                        style="height: 600px">
                   </vue-cal>
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
                                            <input type="text" class="col-8 form-control" placeholder="enter name of the event" v-model="event_name">                                        
                                        </div>
                                        
                                        <div class="row form-group">
                                                <label class="col-3"><b>location:</b></label>
                                                <input type="text" class="col-8 form-control" placeholder="enter event location" v-model="event_location">                                        
                                        </div>
                                        <hr/>
                                        <div class="form-group">
                                                <div class="row">
                                                        <label class="col-3"><b>date</b></label>
                                                        <div class="col-8">
                                                            <div class="row">
                                                                    <span class="col">
                                                                            <label><b>year :</b></label>
                                                                            <input type="number" class="form-control" v-model="year" placeholder="YYYY">
                                                                    </span>
                                                                    <span class="col">
                                                                            <label><b>month :</b></label>
                                                                            <input type="number" class="form-control" v-model="month" placeholder="MM">
                                                                    </span>
                                                                    <span class="col">
                                                                            <label><b>day :</b></label>
                                                                            <input type="number" class="form-control" v-model="day" placeholder="DD">
                                                                    </span> 
                                                            </div>                                                           
                                                        </div>
                                                </div>
                                        </div>
                                        <hr/>                                                         
                                        <div class="row form-group">
                                                <label class="col-3"><b>description:</b></label>
                                                <textarea type="text" class="col-8 form-control" rows='3' v-model="event_description"></textarea>                                                   
                                        </div>                                                                                  
                            
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" disabled v-if="! enable_add_event_button"><b>+</b> add event</button>
                        <button type="button" class="btn btn-success" v-if="enable_add_event_button" v-on:click="addEvent()">{{add_event_button_text}}</button>
                        </div>
                    </div>
                    </div>
                </div>
                                   
            </div>
        </div>
    </template>
    
    <script>

    import router from "../../router";
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'

    export default {
        components: { VueCal },
        name: 'events',
        data () {
            return{
                //fetch data
                fetch_data_error: [],               
                events_available: false,
                add_event_button_text: 'add event',
                //add event
                enable_add_event_button: false,
                event_name: '',
                event_location: '',
                slug: 'fedrjoeijrpojerij',
                event_description: '',
                year: '',month: '',day: '',
                date: '',
                added_event: [],
                //events
                events: []


            }
        },
        created () {
           this.checkLoggedIn()
           this.fetchData() 
        },
        watch: {
            event_name: function(){                
                if ( this.event_name.length > 0
                     && this.event_location.length > 0 
                     && this.event_description.length > 0
                     && this.date.length > 0){

                    this.enable_add_event_button = true
                }                
            },
            event_description: function(){                
                if (this.event_name.length > 0
                     && this.event_location.length > 0
                     && this.event_description.length > 0 
                     && this.date.length > 0){

                    this.enable_add_event_button = true
                }                
            },
            date: function(){                
                if (this.event_name.length > 0
                     && this.event_location.length > 0
                     && this.event_description.length > 0
                     && this.date.length > 0){

                    this.enable_add_event_button = true
                }                
            },
            year: function(){
                if (this.year.length > 0 
                     && this.month.length > 0 
                     && this.day > 0){
                    this.date = this.year + '-' + this.month + '-' + this.day
                }
            },
            month: function(){
                if (this.year.length > 0 
                     && this.month.length > 0 
                     && this.day > 0){
                    this.date = this.year + '-' + this.month + '-' + this.day
                }
            },
            day: function(){
                if (this.year.length > 0 
                     && this.month.length > 0 
                     && this.day > 0){
                    this.date = this.year + '-' + this.month + '-' + this.day
                }
            }
        },
        methods: {
            humanize: function(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            checkLoggedIn() {
                if (!this.$session.has("token")) {
                    router.push("/login")
                }
            },
            fetchData () {
                this.$http.get(this.$BASE_URL + '/api/events/event-list/')
                .then(response => {
                    this.events = response.data                      
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            },
            addEvent (){                
                this.enable_add_event_button = false
                this.add_event_button_text = 'adding event...'            
                this.$http({
                    method: 'post',
                    url: this.$BASE_URL + '/api/events/event-list/',
                    data: {
                        name: this.event_name,
                        description: this.event_description,
                        slug: this.slug,
                        date: this.date,
                        website: true,
                        location: this.event_location                  
                    }
                }).then(response => {
                        this.added_event.push(response.data)                    
                        this.event_name = ''
                        this.event_description = ''
                        this.year = ''
                        this.month = ''
                        this.day = ''
                        this.event_location = ''
                        this.add_event_button_text = '+ add role'                    
                    })
                    .catch((err) => {
                        this.add_event_button_text = 'failed, check date'
                    })                        
            }
        }
    }
    </script>
    
    
    <style >
    </style>
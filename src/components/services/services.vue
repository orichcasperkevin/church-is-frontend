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
                                        <div v-for="data in services_today.response">
                                            <div>
                                                <h3 class="home-menu-item">{{data.service.type.name}}</h3>                                               
                                                <p class="text-info small" v-if ="data.service.type.church_groups.length > 0">                                                        
                                                    <span v-for="data in data.service.type.church_groups">
                                                        for: {{data.name}}
                                                    </span>
                                                </p>
                                                <p class="text-info small" v-if ="data.service.type.church_groups.length == 0">
                                                    open to all
                                                </p>
                                                <hr/>
                                            </div>
                                            <div  >
                                                <div>action: <span class="text-muted">{{data.action}}</span></div>
                                                <div>value: <span class="text-muted">{{data.value}}</span></div>
                                            </div>
                                            <div class="row" style="padding: 10px">
                                                <div class = "col-6">
                                                    
                                                </div>
                                                <div class = "col-6">
                                                    <p class="small">venue: <span class="text-info">
                                                        {{data.service.venue}}</span>
                                                    </p>
                                                    <p class="small">time: <span class="text-info">
                                                            {{data.service.start}} - {{data.service.end}}</span>
                                                        </p>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade show " id="v-pills-this-month" role="tabpanel" aria-labelledby="v-pills-this-month-tab">
                                        <div v-if = "this_month_selected">
                                                <div v-for="data in services_this_month.response">
                                                        <div>
                                                            <h3 class="home-menu-item">{{data.service.type.name}}</h3>                                               
                                                            <p class="text-info small" v-if ="data.service.type.church_groups.length > 0">                                                        
                                                                <span v-for="data in data.service.type.church_groups">
                                                                    for: {{data.name}}
                                                                </span>
                                                            </p>
                                                            <p class="text-info small" v-if ="data.service.type.church_groups.length == 0">
                                                                open to all
                                                            </p>
                                                            <hr/>
                                                        </div>
                                                        <div  >
                                                            <div>action: <span class="text-muted">{{data.action}}</span></div>
                                                            <div>value: <span class="text-muted">{{data.value}}</span></div>
                                                        </div>
                                                        <div class="row" style="padding: 10px">
                                                            <div class = "col-6">
                                                                
                                                            </div>
                                                            <div class = "col-6">
                                                                <p class="small">venue: <span class="text-info">
                                                                    {{data.service.venue}}</span>
                                                                </p>
                                                                <p class="small">time: <span class="text-info">
                                                                        {{data.service.start}} - {{data.service.end}}</span>
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
                            <div class="btn-group" style="padding: 0px 0px 25px 10px">
                                    <a href="#" data-toggle="modal" data-target="#addService" style="text-decoration: none">
                                        <div class="add-button">
                                            <b>+</b> add service
                                        </div>
                                    </a>
                                    <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                            <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">                            
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addServiceType"><b>+</b> add service type</a>                                                                
                                    </div>
                            </div>
                    </div>
                </div>
                <!-- add offering -->
                <div class="modal fade" id="addService" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add service</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">  
                                <div class="row form-group">
                                        <label class="col-3"><b>type:</b></label>                                                                                                                                   
                                        <select class="col-8 form-control" v-model="service_type" >
                                            <option v-for="data in service_types.response" :value="data.id" >{{data.name}}</option>
                                        </select>
                                        <p v-if="service_type_errors.length">
                                                <ul>
                                                        <small><li v-for="error in service_type_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                        </p>
                                </div>
                                <hr/>
                                <div class="row form-group">
                                        <label class="col-3"><b>venue:</b></label>
                                        <input type="text" class=" col-8 form-control" placeholder="venue for the service" v-model="service_venue">                                                                                         
                                        <p v-if="service_venue_errors.length">
                                                <ul>
                                                        <small><li v-for="error in service_venue_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                        </p>
                                </div> 
                                <hr/>
                                <div class="row form-group">
                                        <label class="col-3 "><b>date:</b></label>
                                        <div class="input-group form-group col-5" style="padding: 0px" >
                                            <input type="date" name="bday" max="3000-12-31" 
                                                   min="1000-01-01" class="form-control" v-model="service_date">                                                                                                                      
                                        </div>  
                                        <p v-if="service_date_errors.length">
                                                <ul>
                                                        <small><li v-for="error in service_date_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                        </p>                                 
                                </div> 
                                <hr/>
                                <div class="row form-group">                                    
                                        <label class="col-3"><b>period:</b></label>
                                        <div class="col-8">
                                            <div class="row form-group">
                                                    <div class="col-6">
                                                            <label class="col-3">from</label>
                                                            <input type="text" class=" col-8 form-control" placeholder="HH:MM" v-model="service_start"> 
                                                    </div>
                                                    <div class="col-6">
                                                        <label class="col-3">to</label>
                                                        <input type="text" class=" col-8 form-control" placeholder="HH:MM" v-model="service_end"> 
                                                    </div>
                                            </div>
                                        </div>
                                        <p v-if="service_period_errors.length">
                                                <ul>
                                                        <small><li v-for="error in service_period_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                        </p>
                                </div> 
                                <hr/>
                                <div class="row form-group">
                                        <label class="col-3"><b>action:</b></label>
                                        <input type="text" class=" col-8 form-control" placeholder="title of action to be performed" v-model="service_action">                                                                                         
                                        <p v-if="service_action_errors.length">
                                                <ul>
                                                        <small><li v-for="error in service_action_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                        </p>
                                </div>                                                           
                                <div class="row form-group">
                                        <label class="col-3"><b>value:</b></label>
                                        <input type="text" class=" col-8 form-control" placeholder="the value to be learnt" v-model="service_value">                                                                                         
                                        <p v-if="service_value_errors.length">
                                                <ul>
                                                        <small><li v-for="error in service_value_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                        </p>
                                </div> 
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
                            <button type="button" class="btn btn-success" v-on:click="addService()"><b>+</b> add service</button>
                            </div>
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
                service_items: null,
                services_this_month: null,
                service_types: null,
            //add service 
                service_type: 0,service_type_errors: [],
                service_venue: null,service_venue_errors: [],
                service_date: null,service_date_errors: [],
                service_start: null,service_period_errors: [],
                service_end: null,
                service_action: null,service_action_errors: [],
                service_value: null,service_value_errors: []

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
            this.getServiceTypes()
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
            },
            //get service types
            getServiceTypes: function(){
                this.$http.get(this.$BASE_URL + '/api/services/service-types/')
                    .then(response => {
                    this.service_types =  {"response":response.data}
                    })
                    .catch((err) => {
                        this.found_service = []
                    })
            },
            //check if add service form is okay
            checkAddServiceForm: function(){
                this.service_type_errors = []
                this.service_venue_errors = []
                this.service_date_errors = []
                this.service_period_errors = []                
                this.service_action_errors = []
                this.service_value_errors = []
                
                if (this.service_type > 0
                    && this.service_venue != null
                    && this.service_date != null
                    && this.service_start != null
                    && this.service_end != null
                    && this.service_action != null
                    && this.service_value != null){
                        return true
                    }
                if (this.service_type == 0){
                        this.service_type_errors.push("select service type")
                        return false
                }
                if (this.service_venue == null
                    || this.service_venue.length < 1){
                        this.service_venue_errors.push("enter service venue")
                        return false
                }
                if (this.service_date == null
                    || this.service_date.length < 1){
                        this.service_date_errors.push("enter service date")
                        return false
                }
                  if (this.service_start == null
                    || this.service_start.length < 1){
                        this.service_period_errors.push("enter service start time")
                        return false
                }
                if (this.service_end == null
                    || this.service_end.length < 1){
                        this.service_period_errors.push("enter service ending time")
                        return false
                }
                if (this.service_action == null
                    || this.service_action.length < 1){
                        this.service_action_errors.push("enter service actio")
                        return false
                }
                if (this.service_value == null
                    || this.service_value.length < 1){
                        this.service_value_errors.push("enter service value")
                        return false
                }
            },
            //add service 
            addService: function(){
                if (this.checkAddServiceForm()){
                    this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/services/add-service/',
                        data: {
                                service_type_id: this.service_type,                                                                                               
                                venue: this.service_venue,                                
                                date: this.service_date,                        
                                start: this.service_start + ':00',
                                end: this.service_end   + ':00'                                                                
                        }
                        }).then(response => {                              
                               this.service_venue = null
                               this.service_date = null
                               this.service_start = null
                               this.service_end = null                                                              
                               alert("service succesfully added ")                     
                               this.addServiceItem(response.data.id)                    
                        })
                        .catch((err) => {
                                
                        }) 
                }
            },
            addServiceItem: function(service_id){
                this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/services/add-service-item/',
                        data: {
                                service_id: service_id,                                                                                               
                                action: this.service_action,                                
                                value: this.service_value                                                                                    
                        }
                        }).then(response => {                                                         
                            this.fetchData()
                            this.getServicesThisMonth()
                            this.service_action = null
                            this.service_value = null
                        })
                        .catch((err) => {
                                
                        })
            }
        }
    }
    </script>
    
    
    <style >
    </style>
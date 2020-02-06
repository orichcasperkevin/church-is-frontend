<!-- Parent.vue -->
<template>
        <div>
            <!-- OFFERING CONTENT -->
            <div>
                <!-- what to show on small devices -->
                <div class="d-sm-block d-md-none d-lg-none btn-group" v-if = "offerings_selected">
                        <a href="#" data-toggle="modal" data-target="#addOffering" style="text-decoration: none" v-on:click="getServiceTypes()">
                            <div class="add-button">
                                <b>+</b> add offering
                            </div>
                        </a>
                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addTithe"><b>+</b> add tithe</a>
                        </div>
                </div>
                <div class="text-muted" >
                        <p>Total this month  |<span class="text-info">
                            Ksh {{humanize(offering_stats.response.total_in_offerings_this_month)}} </span>|
                        
                            Total this year  |<span class="text-info">
                                Ksh   {{humanize(offering_stats.response.total_in_offerings_this_year)}} </span>|

                            <a class="btn btn-sm btn-outline-info text-secondary dropdown-toggle" data-toggle="collapse" href="#statsTab" role="button" aria-expanded="false" aria-controls="statsTab">
                                more stats
                            </a>
                        </p>                                                    
                        </p>
                        <div class="collapse" id="statsTab">
                            <div class="card card-body outline-0">
                                <offeringstats msg="offering stats"/>
                            </div>
                        </div>
                </div>                     
                <hr/>
                <p class="col-8">
                        <span class="badge badge-pill badge-info">{{foundOfferings}}</span> entries found
                </p>
                <table class="table">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>amount</th>
                            <th>date</th>
                            <th>this month</th>
                            <th>this year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "data in offerings.response">
                            <td v-if = "data.member != null">                                
                                <router-link :to="`/memberDetail/`+ data.member.member.id">
                                    <span class = "text-secondary">{{data.member.member.first_name}} {{data.member.member.last_name}}</span>
                                </router-link>
                            </td>
                            <td v-if = "data.service != null"> {{data.service.type.name}}</td>
                            <td><p class="text-secondary">{{humanize(data.amount)}}</p></td>
                            <td v-if = "data.member != null">{{data.date}}</td>
                            <td v-if = "data.service != null"> {{data.service.date}}</td>
                            <td><p class="text-secondary">{{humanize(data.total_this_month)}}</p></td>
                            <td><p>{{humanize(data.total_this_year)}}</p></td>                                                          
                        </tr>
                    </tbody>
                </table>
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
                                                        <label><input type="checkbox" :value= true v-model = "non_member"> offering from service </label>                                                            
                                                </div>                                                    
                                        </div>
                                        <hr/>

                                        <div class=" row form-group" v-if="! non_member">
                                            <label class="col-3"><b>member:</b></label>
                                            <div class="col-8">
                                                    <searchmember v-on:memberSelected="onMemberSelected" /> 
                                                    <p v-if="selected_member_errors.length">
                                                        <ul>
                                                                <small><li v-for="error in selected_member_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                        </ul>
                                                    </p>                                                  
                                            </div>                                           
                                            
                                        </div>
                            
                                        <div class=" row form-group" v-if="non_member">
                                            <label class="col-3"><b>service type:</b></label>                                                                                                                                   
                                            <select class="col-8 form-control" v-model="service_type" >
                                                <option v-for="data in service_types.response" :value="data.id" >{{data.name}}</option>
                                            </select>
                                            <p v-if="service_type_errors.length">
                                                <ul>
                                                        <small><li v-for="error in service_type_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                            </p>                                                                                                                                          
                                        </div>  
                                        <div class="row" v-if="non_member">
                                            <label class="col-3 "><b>service date</b></label>
                                            <div class="input-group form-group col-5" style="padding: 0px" >
                                                <input type="date" name="bday" max="3000-12-31" 
                                                       min="1000-01-01" class="form-control" v-model="offering_date">                                                                                                                      
                                            </div>
                                            <p v-if="offering_date_errors.length">
                                                <ul>
                                                        <small><li v-for="error in offering_date_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                            </p>
                                        </div> 
                                        <p v-if="found_service.length && non_member  ">
                                            <ul v-if="found_service.length > 0">
                                                    <small><li><p class="text-success"> found a service for that date</p></li></small>
                                            </ul>
                                        </p>  
                                        <p v-if="found_service.length == 0 && non_member && searched_for_service">
                                            <ul >
                                                    <small><li ><p class="text-danger"> NO service found for that date</p></li></small>
                                            </ul>
                                        </p>                                                                                                                                   
                                        <hr/>
                                        <div class="row form-group">
                                                <label class="col-3"><b>amount:</b></label>
                                                <input type="number" class=" col-3 form-control" placeholder="amount" v-model="offering_amount">
                                                <div class="col-6 text-success" v-if ="offering_amount > 0"><h3>KSh {{humanize(offering_amount)}}</h3></div>
                                                <p v-if="offering_amount_errors.length">
                                                    <ul>
                                                            <small><li v-for="error in offering_amount_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                    </ul>
                                                </p> 
                                        </div>
                                        <hr/>
                                        <div class="form-group">
                                                <div class="row" v-if="! non_member">
                                                        <label class="col-3 "><b>date</b></label>
                                                        <div class="input-group form-group col-5" style="padding: 0px" >
                                                            <input type="date" name="bday" max="3000-12-31" 
                                                                   min="1000-01-01" class="form-control" v-model="offering_date">                                                                                                                      
                                                        </div>
                                                        <p v-if="offering_date_errors.length">
                                                            <ul>
                                                                    <small><li v-for="error in offering_date_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                            </ul>
                                                        </p>
                                                </div>
                                        </div>
                                        <hr/>
                                        <div class="row form-group">
                                                <label class="col-3"><b>narration:</b></label>
                                                <textarea type="text" class="col-8 form-control" rows='3' v-model="offering_narration"></textarea>                                                   
                                        </div>                                                                                     
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="getOfferings()">Close</button>
                        <button type="button" class="btn btn-success" v-on:click="addOffering()">
                            <b>+</b> add offering
                            <span v-if="adding_offering"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
                        </div>
                    </div>
                    </div>
            </div>
            <!-- export to csv format -->
            <div class="modal fade" id="exportOfferingsToCSV" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">export offerings data to CSV</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                                <form>                                                                         
                                        <div class="form-group">                                                
                                                <div class="row">                                                        
                                                        <label class="col-3 "><b>from :</b></label>
                                                        <div class="input-group form-group col-5" style="padding: 0px" >
                                                                <select class="form-control" v-model="offering_from">
                                                                        <option>members</option>
                                                                        <option>services</option>                                                                        
                                                                </select>                                                                                                                      
                                                        </div>
                                                                                                                
                                                </div>
                                                <div class="row">                                                        
                                                        <label class="col-3 "><b>date</b></label>
                                                        <div class="input-group form-group col-5" style="padding: 0px" >
                                                            <input type="date" name="bday" max="3000-12-31" 
                                                                min="1000-01-01" class="form-control" v-model="csv_date">                                                                                                                      
                                                        </div>
                                                                                                                
                                                </div>
                                                <div class="row">                                                        
                                                        <label class="col-3 "><b></b></label>
                                                        <div class="input-group form-group col-5" style="padding: 0px" >
                                                                <small>export data is from selected date's month</small>                                                                                                                     
                                                        </div>
                                                                                                                
                                                </div>
                                        </div>
                                                                                                                        
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                       
                        <button type="button" class="btn btn-success" v-on:click="exportData()">
                            download CSV
                            <span v-if="exporting_data"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
                        </div>
                    </div>
                    </div>
            </div>                         
        </div>
      </template>
      <script>
      import searchmember from '@/subcomponents/searchmember.vue'
      import offeringstats from '@/subcomponents/statistics/offeringstats.vue'
      export default {
        created () {
            this.getOfferings()
            this.getServiceTypes()
        },
        data () {
          return {
            non_member: false,
            group: false,
            //get stats data
            offering_stats: null,
            offerings: null,
            //add offering
            offering_amount: null,
            name_if_not_member: ''        ,
            country_code: '+254',phone_number:'',
            offering_narration: '',
            offering_year: '',offering_month: '',offering_day: '',
            offering_date: '',
            phone_number_errors: [],
            phone_number_OK: [],
            searched_for_service: false,
            found_service: [],
            offering_amount_errors: [],selected_member_errors: [],
            name_if_not_member_errors: [], offering_date_errors: [], service_type_errors: [],
            added_offering: [],
            service_type: null,
            service_types: null,
            // exporting data
            offering_from: '',
            csv_date: '',
            exporting_data:false
          }
        },
        name: 'offerings',
        components: { searchmember,offeringstats },
        watch: {
            offering_date: function(){      
                this.searched_for_service = false      
                this.found_service = []
                this.service_type_errors = []
                if (this.non_member){                
                    if (this.service_type == null){
                        this.service_type_errors.push("select a type of service")
                        return
                    }                           
                    this.checkForService()                              
                }            
            },
            service_type: function(){
                this.searched_for_service = false
                this.found_service = []
                if (this.non_member && this.offering_date.length > 0){                
                    if (this.offering_date == null){                    
                        return
                    }                           
                    this.checkForService()               
                }
            }
        },
        methods: {
           humanize: function(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
          // Triggered when `memberSelected` event is emitted by the child.
          onMemberSelected (value) {
            this.selectedMember = value
          },
          //check for service on a date
          checkForService: function(){  
            this.$store.dispatch('update_isLoading', true)          
            this.$http.get(this.$BASE_URL + '/api/services/service-on-date/' + this.offering_date +'/of-type/' + this.service_type + '/')
            .then(response => {                    
                this.found_service = response.data                                  
                this.searched_for_service = true
                this.$store.dispatch('update_isLoading', false)
            })
            .catch((err) => {
                this.fetch_data_error.push(err)
                this.$store.dispatch('update_isLoading', false)
            })
                    
        },
          //get offerings
          getOfferings: function(){
            //try local storage
            this.offering_stats = JSON.parse(localStorage.getItem('offering_stats')) 
            this.offerings = JSON.parse(localStorage.getItem('offering_list'))
            if (this.offerings){
                var array = this.offerings.response
                this.foundOfferings = array.length
            }

            const currentVersion = this.$store.getters.offering_list_version
            var version  = localStorage.getItem('offering_list_version')

            // else try the network
            if (!version || version < currentVersion){
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/offering-stats/')
                .then(response => {
                this.offering_stats = {"response": response.data }                      
                localStorage.setItem('offering_stats',JSON.stringify({"response": response.data }))                
                this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                    this.$store.dispatch('update_isLoading', false)
                })

                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/offerings-by-members-this-month/')
                .then(response => {
                    this.offerings = {"response": response.data } 
                    var array = this.offerings.response
                    this.foundOfferings = array.length

                    localStorage.setItem('offering_list',JSON.stringify({"response": response.data }))                
                    localStorage.setItem('offering_list_version', currentVersion)
                    this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                    this.$store.dispatch('update_isLoading', false)
                })
            }
            
        },
        //get service types
        getServiceTypes: function(){
            this.$store.dispatch('update_isLoading', true)
            this.$http.get(this.$BASE_URL + '/api/services/service-types/')
                .then(response => {
                    this.service_types =  {"response":response.data}
                    this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.found_service = []
                    this.$store.dispatch('update_isLoading', false)
                })
        },
        //validate offering form
        addOfferingFormOK: function(){                     
            this.offering_amount_errors = []
            this.selected_member_errors = []
            this.offering_date_errors = []
            this.name_if_not_member_errors = []

            if (this.offering_narration.length < 1){
                this.offering_narration = "none given"
            }
            if (this.phone_number.length < 1
                || this.phone_number_errors.length > 0){
                    this.phone_number = "none given"
                }
            if (this.non_member
                && this.service_type > 0
                && this.offering_date.length == 10
                && this.offering_amount > 0){                 
                    return true
                }
            if (! this.non_member
                && (this.selectedMember != null
                &&  this.selectedMember != '')
                && this.offering_date.length == 10
                && this.offering_amount > 0){                 
                    return true
                }
            if (this.offering_amount < 1){
                this.offering_amount_errors.push("enter an amount")
                return false
            }     
            if (! this.non_member
                && (this.selectedMember == null
                || this.selectedMember == '')){
                this.selected_member_errors.push("select member, none selected")
                return false
            }    
            if (this.offering_date.length < 1){
                this.offering_date_errors.push("date input required")
                return false
            }
            if (this.offering_date.length != 10){
                this.offering_date_errors.push("incorrect date , use format YYYY-MM-DD")
                return false
            }
        },
        //add offerring
        addOffering: function(){           
            if (this.addOfferingFormOK()){     
                //if offering is by non member                           
                if (this.non_member){
                    this.adding_offering = true
                    this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/add-service-offering/',
                        data: {
                            service_type_id: this.service_type,                                
                            recording_member_id: this.$session.get('member_id'),                                 
                            date: this.offering_date,                                
                            narration: this.offering_narration,                        
                            amount: this.offering_amount                                                                   
                        }
                        }).then(response => {    
                            this.adding_offering = false                           
                            this.offering_amount = null
                            this.offering_narration = null
                            this.service_type = null
                                                        
                            var new_version = parseInt(localStorage.getItem('offering_list_version')) + 1                               
                            this.$store.dispatch('update_offering_list_version', new_version)
                            alert("offering succesfully added ")          
                        })
                        .catch((err) => {
                            this.adding_offering = false
                            alert("an error occured, please try again later")
                        })               
                }
                // if offering is by member
                if (! this.non_member){
                    this.adding_offering = true
                    this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/add-offering/',
                        data: {
                            member_id: this.selectedMember,                                
                            recording_member_id: this.$session.get('member_id'),                             
                            name_if_not_member: this.name_if_not_member,
                            date: this.offering_date,
                            anonymous: false,
                            narration: this.offering_narration,                        
                            amount: this.offering_amount                                                                   
                        }
                        }).then(response => {
                                
                            this.added_offering.push(response.data)
                            this.adding_offering = false
                            this.offering_amount = null
                            this.offering_narration = null
                            this.name_if_not_member = ''
                            this.offering_date = ''
                            this.memberSearch = ''   
                            
                            var new_version = parseInt(localStorage.getItem('offering_list_version')) + 1                               
                            this.$store.dispatch('update_offering_list_version', new_version)

                            alert("offering succesfully added")          
                        })
                        .catch((err) => {
                                alert("an error occured, please try again later")
                                this.adding_offering = false
                        })
                }  
            }
        },
        //export data to csv
        exportData: function(){                                    
            //export to csv
            if (this.offering_from == "members"){
                //offering by members
                this.exporting_data = true
                this.$http.get(this.$BASE_URL + '/api/finance/get-member-offering-csv/' + this.csv_date +'/' )
                .then(response => {                
                    this.$fileDownload(response.data,"member_offering_" + this.csv_date + ".csv");
                    this.exporting_data = false                 
                    alert("download successful")
                })
                .catch((error) => {
                    this.exporting_data = false
                    alert('error while downloading member offerings csv, check your form and try again')
                })                
            }  
            else if (this.offering_from == "services"){
                //offering by members
                this.exporting_data = true
                this.$http.get(this.$BASE_URL + '/api/finance/get-service-offering-csv/' + this.csv_date +'/' )
                .then(response => {                
                    this.$fileDownload(response.data,"service_offerings_" + this.csv_date + ".csv");
                    this.exporting_data = false                 
                    alert("download successful")
                })
                .catch((error) => {
                    this.exporting_data = false
                    alert('error while downloading service offerings csv, check your form and try again')
                })
            }
        },
        }
      }
      </script>
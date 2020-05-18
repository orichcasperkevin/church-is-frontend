<!-- Parent.vue -->
<template>
        <div>
            <!-- OFFERING CONTENT -->
            <div>
                <!-- what to show on small devices -->                
                <div class="text-muted" >
                        <div class="d-flex d-flex-row justify-content-center">
                                <div class="d-none d-lg-block stat-item mr-2 text-muted">
                                        This month  <span class="text-secondary font-weight-bold">
                                         Ksh {{humanize(offering_stats.response.total_in_offerings_this_month)}}</span>
                                </div>
                                <div class="d-none d-lg-block stat-item mr-2">
                                        This year  <span class="text-secondary font-weight-bold">
                                        Ksh    {{humanize(offering_stats.response.total_in_offerings_this_month)}} </span>                                        
                                </div>
                                <a class="ml-3 btn btn-outline-secondary dropdown-toggle" data-toggle="collapse" href="#statsTab" role="button" aria-expanded="false" aria-controls="statsTab">
                                        more stats
                                </a>
                                <!-- when on a small device show this button --> 
                                <div class="ml-3 d-sm-block d-md-none btn-group">
                                    <button class="btn btn-success" data-toggle="modal" data-target="#addOffering">                            
                                            <b>+</b> Add Offering                                          
                                    </button>                      
                                </div> 
                            </div>                                                                            
                        </p>
                        <div class="collapse" id="statsTab">
                            <div class="card card-body outline-0">
                                <offeringstats msg="offering stats"/>
                            </div>
                        </div>
                </div>                         
                <span class="mt-4">
                        <p><span class="mt-4 badge badge-pill badge-secondary">{{foundOfferings}}</span> entries</p>
                </span>                       
                <table class="mt-4 table table-responsive-sm table-borderless">
                    <thead>
                        <tr>
                            <th>
                                 <label class="anvil-checkbox">all
                                    <input type="checkbox" :value=true v-model="all_members">
                                    <span class="anvil-checkmark"></span>
                                </label>
                            </th>
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
                                    <label class="anvil-checkbox">
                                            <input multiple type="checkbox" :value=data.user_id v-model="member_ids">
                                            <span class="anvil-checkmark"></span>
                                    </label>
                            </td>
                            <td v-else>
                                <label class="anvil-checkbox">
                                        <input multiple type="checkbox">
                                        <span class="anvil-checkmark"></span>
                                </label> 
                            </td>
                            <td v-if = "data.member != null">                                      
                                <router-link :to="`/memberDetail/`+ data.user_id">
                                    <span class = "text-secondary">{{data.member_full_name}}</span>
                                </router-link>
                            </td>
                            <td v-if = "data.service != null"> {{data.service_type_name}} ({{data.service_date}})</td>
                            <td v-if = "data.group != null">
                                    <router-link  :to="`/groupDetail/`+ data.group_id" class="text-muted">                                    
                                          <div>                                             
                                              {{data.group_name}}
                                          </div>                                                                                                                                
                                    </router-link>                                 
                            </td>
                            <td v-if="! data.group && ! data.service && ! data.member">anonymous</td>
                            <td><p class="text-secondary">{{humanize(data.amount)}}</p></td>
                            <td >{{$humanizeDate(data.date)}}</td>                            
                            <td><p class="text-secondary" v-if="data.total_this_month">{{humanize(data.total_this_month)}}</p></td>
                            <td><p v-if="data.total_this_year">{{humanize(data.total_this_year)}}</p></td>                                                          
                        </tr>
                    </tbody>
                </table>
            </div>
             <!-- add offering type-->
             <div   class="modal fade" id="addOfferingType" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                         <div class="modal-dialog modal-dialog-centered" role="document">
                         <div class="modal-content">
                             <div class="modal-header">
                             <h5 class="modal-title" id="exampleModalCenterTitle">add offering type</h5>
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                             </button>
                             </div>
                             <div class="modal-body">                                                            
                                     <form>   
                                            <div class="row form-group">
                                                    <label class="col-3"><b>name:</b></label>
                                                    <input type="text" class="col-8 form-control" rows='3' maxlength="50" v-model="offering_type_name"/>                                                   
                                            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                             <hr/>
                                             <div class="row form-group">
                                                     <label class="col-3"><b>description:</b></label>
                                                     <textarea type="text" class="col-8 form-control" rows='3' v-model="offering_type_description"></textarea>                                                   
                                             </div>                                                                                     
                                     </form>
                             </div>
                             <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="getOfferingTypes()">Close</button>
                             <button type="button" class="btn btn-success" v-on:click="addOfferingType()">
                                 <b>+</b> add offering type
                                 <span v-if="adding_offering"
                                     class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                 </span>
                             </button>
                             </div>
                         </div>
                         </div>
             </div>
             <!-- add offering -->
             <div   class="modal fade" id="addOffering" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" 
                    v-on:click="getOfferingTypes()">
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
                                        <customselect :fields="['member','service','group']" 
                                              v-on:inputChanged="onInputChanged"
                                              v-on:memberSelected="onMemberSelected"
                                              v-on:serviceFound="onServiceFound"
                                              v-on:groupSelected="onGroupSelected"/>
                                        <p v-if="selected_member_errors.length">
                                            <ul>
                                                    <small><li v-for="error in selected_member_errors"><p class="text-danger">{{ error }}</p></li></small>
                                            </ul>
                                        </p>  
                                        <p v-if="service_type_errors.length">
                                            <ul>
                                                <small><li v-for="error in service_type_errors"><p class="text-danger">{{ error }}</p></li></small>
                                            </ul>
                                        </p>                                                                                    
                                                    
                                        <hr>
                                        <div class="row">                                               
                                                <label class="col-3"><b>offering type:</b></label>
                                                <span class="col-6">                                                    
                                                        <span v-if="! offering_types">
                                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true">                                
                                                                </span> searching ...
                                                        </span>
                                                        <select class="form-control" v-model="selected_offering_type" >                            
                                                                <option v-for="data in offering_types" :value="data.id" >{{data.name}}</option>                                                        
                                                        </select>
                                                        <small class=" text-muted">optional</small>
                                                </span>                                                                                                
                                        </div> 
                                        <hr>                              
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
                                        <hr v-if="! non_member">
                                        <div class="form-group">
                                                <div class="row" v-if="show_date">                                                    
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
      import customselect from '@/subcomponents/finances/select.vue'      
      import offeringstats from '@/subcomponents/statistics/offeringstats.vue'
      export default {
        created () {
            this.getOfferings()        
        },
        data () {
          return {
            non_member: false,
            group: false,
            //get stats data
            offering_stats: null,
            offering_types:null,
            offering_type_name:null,
            offering_type_description:null,
            selected_offering_type:null,
            offerings: null,
            //add offering
            adding_offering: false,
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
            exporting_data:false,
            //selecting members
            all_members: false,
            member_ids: [],
            all_member_ids: [],
            //adding
            show_date:true,
            group:null,
            service:null
          }
        },
        name: 'offerings',
        components: { customselect,offeringstats },
        watch: {            
            offering_date: function(){      
                this.searched_for_service = false      
                this.found_service = []
                this.service_type_errors = []                          
            },      
            all_members: function(){
                if (this.all_members != true){
                    this.member_ids = []
                }
                else{
                    this.member_ids = this.all_member_ids
                }
            },
            member_ids: function(){
                this.emitToParent()
            }
        },
        methods: {
            humanize: function(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
            // Triggered when `memberSelected` event is emitted by the child.
            onMemberSelected (value) {
                this.non_member = false
                this.show_date = true
                this.selectedMember = value
            },
            onServiceFound (found_service){                        
                this.non_member = true
                this.show_date = false
                this.offering_date = found_service[0].date            
                this.found_service = found_service            
                this.service_type = found_service[0].type.id
            },
            onInputChanged (value){
                this.selectedMember = null
                this.group = null
                this.service = null
            },            
            onGroupSelected (group){
                this.show_date = true   
                this.non_member = true             
                this.group = group
           },
            emitToParent (event) {                               
                this.$emit('membersSelected', this.member_ids)
            },
            //get offering types
            getOfferingTypes: function(){
                this.$http.get(this.$BASE_URL + '/api/finance/offering-types/')
                .then((response)=>{            
                    this.offering_types = response.data
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
                for (var offering in array){
                    if (array[offering].member){
                        this.all_member_ids.push(array[offering].user_id) 
                    }                                          
                } 
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
                    for (var offering in array){                         
                        if (array[offering].member){
                            this.all_member_ids.push(array[offering].user_id) 
                        }                     
                    } 

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
            //validate offering form
            addOfferingFormOK: function(){ 
                this.offering_amount_errors = []
                this.selected_member_errors = []
                this.offering_date_errors = []
                this.name_if_not_member_errors = []

                if (this.offering_narration.length < 1){
                    this.offering_narration = "none given"
                }

                if (this.offering_amount < 1){
                    this.offering_amount_errors.push("enter an amount")            
                    return false
                }     
                if (! this.non_member
                    && (this.selectedMember == null
                    || this.selectedMember == '')){
                    alert("select member, none selected")                                
                    return false
                }    
                if (!this.non_member && this.offering_date.length < 1){
                    this.offering_date_errors.push("date input required")            
                    return false
                }     
                return true
            },
            //add offerring
            addOfferingType: function(){               
                this.adding_offering = true
                this.$http({                        
                    method: 'post',
                    url: this.$BASE_URL + '/api/finance/offering-types/',
                    data: {
                        name:this.offering_type_name,
                        description:this.offering_type_description                                                                  
                    }
                    }).then(response => {    
                        this.adding_offering = false
                        this.offering_type_name = null
                        this.offering_type_description=null
                        alert("offering type succesfully added ")          
                    })
                    .catch((err) => {
                        this.adding_offering = false
                        alert("an error occured, please try again later")
                    })        
            },
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
                                offering_type:this.selected_offering_type,
                                group: this.group,                                                           
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
                                member: this.selectedMember,                                
                                recorded_by: this.$session.get('member_id'),                             
                                name_if_not_member: this.name_if_not_member,
                                offering_type:this.selected_offering_type,
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
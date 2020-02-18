<!-- Parent.vue -->
<template>
        <div>
            <!-- TITHES CONTENT -->
            <div>
                <!-- when on a small device show this button --> 
                <div class="d-sm-block d-lg-none btn-group" style="padding: 0px 0px 25px 10px" v-if = "tithes_selected">
                        <a href="#" data-toggle="modal" data-target="#addTithe" style="text-decoration: none">
                            <div class="add-button" style="text-align: center">
                                <b>+</b> add tithe 
                            </div>                                
                        </a>
                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addOffering" v-on:click="getServiceTypes()"><b>+</b> add offering</a>
                        </div>
                    </div>        
                    <!-- tithe stats                                     -->
                    <div class="text-muted">
                        <div class="row">
                            <div class="stat-item mr-2 text-muted">
                                    This month  <span class="text-info">
                                     Ksh {{humanize(tithe_stats.response.total_in_tithe_this_month)}} </span>
                            </div>
                            <div class="stat-item mr-2">
                                    This year  <span class="text-info">
                                    Ksh   {{humanize(tithe_stats.response.total_in_tithe_this_year)}} </span>                                        
                            </div>
                            <a class="btn btn-outline-info text-secondary dropdown-toggle" data-toggle="collapse" href="#statsTab" role="button" aria-expanded="false" aria-controls="statsTab">
                                    more stats
                                </a>
                        </div> 
                        <p>                                                    
                        </p>
                        <div class="collapse" id="statsTab">
                            <div class="card card-body outline-0">
                                <tithestats msg="tithe stats"/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <p>
                        <span class="badge badge-pill badge-info">{{foundTithes}}</span> entries
                    </p>                             
                    <div>                                                
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>amount</th>
                                    <th>time</th>
                                    <th>this month</th>
                                    <th>this year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for = "data in tithes.response">
                                    <td>                                     
                                        <router-link :to="`/memberDetail/`+ data.member.member.id">
                                            <span class = "text-secondary">{{data.member.member.first_name}} {{data.member.member.last_name}}</span>
                                        </router-link>
                                    </td>
                                    <td><p class="text-secondary">{{humanize(data.amount)}}</p></td>
                                    <td>{{$humanizeDate(data.date)}}</td>
                                    <td><p class="text-secondary">{{humanize(data.total_this_month)}}</p></td>
                                    <td><p>{{humanize(data.total_this_year)}}</p></td>                                                          
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
            <!-- add tithe modal -->
            <div class="modal fade" id="addTithe" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add tithe for member</h5>
                        <button type="button" class="close" data-dismiss="modal" v-on:click="getTithes()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">                                                                       
                                <div v-if="add_tithe_errors.length > 0">
                                    <ul>
                                            <small>
                                                <li v-for="error in add_tithe_errors">
                                                    <p class="text-danger">{{ error }}</p>
                                                </li>
                                            </small>
                                    </ul>
                                </div>                                    
                                <form>                                                                                       
                                        <div class=" row form-group">
                                            <label class="col-3"><b>member:</b></label>
                                            <div class="col-8">
                                                    <searchmember v-on:memberSelected="onMemberSelected" />
                                                    <div v-if="tithe_member_error.length > 0">
                                                        <ul>
                                                                <small>
                                                                    <li v-for="error in tithe_member_error">
                                                                        <p class="text-danger">{{ error }}</p>
                                                                    </li>
                                                                </small>
                                                        </ul>
                                                    </div>                                                   
                                            </div>                                           
                                            
                                        </div>
                                                                              
                                        <hr/>
                                        <div class="row form-group">
                                                <label class="col-3"><b>amount:</b></label>
                                                <input type="number" class=" col-3 form-control" placeholder="amount" v-model="tithe_amount">
                                                <div class="col-6 text-success" v-if ="tithe_amount > 0"><h3>KSh {{humanize(tithe_amount)}}</h3></div>                                                                               
                                        </div>  
                                        <div v-if="tithe_amount_error.length > 0">
                                            <ul>
                                                    <small>
                                                        <li v-for="error in tithe_amount_error">
                                                            <p class="text-danger">{{ error }}</p>
                                                        </li>
                                                    </small>
                                            </ul>
                                        </div> 
                                        <hr/>
                                        <div class="row form-group">
                                                <label class="col-3"><b>narration:</b></label>
                                                <textarea type="text" class="col-8 form-control" rows='3' v-model="tithe_narration"></textarea>                                                   
                                        </div>                                                                                
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="getTithes()">Close</button>
                        <button type="button" class="btn btn-success" disabled v-if= "! enable_add_tithe_button && add_tithe_button_text != 'adding tithe...'">{{add_tithe_button_text}}</button>
                        <button type="button" class="btn btn-success" v-on:click="addTithe()">
                            {{add_tithe_button_text}}
                            <span v-if="adding_tithe"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
                        </div>
                    </div>
                    </div>
            </div>   
            <!-- export to csv format -->
            <div class="modal fade" id="exportTithesToCSV" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">export tithe data to CSV</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                                <form>                                                                         
                                        <div class="form-group">                                                
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
      import tithestats from '@/subcomponents/statistics/tithestats.vue'
      export default {
        created () {
            this.getTithes()
        },
        data () {
          return {
            //fetch data
            tithe_stats: null,    
            tithes: null,
            non_member: false,
            group: false,
            fetch_data_error: [],
            // This value is set to the value emitted by the child
            selectedMember: null, 
            //add_tithe
            adding_tithe:false,
            add_tithe_button_text: '+ add tithe',
            enable_add_tithe_button: true,
            tithe_amount: null,
            tithe_narration: '',
            tithe_amount_error: [], tithe_member_error: [],
            added_tithe: [],add_tithe_errors: [],
            // exporting data
            csv_date: '',
            exporting_data:false
          }
        },
        name: 'about',
        components: { searchmember,tithestats },
        methods: {
           humanize: function(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
          // Triggered when `memberSelected` event is emitted by the child.
          onMemberSelected (value) {
            this.selectedMember = value
          },
          getTithes: function(){
            this.fetch_data_error = []
            this.$store.dispatch('update_isLoading', true)
            // try local storage for tithes
            this.tithes = JSON.parse(localStorage.getItem('tithe_list'))
            if (this.tithes){
                var array = this.tithes.response
                this.foundTithes = array.length
                this.$store.dispatch('update_isLoading', false)
            }            
            this.tithe_stats = JSON.parse(localStorage.getItem('tithe_stats'))

            const currentVersion = this.$store.getters.tithe_list_version
            var version  = localStorage.getItem('tithe_list_version')

            //else try network for tithes
            if (!version || version < currentVersion) {
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/tithes-by-members/')
                .then(response => {
                    this.tithes = {"response": response.data }   
                    var array = this.tithes.response
                    this.foundTithes = array.length                  
                    
                    localStorage.setItem('tithe_list',JSON.stringify({"response": response.data }))                
                    localStorage.setItem('tithe_list_version', currentVersion) 
                    this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                    this.$store.dispatch('update_isLoading', false)
                })

            }
            this.getTitheStats()
          },
          // get tithe stats 
          getTitheStats: function(){                
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/tithe-stats/')
                .then(response => {
                    this.tithe_stats = {"response": response.data } 

                    localStorage.setItem('tithe_stats',JSON.stringify({"response": response.data }))                          
                    this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                    this.$store.dispatch('update_isLoading', false)
                })
          },
          //check that add tithe form is okay
          addTitheFormOK: function(){
            this.added_tithe = []
            this.tithe_member_error = []
            this.tithe_amount_error = []
            if (this.tithe_narration.length < 1){                    
                    this.tithe_narration = "none given"
            }   
            if (this.selectedMember == null){                
                this.tithe_member_error.push("No member selected, select one")
                return false
            }
            if (this.tithe_amount < 1){
                this.tithe_amount_error.push(" enter an amount")
                return false
            }
            if (this.selectedMember > 0
                && this.tithe_amount > 0){                    
                    return true
                }
        },
        //add tithe
        addTithe: function(){
            if (this.addTitheFormOK()){
                this.enable_add_tithe_button = false
                this.add_tithe_button_text = 'adding tithe...'  
                this.adding_tithe = true              
                this.$http({
                    method: 'post',
                    url: this.$BASE_URL + '/api/finance/add-tithe-for-member/',
                    data: {
                        member_id: this.selectedMember,
                        narration: this.tithe_narration,
                        recording_member_id: this.$session.get('member_id'),                             
                        amount: this.tithe_amount                                      
                    }
                    }).then(response => {
                        this.adding_tithe = false                                                                                                                                                            
                        this.selectedMember = null,
                        this.tithe_narration = '',
                        this.tithe_amount = ''                        
                        this.enable_add_tithe_button = true
                        this.add_tithe_button_text = '+ add tithe '
                        this.memberSearch = '' 
                        var new_version = parseInt(localStorage.getItem('tithe_list_version')) + 1
                        this.$store.dispatch('update_tithe_list_version', new_version)        
                        alert("tithe of amount " + response.data.amount + "\n"
                                + "added for " + response.data.member.member.first_name)                     
                    })
                    .catch((err) => {
                        this.adding_tithe = false
                        this.add_tithe_errors.push('oops, an error occured \n you may be disconnected ,check your connection and try again')
                                                        
                    })
            }
        },
        //export data to csv
        exportData: function(){            
            //export to csv
            this.exporting_data = true
            this.$http.get(this.$BASE_URL + '/api/finance/get-tithes-as-csv/' + this.csv_date +'/' )
            .then(response => {                
                this.$fileDownload(response.data,"tithes_" + this.csv_date + ".csv");
                this.exporting_data = false                 
                alert("download successful")
            })
            .catch((error) => {
                this.exporting_data = false
                alert('error while downloading tithes csv')
            })
        },
        }
      }
      </script>
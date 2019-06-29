<template>
    <div >
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'generalFinance'}">finances</router-link></span> 
                    <li class="breadcrumb-item active" aria-current="page">projects</li>
                </ol>
        </nav>
        <div class="container">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-8 col-lg-2">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#inProgress" role="tab" aria-controls="members" aria-selected="true">
                              <img style="width: 20px; height: auto" src="@/assets/icons/icons8-present-48.png">
                              in-progress
                            </a>
                            <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#completed" role="tab" aria-controls="activity" aria-selected="false" v-on:click="getGroupActivity()">
                                <img style="width: 20px; height: auto" src="@/assets/icons/icons8-future-64.png">
                                completed
                            </a>
                    </div>
            </div>
            <div class="tab-content col">
                    <div class="tab-pane fade show active" id="inProgress" role="tabpanel" aria-labelledby="profile-tab"></div>
                    <h3> projects in progress</h3>
                    <hr/>                    
                    <div class="col-8 center-div" v-if = "fetch_data_error.length > 0">
                        <div class = "center-div" >
                                <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
                                <p class="text-info">check your connection</p>
                        </div>
                    </div>
                    <div v-if = "fetch_data_error.length == 0">
                    found <span class="badge badge-pill badge-info">{{foundItems}}</span>                    
                    <table class="table">                     
                        <tbody>
                            <tr  v-for = "data in projects.response ">                    
                            <td>
                                <router-link class="text-secondary" style="text-decoration: none;"  :to="`/projectDetail/`+ data.id + `/`">
                                        <img  src="@/assets/avatars/icons8-crowd-100.png" style="width: 60px; height: auto;" alt="...">
                                </router-link>
                            </td>                                
                            <td>
                                <router-link class="text-secondary" style="text-decoration: none;"  :to="`/projectDetail/`+ data.id + `/`">                                                         
                                    {{data.name}}
                                </router-link>
                            </td>
                            <td></td>
                            <td>
                                <div > 
                                    <small class="text-muted">required amount -</small><br/>
                                    <span class="badge badge-pill badge-info">KSh {{humanize(data.required_amount)}}</span>
                                </div>
                            </td>
                            <td> 
                                <div> 
                                    <small class="text-muted">percentage funded -</small><br/>
                                    <span class="badge badge-pill badge-danger">{{data.percentage_funded}} %</span>
                                </div>
                            </td>
                            </tr>             
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 col-sm-10 col-md-8 col-lg-3">
                    <div style="padding: 0px 0px 25px 10px">
                            <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                                <div class="add-button">
                                    <b>+</b> add project
                                </div>
                            </a>
                    </div>
            </div>
            <!-- add project Modal -->
            <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add a project</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                                <form>
                                        <div class=" row form-group">
                                          <label class="col-3"><b>name:</b></label>
                                          <input type="text" class="col-8 form-control" placeholder="enter name of the project" v-model="project_name">                                        
                                        </div>
                                        <div class="row form-group">
                                                <label class="col-3"><b>description:</b></label>
                                                <textarea type="text" class="col-8 form-control" rows='3' v-model="project_description"></textarea>                                                   
                                        </div>
                                        
                                        <hr/>
                                        <div class="form-group">
                                                <div class="row">
                                                        <label class="col-3 "><b>start</b></label>
                                                        <div class="col-8">
                                                            <div class="row">
                                                                    <span class="col">
                                                                            <label ><b>year :</b></label>
                                                                            <input type="number" class="form-control" placeholder="YYYY" v-model="start_year">
                                                                    </span>
                                                                    <span class="col">
                                                                            <label ><b>month :</b></label>
                                                                            <input type="number" class="form-control" placeholder="MM" v-model="start_month">
                                                                    </span>
                                                                    <span class="col">
                                                                            <label ><b>day :</b></label>
                                                                            <input type="number" class="form-control" placeholder="DD" v-model="start_day">
                                                                    </span> 
                                                            </div>                                                           
                                                        </div>
                                                </div>
                                        </div>
                                        <hr/>
                                        <div class="form-group">
                                                <div class="row">
                                                        <label class="col-3 "><b>end</b></label>
                                                        <div class="col-8">
                                                            <div class="row">
                                                                    <span class="col">
                                                                            <label ><b>year :</b></label>
                                                                            <input type="number" class="form-control" placeholder="YYYY" v-model="ending_year">
                                                                    </span>
                                                                    <span class="col">
                                                                            <label ><b>month :</b></label>
                                                                            <input type="number" class="form-control" placeholder="MM" v-model="ending_month">
                                                                    </span>
                                                                    <span class="col">
                                                                            <label ><b>day :</b></label>
                                                                            <input type="number" class="form-control" placeholder="DD" v-model="ending_day">
                                                                    </span> 
                                                            </div>                                                           
                                                        </div>
                                                </div>
                                        </div>
                                        <hr/>
                                        <div class="row form-group">
                                                <label class="col-3"><b>amount:</b></label>
                                                <input type="number" class=" col-3 form-control" placeholder="amount" v-model="amount">
                                                <div class="col-6 text-success" v-if ="amount > 0"><h3>KSh {{humanize(amount)}}</h3></div>                                                   
                                        </div>                                                                                   
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" disabled v-if="! enable_add_project_button"><b>+</b> add project</button>
                        <button type="button" class="btn btn-success" v-if="enable_add_project_button" v-on:click="addProject()"><b>+</b>{{add_project_button_text}}</button>
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
    name : 'projectList',
    data () {
        return {
            projects: null,
            foundItems: null,
            fetch_data_error: [],
            enable_add_project_button: false,
            add_project_button_text: 'add project',
            //add project
            project_name: '',
            project_description: '',
            amount: null,
            start_year: '',start_month: '',start_day: '',
            start_date: '',
            ending_year: '',ending_month: '',ending_day: '',
            ending_date: '',
            added_project: []


        }
    },
    created () {
        this.checkLoggedIn()
        this.fetchdata()
    },
    watch: {
            project_name: function(){                
                if ( this.project_name.length > 0                   
                     && this.project_description.length > 0
                     && this.start_date.length > 0
                     && this.ending_date.length > 0
                     && this.amount > 0){

                    this.enable_add_project_button = true
                }                
            },
            project_description: function(){                
                if (this.project_name.length > 0                   
                     && this.project_description.length > 0 
                     && this.start_date.length > 0
                     && this.ending_date.length > 0
                     && this.amount > 0 ){

                    this.enable_add_project_button = true
                }                
            },
            start_date: function(){                      
                if (this.project_name.length > 0                    
                     && this.project_description.length > 0
                     && this.start_date.length > 0
                     && this.ending_date.length > 0
                     && this.amount > 0){

                    this.enable_add_project_button = true
                }                
            },
            amount: function(){                      
                if (this.project_name.length > 0                    
                     && this.project_description.length > 0
                     && this.start_date.length > 0
                     && this.ending_date.length > 0
                     && this.amount > 0){

                    this.enable_add_project_button = true
                }                
            },
            ending_date: function(){                      
                if (this.project_name.length > 0                    
                     && this.project_description.length > 0
                     && this.start_date.length > 0
                     && this.ending_date.length > 0
                     && this.amount > 0){

                    this.enable_add_project_button = true
                }                
            },
            //start date
            start_year: function(){
                if (this.start_year.length > 0 
                     && this.start_month.length > 0 
                     && this.start_date.length > 0){
                    this.start_date = this.start_year + '-' + this.start_month + '-' + this.start_day
                }
            },
            start_month: function(){
                if (this.start_year.length > 0 
                     && this.start_month.length > 0 
                     && this.start_date.length > 0){
                    this.start_date = this.start_year + '-' + this.start_month + '-' + this.start_day
                }
            },
            start_day: function(){
                if (this.start_year.length > 0 
                     && this.start_month.length > 0 
                     && this.start_day.length > 0){
                    this.start_date = this.start_year + '-' + this.start_month + '-' + this.start_day
                    console.log(this.start_date)
                }
            },
        //ending year
            ending_year: function(){                    
                if (this.ending_year.length > 0 
                     && this.ending_month.length > 0 
                     && this.ending_day.length > 0){
                    this.ending_date = this.ending_year + '-' + this.ending_month + '-' + this.ending_day
                }
            },
            ending_month: function(){                    
                if (this.ending_year.length > 0 
                     && this.ending_month.length > 0 
                     && this.ending_day.length > 0){
                    this.ending_date = this.ending_year + '-' + this.ending_month + '-' + this.ending_day
                }
            },
            ending_day: function(){                                        
                if (this.ending_year.length > 0 
                     && this.ending_month.length > 0 
                     && this.ending_day.length > 0){
                    this.ending_date = this.ending_year + '-' + this.ending_month + '-' + this.ending_day                    
                }
            }
        },
    methods: {
        checkLoggedIn() {
            if (!this.$session.has("token")) {
                router.push("/login")
            }
        },
        humanize: function(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        fetchdata () {
            this.fetch_data_error = []
            this.$http.get(this.$BASE_URL + '/api/projects/project-list/')
                .then(response => {
                this.projects = {"response": response.data } 
                var array = this.projects.response
                this.foundItems = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        },
        addProject: function (){                
                this.enable_add_project_button = false
                this.add_project_button_text = 'adding project...'            
                this.$http({
                    method: 'post',
                    url: this.$BASE_URL + '/api/projects/project-list/',
                    data: {
                        name: this.project_name,
                        description: this.project_description,
                        required_amount: this.amount,
                        start: this.start_date,
                        stop: this.ending_date                                      
                    }
                }).then(response => {
                        this.added_project.push(response.data)                    
                        this.project_name = ''
                        this.project_description = ''
                        this.amount = ''                        
                        this.start_day = ''
                        this.start_month = ''
                        this.start_year = ''
                        this.ending_year = ''
                        this.ending_month = ''
                        this.ending_day = ''                        
                        this.add_project_button_text = '+ add project'                    
                    })
                    .catch((err) => {
                        this.add_project_button_text = 'failed, check date'
                    })                        
            }
    }

}
</script>


<style >
</style>
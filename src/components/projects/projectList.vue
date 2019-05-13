<template>
    <div >
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
                    <li class="breadcrumb-item active" aria-current="page">projects</li>
                </ol>
        </nav>
        <div class="container">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-8 col-lg-2">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#inProgress" role="tab" aria-controls="members" aria-selected="true">
                              <img  src="@/assets/icons/icons8-user-groups-40.png"> in progress
                            </a>
                            <a class="action-list list-group-item list-group-item-action border-0"  data-toggle="pill" href="#completed" role="tab" aria-controls="activity" aria-selected="false" v-on:click="getGroupActivity()">
                                <img  src="@/assets/icons/icons8-activity-history-48.png">  completed
                            </a>
                    </div>
            </div>
            <div class="tab-content col">
                    <div class="tab-pane fade show active" id="inProgress" role="tabpanel" aria-labelledby="profile-tab"></div>
                    <h3 class="breadcrumb-item active">projects in progress</h3>
                    <hr/>
                    <div class="col-8 center-div" v-if = "fetch_data_error.length > 0">
                        <div class = "center-div" >
                                <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
                                <p class="text-info">check your connection</p>
                        </div>
                    </div>
                    <div v-if = "fetch_data_error.length == 0">
                    found <span class="badge badge-pill badge-info">{{foundItems}}</span>
                    <hr/>
                    <div v-for = "data in projects.response " class = "shadowonhover border-0">
                    <router-link style="text-decoration: none;"  :to="`/projectDetail/`+ data.id + `/`" >
                    <div class="card mb-3" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                <img  src="@/assets/avatars/icons8-crowd-100.png" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{data.name}} <span v-for = "data in data.church_group">({{data.name}})</span></h5>
                                    <p class="card-text text-muted">{{data.description}}</p>
                                    <p class="card-text"><small class="text-muted">required amount-</small> <span class="badge badge-pill badge-info">{{data.required_amount}}</span></p>
                                    <p class="card-text"><small class="text-muted">percentage funded-</small> <span class="badge badge-pill badge-danger">{{data.percentage_funded}} %</span></p>
                                
                                </div>
                                </div>
                            </div>
                    </div>
                    </router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-10 col-md-8 col-lg-3">
                    <div style="padding: 0px 0px 25px 10px">
                            <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                                <div class="add-button">
                                    + add project
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
    name : 'projectList',
    data () {
        return {
            projects: null,
            foundItems: null,
            fetch_data_error: [],

        }
    },
    created () {
        this.fetchdata()
    },
    methods: {
        fetchdata () {
            this.fetch_data_error = []
            this.$http.get('http://127.0.0.1:8000/api/projects/project-list/')
                .then(response => {
                this.projects = {"response": response.data } 
                var array = this.projects.response
                this.foundItems = array.length
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
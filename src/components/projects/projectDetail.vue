<template>
    <div >
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'projectList'}">projects</router-link></span> 
                    <li class="breadcrumb-item active" aria-current="page"><span v-for = "data in context.response">{{data.name}}</span></li>
                </ol>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-10 col-md-8 col-lg-2">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-contributions-tab" data-toggle="pill" href="#v-pills-contributions" role="tab" aria-controls="v-pills-contributions" aria-selected="true">Contributions</a>
                                <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-pledges-tab" data-toggle="pill" href="#v-pills-pledges" role="tab" aria-controls="v-pills-pledges" aria-selected="false" v-on:click="getPledges()">Pledges</a>
                            
                        </div>
                </div>
                <div class="col">
                        <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-contributions" role="tabpanel" aria-labelledby="v-pills-contributions-tab">
                                        <div class="row" v-for = "data in context.response " >
                                                <p class="card-text" style="padding: 5px"><small class="text-muted">required amount-</small> <span class="badge badge-pill badge-info">{{data.required_amount}}</span></p>
                                                <p class="card-text" style="padding: 5px"><small class="text-muted">raised amount-</small> <span class="badge badge-pill badge-success">{{data.raised_amount}}</span></p>
                                                <p class="card-text" style="padding: 5px"><small class="text-muted">percentage funded-</small> <span class="badge badge-pill badge-danger">{{data.percentage_funded}} %</span></p>
                                        </div>
                                    <h3 class="breadcrumb-item active"><span v-for = "data in context.response">{{data.name}} /</span> contributions</h3>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>name</th>
                                                <th>amount</th>
                                                <th>date</th>
                                                <th>recorded by</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for = "data in contributions.response">
                                                <td>{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                <td><p class="text-success">{{data.amount}}</p></td>
                                                <td>{{data.recorded_at}}</td>
                                                <td><p class="text-info">{{data.recorded_by.member.first_name}} {{data.recorded_by.member.last_name}}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-pledges" role="tabpanel" aria-labelledby="v-pills-pledges-tab">
                                    <div v-if = "pledges_selected">
                                            <div class="row" v-for = "data in context.response " >
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">required amount-</small> <span class="badge badge-pill badge-info">{{data.required_amount}}</span></p>
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">raised amount-</small> <span class="badge badge-pill badge-success">{{data.raised_amount}}</span></p>
                                                    <p class="card-text" style="padding: 5px"><small class="text-muted">percentage funded-</small> <span class="badge badge-pill badge-danger">{{data.percentage_funded}} %</span></p>
                                            </div>
                                        <h3 class="breadcrumb-item active"><span v-for = "data in context.response">{{data.name}} /</span> contributions</h3>
                                        <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>name</th>
                                                        <th>amount pledged</th>
                                                        <th>amount raised</th>
                                                        <th>amount remaining</th>
                                                        <th>percentage funded</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for = "data in pledges.response">
                                                        <td>{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                        <td>{{data.amount}}</td>
                                                        <td><p class="text-success">{{data.amount_so_far}}</p></td>
                                                        <td><p class="text-danger">{{data.remaining_amount}}</p></td>
                                                        <td><span class="badge badge-pill badge-info">{{data.percentage_funded}}</span></td>
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                    </div>
                                </div>
                               
                        </div>
                </div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-3">
                        <div style="padding: 0px 0px 25px 10px">
                                <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                                    <div class="add-button">
                                        + add 
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
    name : 'projectDetail',
    data () {
        return {
            context: null,
            contributions: null,
            pledges: null,
            pledges_selected: false,
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
            this.$http.get(this.$BASE_URL +'/api/projects/project-list/')
                .then(response => {
                this.context = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })

            this.$http.get(this.$BASE_URL +'/api/projects/contribution-for-project/'+ this.$route.params.id + '/')
                .then(response => {
                this.contributions = {"response": response.data } 
                })
                .catch((err) => {
                    
                })
        },
        getPledges: function(){
            this.pledges_selected = true
            this.$http.get(this.$BASE_URL +'/api/projects/pledges-for-project/'+ this.$route.params.id + '/')
                .then(response => {
                this.pledges = {"response": response.data } 
                })
                .catch((err) => {
                    
                })
        }
    }

}
</script>


<style >
</style>
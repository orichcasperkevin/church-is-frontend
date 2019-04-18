<template>
    <div>
        <div class="row">
        <div class="col">
        <h3 class="breadcrumb-item active">groups / {{group_type}}s</h3>
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
        <div v-for = "data in groups.response " class = "shadowonhover border-0">
        <router-link style="text-decoration: none;"  :to="`/groupDetail/`+ data.id + `/` + group_type" >
        <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                    <img  src="@/assets/avatars/icons8-crowd-100.png" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{data.name}}</h5>
                        <p class="card-text text-muted">{{data.description}}</p>
                        <p class="card-text"><small class="text-muted">members -</small> <span class="badge badge-pill badge-info">{{data.number_of_members}}</span></p>
                    
                    </div>
                    </div>
                </div>
        </div>
        </router-link>
        </div>
        </div>
        </div>
        <div class="col-sm-10 col-md-8 col-lg-3">
            <div style="padding: 0px 0px 25px 0px">
                    <a href="#" data-toggle="modal" data-target="#addGroup" style="text-decoration: none">
                        <div class="add-button">
                            + add {{group_type}}
                        </div>
                    </a>
            </div>
        </div>
        </div>
            <!-- Modal add group -->
            <div class="modal fade" id="addGroup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">add {{group_type}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fetchData()">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="added_group.length > 0 ">
                    <div class="alert alert-success alert-dismissible fade show" role="alert" v-for = "data in added_group">
                            <strong>{{data.name}}</strong> added successfully.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    </div>
                    <div class="form-group">
                            <label for="addGroup">name of {{group_type}}</label>
                            <input type="text" class="form-control" id="addGroup" autofocus v-model="name"></input>
                            <p v-if="name_errors.length">
                                    <ul>
                                            <small><li v-for="error in name_errors"><p class="text-danger">{{ error }}</p></li></small>
                                    </ul>
                            </p>
                    </div>
                    <div class="form-group">
                        <label for="addGroupDescription">description</label>
                        <textarea class="form-control" id="addGroupDescription" rows="3" v-model="description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchData()">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="addGroup()">add group</button>
                </div>
                </div>
            </div>
            </div>
    </div>
  </template>

<script>
export default {
  name: 'groupList',
  data () {
    return {
        group_type: '',
        groups: null,
        foundItems: null,
        fetch_data_error: [],
        name: '',name_errors: [],description: '',
        add_group_error: null,added_group: []
    }
  },
  created() {
        this.fetchData()
    },

  watch: {
        '$route': 'fetchData'
    },
  methods: {
        fetchData() {
            this.group_type = this.$route.params.group_type
            if (this.$route.params.group_type == 'fellowship'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/fellowship-list/')
                .then(response => {
                this.groups = {"response": response.data } 
                var array = this.groups.response
                this.foundItems = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            }
            if (this.$route.params.group_type == 'church-group'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/church-group-list/')
                .then(response => {
                this.groups = {"response": response.data } 
                var array = this.groups.response
                this.foundItems = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            }
            if (this.$route.params.group_type == 'ministry'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/ministry-list/')
                .then(response => {
                this.groups = {"response": response.data } 
                var array = this.groups.response
                this.foundItems = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            }
            if (this.$route.params.group_type == 'cell-group'){
                this.fetch_data_error = []
                this.$http.get('http://127.0.0.1:8000/api/groups/cell-group-list')
                .then(response => {
                this.groups = {"response": response.data } 
                var array = this.groups.response
                this.foundItems = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            }
        },
        addGroup: function(){
            this.name_errors = [],
            this.description_errors = []

            if (! this.name){
                this.name_errors.push('you must have a name for the group')
            }
            if (! this.description){
                this.description = 'none given'
            }
            if (this.$route.params.group_type == 'fellowship'){
                this.$http({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/groups/fellowship-list/',
                    data: {
                    name: this.name,
                    description: this.description
                    }
                    }).then(response => {
                    this.added_group.push(response.data )   
                    this.name = ''
                    this.description = ''
                    })
                    .catch((err) => {
                    this.add_group_error.push(err)
                    })
            }
            if (this.$route.params.group_type == 'church-group'){
                this.$http({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/groups/church-group-list/',
                    data: {
                    name: this.name,
                    description: this.description
                    }
                    }).then(response => {
                    this.added_group.push(response.data )   
                    this.name = ''
                    this.description = ''
                    })
                    .catch((err) => {
                    this.add_group_error.push(err)
                    })
            }
            if (this.$route.params.group_type == 'cell-group'){
                this.$http({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/groups/cell-group-list/',
                    data: {
                    name: this.name,
                    description: this.description
                    }
                    }).then(response => {
                    this.added_group.push(response.data )   
                    this.name = ''
                    this.description = ''
                    })
                    .catch((err) => {
                    this.add_group_error.push(err)
                    })
            }
            if (this.$route.params.group_type == 'ministry'){
                this.$http({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/groups/ministry-list/',
                    data: {
                    name: this.name,
                    description: this.description
                    }
                    }).then(response => {
                    this.added_group.push(response.data )   
                    this.name = ''
                    this.description = ''
                    })
                    .catch((err) => {
                    this.add_group_error.push(err)
                    })
            }

        }
      
    }

}
</script>


<style >
</style>
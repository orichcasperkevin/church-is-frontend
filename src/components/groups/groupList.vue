<template>
    <div >
        <div class="row">
        <div class="col-8">
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
        <div class="col-4">
            <div style="padding: 0px 0px 25px 0px">
                    <router-link :to="{name: 'memberAdd'}">
                        <div class="add-button">
                            + add {{group_type}}
                        </div>
                    </router-link>
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
        fetch_data_error: []
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
        }
      
    }

}
</script>


<style >
</style>
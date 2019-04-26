<template>
    <div class="memberDetail">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'memberList'}">members</router-link> </span>
                <li class="breadcrumb-item active" aria-current="page">member detail</li>
            </ol>
    </nav>
    <div class="container">
            <div class="row">
              <div class="col-3">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active list-group-item list-group-item-action border-0" id="pill-detail-tab" data-toggle="pill" href="#pill-detail" role="tab" aria-controls="pill-detail" aria-selected="true">
                                <img class="church-is-menu" src="@/assets/icons/icons8-user-groups-filled-50.png"> detail
                        </a>
                        <a class="nav-link list-group-item list-group-item-action border-0" id="pill-groups-tab" data-toggle="pill" href="#pill-groups" role="tab" aria-controls="pill-groups" aria-selected="false" v-on:click = "getMemberGroups()">
                                <img class="church-is-menu" src="@/assets/icons/icons8-user-groups-filled-50.png"> groups
                        </a>
                        <a class="nav-link list-group-item list-group-item-action border-0" id="pill-attendance-tab" data-toggle="pill" href="#pill-attendance" role="tab" aria-controls="pill-attendance" aria-selected="false">
                                <img class="church-is-menu" src="@/assets/icons/icons8-attendance-filled-50 (1).png"> attendance
                        </a>
                        <a class="nav-link list-group-item list-group-item-action border-0" id="pill-contributions-tab" data-toggle="pill" href="#pill-contributions" role="tab" aria-controls="pill-contributions" aria-selected="false">
                                <img class="church-is-menu" src="@/assets/icons/icons8-donate-filled-50.png"> contributions
                        </a>
                        <a class="nav-link list-group-item list-group-item-action border-0" id="pill-delete-tab" data-toggle="pill" href="#pill-delete" role="tab" aria-controls="pill-delete" aria-selected="false">
                                <img class="church-is-menu" src="@/assets/icons/icons8-cancel-26.png"> delete
                        </a>     
                    </div> 
              </div>
              <div class="col-9">
                <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="pill-detail" role="tabpanel" aria-labelledby="pill-detail-tab">
                                <hr/>
                                <div style="padding: 10px 10px 10px 10px">
                                </div>
                                <div class="mx-auto" style="width: 200px;">
                                <div class="row">
                                        <div class="col border " style=" height: 100px ;border-radius: 15px">
                                                <div style="padding: 25px 25px 25px 25px">
                                                <img src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                                </div>
                                        </div>
                                        <div style="padding : 10px">
                                                <span v-for = "data in member_info">
                                                        <span v-for = "data in data">
                                                        <div class=" row mx-auto"><b>name :</b> {{data.member.first_name}}  {{data.member.last_name}}</div>
                                                        </span>
                                                </span>
                                        </div>
                                </div>
                                </div>
                                <hr/>
                                <div class="row" style="padding: 25px 25px 25px 25px">
                                <div class="col">
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0">personal</div>
                                                <div class="card-body">
                                                <span v-for = "data in member_info">
                                                <span v-for = "data in data">
                                                        <p><b>username:</b> {{data.member.username}}</p>
                                                </span>
                                                </span>
                                                <span v-for = "data in member_info">
                                                        <span v-for = "data in data">
                                                        <p v-if = "data.gender == 'M'"><b>gender :</b> male </p>
                                                        <p v-if = "data.gender == 'F'"><b>gender :</b> female </p>
                                                        </span>
                                                </span>
                                                <p v-if = "marital_status_info.marital_status.length == 0"><b>marital status :</b> none given</p>
                                                <span v-for = "data in marital_status_info" >
                                                        <span v-for = "data in data">
                                                        <p v-if = "data.status == 'M'"><b>marital_status :</b> married </p>
                                                        <p v-if = "data.status == 'S'"><b>marital_status :</b> single </p>
                                                        <p v-if = "data.status == 'D'"><b>marital_status :</b> divorced </p>
                                                        <p v-if = "data.status == 'W'"><b>marital_status :</b> widowed </p>
                                                        </span>
                                                </span>
                                                </span>
                                                <p v-if = "age_errors.length > 0"><b>age :</b> none given</p>

                                                <span v-for = "data in age_info">
                                                        <p><b>age :</b> {{data.age}}  <small class="text-info">({{data.d_o_b}})</small></p>
                                                </span>
                                                </div>
                                        </div>
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0">residence </div>
                                                <div class="card-body">
                                                <p v-if = "residence_info.residence.length == 0 "> none given </p>
                                                        <span v-for = "data in residence_info">
                                                        <span v-for = "data in data">
                                                                <p><b>town:</b> {{data.town}}</p>
                                                        </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>road:</b> {{data.road}}</p>
                                                                </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>street / drive:</b> {{data.street}}</p>
                                                                </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>area name:</b> {{data.village_estate}}</p>
                                                                </span>
                                                        </span>
                                                        <span v-for = "data in residence_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>description:</b> {{data.description}}</p>
                                                                </span>
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                                <div class="col">
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0"> contact </div>
                                                <div class="card-body">
                                                        <p v-if = "contact_info.contact.length == 0 "> none given </p>
                                                        <span v-for = "data in contact_info">
                                                                <span v-for = "data in data">
                                                                        <p><b>phone number:</b> {{data.phone}}</p>
                                                                </span>
                                                                <span v-for = "data in member_info">
                                                                        <span v-for = "data in data">
                                                                        <div v-if = "data.member.email == ''"><b>email :</b> none given</div>
                                                                        <div v-if = "data.member.email != ''"><b>email :</b> {{data.member.email}}</div>
                                                                        </span>
                                                                </span>
                                                        </span>                               
                                                </div>
                                        </div>
                                        <div class="card border-0" style="max-width: 18rem;">
                                                <div class="card-header border-0">Family</div>
                                                <div class="card-body">
                                                        <p v-if = "family_info.family.length == 0 "> none given </p>

                                                        <table class="table" v-if = "min_age > 0  || max_age != 150 ">
                                                                <tbody>
                                                                <tr v-for="data in family_info.family">
                                                                <span  v-for = "data in data" >
                                                                        <span  >{{data.name}}</span>
                                                                        <div v-for = "data in data.members">
                                                                        <td>
                                                                                <img v-if = "data.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                                                                <img v-if = "data.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                                                                                <img v-if = "data.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                                                                        
                                                                        <span class="text-secondary">{{data.member.first_name}} {{data.member.last_name}}</span>
                                                        
                                                                        </td>
                                                                        </div>
                                                                        </span>
                                                                
                                                                
                                                                
                                                                </tr>
                                                                </tbody>
                                                        </table>
                                                </div>
                                        </div>
                                </div>
                                </div>
                        </div>
                        <div class="tab-pane fade" id="pill-groups" role="tabpanel" aria-labelledby="pill-groups-tab">
                        <h3>
                        <span class="backButton">
                                <a href="#" class="text-muted" style="text-decoration: none;">
                                        fellowships
                                </a>
                        </span>
                        </h3>
                          <table class="table" v-if = "groups_selected == true">
                                <thead class="thead-dark"  v-if = "fellowships.response.length > 0 ">
                                        <tr>
                                           <th>fellowship</th>
                                           <th>date joined</th>
                                           <th>role</th>
                                        </tr>
                                </thead>
                                        <tr v-for = "data in fellowships.response">
                                           <td>{{data.fellowship.name}}</td>
                                           <td>{{data.date_joined}}</td>
                                           <td>{{data.role.role}}</td>
                                        </tr>

                          </table>
                          <div v-if = "groups_selected == true">
                          <div v-if = "fellowships.response.length == 0 ">
                                <p class="text-info center-div">none</p> 
                          </div>
                          </div>
                          <hr/>
                          <h3>
                        <span class="backButton">
                                <a href="#" class="text-muted" style="text-decoration: none;">
                                        ministries
                                </a>
                        </span>
                        </h3>
                                <table class="table" v-if = "groups_selected == true">
                                <thead class="thead-dark"  v-if = "ministries.response.length > 0 ">
                                        <tr>
                                                <th>ministry</th>
                                                <th>date joined</th>
                                                <th>role</th>
                                        </tr>
                                </thead>
                                        <tr v-for = "data in ministries.response">
                                                <td>{{data.ministry.name}}</td>
                                                <td>{{data.date_joined}}</td>
                                                <td>{{data.role.role}}</td>
                                        </tr>

                                </table>
                                <div v-if = "groups_selected == true">
                                        <div v-if = "ministries.response.length == 0 ">
                                        <p class="text-info center-div">none</p> 
                                        </div>
                                </div>
                                <h3>
                                <hr/>
                        <span class="backButton">
                                <a href="#" class="text-muted" style="text-decoration: none;">
                                        cell groups
                                </a>
                        </span>
                        </h3>
                                <table class="table" v-if = "groups_selected == true">
                                <thead class="thead-dark" v-if = "cell_groups.response.length > 0 ">
                                        <tr>
                                                <th>cell group</th>
                                                <th>date joined</th>
                                                <th>role</th>
                                        </tr>
                                </thead>
                                        <tr v-for = "data in cell_groups.response">
                                                <td>{{data.cell_group.name}}</td>
                                                <td>{{data.date_joined}}</td>
                                                <td>{{data.role.role}}</td>
                                        </tr>

                                </table>
                                <div v-if = "groups_selected == true">
                                <div v-if = "cell_groups.response.length == 0 ">
                                <p class="text-info center-div">none</p> 
                                </div>
                                </div>
                                <h3>
                                <hr/>
                        <span class="backButton">
                                <a href="#" class="text-muted" style="text-decoration: none;">
                                        church groups
                                </a>
                        </span>
                        </h3>
                                <table class="table" v-if = "groups_selected == true">
                                <thead class="thead-dark"  v-if = "fellowships.response.length > 0 ">
                                        <tr>
                                                <th>church_groups</th>
                                                <th>date joined</th>
                                                <th>role</th>
                                        </tr>
                                </thead>
                                        <tr v-for = "data in church_groups.response">
                                                <td>{{data.church_group.name}}</td>
                                                <td>{{data.date_joined}}</td>
                                                <td>{{data.role.role}}</td>
                                        </tr>

                                </table>
                                <div v-if = "groups_selected == true">
                                <div v-if = "church_groups.response.length == 0 ">
                                <p class="text-info center-div">none</p> 
                                </div>
                                </div>
                        </div>
                        <div class="tab-pane fade" id="pill-attendance" role="tabpanel" aria-labelledby="pill-attendance-tab">
                         attendance
                        </div>
                        <div class="tab-pane fade" id="pill-contributions" role="tabpanel" aria-labelledby="pill-contributions-tab">
                          contributions
                        </div>
                        <div class="tab-pane fade" id="pill-delete" role="tabpanel" aria-labelledby="pill-delete-tab">
                         delete
                        </div>

                </div>
              </div>
            </div>
          </div>
    </div>
  </template>

<script>
export default {
  name: 'memberDetail',
  data () {
    return {
        contact_info: null, contact_errors: [],
        age_info: null, age_errors: [],
        residence_info: null, residence_errors: [],
        roles_info: null, roles_errors: [],
        marital_status_info: null, marital_status_errors: [],
        family_info: null, family_errors: [],
        groups_selected: false,
        fellowships: null,church_groups: null, ministries:null, cell_groups: null
    }
  },
  created() {
        this.fetchData()
    },

  watch: {
        '$route': 'fetchData'
    },
  methods: {
        getMemberGroups: function(){
            this.groups_selected = true
            this.$http.get('http://127.0.0.1:8000/api/groups/fellowships-for-a-member/'+this.$route.params.id+'/')
            .then(response => {
            this.fellowships = {"response": response.data }
            })
            .catch(error=> {
            this.groups_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/groups/ministries-for-a-member/'+this.$route.params.id+'/')
            .then(response => {
            this.ministries = {"response": response.data }
            })
            .catch(error=> {
            this.groups_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/groups/church-groups-for-a-member/'+this.$route.params.id+'/')
            .then(response => {
            this.church_groups = {"response": response.data }
            })
            .catch(error=> {
            this.groups_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/groups/cell-groups-for-a-member/'+this.$route.params.id+'/')
            .then(response => {
            this.cell_groups = {"response": response.data }
            })
            .catch(error=> {
            this.groups_errors.push(error)
            })
        },
        fetchData() {
            this.$http.get('http://127.0.0.1:8000/api/members/member/'+this.$route.params.id+'/')
            .then(response => {
            this.member_info = {"member": response.data }
            })
            .catch(error=> {
            this.contact_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/members/contact-for-member/'+this.$route.params.id+'/')
            .then(response => {
            this.contact_info = {"contact": response.data }
            })
            .catch(error=> {
            this.contact_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/members/age-for-member/'+this.$route.params.id+'/')
            .then(response => {
            this.age_info = {"age": response.data }
            })
            .catch(error=> {
            this.age_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/members/residence-for-member/'+this.$route.params.id+'/')
            .then(response => {
            this.residence_info = {"residence": response.data }
            })
            .catch(error=> {
            this.residence_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/members/roles-for-member/'+this.$route.params.id+'/')
            .then(response => {
            this.roles_info = {"roles": response.data }
            })
            .catch(error=> {
            this.roles_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/members/marital-status-for-member/'+this.$route.params.id+'/')
            .then(response => {
            this.marital_status_info = {"marital_status": response.data }
            })
            .catch(error=> {
            this.marital_status_errors.push(error)
            })
            this.$http.get('http://127.0.0.1:8000/api/members/family-for-member/'+this.$route.params.id+'/')
            .then(response => {
            this.family_info = {"family": response.data }
            })
            .catch(error=> {
            this.family_errors.push(error)
            })
            
        }
      
    }

}
</script>


<style >
</style>
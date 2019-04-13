<template>
    <div class="memberDetail">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name: 'Home'}">Home</router-link> 
                <li class="breadcrumb-item"><router-link :to="{name: 'memberList'}">members</router-link> 
                <li class="breadcrumb-item active" aria-current="page">member detail</li>
            </ol>
    </nav>
    <div class="container">
            <div class="row">
              <div class="col-3">
                    <div class="list-group ">
                            <router-link :to="{name: 'Home'}" class="action-list list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-user-30.png"> detail</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-user-groups-filled-50.png"> groups</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-attendance-filled-50 (1).png"> attendance</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-donate-filled-50.png"> contibutions</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-cancel-26.png"> delete</router-link>
                    </div>  
              </div>
              <div class="col-9">
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
        family_info: null, family_errors: []
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
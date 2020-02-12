<template>
    <div class="memberdetail" >    
            <!-- title bit with avatar -->
            <div class="mx-auto" style="width: 200px;">
                <div class="row">
                        <div class="col border " style=" height: 100px ;border-radius: 15px">
                                <div style="padding: 25px 25px 25px 25px">
                                <img src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                </div>
                        </div>
                        <div style="padding : 10px">                                                              
                            <div class=" row mx-auto">
                                <b>name :</b>
                                 {{member_info.member[0].member.first_name}} 
                                 {{member_info.member[0].middle_name}}
                                 {{member_info.member[0].member.last_name}}
                            </div>                                                                        
                        </div>
                </div>
            </div>
            <hr/>
            <div class="row" style="padding: 25px 25px 25px 25px">
            <div class="col">
                    <!-- personal detail -->
                    <div class="card border-0" style="max-width: 18rem;">                            
                            <div class="card-header border-0">
                                <span class="row">
                                    <span class="col text-left">Personal</span>
                                    <span class="col text-right">
                                        <a href="#" data-toggle="modal" data-target="#editPersonalDetailModal">
                                            <img src="@/assets/icons/icons8-edit-24.png" style="width:20px ; height: auto">
                                        </a>                                          
                                    </span>
                                </span>                                
                            </div>
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
                                        <p v-if = "data.status == 'M'"><b>marital status :</b> married </p>
                                        <p v-if = "data.status == 'S'"><b>marital status :</b> single </p>
                                        <p v-if = "data.status == 'D'"><b>marital status :</b> divorced </p>
                                        <p v-if = "data.status == 'W'"><b>marital status :</b> widowed </p>
                                        </span>
                                </span>
                                </span>
                                <p v-if = "age_errors.length > 0"><b>age :</b> none given</p>

                                <span v-for = "data in age_info">
                                        <p><b>age :</b> {{data.age}}  <small class="text-info">({{data.d_o_b}})</small></p>
                                </span>
                            </div>
                    </div>
                    <!-- residence data -->
                    <div class="card border-0" style="max-width: 18rem;">
                            <div class="card-header border-0">
                                    <span class="row">
                                        <span class="col text-left">Residence</span>
                                        <span class="col text-right" >
                                                <a href="#" data-toggle="modal" data-target="#editPersonalDetailModal">
                                                        <img src="@/assets/icons/icons8-edit-24.png" style="width:20px ; height: auto">
                                                </a>                                                   
                                        </span>
                                    </span>  
                            </div>
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
            <!-- edit personal detail Modal -->
            <div class="modal fade" id="editPersonalDetailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <div class="row form-group">                                
                                <label class="col-3"><b>first name:</b></label>                                
                                <input type="text" class=" col-8 form-control" 
                                        :placeholder="member_info.member[0].member.first_name" 
                                        v-model="new_first_name"> 
                            </div>
                            <div class="row form-group">                                                                    
                                <label class="col-3"><b>middle name:</b></label>
                                <input type="text" class=" col-8 form-control" 
                                        :placeholder="member_info.member[0].middle_name" 
                                        v-model="new_middle_name"> 
                            </div>
                            <div class="row form-group">  
                                <label class="col-3"><b>last name:</b></label>
                                <input type="text" class=" col-8 form-control" 
                                        :placeholder="member_info.member[0].member.last_name" 
                                        v-model="new_last_name"> 
                            </div>
                            <div class="row form-group">  
                                <label class="col-3"><b>date of birth:</b></label>
                                <input placeholder="sbiuwew" type="date" name="bday" max="3000-12-31" 
                                    min="1000-01-01" class="col-8 form-control" v-model="new_d_o_b"> 
                            </div>
                            <div class="row form-group">  
                                <label class="col-3"><b>gender:</b></label>
                                <select class="col-8 custom-select" v-model="new_gender">
                                        <option value="M">male</option>
                                        <option value="F">female</option>                                      
                                </select>
                            </div>
                            <div class="row form-group">  
                                <label class="col-3"><b>marital status:</b></label>
                                <select class="col-8 custom-select mr-sm-2" v-model="new_marital_status">
                                        <option value="M" selected>married</option>
                                        <option value="S">single</option> 
                                        <option value="D">divorced</option>
                                        <option value="W">widowed</option>                                       
                                </select>                                
                            </div>
                             
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" v-on:click="updatePersonalDetail()">
                                Save changes
                                <span v-if="updating_details"
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
export default {
    name: 'memberdetail',           
    watch: {           

    },

    created(){
        this.fetchData()        
    },
    data(){
        return{    
            member_info: null,    
            contact_info: null, contact_errors: [],
            age_info: null, age_errors: [],
            residence_info: null, residence_errors: [],
            roles_info: null, roles_errors: [],
            marital_status_info: null, marital_status_errors: [],
            family_info: null, family_errors: [],              
            //edit personal info
            updating_details:false,
            new_d_o_b: null,
            new_first_name: null,
            new_middle_name:null,
            new_last_name: null,
            new_gender: null,
            new_marital_status: null                  
        }
    },

    methods:{
        fetchData: function(){
                this.$store.dispatch('update_isLoading', true)
                //member personal detail
                this.$http.get(this.$BASE_URL + '/api/members/member/'+this.$route.params.id+'/')
                .then(response => {
                        this.member_info = {"member": response.data }
                })
                .catch(error=> {
                
                })

                //member conatct
                this.$http.get(this.$BASE_URL + '/api/members/contact-for-member/'+this.$route.params.id+'/')
                .then(response => {
                        this.contact_info = {"contact": response.data }
                })
                .catch(error=> {
            
                })

                //member age
                this.$http.get(this.$BASE_URL + '/api/members/age-for-member/'+this.$route.params.id+'/')
                .then(response => {
                        this.age_info = {"age": response.data }
                })
                .catch(error=> {
                    
                })
                this.$http.get(this.$BASE_URL + '/api/members/residence-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.residence_info = {"residence": response.data }
                })
                .catch(error=> {
                this.residence_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/roles-for-member/'+this.$route.params.id+'/')
                .then(response => {
                this.roles_info = {"roles": response.data }
                })
                .catch(error=> {
                this.roles_errors.push(error)
                })

                //marital status 
                this.$http.get(this.$BASE_URL + '/api/members/marital-status-for-member/'+this.$route.params.id+'/')
                .then(response => {
                        this.marital_status_info = {"marital_status": response.data }
                })
                .catch(error=> {
                        this.marital_status_errors.push(error)
                })


                this.$http.get(this.$BASE_URL + '/api/members/family-for-member/'+this.$route.params.id+'/')
                .then(response => {
                        this.family_info = {"family": response.data }
                })
                .catch(error=> {
                        this.family_errors.push(error)
                })
                this.$http.get(this.$BASE_URL + '/api/members/family-tree-for-member/'+this.$route.params.id+'/')
                .then(response => {
                        this.family_tree = {"tree": response.data }
                        this.$store.dispatch('update_isLoading', false)
                })
                .catch(error=> {
                        this.family_errors.push(error)
                        this.$store.dispatch('update_isLoading', false)
                })                
        },
        ///update member personal data
        updatePersonalDetail: function(){         
                this.updating_details = true       
                this.$http.patch(
                        this.$BASE_URL + '/api/members/update-member-detail/',
                        {
                                'member_id':this.$route.params.id,
                                'first_name':this.new_first_name,
                                'last_name':this.new_last_name,
                                'middle_name':this.new_middle_name,
                                'gender':this.new_gender,
                                'd_o_b':this.new_d_o_b,
                                'marital_status':this.new_marital_status
                        }    
                )
                .then((response)=>{                        
                        this.new_first_name = null
                        this.new_d_o_b = null
                        this.new_gender = null
                        this.new_last_name = null
                        this.new_middle_name = null
                        this.new_marital_status = null  
                        this.updating_details = false
                        //update version of member list
                        var new_version = parseInt(localStorage.getItem('member_list_version')) + 1
                        this.$store.dispatch('update_member_list_version', new_version)
                        this.fetchData()                                              
                        alert("update successful")
                })
                .catch(()=>{
                        this.fetchData()
                        this.updating_details = false
                        alert("error updating")
                })
        }
    },

}
</script>
    
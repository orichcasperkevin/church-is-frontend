<template>
    <div class="memberAdd">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
                <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'memberList'}">members</router-link></span> 
                <li class="breadcrumb-item active" aria-current="page">add member</li>
            </ol>
    </nav>
    <div class="container">
            <div class="row">
              <div class="col-12 col-sm-10 col-md-8 col-lg-2">
                    <div class="list-group ">
                        <h3>fields you can see</h3>
                        <hr/>
                        <div class="checkbox">
                            <label><input type="checkbox" checked disabled> personal</label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" :value= true v-model = "age_field"> age</label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" :value= true v-model = "contact_field"> contact </label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" :value= true v-model = "residence_field"> residence </label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" :value= true v-model = "marital_field"> marital status</label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" :value=true v-model = "roles_field"> roles</label>
                        </div>
                    </div>  
              </div>
              <div class="col">
                <hr/>
                <div v-if="add_member_error.length > 0 " class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div class="col">
                                <img style = "height: 64px "src="@/assets/icons/icons8-wi-fi-off-64.png">
                                 <p class="text-info">check your connection</p>
                        </div class="col">
                        <div>
                        <strong>add member will not work without a connection !</strong>
                        <p>check your connection and try again.</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                </div>
                <div class="mx-auto">
                    <div class="row" style="padding: 5px 60px ">
                        <div class="col">
                        <div class="form-group">
                                <label><b>first name :</b></label>
                                <input type="text" class="form-control"  placeholder="first name" v-model="first_name" autofocus>
                                <p v-if="first_name_errors.length">
                                        <ul>
                                                <small><li v-for="error in first_name_errors"><p class="text-danger">{{ error }}</p></li></small>
                                        </ul>
                                </p>
                        </div>
                        <div class="form-group">
                                <label><b>last name :</b></label>
                                <input type="text" class="form-control"  placeholder="last name" v-model="last_name" >
                                <p v-if="last_name_errors.length">
                                        <ul>
                                                <small><li v-for="error in last_name_errors"><p class="text-danger">{{ error }}</p></li></small>
                                        </ul>
                                </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="mx-auto">
                    <div class="">
                        <div class="row" style="padding: 5px 60px ">
                                <div class="checkbox col">
                                        <div class="radio">
                                                <label><input type="radio" :value = true v-model = "gender_male" > male</label>
                                        </div>
                                        <div class="radio">
                                                 <label><input type="radio" :value = true v-model = "gender_female"> female</label>
                                        </div>
                                        <p v-if="gender_errors.length">
                                        <ul>
                                                <small><li v-for="error in gender_errors"><p class="text-danger">{{ error }}</p></li></small>
                                        </ul>
                                        </p>
                                </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="mx-auto" v-if = "age_field == true ">
                    <div class="row" style="padding: 5px 60px ">
                        <div class="col">
                        <div class="form-group">
                                <label><b>date of birth :</b></label>
                                <input type="date" name="bday" max="3000-12-31" 
                                min="1000-01-01" class="form-control" v-model="date">
                        </div>
                        </div>
                    </div>
                </div>
                <hr v-if = "age_field == true " />

                <div class="mx-auto" v-if = "marital_field == true">
                    <div class="">
                        <div class="row" style="padding: 5px 60px ">
                                <div class="col">
                                        <div class="radio">
                                                <label><input type="radio" name="optradio" checked> single</label>
                                              </div>
                                              <div class="radio">
                                                <label><input type="radio" name="optradio"> married</label>
                                              </div>
                                              <div class="radio">
                                                <label><input type="radio" name="optradio" > divorced</label>
                                              </div>
                                              <div class="radio">
                                                    <label><input type="radio" name="optradio" > widowed</label>
                                             </div>
                                </div>
                        </div>
                    </div>
                </div>
                <hr v-if = "marital_field == true"/>         
                <div class="mx-auto" v-if = "roles_field == true">
                        <div class="">
                            <div class="row" style="padding: 5px 60px ">
                                    <div class="checkbox col">
                                            <div><label><input type="checkbox" value=""> role 1</label></div>
                                            <div><label><input type="checkbox" value=""> role 2</label></div>
                                            <div><label><input type="checkbox" value=""> role 3</label></div>
                                            <div><label><input type="checkbox" value=""> role 4</label></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <hr v-if = "roles_field == true">
        
                    <div class="mx-auto" v-if = "contact_field == true">
                            <div class="">                                
                                <div class="row" style="padding: 5px 60px ">
                                        <div class="col">
                                        <div class="form-group">
                                                <label><b>email :</b></label>
                                                <input type="email" class="form-control"  placeholder="example@gmail.com" v-model = "email">
                                        </div>
                                        <div class="form-group">
                                                <label><b>phone number :</b></label>
                                                <input type="text" class="form-control"  placeholder="07********" autofocus>
                                        </div>
                                        <div class="form-group">
                                                <label><b>postal address :</b></label>
                                                <input type="text" class="form-control"  placeholder="123-456" autofocus>
                                        </div>
                                        </div>
                                </div>                            
                            </div>
                        </div>
                        <hr v-if = "contact_field == true">

                        <div class="mx-auto" v-if = "residence_field == true">
                                <div class="">                                
                                    <div class="row" style="padding: 5px 60px ">
                                            <div class="col">
                                            <div class="form-group">
                                                    <label><b>home town :</b></label>
                                                    <input type="text" class="form-control"  placeholder="e.g Nakuru,Nairobi" autofocus>
                                            </div>
                                            <div class="form-group">
                                                    <label><b>road :</b></label>
                                                    <input type="text" class="form-control"  placeholder="e.g Mombasa road" autofocus>
                                            </div>
                                            <div class="form-group">
                                                    <label><b>street / drive :</b></label>
                                                    <input type="text" class="form-control"  placeholder="e.g lumumba drive" autofocus>
                                            </div>
                                            <div class="form-group">
                                                    <label><b>estate / area name :</b></label>
                                                    <input type="text" class="form-control"  placeholder="e.g Kamkunji,Kaloleni" autofocus>
                                            </div>
                                            <div class="form-group">
                                                    <label for="exampleFormControlTextarea1"><b>description</b></label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                  </div>
                                            </div>
                                    </div>                            
                                </div>
                            </div>
                        <hr v-if = "residence_field == true">
                    <div style="padding: 0px 0px 25px 0px">
                            <a href="#add-member" v-on:click = "addMember()" style="text-decoration: none" >
                                <div class="add-button">
                                    {{add_member_button_text}}
                                </div>
                            </a>
                    </div>
              </div>
              <div class = "col-3">
              <div class="card border-0" style="max-width: 18rem;">
                        <div class="card-header border-0">recents</div>
                        <div class="card-body">
                                <div v-if = "added_member.length">
                                <div class="alert alert-primary" role="alert" v-for = "data in added_member">
                                        <div >
                                                {{data.member.first_name}} {{data.member.last_name}} -- added
                                        </div>
                                </div>
                                </div>
                                <div class="alert alert-primary" role="alert" v-if = "! added_member.length">
                                        <div >
                                                None added
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
import axios from 'axios'
export default {
  name: 'memberAdd',
  data () {
    return {
        names_field: true,
        roles_field: false,
        age_field: false,
        marital_field:false,
        contact_field:false,
        residence_field:false,
        email: '',
        first_name: '',first_name_errors: [],
        last_name: '',last_name_errors: [],
        gender_male: false, gender_female: false,gender_errors: [],
        added_member: [],add_member_button_text: "+ add member",
        add_member_error: []
    }
  },
  created() {

    this.fetchData()

  },
  watch: {
        first_name: function (){
                if (this.first_name.length > 0){
                        this.add_member_button_text = "+ add member"
                }
        }
  },
  methods: {
    resetForm() {

    },
    addMember: function(){
        this.first_name_errors = []
        this.last_name_errors = []
        this.gender_errors = []
        var gender
        if (this.gender_male ){
                gender = "M"
        }
        if (this.gender_female){
                gender = "F"
        }
        if (! this.first_name){
                this.first_name_errors.push('you must have a first name')
                return false;
        }
        if (this.first_name.split(' ').length > 1){
                this.first_name_errors.push('first name must be one word only')
                return false;
        }
        if(! this.last_name){
                this.last_name_errors.push('you must have a last name')
                return false;
        }
        if (this.last_name.split(' ').length > 1){
                this.last_name_errors.push('last name must be one word only')
                return false;
        }
        if (! this.gender_female && ! this.gender_male){
                this.gender_errors.push('select gender')
                return false;
        }
        this.$http({
                method: 'post',
                url: this.$BASE_URL + '/api/members/add-member/',
                data: {
                  first_name: this.first_name,
                  last_name: this.last_name,
                  gender: gender,
                  email: this.email         
                }
              }).then(response => {
                this.added_member.push(response.data )  
                this.add_member_button_text = " added successfully"  

                this.gender_male = false
                this.gender_female = false
                this.last_name = ''
                this.first_name = ''
                })
                .catch((err) => {
                 this.add_member_error.push(err)
                })
    }
    
}
}
</script>


<style >
</style>
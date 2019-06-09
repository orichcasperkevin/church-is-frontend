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
                                <label><input type="checkbox" :value= true v-model = "contact_field"> contact </label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" :value= true v-model = "age_field"> age</label>
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
                                <div class="row">
                                        <span class="col">
                                                <label><b>birth year :</b></label>
                                                <input type="number" class="form-control" v-model="year">
                                        </span>
                                        <span class="col">
                                                <label><b>birth month :</b></label>
                                                <input type="number" class="form-control" v-model="month">
                                        </span>
                                        <span class="col">
                                                <label><b>birth day :</b></label>
                                                <input type="number" class="form-control" v-model="day">
                                        </span>
                                </div>
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
                                                <div class="row">
                                                        <span class="col">
                                                                <label><b>country code :</b></label>
                                                                <input class="form-control" type="text" placeholder="+254" v-model = "country_code">
                                                        </span>
                                                        <span class="col">
                                                                <label><b>number :</b></label>
                                                                <input type="text" class="form-control"  placeholder="712345678" v-model = "phone_number">
                                                        </span>
                                                </div>
                                                <p v-if="phone_number_errors.length">
                                                        <ul>
                                                                <small><li v-for="error in phone_number_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                        </ul>
                                                </p>
                                                <p v-if="phone_number_OK.length">
                                                        <ul>
                                                                <small><li v-for="error in phone_number_OK"><p class="text-success">{{ error }}</p></li></small>
                                                        </ul>
                                                </p>
                                        </div>
                                        <div class="form-group">
                                                <label><b>postal address :</b></label>
                                                <input type="text" class="form-control"  placeholder="123-456" v-model="postal_address">
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
        country_code: '+254',
        first_name: '',first_name_errors: [],
        last_name: '',last_name_errors: [],
        gender_male: false, gender_female: false,gender_errors: [],
        added_member: [],add_member_button_text: "+ add member",
        add_member_error: [],
        added_member_id: null,
        phone_number: '',phone_number_errors: [],phone_number_OK: [],
        contact: ' ',postal_address: '',
        day: null,month: null,year: null,date_errors: []
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
        },
        phone_number: function(){
                if (this.phone_number.isNaN){
                        this.phone_number_errors = []
                        this.phone_number_errors.push(" phone number should be numbers only")
                }
                if (this.phone_number.length > 9){
                        this.phone_number_OK = []
                        this.phone_number_errors = []
                        this.phone_number_errors.push("number too long")
                }
                if (this.phone_number.length < 9){
                        this.phone_number_OK = []
                        this.phone_number_errors = []
                        this.phone_number_errors.push("number too short")
                }
                if (this.phone_number.length == 9){
                        this.phone_number_errors = []
                        this.phone_number_OK.push(" number OK")
                }
        },
        day: function (){
                if (this.month == 0){
                        this.date_errors = []
                        this.date_errors.push("input month first")
                }
                if (this.day > 0 && this.day > 30){
                        this.date_errors = []
                        this.date_errors.push("day must between 1 & 30")
                }
        },
        month: function (){
                if (this.year == 0){
                        this.date_errors = []
                        this.date_errors.push("input year first")
                }
                if (this.month > 0 && this.month > 12){
                        this.month
                }
        },
        year: function (){

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
                this.added_member_id = this.added_member[0].member.id
                if (this.phone_number_OK.length > 0){
                this.$http({
                        method:'post',
                        url: this.$BASE_URL + '/api/members/add-member-contact/',
                        data: {
                                member_id: this.added_member_id,
                                postal_address: this.postal_address,
                                phone: this.country_code + this.phone_number,
                                contact: this.contact
                        }
                })
                
                }
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
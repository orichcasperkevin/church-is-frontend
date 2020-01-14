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
                    </div>  
              </div>
              <div class="col-12 col-sm-12 col-lg-8">
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
                                                <label><input type="radio" value = "M" v-model = "gender" > male</label>
                                        </div>
                                        <div class="radio">
                                                 <label><input type="radio" value = "F" v-model = "gender"> female</label>
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
                                min="1000-01-01" class="form-control" v-model="d_o_b"> 
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
                                                <label>
                                                        <input type="radio" name="optradio" value="S" v-model="marital_status"> single</label>
                                              </div>
                                              <div class="radio">
                                                <label><input type="radio" name="optradio" value="M" v-model="marital_status"> married</label>
                                              </div>
                                              <div class="radio">
                                                <label><input type="radio" name="optradio" value="D" v-model="marital_status"> divorced</label>
                                              </div>
                                              <div class="radio">
                                                    <label><input type="radio" name="optradio" value="W" v-model="marital_status"> widowed</label>
                                             </div>
                                </div>
                        </div>
                    </div>
                </div>
                <hr v-if = "marital_field == true"/>         
        
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
                                                        <span class="col-4">
                                                                <label><b>code :</b></label>
                                                                <input class="form-control" type="text" placeholder="+254" v-model = "country_code">
                                                        </span>
                                                        <span class="col-8">
                                                                <label><b>phone number :</b></label>
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
                                                    <input type="text" class="form-control"  placeholder="e.g Nakuru,Nairobi" v-model="home_town">
                                            </div>
                                            <div class="form-group">
                                                    <label><b>road :</b></label>
                                                    <input type="text" class="form-control"  placeholder="e.g Mombasa road" v-model="road">
                                            </div>
                                            <div class="form-group">
                                                    <label><b>street / drive :</b></label>
                                                    <input type="text" class="form-control"  placeholder="e.g lumumba drive" v-model="street">
                                            </div>
                                            <div class="form-group">
                                                    <label><b>estate / area name :</b></label>
                                                    <input type="text" class="form-control"  placeholder="e.g Kamkunji,Kaloleni" v-model="estate">
                                            </div>
                                            <div class="form-group">
                                                    <label for="exampleFormControlTextarea1"><b>description</b></label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
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
                                    <span v-if="adding_member"
                                          class="spinner-border spinner-border-sm" 
                                          role="status" 
                                          aria-hidden="true"></span>
                                </div>
                            </a>
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
        //select fields you can see
        names_field: true,
        roles_field: false,
        age_field: false,
        marital_field:false,
        contact_field:false,
        residence_field:false,
        //contact
        email: '',
        country_code: '+254',
        contact: ' ',postal_address: '',
        phone_number: '',phone_number_errors: [],phone_number_OK: [],
        //names and gender
        first_name: '',first_name_errors: [],
        last_name: '',last_name_errors: [],
        gender: '',gender_errors: [],
        added_member: [],add_member_button_text: "+ add member",
        add_member_error: [],
        added_member_id: null,        
        //date of birth        
        d_o_b: '',
        //residence
        home_town: '', road: '', street: '',
        estate: '', description: '',
        //marital status
        marital_status: '',
        //add member
        adding_member: false        
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

        if (! this.first_name){
                this.first_name_errors.push('you must enter the first name')
                return false;
        }
        if (this.first_name.split(' ').length > 1){
                this.first_name_errors.push('first name must be one word only')
                return false;
        }
        if(! this.last_name){
                this.last_name_errors.push('you must enter a last name')
                return false;
        }
        if (this.last_name.split(' ').length > 1){
                this.last_name_errors.push('last name must be one word only')
                return false;
        }
        if (! this.gender ){
                this.gender_errors.push('select gender')
                return false;
        }
        this.adding_member = true
        this.$http({
                method: 'post',
                url: this.$BASE_URL + '/api/members/add-member/',
                data: {
                  first_name: this.first_name,
                  last_name: this.last_name,
                  gender: this.gender,
                  email: this.email         
                }
              }).then(response => {                
                this.added_member.push(response.data )  
                this.added_member_id = this.added_member[0].member.id  
                alert("member added succesfully")  
                var new_version = parseInt(localStorage.getItem('member_list_version')) + 1
                this.$store.dispatch('update_member_list_version', new_version)

                this.addOtherDetails()                
                this.gender_male = false
                this.gender_female = false
                this.last_name = ''
                this.first_name = ''   
                this.added_member_id = null                                            
                this.adding_member = false
                })
                .catch((err) => {
                 this.add_member_error.push(err)
                })
        
    },
    addContact: function(){
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
    },
    addDateOfBirth: function(){
        this.$http({
                method:'post',
                url: this.$BASE_URL + '/api/members/add-member-d_o_b/',
                data: {
                        member_id: this.added_member_id,
                        d_o_b: this.d_o_b                        
                }
        })
    },
    addMaritalStatus: function(){
        this.$http({
                method:'post',
                url: this.$BASE_URL + '/api/members/add-member-marital-status/',
                data: {
                        member_id: this.added_member_id,
                        status: this.marital_status                      
                }
        })
    },
    addResidence: function(){
        this.$http({
                method:'post',
                url: this.$BASE_URL + '/api/members/add-member-contact/',
                data: {
                        member_id: this.added_member_id,
                        town: this.home_town,
                        road: this.road,
                        street: this.street,
                        description: this.description
                }
        }) 
    },
    addOtherDetails: function(){
        if (this.phone_number_OK.length > 0){
                this.addContact()                
        } 
        if (this.d_o_b.length > 0){
                this.addDateOfBirth()  
        }
        if (this.marital_status.length > 0){
                this.addMaritalStatus()
        }
        if (this.home_town.length > 0
                || this.road.length > 0
                || this.street.length > 0
                || this.estate.length > 0
                || this.description > 0){
                        this.addResidence()
                }
    }
    
}
}
</script>


<style >
</style>
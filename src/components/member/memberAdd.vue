<template>
    <div class="memberAdd">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name: 'Home'}">Home</router-link> 
                <li class="breadcrumb-item"><router-link :to="{name: 'memberList'}">members</router-link> 
                <li class="breadcrumb-item active" aria-current="page">add member</li>
            </ol>
    </nav>
    <div class="container">
            <div class="row">
              <div class="col-3">
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
              <div class="col-6">
                <hr/>
                <div class="mx-auto">
                    <div class="row" style="padding: 5px 60px ">
                        <div class="col">
                        <div class="form-group">
                                <label><b>first name :</b></label>
                                <input type="text" class="form-control"  placeholder="first name" v-model="first_name" autofocus>
                        </div>
                        <div class="form-group">
                                <label><b>last name :</b></label>
                                <input type="text" class="form-control"  placeholder="last name" v-model="last_name" autofocus>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="mx-auto">
                    <div class="">
                        <div class="row" style="padding: 5px 60px ">
                                <div class="checkbox col">
                                        <div class="radio">
                                                <label><input type="radio" :value = "M" v-model = "gender" > male</label>
                                              </div>
                                              <div class="radio">
                                                <label><input type="radio" :value = "F" v-model = "gender"> female</label>
                                              </div>
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
                            <a href="#add-member" v-on:click = "addMember()"  >
                                <div class="add-button">
                                    + Add member
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
  name: 'memberAdd',
  data () {
    return {
        names_field: true,
        roles_field: false,
        age_field: false,
        marital_field:false,
        contact_field:false,
        residence_field:false,
        first_name: '',
        last_name: '',
        email: ''
    }
  },
  created() {

    this.fetchData()

  },
  methods: {
    fetchData() {
      
    }
}
}
</script>


<style >
</style>
<template>
        <div>
            <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                        <li class="breadcrumb-item active" aria-current="page">church account</li>
                    </ol>
            </nav>
            <div class="container">
                <div class="row">
                    <div class="col-1">

                    </div>
                    <div class="col-11" v-if="client_detail_available">
                        <div class="row">
                            <div class="col">
                                <h3>{{client_details[0].client.name}}</h3>
                                <h6 class="card-subtitle mb-2">
                                        church code
                                        <span class="badge badge-light text-info">
                                          <h5>{{client_details[0].church_code}}</h5></span>                       
                                </h6>
                            </div>
                            <div class="col">
                                    <button disabled type="button" class="btn btn-success">
                                            credit <span class="badge badge-light">
                                               {{client_details[0].credit}}
                                            </span>
                                        </button>
            
                                         <p><i> apprx {{client_details[0].apprx_number_of_days_left}} days left</i></p>
                            </div>
                        </div>                                               
                        <div class="row">
                                <div class="row col text-left mt-2">
                                        <div class="mb-2 ml-3 text-center text-muted col-lg-2 col-sm-12 border border-secondary rounded">
                                            <h1>{{client_details[0].number_of_members}} </h1>
                                            members
                                        </div> 
                                        <div class="mb-2 ml-3 text-center text-muted col-lg-2 col-sm-12 border border-secondary rounded">
                                                <h1>{{client_details[0].number_of_sms}}</h1>
                                                sms since last credit
                                        </div> 
                                        <div class="mv-2 ml-3 text-center text-muted col-lg-2 col-sm-12 border border-secondary rounded">
                                                <h1>{{client_details[0].sms_quota}}</h1>
                                                free sms left
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
        name: 'myAccount',
        data () {
            return{
                client_detail_available :false,
                client_details : null
            }
        },
        created () {
           this.getClientDetail() 
        },
        methods: {
            getClientDetail: function(){
            this.client_detail_available = true
            var church_id = localStorage.getItem('church_id')
            this.$http.get(this.$BASE_URL + '/api/clients/client-detail/' + church_id +'/')
                .then(response => {
                this.client_details = response.data                                          
                
                })
                .catch((err) => {
                this.login_error.push("church code not set")        
                })
            }
        }
    }
    </script>
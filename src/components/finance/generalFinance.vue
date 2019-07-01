<template>
    <div>
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                    <li class="breadcrumb-item active" aria-current="page">finances</li>
                </ol>
        </nav>
        <div class = "container">
            <div class = "row">
                <div class="filters col-12 col-sm-8 col-md-8 col-lg-2" style="padding: 3px 3px 3px 3px">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-income-tab" data-toggle="pill" href="#v-pills-income" role="tab" aria-controls="v-pills-income" aria-selected="true">
                                        <img style="width: 20%; height: auto" src="@/assets/icons/icons8-request-money-filled-50.png">
                                        income
                                </a>
                                <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" data-toggle="pill" href="#v-pills-expenditure" role="tab" aria-controls="v-pills-expenditure" aria-selected="false" v-on:click="getExpenditures()">
                                        <img style="width: 20%; height: auto" src="@/assets/icons/icons8-receipt-filled-50.png">
                                        expenditure  
                                </a>  
                                <router-link class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" :to="{name: 'projectList'}">
                                    <img style="width: 20%; height: auto" src="@/assets/icons/icons8-group-of-projects-filled-50.png">
                                    projects  
                                </router-link>
                            </div>
                </div>
                <div class = "col">
                    <div class="tab-content" id="v-pills-tabContent">
                       
                        <div class="tab-pane fade show active" id="v-pills-income" role="tabpanel" aria-labelledby="v-pills-income-tab">
                                <div class="container">
                                        <div class="row">
                                          <div class="col-2">                                            
                                          </div>
                                          <div class="col-8">
                                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                        <li class="nav-item">
                                                          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" v-on:click = "getTithes()">Tithes</a>
                                                        </li>
                                                        <li class="nav-item">
                                                          <a class="nav-link" id="pills-offerings-tab" data-toggle="pill" href="#pills-offerings" role="tab" aria-controls="pills-offerings" aria-selected="false" v-on:click = "getOfferings()">Offerings</a>
                                                        </li>
                                                        <li class="nav-item">
                                                          <a class="nav-link" id="pills-anyOther-tab" data-toggle="pill" href="#pills-anyOther" role="tab" aria-controls="pills-anyOther" aria-selected="false" v-on:click = "getAnyOther()">Others</a>
                                                        </li>
                                                </ul>
                                          </div>
                                          <div class="col-2">                                            
                                          </div>
                                        </div>
                                      </div>                                                       
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">                                          
                                            <h3>tithes</h3>                                            
                                            <div class="home-menu-item">
                                                    <div class="row" v-if = "tithes_selected"> 
                                                            <div class=" col-6 card-text" style=" padding: 5px">
                                                                    <small class="text-muted">total this month-</small>                                                                
                                                                    <h3 class="text-info">KSh {{humanize(tithe_stats.response.total_in_tithe_this_month)}}</h3>
                                                            </div>    
                                                            <div class=" col-6 card-text" style=" padding: 5px">
                                                                    <small class="text-muted">total this year-</small>                                                                
                                                                    <h3 class="text-info">KSh {{humanize(tithe_stats.response.total_in_tithe_this_year)}}</h3>
                                                            </div>                                                                                                                 
                                                    </div>                                  
                                            </div> 
                                            <hr/>
                                            <p>
                                                <span class="badge badge-pill badge-info">{{foundTithes}}</span> entries found
                                            </p>                             
                                            <div>                                                
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>name</th>
                                                            <th>amount</th>
                                                            <th>date</th>
                                                            <th>total this month</th>
                                                            <th>total this year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for = "data in tithes.response">
                                                            <td>{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                            <td><p class="text-success">{{humanize(data.amount)}}</p></td>
                                                            <td>{{data.date}}</td>
                                                            <td><p class="text-info">{{humanize(data.total_this_month)}}</p></td>
                                                            <td><p class="text-secondary">{{humanize(data.total_this_year)}}</p></td>                                                          
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-offerings" role="tabpanel" aria-labelledby="pills-offerings-tab">                                                                                  
                                            <div v-if = "offerings_selected">
                                                <h3 >offerings</h3>
                                                <div class="home-menu-item">

                                                        <div class="row" v-if = "offerings_selected">
                                                                <div class=" col-6 card-text" style=" padding: 5px">
                                                                        <small class="text-muted">total this month-</small>                                                                
                                                                        <h3 class="text-info">KSh {{humanize(offering_stats.response.total_in_offerings_this_month)}}</h3>
                                                                </div>                                                                
                                                                <div class=" col-6 card-text" style=" padding: 5px">
                                                                        <small class="text-muted">total this year-</small>                                                                
                                                                        <h3 class="text-info">KSh {{humanize(offering_stats.response.total_in_offerings_this_year)}}</h3>
                                                                </div>
                                                        </div>                                                                                      
                                                </div>
                                                <hr/>
                                                <p class="col-8">
                                                        <span class="badge badge-pill badge-info">{{foundOfferings}}</span> entries found
                                                </p>
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>name</th>
                                                            <th>amount</th>
                                                            <th>date</th>
                                                            <th>total this month</th>
                                                            <th>total this year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for = "data in offerings.response">
                                                            <td v-if = "data.member != null">{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                            <td v-if = "data.name_if_not_member != null"><span class="text-info">(N.M)</span> {{data.name_if_not_member}}</td>
                                                            <td><p class="text-success">{{humanize(data.amount)}}</p></td>
                                                            <td>{{data.date}}</td>
                                                            <td><p class="text-info">{{humanize(data.total_this_month)}}</p></td>
                                                            <td><p class="text-secondary">{{humanize(data.total_this_year)}}</p></td>                                                          
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-anyOther" role="tabpanel" aria-labelledby="pills-anyOther-tab">                                        
                                            <div v-if = "any_other_selected">
                                                    <h3 class="breadcrumb-item active">others</h3>
                                                    <div class="home-menu-item">
                                                        
                                                            <div class="row" v-if = "any_other_selected">
                                                                    <div class=" col-6 card-text" style=" padding: 5px">
                                                                            <small class="text-muted">this month</small>                                                                
                                                                            <h3 class="text-info">KSh {{humanize(income_stats.response.total_this_month)}}</h3>
                                                                    </div>  
                                                                    <div class=" col-6 card-text" style=" padding: 5px">
                                                                            <small class="text-muted">total this year</small>                                                                
                                                                            <h3 class="text-info">KSh {{humanize(income_stats.response.total_this_year)}}</h3>
                                                                    </div>                                                                  
                                                            </div>                                   
                                                    </div>
                                                    <hr/>
                                                    <p class="col-8">
                                                            <span class="badge badge-pill badge-info">{{foundIncomes}}</span> types found
                                                    </p>
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>type</th>                                                                
                                                                <th>total this month</th>
                                                                <th>total this year</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for = "data in incomes.response">
                                                                <td>
                                                                    <router-link class="text-secondary" style="text-decoration: none;"  :to="`/income/`+ data.id + `/`">                                                         
                                                                        {{data.type_name}}
                                                                    </router-link>
                                                                </td>                                                               
                                                                <td><p class="text-info">{{humanize(data.total_this_month)}}</p></td>
                                                                <td><p class="text-secondary">{{humanize(data.total_this_year)}}</p></td>                                                          
                                                                <td>
                                                                    <router-link class="text-muted" style="text-decoration: none;"  :to="`/income/`+ data.id + `/`">                                                         
                                                                        >
                                                                    </router-link>
                                                                </td>                                                                
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                    </div>
                                </div>
                        </div>
                        <div class="tab-pane fade show " id="v-pills-expenditure" role="tabpanel" aria-labelledby="v-pills-expenditure-tab">
                            <p class="text-info"> feature still under development</p>
                        </div>
                    </div>
                </div>
                <div class = "col-12 col-sm-10 col-md-8 col-lg-3">
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "tithes_selected">
                            <a href="#" data-toggle="modal" data-target="#addTithe" style="text-decoration: none">
                                <div class="add-button" style="text-align: center">
                                    <b>+</b> add tithe 
                                </div>                                
                            </a>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addOffering"><b>+</b> add offering</a>
                            </div>
                    </div>
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "offerings_selected">
                            <a href="#" data-toggle="modal" data-target="#addOffering" style="text-decoration: none">
                                <div class="add-button">
                                    <b>+</b> add offering
                                </div>
                            </a>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                    <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addTithe"><b>+</b> add tithe</a>
                            </div>
                    </div>
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "any_other_selected">
                            <a href="#" data-toggle="modal" data-target="#addIncomeType" style="text-decoration: none">
                                <div class="add-button">
                                    <b>+</b> add income type
                                </div>
                            </a>
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                    <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">                            
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addIncome"><b>+</b> add income</a>                                                                
                            </div>
                    </div>
                </div>
            </div>
                <!-- add tithe modal -->
                <div class="modal fade" id="addTithe" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add tithe for member</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="added_tithe.length > 0">
                                        <strong>
                                            <span v-for="data in added_tithe">
                                                tithe of amount {{data.amount}} added for {{data.member.member.first_name }}
                                            </span>
                                        </strong> 
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div v-if="add_tithe_errors.length > 0">
                                        <ul>
                                                <small>
                                                    <li v-for="error in add_tithe_errors">
                                                        <p class="text-danger">{{ error }}</p>
                                                    </li>
                                                </small>
                                        </ul>
                                    </div>
                                    <form>                                            
                                            <div class=" row form-group">
                                                <label class="col-3"><b>member:</b></label>
                                                <div class="col-8">
                                                    <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch" autofocus>   
                                                    <div style="padding: 10px 10px 10px 10px" class="text-info" >{{memberSearch_status}}</div> 

                                                    <div class="pre-scrollable searchedItemsDiv border " style="  max-height: 185px; overflow-y: scroll;" v-if="showMemberInput">
                                                            <table class="table border-0" >
                                                                <tbody>
                                                                <tr class="searchedItem border-0" v-for="data in found_members.response">
                                                                    <a href="#" style="text-decoration: none" v-on:click="selectMember(data.member.id,data.member.first_name,data.member.last_name)"> 
                                                                    <td class="border-0">
                                                                    
                                                                        <img v-if = "data.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                                                        <img v-if = "data.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                                                                        <img v-if = "data.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                                                                        
                                                                        <span class = "text-secondary">{{data.member.first_name}} {{data.member.last_name}}</span>                                                                      
                                                                    </td>
                                                                    </a>                                                                                                                                  
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div> 
                                                        <div v-if="tithe_member_error.length > 0">
                                                            <ul>
                                                                    <small>
                                                                        <li v-for="error in tithe_member_error">
                                                                            <p class="text-danger">{{ error }}</p>
                                                                        </li>
                                                                    </small>
                                                            </ul>
                                                        </div>                                                   
                                                </div>                                           
                                                
                                            </div>
                                                                                  
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>
                                                    <input type="number" class=" col-3 form-control" placeholder="amount" v-model="tithe_amount">
                                                    <div class="col-6 text-success" v-if ="tithe_amount > 0"><h3>KSh {{humanize(tithe_amount)}}</h3></div>                                                                               
                                            </div>  
                                            <div v-if="tithe_amount_error.length > 0">
                                                <ul>
                                                        <small>
                                                            <li v-for="error in tithe_amount_error">
                                                                <p class="text-danger">{{ error }}</p>
                                                            </li>
                                                        </small>
                                                </ul>
                                            </div> 
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>narration:</b></label>
                                                    <textarea type="text" class="col-8 form-control" rows='3' v-model="tithe_narration"></textarea>                                                   
                                            </div>                                                                                
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchdata()">Close</button>
                            <button type="button" class="btn btn-success" disabled v-if= "! enable_add_tithe_button && add_tithe_button_text != 'adding tithe...'">{{add_tithe_button_text}}</button>
                            <button type="button" class="btn btn-success" v-on:click="addTithe()">{{add_tithe_button_text}}</button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- add offering -->
                <div class="modal fade" id="addOffering" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add offering</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="added_offering.length > 0">
                                            <strong>offering added successfully</strong> 
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                          </div>
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> offering from non-member </label>                                                            
                                                    </div>                                                    
                                            </div>
                                            <hr/>

                                            <div class=" row form-group" v-if="! non_member">
                                                <label class="col-3"><b>member:</b></label>
                                                <div class="col-8">
                                                    <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch" autofocus>   
                                                    <div style="padding: 10px 10px 10px 10px" class="text-info" >{{memberSearch_status}}</div> 

                                                    <div class="pre-scrollable searchedItemsDiv border " style="  max-height: 185px; overflow-y: scroll;" v-if="showMemberInput">
                                                            <table class="table border-0" >
                                                                <tbody>
                                                                <tr class="searchedItem border-0" v-for="data in found_members.response">
                                                                    <a href="#" style="text-decoration: none" v-on:click="selectMember(data.member.id,data.member.first_name,data.member.last_name)"> 
                                                                    <td class="border-0">
                                                                    
                                                                        <img v-if = "data.gender == 'M'" style = "height: 32px "src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                                                        <img v-if = "data.gender == 'F'" style = "height: 32px "src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                                                                        <img v-if = "data.gender == 'R'" style = "height: 32px "src="@/assets/avatars/icons8-contacts-96.png">
                                                                        
                                                                        <span class = "text-secondary">{{data.member.first_name}} {{data.member.last_name}}</span>                                                                      
                                                                    </td>
                                                                    </a>                                                                                                                                  
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>  
                                                        <p v-if="selected_member_errors.length">
                                                            <ul>
                                                                    <small><li v-for="error in selected_member_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                            </ul>
                                                        </p>                                                  
                                                </div>                                           
                                                
                                            </div>
                                
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>names:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of the source of offering" v-model="name_if_not_member">                                        
                                                    <p v-if="name_if_not_member_errors.length">
                                                        <ul>
                                                                <small><li v-for="error in name_if_not_member_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                        </ul>
                                                    </p> 
                                            </div>
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>phone:</b></label>                                                    
                                                    <div class="col-8">
                                                            <div class="row">
                                                                    <span class="col-4">
                                                                            <label><b>code :</b></label>
                                                                            <input class="form-control" type="text" placeholder="+254" v-model = "country_code">
                                                                    </span>
                                                                    <span class="col-8">
                                                                            <label><b>number :</b></label>
                                                                            <input type="text" class="form-control"  placeholder="712345678" v-model = "phone_number">
                                                                    </span>
                                                                    <div style="padding: 5px">
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
                                                            </div> 
                                                    </div>                                                                                                                                         
                                            </div>                                                    
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>
                                                    <input type="number" class=" col-3 form-control" placeholder="amount" v-model="offering_amount">
                                                    <div class="col-6 text-success" v-if ="offering_amount > 0"><h3>KSh {{humanize(offering_amount)}}</h3></div>
                                                    <p v-if="offering_amount_errors.length">
                                                        <ul>
                                                                <small><li v-for="error in offering_amount_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                        </ul>
                                                    </p> 
                                            </div>
                                            <hr/>
                                            <div class="form-group">
                                                    <div class="row">
                                                            <label class="col-3 "><b>date</b></label>
                                                            <div class="input-group form-group col-5" style="padding: 0px" >
                                                                <input type="date" name="bday" max="3000-12-31" 
                                                                       min="1000-01-01" class="form-control" v-model="offering_date">                                                                                                                      
                                                            </div>
                                                            <p v-if="offering_date_errors.length">
                                                                <ul>
                                                                        <small><li v-for="error in offering_date_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                                </ul>
                                                            </p>
                                                    </div>
                                            </div>
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>narration:</b></label>
                                                    <textarea type="text" class="col-8 form-control" rows='3' v-model="offering_narration"></textarea>                                                   
                                            </div>                                                                                     
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="getOfferings()">Close</button>
                            <button type="button" class="btn btn-success" v-on:click="addOffering()"><b>+</b> add offering</button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- add income modal -->
                <div class="modal fade" id="addIncome" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add income</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body"> 
                                <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if ="added_income.length > 0">
                                        <strong>
                                            <span v-for="data in added_income">
                                                income of type {{data.type.type_name}} and amount {{humanize(data.amount)}} succesfuly added
                                            </span>
                                        </strong> 
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>                               
                                <form>                                            
                                        <div class=" row form-group">
                                            <label class="col-3"><b>type:</b></label>                                                                                                                                   
                                            <select class="col-8 form-control" v-model="income_type" >
                                                <option v-for="data in income_types.response" :value="data.id" >{{data.type_name}}</option>
                                            </select>   
                                            <p v-if="income_type_errors.length">
                                                <ul>
                                                        <small><li v-for="error in income_type_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                            </p>                                       
                                        </div>                                                                                
                                        <hr/>
                                        <div class="row form-group">
                                                <label class="col-3"><b>amount:</b></label>
                                                <input type="number" class=" col-3 form-control" placeholder="amount" v-model="income_amount">
                                                <div class="col-6 text-success" v-if ="income_amount > 0"><h3>KSh {{humanize(income_amount)}}</h3></div>                                               
                                                <p v-if="income_amount_errors.length">
                                                    <ul>
                                                            <small><li v-for="error in income_amount_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                    </ul>
                                                </p> 
                                        </div>
                                        <hr/>   
                                        <div class="row form-group">
                                            <label class="col-3"><b>narration:</b></label>
                                            <textarea type="text" class="col-8 form-control" rows='3' v-model="income_narration"></textarea>                                                   
                                        </div>                                                                                
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" v-on:click="addIncome()"><b>+</b> add income</button>
                        </div>
                    </div>
                    </div>
            </div>
            <!-- add income type modal -->
            <div class="modal fade" id="addIncomeType" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">add income type</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="added_income_type.length">
                                <strong>
                                    <span v-for="data in added_income_type">income of type {{data.type_name}} was added sucessfully</span>
                                </strong> 
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>                                            
                                    <div class="row form-group">
                                            <label class="col-3"><b>name:</b></label>
                                            <input type="text" class=" col-8 form-control" placeholder="give the type a name" v-model="income_type_name">                                                    
                                            <p v-if="income_type_name_errors.length">
                                                <ul>
                                                        <small><li v-for="error in income_type_name_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                </ul>
                                            </p>
                                    </div>                                    
                                    <hr/>   
                                    <div class="row form-group">
                                        <label class="col-3"><b>describe:</b></label>
                                        <textarea type="text" class="col-8 form-control" rows='3' v-model="income_type_description"></textarea>                                                   
                                    </div>                                                                                
                            </form>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" v-on:click="addIncomeType()"><b>+</b> add income type</button>
                    </div>
                </div>
                </div>
        </div>
        </div>
    </div>
</template>

<script>
import router from "../../router";
export default {
    name: 'generalFinance',
    data () {
        return{
        //get data
            tithe_stats: null,    
            tithes: null,
            non_member: false,
            group: false,
            fetch_data_error: [],
            income_types: null,
            foundIncomes: 0,
            foundOfferings: 0,
            foundTithes: 0,
        //select tabs
            tithes_selected: false,
            offerings_selected: false,
            any_other_selected: false,
        //get stats data
            offering_stats: null,
            offerings: null,
            income_stats: null,
            incomes: null,
        //search for member
            memberSearch: '',found_members:[],
            memberSearch_status: '',selectedMember: null,
            showMemberInput: false,  
        //add_tithe
            add_tithe_button_text: '+ add tithe',
            enable_add_tithe_button: true,
            tithe_amount: null,
            tithe_narration: '',
            tithe_amount_error: [], tithe_member_error: [],
            added_tithe: [],add_tithe_errors: [],
        //add offering
            offering_amount: null,
            name_if_not_member: ''        ,
            country_code: '+254',phone_number:'',
            offering_narration: '',
            offering_year: '',offering_month: '',offering_day: '',
            offering_date: '',
            phone_number_errors: [],
            phone_number_OK: [],
            offering_amount_errors: [],selected_member_errors: [],
            name_if_not_member_errors: [], offering_date_errors: [], 
            added_offering: [],
        //add income type
            income_type_name: '',
            income_type_description: '',
            income_type_name_errors: [],
            added_income_type: [],
        //add income
            income_type: null,
            income_narration: null,
            income_type_errors: [],
            income_amount: null,
            income_amount_errors: [],
            added_income: []
        }
    },
    created () {
        this.checkLoggedIn()
        this.fetchdata()
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    watch: {
    // watch for searching for member
    memberSearch: function () {
            if (this.memberSearch.length > 0){
                this.showMemberInput = true
                this.memberSearch_status = 'searching...'
                this.debouncedGetAnswer()
            }else{
                this.memberSearch_status = ''
                this.found_members = []
                this.showMemberInput = false                
            }
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
    methods: {
        //check if member is logged in
        checkLoggedIn() {
            if (!this.$session.has("token")) {
                router.push("/login")
            }
        },
        humanize: function(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        //fetch data
        fetchdata () {
            this.tithes_selected = true
            this.fetch_data_error = []
            this.$http.get(this.$BASE_URL + '/api/finance/tithe-by-members-this-month/')
                .then(response => {
                this.tithes = {"response": response.data } 
                var array = this.tithes.response
                this.foundTithes = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get(this.$BASE_URL + '/api/finance/tithe-stats/')
                .then(response => {
                this.tithe_stats = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get(this.$BASE_URL + '/api/finance/income-type-list/')
                .then(response => {
                this.income_types = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        },
        getTithes: function(){
            this.offerings_selected = false
            this.any_other_selected = false
            this.tithes_selected = true
        },
        getOfferings: function(){
            this.tithes_selected = false
            this.any_other_selected = false
            this.offerings_selected = true
            this.$http.get(this.$BASE_URL + '/api/finance/offering-stats/')
                .then(response => {
                this.offering_stats = {"response": response.data }             
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get(this.$BASE_URL + '/api/finance/offerings-by-members-this-month/')
                .then(response => {
                this.offerings = {"response": response.data } 
                var array = this.offerings.response
                this.foundOfferings = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            
        },
        getAnyOther: function(){
            this.tithes_selected = false            
            this.offerings_selected = false
            this.any_other_selected = true
            this.$http.get(this.$BASE_URL + '/api/finance/income-stats/')
                .then(response => {
                this.income_stats = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
            this.$http.get(this.$BASE_URL + '/api/finance/income-type-list/')
                .then(response => {
                this.incomes = {"response": response.data } 
                var array = this.incomes.response
                this.foundIncomes = array.length
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        },
        //search for member
        getAnswer: function () {
          var vm = this
          if (this.memberSearch.length > 0){
            this.found_members = []
            this.memberSearch_status = 'searching...'
            this.$http.get(this.$BASE_URL + '/api/members/filter-by-first_name/' + this.memberSearch +'/')
              .then(function (response) {
                vm.found_members = {"response": response.data } 
                vm.memberSearch_status = ''                
              })
              .catch(function (error) {
                  vm.memberSearch_status = ''  
                  vm.showMemberInput = false
              })
            }
        },
        selectMember: function(id,first_name,last_name) {
        
          this.selectedMember = id          
          this.memberSearch =  first_name + ' ' + last_name 
          this.memberSearch_status = ''
          this.showMemberInput = false
        },
        //check if add tithe form is correct
        addTitheFormOK: function(){
            this.added_tithe = []
            this.tithe_member_error = []
            this.tithe_amount_error = []
            if (this.tithe_narration.length < 1){                    
                    this.tithe_narration = "none given"
            }   
            if (this.selectedMember == null){                
                this.tithe_member_error.push("No member selected, select one")
                return false
            }
            if (this.tithe_amount < 1){
                this.tithe_amount_error.push(" enter an amount")
                return false
            }
            if (this.selectedMember > 0
                && this.tithe_amount > 0){                    
                    return true
                }
        },
        addTithe: function(){
            if (this.addTitheFormOK()){
                this.enable_add_tithe_button = false
                this.add_tithe_button_text = 'adding tithe...'                
                this.$http({
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/add-tithe-for-member/',
                        data: {
                                member_id: this.selectedMember,
                                narration: this.tithe_narration,
                                recording_member_id: this.$session.get('member_id'),                             
                                amount: this.tithe_amount                                      
                        }
                        }).then(response => {                             
                               this.added_tithe.push(response.data)                                                                                                
                               this.selectedMember = null,
                               this.tithe_narration = '',
                               this.tithe_amount = ''                        
                               this.enable_add_tithe_button = true
                               this.add_tithe_button_text = '+ add tithe '
                               this.memberSearch = ''       
                               alert("tithe of amount " + response.data.amount + "\n"
                                      + "added for " + response.data.member.member.first_name)                     
                        })
                        .catch((err) => {
                               this.add_tithe_errors.push('oops, an error occured \n you may be disconnected ,check your connection and try again')
                                                            
                        })
            }
        },
        //validate offering form
        addOfferingFormOK: function(){                     
            this.offering_amount_errors = []
            this.selected_member_errors = []
            this.offering_date_errors = []
            this.name_if_not_member_errors = []

            if (this.offering_narration.length < 1){
                this.offering_narration = "none given"
            }
            if (this.phone_number.length < 1
                || this.phone_number_errors.length > 0){
                    this.phone_number = "none given"
                }
            if (! this.non_member
                && (this.selectedMember != null
                &&  this.selectedMember != '')
                && this.offering_date.length == 10
                && this.offering_amount > 0){                 
                    return true
                }
            if (this.non_member
                && this.name_if_not_member.length > 0
                && this.offering_amount > 0){
                    return true
                }
            if (this.offering_amount < 1){
                this.offering_amount_errors.push("enter an amount")
                return false
            }     
            if (! this.non_member
                && (this.selectedMember == null
                || this.selectedMember == '')){
                this.selected_member_errors.push("select member, none selected")
                return false
            }
            if (this.non_member
                && this.name_if_not_member.length < 1){
                    this.name_if_not_member_errors.push("name required")
                    return false
                }     
            if (this.offering_date.length < 1){
                this.offering_date_errors.push("date input required")
                return false
            }
            if (this.offering_date.length != 10){
                this.offering_date_errors.push("incorrect date , use format YYYY-MM-DD")
                return false
            }
        },
        //add offerring
        addOffering: function(){
            if (this.addOfferingFormOK()){
                if (this.non_member){
                    this.selectedMember = null                
                }
                if (! this.non_member){
                    this.name_if_not_member = null
                }
                this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/add-offering/',
                        data: {
                                member_id: this.selectedMember,                                
                                recording_member_id: this.$session.get('member_id'),                             
                                name_if_not_member: this.name_if_not_member,
                                date: this.offering_date,
                                anonymous: false,
                                narration: this.offering_narration,                        
                                amount: this.offering_amount                                                                   
                        }
                        }).then(response => {
                               this.added_offering.push(response.data)
                               this.offering_amount = null
                               this.offering_narration = null
                               this.name_if_not_member = ''
                               this.offering_date = ''
                               this.memberSearch = ''            
                               alert("offering succesfully added")          
                        })
                        .catch((err) => {
                                
                        })  
            }
        },
        incomeTypeFormOK: function(){  
            this.income_type_name_errors = []

            if (this.income_type_description.length < 1){
                this.income_type_description = "none given"
            }        
            if (this.income_type_name.length > 0){
                return true
            }
            if (this.income_type_name.length < 1){                
                this.income_type_name_errors.push("name required")
                return false
            }
        },
        addIncomeType: function(){        
            if (this.incomeTypeFormOK()){
                this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/income-type-list/',
                        data: {
                                type_name: this.income_type_name,                                
                                description: this.income_type_description                                                                                            
                        }
                        }).then(response => {
                               this.added_income_type.push(response.data)
                               this.income_type_name = '',
                               this.income_type_description = '' 
                               alert("income type succesfully added")  
                               this.getAnyOther()                    
                        })
                        .catch((err) => {
                                
                        }) 
            }
        },
        incomeFormOK: function(){
            this.added_income = []
            this.income_amount_errors = []
            this.income_type_errors = []

            if (this.income_type != null 
                && this.income_amount != null){
                    return true
                }
            if (this.income_type == null){
                    this.income_type_errors.push("select an income type or add one ")
                    return false
                }
            if (! this.income_amount > 0
                || this.income_amount == null){
                this.income_amount_errors.push("enter an amount")
                return false
            }
        },
        addIncome: function(){           
            if (this.incomeFormOK()){
                this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/add-income/',
                        data: {                                                               
                                recording_member_id: this.$session.get('member_id'),                             
                                income_type_id: this.income_type,                        
                                narration: this.income_narration,                        
                                amount: this.income_amount                                    
                        }
                        }).then(response => {
                            this.added_income.push(response.data)
                            this.income_type = null,
                            this.income_amount = null,
                            this.income_narration = ''
                            alert("income successfully added")   
                            this.getAnyOther()               
                        })
                        .catch((err) => {
                                
                        })
            }
        }
        
    },

}
</script>


<style >
</style>
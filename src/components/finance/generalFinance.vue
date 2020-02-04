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
                <!-- NAVIGATIONS -->                
                <div class="filters col-sm-12 col-md-8 col-lg-2" >
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-income-tab" data-toggle="pill" href="#v-pills-income" role="tab" aria-controls="v-pills-income" aria-selected="true">
                                        <img class="d-none d-lg-block d-xl-block" style="width: 20%; height: auto" src="@/assets/icons/icons8-request-money-filled-50.png">
                                        income
                                </a>
                                <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" data-toggle="pill" href="#v-pills-expenditure" role="tab" aria-controls="v-pills-expenditure" aria-selected="false" v-on:click="getExpenditures()">
                                        <img class="d-none d-lg-block d-xl-block" style="width: 20%; height: auto" src="@/assets/icons/icons8-receipt-filled-50.png">
                                        expenditure  
                                </a>  
                                <router-link class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" :to="{name: 'projectList'}">
                                    <img class="d-none d-lg-block d-xl-block" style="width: 20%; height: auto" src="@/assets/icons/icons8-group-of-projects-filled-50.png">
                                    projects  
                                </router-link>
                            </div>
                </div>
                <!-- CONTENT -->
                <div class = "col">
                    <div class="tab-content" id="v-pills-tabContent">
                       
                        <div class="tab-pane fade show active" id="v-pills-income" role="tabpanel" aria-labelledby="v-pills-income-tab">
                                <div class="container">
                                        <div class="row">
                                          <div class="col-2">                                            
                                          </div>
                                          <!-- nav pills for offerings,tithes and others -->
                                          <div class="col-sm-12 col-lg-8">
                                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                        <li class="nav-item">
                                                          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" Tithe="true" v-on:click = "getTithes()">Tithe</a>
                                                        </li>
                                                        <li class="nav-item">
                                                          <a class="nav-link" id="pills-offerings-tab" data-toggle="pill" href="#pills-offerings" role="tab" aria-controls="pills-offerings" aria-selected="false" v-on:click = "getOfferings()">Offering</a>
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
                                <!-- INCOME           -->
                                <div class="tab-content" id="pills-tabContent">                                                                      
                                    <!-- tithes -->
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">                                          
                                            <h3>Tithes </h3>
                                            <!-- when on a small device show this button --> 
                                            <div class="d-sm-block d-lg-none btn-group" style="padding: 0px 0px 25px 10px" v-if = "tithes_selected">
                                                <a href="#" data-toggle="modal" data-target="#addTithe" style="text-decoration: none">
                                                    <div class="add-button" style="text-align: center">
                                                        <b>+</b> add tithe 
                                                    </div>                                
                                                </a>
                                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                                    <span class="sr-only">Toggle Dropdown</span>
                                                </button>
                                                <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addOffering" v-on:click="getServiceTypes()"><b>+</b> add offering</a>
                                                </div>
                                            </div>        
                                            <!-- tithe stats                                     -->
                                            <div class="text-muted" v-if="tithes_selected">
                                                <p>Total this month  |<span class="text-info">
                                                    Ksh {{humanize(tithe_stats.response.total_in_tithe_this_month)}} </span>|
                                                
                                                    Total this year  |<span class="text-info">
                                                     Ksh   {{humanize(tithe_stats.response.total_in_tithe_this_year)}} </span>|                                                     
                                                </p>
                                                <p>
                                                    <a class="btn btn-sm btn-outline-info dropdown-toggle" data-toggle="collapse" href="#statsTab" role="button" aria-expanded="false" aria-controls="statsTab">
                                                        more stats
                                                    </a>
                                                </p>
                                                <div class="collapse" id="statsTab">
                                                    <div class="card card-body outline-0">
                                                        <tithestats msg="tithe stats"/>
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
                                                            <th>this month</th>
                                                            <th>this year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for = "data in tithes.response">
                                                            <td>{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                            <td><p class="text-secondary">{{humanize(data.amount)}}</p></td>
                                                            <td>{{data.date}}</td>
                                                            <td><p class="text-secondary">{{humanize(data.total_this_month)}}</p></td>
                                                            <td><p>{{humanize(data.total_this_year)}}</p></td>                                                          
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                    <!-- offerings -->
                                    <div class="tab-pane fade" id="pills-offerings" role="tabpanel" aria-labelledby="pills-offerings-tab">                                                                                  
                                        <div v-if = "offerings_selected">
                                            <!-- offerings -->
                                            <h3 >Offering</h3>
                                            <!-- what to show on small devices -->
                                            <div class="d-sm-block d-md-none d-lg-none btn-group" v-if = "offerings_selected">
                                                    <a href="#" data-toggle="modal" data-target="#addOffering" style="text-decoration: none" v-on:click="getServiceTypes()">
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
                                            <div class="text-muted" v-if="offerings_selected">
                                                    <p>Total this month  |<span class="text-info">
                                                        Ksh {{humanize(offering_stats.response.total_in_offerings_this_month)}} </span>|
                                                    
                                                        Total this year  |<span class="text-info">
                                                            Ksh   {{humanize(offering_stats.response.total_in_offerings_this_year)}} </span>|
                                                    </p>
                                                    <a class="btn btn-sm btn-outline-info dropdown-toggle" data-toggle="collapse" href="#statsTab" role="button" aria-expanded="false" aria-controls="statsTab">
                                                            more stats
                                                    </a>
                                                    </p>
                                                    <div class="collapse" id="statsTab">
                                                        <div class="card card-body outline-0">
                                                            <offeringstats msg="offering stats"/>
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
                                                        <th>this month</th>
                                                        <th>this year</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for = "data in offerings.response">
                                                        <td v-if = "data.member != null">{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                        <td v-if = "data.service != null"> {{data.service.type.name}}</td>
                                                        <td><p class="text-secondary">{{humanize(data.amount)}}</p></td>
                                                        <td v-if = "data.member != null">{{data.date}}</td>
                                                        <td v-if = "data.service != null"> {{data.service.date}}</td>
                                                        <td><p class="text-secondary">{{humanize(data.total_this_month)}}</p></td>
                                                        <td><p>{{humanize(data.total_this_year)}}</p></td>                                                          
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!-- others -->
                                    <div class="tab-pane fade" id="pills-anyOther" role="tabpanel" aria-labelledby="pills-anyOther-tab">                                        
                                            <div v-if = "any_other_selected">
                                                    <h3>Others</h3>
                                                    <!-- what to show on small devices -->
                                                    <div class="d-sm-block d-md-none d-lg-none btn-group" v-if = "any_other_selected">
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
                                                    <div class="small text-muted" v-if="any_other_selected">
                                                            <p>Total this month  |<span class="text-info">
                                                                Ksh {{humanize(income_stats.response.total_this_month)}} </span>|
                                                            
                                                                Total this year  |<span class="text-info">
                                                                 Ksh   {{humanize(income_stats.response.total_this_year)}} </span>|
                                                            </p>
                                                            <a class="btn btn-sm btn-outline-info dropdown-toggle" data-toggle="collapse" href="#statsTab" role="button" aria-expanded="false" aria-controls="statsTab">
                                                                    more stats
                                                            </a>
                                                            </p>
                                                            <div class="collapse" id="statsTab">
                                                                <div class="card card-body outline-0">
                                                                    <incomestats msg="income stats"/>
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
                                                                <th>this month</th>
                                                                <th>this year</th>
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
                                                                <td><p>{{humanize(data.total_this_month)}}</p></td>
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
                        <!-- EXPENDITURE -->
                        <div class="tab-pane fade show " id="v-pills-expenditure" role="tabpanel" aria-labelledby="v-pills-expenditure-tab">
                            <div v-if = "expenditures_selected">
                                <h3 >Expenditure</h3> 
                                <!-- what to show on small devices -->
                                <div class="d-sm-block d-md-none d-lg-none btn-group"  v-if = "expenditures_selected">
                                        <a href="#" data-toggle="modal" data-target="#addExpenditureType" style="text-decoration: none">
                                            <div class="add-button">
                                                <b>+</b> add expenditure type
                                            </div>
                                        </a>                     
                                </div>                               
                                <div class="small text-muted">
                                        <p>Total this month  |<span class="text-info">
                                            Ksh {{humanize(expenditure_stats.total_this_month)}} </span>|
                                        
                                            Total this year  |<span class="text-info">
                                             Ksh   {{humanize(expenditure_stats.total_this_year)}} </span>|
                                        </p>
                                    </div>
                                <hr/>
                                <p class="col-8">
                                        <span class="badge badge-pill badge-info">{{found_expenditure_types}}</span> entries found
                                </p>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                            <th>description</th>        
                                            <th>this month</th>
                                            <th>this year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for = "data in expenditure_types.response">                                           
                                            <td>
                                                <router-link class="text-muted" style="text-decoration: none;"  :to="`/expenditure/`+ data.id + `/`">                                                         
                                                    {{data.type_name}}
                                                </router-link>
                                            </td>
                                            <td>{{data.description}}</td>
                                            <td><p class="text-secondary">{{humanize(data.total_this_month)}}</p></td>
                                            <td><p>{{humanize(data.total_this_year)}}</p></td>                                                          
                                            <td>
                                                <router-link class="text-muted" style="text-decoration: none;"  :to="`/expenditure/`+ data.id + `/`">                                                         
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
                <!-- ACTION BUTTONS -->
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
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addOffering" v-on:click="getServiceTypes()"><b>+</b> add offering</a>
                            </div>
                    </div>
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "offerings_selected">
                            <a href="#" data-toggle="modal" data-target="#addOffering" style="text-decoration: none" v-on:click="getServiceTypes()">
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
                    <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if = "expenditures_selected">
                        <a href="#" data-toggle="modal" data-target="#addExpenditureType" style="text-decoration: none">
                            <div class="add-button">
                                <b>+</b> add expenditure type
                            </div>
                        </a>                     
                    </div>
                </div>
            </div>
                <!-- add tithe modal -->
                <div class="modal fade" id="addTithe" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add tithe for member</h5>
                            <button type="button" class="close" data-dismiss="modal" v-on:click="fetchdata()" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">                                                                       
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
                            <button type="button" class="btn btn-success" v-on:click="addTithe()">
                                {{add_tithe_button_text}}
                                <span v-if="adding_to_finance"
                                    class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                </span>
                            </button>
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
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> offering from service </label>                                                            
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
                                                <label class="col-3"><b>service type:</b></label>                                                                                                                                   
                                                <select class="col-8 form-control" v-model="service_type" >
                                                    <option v-for="data in service_types.response" :value="data.id" >{{data.name}}</option>
                                                </select>
                                                <p v-if="service_type_errors.length">
                                                    <ul>
                                                            <small><li v-for="error in service_type_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                    </ul>
                                                </p>                                                                                                                                          
                                            </div>  
                                            <div class="row" v-if="non_member">
                                                <label class="col-3 "><b>service date</b></label>
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
                                            <p v-if="found_service.length && non_member  ">
                                                <ul v-if="found_service.length > 0">
                                                        <small><li><p class="text-success"> found a service for that date</p></li></small>
                                                </ul>
                                            </p>  
                                            <p v-if="found_service.length == 0 && non_member && searched_for_service">
                                                <ul >
                                                        <small><li ><p class="text-danger"> NO service found for that date</p></li></small>
                                                </ul>
                                            </p>                                                                                                                                   
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
                                                    <div class="row" v-if="! non_member">
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
                            <button type="button" class="btn btn-success" v-on:click="addOffering()">
                                <b>+</b> add offering
                                <span v-if="adding_to_finance"
                                    class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                </span>
                            </button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- add income modal -->
                <div class="modal fade" id="addIncome" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add income type</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">                                                               
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
                        <button type="button" class="btn btn-success" v-on:click="addIncome()">
                            <b>+</b> add income
                            <span v-if="adding_to_finance"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
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
                    <button type="button" class="btn btn-secondary" v-on:click="getAnyOther()" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" v-on:click="addIncomeType()">
                        <b>+</b> add income type
                        <span v-if="adding_to_finance"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                        </span>
                    </button>
                    </div>
                </div>
                </div>
                </div>
                <!-- add expenditure type modal -->
                <div class="modal fade" id="addExpenditureType" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add expenditure type</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                                <form>                                            
                                        <div class="row form-group">
                                                <label class="col-3"><b>name:</b></label>
                                                <input type="text" class=" col-8 form-control" placeholder="give the type a name" v-model="expenditure_type_name">                                                    
                                                <p v-if="expenditure_type_name_errors.length">
                                                    <ul>
                                                            <small><li v-for="error in expenditure_type_name_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                    </ul>
                                                </p>
                                        </div>                                    
                                        <hr/>   
                                        <div class="row form-group">
                                            <label class="col-3"><b>describe:</b></label>
                                            <textarea type="text" class="col-8 form-control" rows='3' v-model="expenditure_type_description"></textarea>                                                   
                                        </div>                                                                                
                                </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" v-on:click="addExpenditureType()">
                            <b>+</b> add expenditure type
                            <span v-if="adding_to_finance"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import router from "../../router";
import tithestats from '@/subcomponents/statistics/tithestats.vue'
import offeringstats from '@/subcomponents/statistics/offeringstats.vue'
import incomestats from '@/subcomponents/statistics/incomestats.vue'
export default {
    name: 'generalFinance',
    components: {
        tithestats,
        offeringstats,
        incomestats
    } ,

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
            found_expenditure_types: 0,
        //select tabs
            tithes_selected: false,
            offerings_selected: false,
            any_other_selected: false,
            expenditures_selected: false,
        //get stats data
            offering_stats: null,
            offerings: null,
            income_stats: null,
            incomes: null,
        //get ependitures
            expenditure_types: null,
            expenditure_stats: null,
        //service types
            service_types: null,
        //search for member
            memberSearch: '',found_members:[],
            memberSearch_status: '',selectedMember: null,
            showMemberInput: false,  
        //add_tithe
            adding_to_finance:false,
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
            searched_for_service: false,
            found_service: [],
            offering_amount_errors: [],selected_member_errors: [],
            name_if_not_member_errors: [], offering_date_errors: [], service_type_errors: [],
            added_offering: [],
            service_type: null,
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
            added_income: [],
        //add income type
            expenditure_type_name: '',
            expenditure_type_description: '',
            expenditure_type_name_errors: []
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
                var array = this.memberSearch.split(" ")
                if (this.memberSearch.length > 0 && array.length == 1){
                    this.showMemberInput = true
                    this.memberSearch_status = 'typing...'
                    this.debouncedGetAnswer()
                }else{
                    this.memberSearch_status = ''
                    this.found_members = []
                    this.showMemberInput = false                
                }
            },
        //watch for phone number input
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
        // watch for service date and type to determine if there exists a service for that day
        offering_date: function(){      
            this.searched_for_service = false      
            this.found_service = []
            this.service_type_errors = []
            if (this.non_member){                
                if (this.service_type == null){
                    this.service_type_errors.push("select a type of service")
                    return
                }                           
                this.checkForService()                              
            }            
        },
        service_type: function(){
            this.searched_for_service = false
            this.found_service = []
            if (this.non_member && this.offering_date.length > 0){                
                if (this.offering_date == null){                    
                    return
                }                           
                this.checkForService()               
            }
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
            this.$store.dispatch('update_isLoading', true)
            // try local storage
            this.tithes = JSON.parse(localStorage.getItem('tithe_list'))
            if (this.tithes){
                var array = this.tithes.response
                this.foundTithes = array.length
                this.$store.dispatch('update_isLoading', false)
            }            
            this.tithe_stats = JSON.parse(localStorage.getItem('tithe_stats'))

            const currentVersion = this.$store.getters.tithe_list_version
            var version  = localStorage.getItem('tithe_list_version')

            //else try network
            if (!version || version < currentVersion) {
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/tithe-by-members-this-month/')
                    .then(response => {
                        this.tithes = {"response": response.data }   
                        var array = this.tithes.response
                        this.foundTithes = array.length                  
                        
                        localStorage.setItem('tithe_list',JSON.stringify({"response": response.data }))                
                        localStorage.setItem('tithe_list_version', currentVersion) 
                        this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })

                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/tithe-stats/')
                    .then(response => {
                        this.tithe_stats = {"response": response.data } 

                        localStorage.setItem('tithe_stats',JSON.stringify({"response": response.data }))                          
                        this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })
            }
            this.getIncomeTypeList()
        },
        getIncomeTypeList: function(){
            //try local storage
            this.income_types = JSON.parse(localStorage.getItem('income_type_list'))
            if (this.income_types){
                var array = this.income_types.response
                this.foundIncomes = array.length
            }
            this.income_stats = JSON.parse(localStorage.getItem('income_stats'))            

            const currentVersion = this.$store.getters.income_type_list_version
            var version  = localStorage.getItem('income_type_list_version')

            // else try the network
            if (!version || version < currentVersion) {
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/income-stats/')
                .then(response => {
                   this.income_stats = {"response": response.data } 

                   localStorage.setItem('income_stats',JSON.stringify({"response": response.data }) )
                   this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                    this.$store.dispatch('update_isLoading', false)
                })

                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/income-type-list/')
                .then(response => {
                    this.income_types = {"response": response.data } 

                    localStorage.setItem('income_type_list',JSON.stringify({"response": response.data }))                
                    localStorage.setItem('income_type_list_version', currentVersion)
                    this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                    this.$store.dispatch('update_isLoading', false)
                })
            }
        },
        checkForService: function(){  
            this.$store.dispatch('update_isLoading', true)          
            this.$http.get(this.$BASE_URL + '/api/services/service-on-date/' + this.offering_date +'/of-type/' + this.service_type + '/')
                    .then(response => {                    
                    this.found_service = response.data                                  
                    this.searched_for_service = true
                    this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })
                    
        },
        getTithes: function(){
            this.offerings_selected = false
            this.any_other_selected = false
            this.expenditures_selected = false
            this.tithes_selected = true
        },
        getOfferings: function(){
            this.tithes_selected = false
            this.any_other_selected = false
            this.expenditures_selected = false
            this.offerings_selected = true

            //try local storage
            this.offering_stats = JSON.parse(localStorage.getItem('offering_stats')) 
            this.offerings = JSON.parse(localStorage.getItem('offering_list'))
            if (this.offerings){
                var array = this.offerings.response
                this.foundOfferings = array.length
            }

            const currentVersion = this.$store.getters.offering_list_version
            var version  = localStorage.getItem('offering_list_version')

            // try the network
            if (!version || version < currentVersion){
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/offering-stats/')
                    .then(response => {
                    this.offering_stats = {"response": response.data }                      
                    localStorage.setItem('offering_stats',JSON.stringify({"response": response.data }))                
                    this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })

                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/offerings-by-members-this-month/')
                    .then(response => {
                    this.offerings = {"response": response.data } 
                    var array = this.offerings.response
                    this.foundOfferings = array.length

                    localStorage.setItem('offering_list',JSON.stringify({"response": response.data }))                
                    localStorage.setItem('offering_list_version', currentVersion)
                    this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })
            }
            
        },
        getAnyOther: function(){
            this.tithes_selected = false            
            this.offerings_selected = false
            this.expenditures_selected = false
            this.any_other_selected = true
            
            const currentVersion = this.$store.getters.income_type_list_version
            var version  = localStorage.getItem('income_type_list_version')
                        
            //try local storage
            this.incomes = JSON.parse(localStorage.getItem('income_type_list'))
            if (this.incomes){
                var array = this.incomes.response
                this.foundIncomes = array.length
            }
            else{
                if (!version || version < currentVersion) {
                    this.$store.dispatch('update_isLoading', true)
                    this.$http.get(this.$BASE_URL + '/api/finance/income-type-list/')
                    .then(response => {
                        this.incomes = {"response": response.data } 
                        var array = this.incomes.response
                        this.foundIncomes = array.length

                        localStorage.setItem('income_type_list',JSON.stringify({"response": response.data }))                
                        localStorage.setItem('income_type_list_version', currentVersion)
                        this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })
                }
            }
            this.income_stats = JSON.parse(localStorage.getItem('income_stats'))                
            if (this.income_stats){
                
            }
            else{ 
                if (!version || version < currentVersion) {
                    this.$store.dispatch('update_isLoading', true)
                    this.$http.get(this.$BASE_URL + '/api/finance/income-stats/')
                    .then(response => {
                        this.income_stats = {"response": response.data } 
                        localStorage.setItem('income_stats',JSON.stringify({"response": response.data }) )
                        this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })
                }                       
            }

        },
        getExpenditures: function(){
            this.tithes_selected = false            
            this.offerings_selected = false        
            this.any_other_selected = false
            this.expenditures_selected = true

            //try local storage
            this.expenditure_stats = JSON.parse(localStorage.getItem('expenditure_stats'))
            this.expenditure_types = JSON.parse(localStorage.getItem('expenditure_type_list'))
            if (this.expenditure_types){
                var array = this.expenditure_types.response
                this.found_expenditure_types = array.length 
            }

            // else try the network
            const currentVersion = this.$store.getters.expenditure_list_version
            var version  = localStorage.getItem('expenditure_list_version')

            if (!version || version < currentVersion) {
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/expenditure-stats/')
                    .then(response => {
                        this.expenditure_stats =  response.data
                        localStorage.setItem('expenditure_stats',JSON.stringify(response.data) )
                        this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })

                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL + '/api/finance/expenditure-type-list/')
                    .then(response => {
                        this.expenditure_types = {"response": response.data } 
                        localStorage.setItem('expenditure_type_list',JSON.stringify({"response": response.data } ))
                        localStorage.setItem('expenditure_list_version', currentVersion)                        

                        var array = this.expenditure_types.response
                        this.found_expenditure_types = array.length
                        this.$store.dispatch('update_isLoading', false)
                    })
                    .catch((err) => {
                        this.fetch_data_error.push(err)
                        this.$store.dispatch('update_isLoading', false)
                    })   
            }
        },
        //get service types
        getServiceTypes: function(){
            this.$store.dispatch('update_isLoading', true)
            this.$http.get(this.$BASE_URL + '/api/services/service-types/')
                .then(response => {
                this.service_types =  {"response":response.data}
                this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.found_service = []
                    this.$store.dispatch('update_isLoading', false)
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
                this.adding_to_finance = true              
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
                               this.adding_to_finance = false                                                                                                                                                            
                               this.selectedMember = null,
                               this.tithe_narration = '',
                               this.tithe_amount = ''                        
                               this.enable_add_tithe_button = true
                               this.add_tithe_button_text = '+ add tithe '
                               this.memberSearch = '' 
                               var new_version = parseInt(localStorage.getItem('tithe_list_version')) + 1
                               this.$store.dispatch('update_tithe_list_version', new_version)        
                               alert("tithe of amount " + response.data.amount + "\n"
                                      + "added for " + response.data.member.member.first_name)                     
                        })
                        .catch((err) => {
                            this.adding_to_finance = false
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
            if (this.non_member
                && this.service_type > 0
                && this.offering_date.length == 10
                && this.offering_amount > 0){                 
                    return true
                }
            if (! this.non_member
                && (this.selectedMember != null
                &&  this.selectedMember != '')
                && this.offering_date.length == 10
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
                    this.adding_to_finance = true
                    this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/add-service-offering/',
                        data: {
                            service_type_id: this.service_type,                                
                            recording_member_id: this.$session.get('member_id'),                                 
                            date: this.offering_date,                                
                            narration: this.offering_narration,                        
                            amount: this.offering_amount                                                                   
                        }
                        }).then(response => {    
                            this.adding_to_finance = false                           
                            this.offering_amount = null
                            this.offering_narration = null
                            this.service_type = null
                                                        
                            var new_version = parseInt(localStorage.getItem('offering_list_version')) + 1                               
                            this.$store.dispatch('update_offering_list_version', new_version)
                            alert("offering succesfully added ")          
                        })
                        .catch((err) => {
                            this.adding_to_finance = false
                            alert("an error occured, please try again later")
                        })               
                }
                if (! this.non_member){
                    this.adding_to_finance = true
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
                               this.adding_to_finance = false
                               this.offering_amount = null
                               this.offering_narration = null
                               this.name_if_not_member = ''
                               this.offering_date = ''
                               this.memberSearch = ''   
                               
                               var new_version = parseInt(localStorage.getItem('offering_list_version')) + 1                               
                               this.$store.dispatch('update_offering_list_version', new_version)

                               alert("offering succesfully added")          
                        })
                        .catch((err) => {
                                alert("an error occured, please try again later")
                                this.adding_to_finance = false
                        })
                }  
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
                this.adding_to_finance = true
                this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/income-type-list/',
                        data: {
                            type_name: this.income_type_name,                                
                            description: this.income_type_description                                                                                            
                        }
                        }).then(response => {
                            this.adding_to_finance = false                            
                            this.income_type_name = '',
                            this.income_type_description = '' 
                            var new_version = parseInt(localStorage.getItem('income_type_list_version')) + 1
                            this.$store.dispatch('update_income_type_list_version', new_version) 
                            
                            alert("income type succesfully added")                                                
                        })
                        .catch((err) => {
                            this.adding_to_finance = false          
                            alert("an error occured, try again later")                  
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
                this.adding_to_finance = true
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
                            this.adding_to_finance = false
                            this.added_income.push(response.data)
                            this.income_type = null,
                            this.income_amount = null,
                            this.income_narration = ''
                            alert("income successfully added")                                             
                        })
                        .catch((err) => {
                            this.adding_to_finance = false
                            alert("an error occured, try again later")
                        })
            }
        },
        expenditureTypeFormOK: function(){  
            this.expenditure_type_name_errors = []

            if (this.expenditure_type_description.length < 1){
                this.expenditure_type_description = "none given"
            }        
            if (this.expenditure_type_name.length > 0){
                return true
            }
            if (this.expenditure_type_name.length < 1){                
                this.expenditure_type_name_errors.push("name required")
                return false
            }
        },
        addExpenditureType: function(){        
            if (this.expenditureTypeFormOK()){
                this.adding_to_finance = true
                this.$http({                        
                        method: 'post',
                        url: this.$BASE_URL + '/api/finance/expenditure-type-list/',
                        data: {
                            type_name: this.expenditure_type_name,                                
                            description: this.description_type_description                                                                                            
                        }
                        }).then(response => {     
                            this.adding_to_finance = false                         
                            this.expenditure_type_name = '',
                            this.expenditure_type_description = '' 
                            var new_version = parseInt(localStorage.getItem('expenditure_list_version')) + 1
                            this.$store.dispatch('update_expenditure_list_version', new_version)  
                            alert("expenditure type succesfully added")  
                            this.getExpenditures()                    
                        })
                        .catch((err) => {
                            this.adding_to_finance = false
                            alert("an error occured, try again later")
                        }) 
            }
        },        
    },

}
</script>


<style >
</style>
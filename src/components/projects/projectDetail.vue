<template>
    <div >
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span> 
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'generalFinance'}">finances</router-link></span>
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'projectList'}">projects</router-link></span> 
                    <li class="breadcrumb-item active" aria-current="page"><span v-for = "data in context.response">{{data.name}}</span></li>
                </ol>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-10 col-md-8 col-lg-2">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                
                                <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-contributions-tab" data-toggle="pill" href="#v-pills-contributions" role="tab" aria-controls="v-pills-contributions" aria-selected="true" v-on:click="getContributionsTab()">
                                        <span class="row">
                                                <img class="d-none d-lg-block d-xl-block mr-2" style="width: 20%; height: auto" src="@/assets/icons/icons8-request-money-filled-50.png">
                                                contributions
                                        </span>                                       
                                </a>
                                <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-pledges-tab" data-toggle="pill" href="#v-pills-pledges" role="tab" aria-controls="v-pills-pledges" aria-selected="false" v-on:click="getPledgesTab()">
                                        <span class="row">
                                                <img class="d-none d-lg-block d-xl-block mr-2" style="width: 20%; height: auto" src="@/assets/icons/icons8-promise-filled-50.png">
                                                pledges
                                        </span>                                       
                                </a>
                            
                        </div>                
                </div>
                <div class="col">
                        <div class="tab-content" id="v-pills-tabContent">
                                <!-- contributions tab -->
                                <div class="tab-pane fade show active" id="v-pills-contributions" role="tabpanel" aria-labelledby="v-pills-contributions-tab">
                                <h3 >
                                        <span v-for = "data in context.response">{{data.name}} /</span> contributions                                        
                                </h3>
                                <!-- what to show on small devices -->
                                <div class="d-sm-block d-md-none btn-group" style="padding: 0px 0px 25px 10px" v-if=" tab == 'contributions'">
                                        <a href="#" data-toggle="modal" data-target="#addContribution" style="text-decoration: none">
                                                <div class="add-button" >
                                                <b>+</b> add contribution
                                                </div>
                                        </a>
                                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                                <span class="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addPledge"><b>+</b> add pledge</a>                                        
                                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#settlePledge"><b>+</b> settle pledge</a>                                                                                                                
                                        </div>
                                </div>
                                <div class=" text-muted" v-for = "data in context.response ">
                                        <div class="row ml-1">
                                                <div class="d-none d-lg-block stat-item mr-2 text-muted">
                                                        Required  <span class="text-info">
                                                                Ksh {{humanize(data.required_amount)}}</span>
                                                </div>
                                                <div class="d-none d-lg-block stat-item mr-2">
                                                        Raised  <span class="text-info">
                                                        Ksh   {{humanize(data.raised_amount)}}</span>                                        
                                                </div>
                                                <div class=" d-none d-lg-block stat-item mr-2">
                                                        Funded  <span class="text-info">
                                                        {{data.percentage_funded}} %</span>                                        
                                                </div>
                                        </div>                                     
                                </div>                                 
                                <hr/>
                                <div class="row">
                                <p class="col-8">
                                        found <span class="badge badge-pill badge-info">{{foundItems}}</span>
                                </p>                                                  
                                </div>                             
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                        <input multiple class="form-check-input" 
                                                        type="checkbox" :value=true v-model="all_members">
                                                        all
                                                </th>
                                                <th>name</th>
                                                <th>amount</th>
                                                <th>date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for = "data in contributions.response">
                                                <td v-if = "data.member != null">  
                                                        <input multiple class="form-check-input" type="checkbox" :value=data.member.member.id v-model="member_ids">
                                                </td>
                                                <td v-else></td>
                                                <td v-if = "data.member != null">
                                                        <router-link :to="`/memberDetail/`+ data.member.member.id">
                                                                <span class = "text-secondary">{{data.member.member.first_name}} {{data.member.member.last_name}}</span>
                                                        </router-link>
                                                </td>
                                                <td v-if = "data.names != ''"> {{data.names}}</td>
                                                <td><p class="text-muted">{{humanize(data.amount)}}</p></td>
                                                <td>{{$humanizeDate(data.recorded_at)}}</td>                                               
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- pledges tab -->
                                <div class="tab-pane fade" id="v-pills-pledges" role="tabpanel" aria-labelledby="v-pills-pledges-tab">
                                    <div v-if = "pledges_selected">
                                        <h3>
                                                <span v-for = "data in context.response">{{data.name}} /</span> pledges

                                        </h3>
                                        <!-- what to show on small devices -->
                                        <div class="d-sm-block d-md-none btn-group" style="padding: 0px 0px 25px 10px" v-if=" tab == 'pledges'">
                                                <a href="#" data-toggle="modal" data-target="#addPledge" style="text-decoration: none">
                                                        <div class="add-button" >
                                                        <b>+</b> add pledge
                                                        </div>
                                                </a>
                                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                                        <span class="sr-only">Toggle Dropdown</span>
                                                </button>
                                                <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#settlePledge"><b>+</b> settle pledge</a>
                                                        <div class="dropdown-divider"></div>
                                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addContribution"><b>+</b> add contribution</a>                                                                                                                
                                                </div>
                                        </div>
                                        <!-- pledges -->
                                        <div class="text-muted" v-for = "data in context.response ">
                                                <div class="row ml-1">
                                                        <div class="d-none d-lg-block stat-item mr-2 text-muted">
                                                                Pledges  <span class="text-info">
                                                                        Ksh {{humanize(data.total_in_pledges)}}</span>
                                                        </div>
                                                        <div class=" d-none d-lg-block stat-item mr-2">
                                                                Settled  <span class="text-info">
                                                                Ksh   {{humanize(data.total_in_settled_pledges)}}</span>                                        
                                                        </div>
                                                        <div class="d-none d-lg-block stat-item mr-2">
                                                                Percentage settled  <span class="text-info">
                                                                Ksh   {{data.percentage_of_pledge_settled}}%</span>                                        
                                                        </div>
                                                </div>                                                
                                        </div>                                         
                                           <hr/>
                                           <div class="row">
                                                <p class="col-6">
                                                        found <span class="badge badge-pill badge-info">{{humanize(foundPledges)}}</span>
                                                </p>                                                                                           
                                            </div>
                                        <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                                <input multiple class="form-check-input" 
                                                                type="checkbox" :value=true v-model="all_members">
                                                                all
                                                        </th>
                                                        <th>name</th>
                                                        <th>pledged</th>
                                                        <th>raised</th>
                                                        <th>remaining</th>
                                                        <th>funded</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for = "data in pledges.response" v-if="selectedMember == '' || selectedMember == null || memberSearch == ''">                                                                                                                
                                                        <td v-if = "data.member != null"> 
                                                                <input multiple class="form-check-input" type="checkbox" :value=data.member.member.id v-model="member_ids">
                                                        </td>    
                                                        <td v-else></td>                                                        
                                                        <td v-if = "data.member != null">
                                                                <router-link :to="`/memberDetail/`+ data.member.member.id">
                                                                        <span class = "text-secondary">{{data.member.member.first_name}} {{data.member.member.last_name}}</span>
                                                                </router-link>
                                                        </td>                                                        
                                                        <td v-if = "data.names != ''"> {{data.names}}</td>
                                                        <td>{{humanize(data.amount)}}</td>
                                                        <td><p class="text-secondary">{{humanize(data.amount_so_far)}}</p></td>
                                                        <td><p class="text-danger">{{humanize(data.remaining_amount)}}</p></td>
                                                        <td>{{data.percentage_funded}}</td>
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                    </div>
                                </div>
                               
                        </div>
                </div>
                <!-- ACTIONS ON THE RIGHT -->
                <div class="col-12 col-sm-10 col-md-8 col-lg-3">
                        <!-- add contribution button when tab is contributions -->
                        <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if=" tab == 'contributions'">
                                <a href="#" data-toggle="modal" data-target="#addContribution" style="text-decoration: none">
                                    <div class="add-button" >
                                        <b>+</b> add contribution
                                    </div>
                                </a>
                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                        <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addPledge"><b>+</b> add pledge</a>                                        
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#settlePledge"><b>+</b> settle pledge</a>                                                                                                                
                                </div>
                        </div>
                        <!-- add pledge button when tab is pladges -->
                        <div class="btn-group" style="padding: 0px 0px 25px 10px" v-if=" tab == 'pledges'">
                                <a href="#" data-toggle="modal" data-target="#addPledge" style="text-decoration: none">
                                    <div class="add-button" >
                                        <b>+</b> add pledge
                                    </div>
                                </a>
                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                        <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuReference">
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#settlePledge"><b>+</b> settle pledge</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addContribution"><b>+</b> add contribution</a>                                                                                                                
                                </div>
                        </div>

                        <!-- more actions -->
                        <div class="list-group font-weight-bold">
                                <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter"><img src="@/assets/icons/icons8-comments-64.png">
                                        text people
                                </button>
                                <button type="button" class="action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#exportToCSV" >
                                        <img src="@/assets/icons/icons8-export-csv-30.png" style="width: 35px; height:auto"> export to CSV
                                </button>                            
                        </div>
                      
                </div>
                <!-- export to csv modal -->
                <div class="modal fade" id="exportToCSV" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">export data to CSV</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>                                                                         
                                            <div class="form-group">                                                                                                   
                                                    <div class="row">                                                        
                                                            <label class="col-3 "><b></b></label>
                                                            <div class="input-group form-group col-5" style="padding: 0px" >                                                                                                                                                                                     
                                                                    <small>2 files will be downloaded, one for contributions,another for pledge settlements</small>  
                                                            </div>
                                                                                                                    
                                                    </div>
                                            </div>
                                                                                                                             
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                       
                            <button type="button" class="btn btn-success" v-on:click="exportData()">
                                download CSVs
                                <span v-if="exporting_data"
                                    class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                </span>
                            </button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- Modal email -->
                <div class="modal fade" id="emailModatCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalCenterTitle">email people</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <p class = "text-info"> !! this feature is still under development</p>
                                    <label for="exampleFormControlTextarea1">message</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                  </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary">Send email</button>
                            </div>
                          </div>
                        </div>
                </div> 
                <!-- Modal text people -->
                <div class="modal fade" id="textModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" >send message to selected members</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group" v-if="sms_status.length == 0">
                                    <label for="exampleFormControlTextarea1">message</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model = "message"></textarea>
                                  </div>
                                  <div v-if="sms_status.length > 0">
                                    <p class="text-info"> The members will receive your message.</p>
                                    <p> check sms status later as it may take a while</p>
                                    </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeSmsModal()">Close</button>
                              <span v-if = "sms_status.length == 0">
                                <button type="button" class="btn btn-success" 
                                        v-on:click=sendMessage()>
                                        send text
                                        <span v-if="sending_message"
                                              class="spinner-border spinner-border-sm" 
                                              role="status" aria-hidden="true">
                                        </span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                </div>
                <!-- Modal assign group -->
                <div class="modal fade" id="assignModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">assign groups</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <p class="text-info">!! this feature is under development</p>
                        </div>
                        <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">assign</button>
                        </div>
                        </div>
                        </div>
                </div>   
                <!-- add contribution Modal -->
                <div class="modal fade" id="addContribution" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add contribution</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="fetchdata()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">                                        
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> non-member </label>
                                                    </div>                                                    
                                            </div>
                                            <hr/>

                                            <div class=" row form-group" v-if="! non_member">
                                              <label class="col-3"><b>member:</b></label>
                                              <div class="col-8">
                                                        <searchmember v-on:memberSelected="onMemberSelected" />                                                   
                                              </div>                                           
                                              
                                            </div>
                                
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>names:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of contributor" v-model = "name_if_not_member">                                        
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
                                                    <input type="number" class=" col-3 form-control" placeholder="amount" v-model="contribution_amount">                                                    
                                                    <div class="col-6 text-success" v-if ="contribution_amount > 0"><h3>KSh {{humanize(contribution_amount)}}</h3></div> 
                                            </div>                                                                                   
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchdata()">Close</button>
                            <button type="button" class="btn btn-success" disabled v-if="! enable_add_button">
                                    + add contribution
                                    <span v-if="adding_to_project"
                                         class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                   </span>
                            </button>
                            <button type="button" class="btn btn-success" v-if="enable_add_button" v-on:click="addContribution()">
                                    {{add_contribution_button_text}}
                                    <span v-if="adding_to_project"
                                         class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                   </span>
                            </button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- add pledge Modal -->
                <div class="modal fade" id="addPledge" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add pledge</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="getPledges()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> non-member </label>
                                                    </div>                                                    
                                            </div>
                                            <hr/>

                                            <div class=" row form-group" v-if="! non_member">
                                              <label class="col-3"><b>member:</b></label>
                                              <div class="col-8">
                                                        <searchmember v-on:memberSelected="onMemberSelected" />
                                                        <p v-if="selected_member_errors.length">
                                                                <ul>
                                                                        <small><li v-for="error in selected_member_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                                </ul>
                                                        </p>                                                  
                                              </div>                                           
                                              
                                            </div>
                                
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>names:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of person pledging" v-model="name_if_not_member">                                        
                                                    <div style="padding: 5px; text-align: center">
                                                    <p v-if="name_if_not_member_errors.length">
                                                        <ul>
                                                                <small><li v-for="error in name_if_not_member_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                        </ul>
                                                    </p>
                                                    </div>
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
                                                            </div> 
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
                                            <hr/>
                                            <div class="row">
                                                        <label class="col-3 "><b>due date</b></label>
                                                        <div class="col-8">
                                                            <div class="row">
                                                                <div class="input-group form-group col-8" style="padding: 0px" >
                                                                        <input type="date" name="bday" max="3000-12-31" 
                                                                               min="1000-01-01" class="form-control" v-model="pledge_due_date">                                                                                                                      
                                                                </div>
                                                            </div>   
                                                            <p v-if="pledge_date_errors.length">
                                                                <ul>
                                                                        <small><li v-for="error in pledge_date_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                                </ul>
                                                            </p>                                                        
                                                        </div>
                                                </div>                                                  
                                            <hr/>
                                            <div class="row form-group">
                                                    <label class="col-3"><b>amount:</b></label>                                                                                                      
                                                    <input type="number" class=" col-3 form-control" placeholder="amount" v-model="pledge_amount">                                                    
                                                    <div class="col-6 text-success" v-if ="pledge_amount > 0"><h3>KSh {{humanize(pledge_amount)}}</h3></div> 
                                                    <p v-if="pledge_amount_errors.length">
                                                        <ul>
                                                                <small><li v-for="error in pledge_amount_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                        </ul>
                                                    </p>
                                            </div>                                                                                   
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="getPledges()">Close</button>
                            <button type="button" class="btn btn-success" disabled v-if="! enable_add_pledge_button">
                                    <b>+</b> add pledge
                                    <span v-if="adding_to_project"
                                         class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                   </span>
                            </button>
                            <button type="button" class="btn btn-success" v-if="enable_add_pledge_button" v-on:click="addPledge()">
                                    {{add_pledge_button_text}}
                                    <span v-if="adding_to_project"
                                        class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                    </span>
                            </button>
                            </div>
                        </div>
                        </div>
                </div>
                <!-- settle pledge Modal -->
                <div class="modal fade" id="settlePledge" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">settle pledge</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                    <form>
                                            <div class="row checkbox">
                                                    <div class="col-3"></div>
                                                    <div class="col-8">
                                                            <label><input type="checkbox" :value= true v-model = "non_member"> settle for non-member </label>
                                                    </div>                                                    
                                            </div>
                                            <hr/>

                                            <div class=" row form-group" v-if="! non_member">
                                                <label class="col-3"><b>member:</b></label>
                                                <div class="col-8">
                                                        <searchmember v-on:memberSelected="onMemberSelected" />
                                                        <p v-if="selected_member_errors.length">
                                                                <ul>
                                                                        <small><li v-for="error in selected_member_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                                </ul>
                                                        </p>                                                 
                                                </div>                                           
                                                
                                            </div>
                                
                                            <div class=" row form-group" v-if="non_member">
                                                    <label class="col-3"><b>names:</b></label>
                                                    <input type="text" class="col-8 form-control" placeholder="enter name of person pledging" autofocus>                                        
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
                                                            </div> 
                                                    </div> 
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
                                            <hr/>
                                            <div class="row form-group">
                                                        <label class="col-3"><b>amount:</b></label>                                                                                                      
                                                        <input type="number" class=" col-3 form-control" placeholder="amount" v-model="pledge_amount">                                                    
                                                        <div class="col-6 text-success" v-if ="pledge_amount > 0"><h3>KSh {{humanize(pledge_amount)}}</h3></div> 
                                                        <p v-if="pledge_amount_errors.length">
                                                            <ul>
                                                                    <small><li v-for="error in pledge_amount_errors"><p class="text-danger">{{ error }}</p></li></small>
                                                            </ul>
                                                        </p>
                                                </div>                                                                                  
                                    </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchdata();getPledges()">Close</button>
                            <button type="button" class="btn btn-success" v-on:click="settlePledge()">
                                settle pledge
                                <span v-if="adding_to_project"
                                        class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                </span>
                            </button>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchmember from '@/subcomponents/searchmember.vue'
export default {
    name : 'projectDetail',
    components: { searchmember },
    data () {
        return {
        //get data
        foundItems: 0,
        foundPledges: 0,
        logged_in_member_id: null,    
        context: null,
        tab: 'contributions',            
        contributions: null,
        pledges: null,
        pledges_selected: false,
        foundItems: null,
        fetch_data_error: [],
        //search for member
        // This value is set to the value emitted by the child
        selectedMember: null, 
        member_ids: [],
        //add contribution
        adding_to_project: false,    
        non_member: false,
        add_contribution_button_text: '+ add contribution',
        contribution_amount: null,
        name_if_not_member: '',
        phone_number: '',
        country_code: '+254',
        enable_add_button: false,
        phone_number_errors: [], phone_number_OK: [],
        added_contribution: [],
        //add pledge 
        add_pledge_button_text: '+ add pledge',
        enable_add_pledge_button: true,
        pledge_amount: null,        
        pledge_due_date: '',
        pledge_amount_errors: [],
        selected_member_errors: [],name_if_not_member_errors: [],
        pledge_date_errors: [],
        //download csv            
        exporting_data:false,
        //member ids
        all_members: true,
        member_ids: [],
        all_member_ids: [],
        //sending message
        message: " ",
        sms_status: [],
        sending_message: false,

        }
    },
    created () {        
        this.fetchdata()        
    },
    watch: {
        '$route': 'fetchdata',
        all_members: function(){
                if (this.all_members != true){
                        this.member_ids = []
                }
                else{
                        this.member_ids = this.all_member_ids
                }
        },
    //add contribution
        name_if_not_member: function(){
                if (this.name_if_not_member.length > 0
                    && this.non_member
                    && this.contribution_amount > 0){
                        this.added_contribution = []
                        this.enable_add_button = true
                }
        },
        contribution_amount: function(){
                this.add_contribution_button_text = '+ add contribution'
                if (this.contribution_amount > 0
                    && this.selectedMember > 0
                    || this.name_if_not_member.length > 0){
                        this.added_contribution = []
                        this.enable_add_button = true
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

     },
    methods: {
        onMemberSelected (value) {
            this.selectedMember = value
          },
        humanize: function(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
          // send message to selected members
        sendMessage: function (){
        this.sending_message = true
        this.$http({
                method: 'post',
                url: this.$BASE_URL + '/api/sms/add-sms/',
                data: {
                sending_member_id: this.$session.get('member_id'),
                app: "CHURCH PROJECTS: "+ this.context.response[0].name,
                message: this.message,
                website: true,
                receipient_member_ids: this.member_ids
                }
                }).then(response => {        
                this.sms_status.push(response.data)          
                this.sending_message = false
                })
                .catch((err) => {
                alert("an error occured when attempting to deliver to one of the members, this may be due to an invalid phone number")
                this.sending_message = false
                })
        },
        exportData: function(){
            const FileDownload = require('js-file-download');
            //export contributions to csv
            this.exporting_data = true
            var project_name = this.context.response[0].name.split(" ").join("")
            this.$http.get(this.$BASE_URL + '/api/projects/get-project-contributions-as-csv/' + this.$route.params.id +'/' )
            .then(response => {
                FileDownload(response.data, project_name + "_contributions.csv");
               this.exporting_data = false                 
            })
            .catch((error) => {
                this.exporting_data = false
                alert('error while downloading csv')
            })

            //export pledge settlements to csv
            this.exporting_data = true
            var project_name = this.context.response[0].name.split(" ").join("")
            this.$http.get(this.$BASE_URL + '/api/projects/get-pledge-payments-as-csv/' + this.$route.params.id +'/' )
            .then(response => {
                FileDownload(response.data, project_name + "_pledges.csv");
               this.exporting_data = false                 
            })
            .catch((error) => {
                this.exporting_data = false
                alert('error while downloading csv')
            })
        },
        fetchdata: function() {
            this.tab = 'contributions'
            this.fetch_data_error = []            
            //get project with id
            this.$store.dispatch('update_isLoading', true)
            this.$http.get(this.$BASE_URL +'/api/projects/project-with-id/' + this.$route.params.id + '/')
                .then(response => {
                this.context = {"response": response.data } 
                this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                    this.$store.dispatch('update_isLoading', false)
                })
                   
        
           // contributions  towards a project
            this.$store.dispatch('update_isLoading', true)
            this.$http.get(this.$BASE_URL +'/api/projects/contribution-for-project/'+ this.$route.params.id + '/')
                .then(response => {
                this.contributions = {"response": response.data } 
                var array = this.contributions.response
                //set up selected members
                for (var contribution in array){
                        this.all_member_ids.push(array[contribution].member.member.id)
                }
                this.foundItems = array.length
                this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                this.$store.dispatch('update_isLoading', false)
                })
                
          this.getPledges()

        },
        getPledges: function(){                
                this.memberSearch = ''
                this.tab = 'pledges'
                this.pledges_selected = true
                this.$store.dispatch('update_isLoading', true)
                this.$http.get(this.$BASE_URL +'/api/projects/pledges-for-project/'+ this.$route.params.id + '/')
                        .then(response => {
                                this.pledges = {"response": response.data } 
                                var array = this.pledges.response
                                // set up member ids for selection
                                for (var pledge in array){
                                        this.all_member_ids.push(array[pledge].member.member.id)
                                }
                                this.foundPledges = array.length
                                this.$store.dispatch('update_isLoading', false)
                        })
                        .catch((err) => {
                                this.$store.dispatch('update_isLoading', false)
                        })
        },
        getContributionsTab: function(){
            this.tab = 'contributions'
            this.all_members = false
        },
        getPledgesTab: function(){
                this.tab='pledges'
                this.all_members = false
        },         
        //add contribution
        addContribution: function(){
                if (this.non_member){
                        this.enable_add_project_button = false
                        this.adding_to_project = true
                        this.add_contribution_button_text = '+ adding contribution...'                                    
                        this.$http({
                        method: 'post',
                        url: this.$BASE_URL + '/api/projects/add-non-member-contribution-to-project/',
                        data: {
                                project_id: this.$route.params.id,
                                names: this.name_if_not_member,
                                recording_member_id: this.$session.get('member_id'),
                                phone: this.country_code.toString() + this.phone_number.toString(),
                                anonymous: true,
                                amount: this.contribution_amount                                      
                        }
                        }).then(response => {        
                               this.adding_to_project = false
                               this.enable_add_project_button = true                               
                               this.name_if_not_member = ''
                               this.phone_number = ''
                               this.contribution_amount = null                                                                                                                       
                               this.add_contribution_button_text = '+ add contribution'                                   
                               alert("contribution succesfully added")


                        })
                        .catch((err) => {
                                this.adding_to_project = false
                                this.enable_add_project_button = true
                                this.add_contribution_button_text = '+ add contribution'                                   
                                alert("an error has occured, try again later")
                        })
                }
                if (! this.non_member){                   
                        this.enable_add_project_button = false
                        this.adding_to_project = true
                        this.add_contribution_button_text = 'adding contribution...'            
                        this.$http({
                        method: 'post',
                        url: this.$BASE_URL + '/api/projects/add-contribution-to-project/',
                        data: {
                                project_id: this.$route.params.id,
                                member_id: this.selectedMember,
                                recording_member_id: this.$session.get('member_id'),
                                anonymous: false,
                                amount: this.contribution_amount                                      
                        }
                        }).then(response => { 
                               this.adding_to_project = false                               
                               this.memberSearch = ''
                               this.contribution_amount = null
                               this.added_contribution.push(response.data)                                 
                               this.add_contribution_button_text = '+ add contribution'
                               this.enable_add_button = true  
                               alert("contribution succesfully added")
                        })
                        .catch((err) => {
                                this.adding_to_project = false
                                this.enable_add_project_button = true
                                this.add_contribution_button_text = '+ add contribution'                                   
                                alert("an error has occured, try agin later")
                        })    
                }
        },
        pledgeFormOkay: function(){

                this.pledge_amount_errrors = []
                this.selected_member_errors = []
                this.pledge_date_errors = []   
                this.pledge_amount_errors = []
                this.name_if_not_member_errors = []

                if (     !  this.non_member 
                        && (this.pledge_amount != null 
                        || this.pledge_amount > 0)
                        && (this.selectedMember != null
                        || this.selectedMember != 0)
                        && this.pledge_due_date.length == 10){
                                return true
                        }   
                if (    this.non_member   
                        && (this.pledge_amount != null 
                        || this.pledge_amount > 0)
                        && (this.name_if_not_member != null
                        || this.name_if_not_member != '')
                        && this.pledge_due_date.length == 10){
                                return true
                        } 
                if (    ! this.non_member
                        &&  (this.selectedMember == null
                        || this.selectedMember == 0)){
                                this.selected_member_errors.push("select a member")
                                return false
                }  
                if (    this.non_member
                        && (this.name_if_not_member.length < 1
                        || this.name_if_not_member == null)){
                                this.name_if_not_member_errors.push("enter name of the contributor")
                                return false
                }     
                if (this.pledge_due_date.length == 0){
                        this.pledge_date_errors.push("date input required") 
                        return false
                }          
                if (this.pledge_due_date.length != 10){
                        this.pledge_date_errors.push("incorrect date use YYYY-MM-DD format")
                        return false
                }                                       
                if (this.pledge_amount < 1
                        || this.pledge_amount == null){
                                this.pledge_amount_errors.push("pledge amount required")
                                return false
                } 
        },
        addPledge: function(){
                if (this.pledgeFormOkay()){
                        if (! this.non_member){
                                this.adding_to_project = true
                                this.$http({
                                        method: 'post',
                                        url: this.$BASE_URL + '/api/projects/add-pledge-to-project/',
                                        data: {
                                                project_id: this.$route.params.id,
                                                member_id: this.selectedMember,
                                                recording_member_id: this.$session.get('member_id'),                             
                                                amount: this.pledge_amount,
                                                date: this.pledge_due_date                                      
                                        }
                                        }).then(response => {                                                                                                                                                                     
                                                this.selectedMember = null                                              
                                                this.pledge_amount = null                        
                                                this.adding_to_project = false
                                                this.enable_add_pledge_button = true                                                
                                                this.memberSearch = ''       
                                                alert("pledge of amount " + response.data.amount + "\n"
                                                        + "added for " + response.data.member.member.first_name)                     
                                        })
                                        .catch((err) => {
                                                this.adding_to_project = false
                                                alert("an error occured while attempting to add pledge. \n"
                                                        + "check your connection and try again")
                                                                        
                                        })
                        }
                        if (this.non_member){
                                this.adding_to_project = true
                                this.$http({
                                        method: 'post',
                                        url: this.$BASE_URL + '/api/projects/add-anonymous-pledge-to-project/',
                                        data: {
                                                project_id: this.$route.params.id,
                                                recording_member_id: this.$session.get('member_id'), 
                                                phone: this.country_code + this.phone_number,
                                                names: this.name_if_not_member,
                                                amount: this.pledge_amount,
                                                date: this.pledge_due_date                                      
                                        }
                                        }).then(response => {
                                                this.adding_to_project = false                                                                                                                                                                     
                                                this.selectedMember = null
                                                this.name_if_not_member = null 
                                                this.phone_number = null 
                                                this.phone_number_errors = []                                           
                                                this.pledge_amount = null                        
                                                this.enable_add_pledge_button = true                                                
                                                this.memberSearch = ''       
                                                alert("pledge of amount " + response.data.amount + "\n"
                                                        + "added for " + response.data.names)                     
                                        })
                                        .catch((err) => {
                                                this.adding_to_project = false
                                                alert("an error occured while attempting to add pledge. \n"
                                                        + "check your connection and try again")
                                                                        
                                        })                        
                        }
                }
        },
        settlePledgeFormOkay: function(){

                this.pledge_amount_errrors = []
                this.selected_member_errors = [] 
                this.pledge_amount_errors = []
                this.name_if_not_member_errors = []

                if (     !  this.non_member 
                        && (this.pledge_amount != null 
                        || this.pledge_amount > 0
                        || this.pledge_amount.length != 0)
                        && (this.selectedMember != null
                        || this.selectedMember != 0)){
                                return true
                        }   
                if (    this.non_member   
                        && (this.pledge_amount != null 
                        || this.pledge_amount > 0)
                        && (this.name_if_not_member != null
                        || this.name_if_not_member != '')){
                                return true
                        } 
                if (    ! this.non_member
                        &&  (this.selectedMember == null
                        || this.selectedMember == 0)){
                                this.selected_member_errors.push("select a member")
                                return false
                }  
                if (    this.non_member
                        && (this.name_if_not_member.length < 1
                        || this.name_if_not_member == null)){
                                this.name_if_not_member_errors.push("enter name of the person who pledged")
                                return false
                }                                                     
                if (this.pledge_amount < 1
                        || this.pledge_amount == null
                        || this.pledge_amount.length == 0){
                                this.pledge_amount_errors.push("pledge amount required")
                                return false
                } 
                },
        settlePledge: function(){                
                if (this.settlePledgeFormOkay()){
                        if (! this.non_member){
                                this.adding_to_project = true
                                this.$http({
                                        method: 'post',
                                        url: this.$BASE_URL + '/api/projects/service-pledge/',
                                        data: {
                                                project_id: this.$route.params.id,
                                                member_id: this.selectedMember,
                                                recording_member_id: this.$session.get('member_id'),                             
                                                amount: this.pledge_amount                                                                                   
                                        }
                                        }).then(response => {                                                                                                                                                                     
                                                this.selectedMember = null                                              
                                                this.pledge_amount = null                        
                                                this.adding_to_project = false
                                                this.enable_add_pledge_button = true                                                
                                                this.memberSearch = ''       
                                                alert("amount " + response.data.payment_amount+ " "
                                                        + "settled for pledge by " + response.data.pledge.member.member.first_name 
                                                        + "\n remaining amount is " + response.data.pledge.remaining_amount
                                                        + "\n percentage settled is "
                                                        + response.data.pledge.percentage_funded )                     
                                        })
                                        .catch((err) => {
                                                this.adding_to_project = false
                                                alert("error, this may be because the member you selected has not pledged for this project")
                                                                        
                                        })
                        }
                        
                }

        }
    }

}
</script>


<style >
</style>
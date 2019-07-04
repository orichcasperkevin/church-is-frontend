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
                                <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-contributions-tab" data-toggle="pill" href="#v-pills-contributions" role="tab" aria-controls="v-pills-contributions" aria-selected="true" v-on:click="getContributions()">
                                        <img style="width: 20%; height: auto" src="@/assets/icons/icons8-request-money-filled-50.png">
                                        contributions
                                </a>
                                <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-pledges-tab" data-toggle="pill" href="#v-pills-pledges" role="tab" aria-controls="v-pills-pledges" aria-selected="false" v-on:click="getPledges()">
                                        <img style="width: 20%; height: auto" src="@/assets/icons/icons8-promise-filled-50.png">
                                        pledges
                                </a>
                            
                        </div>                
                </div>
                <div class="col">
                        <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-contributions" role="tabpanel" aria-labelledby="v-pills-contributions-tab">
                                <h3 ><span v-for = "data in context.response">{{data.name}} /</span> contributions</h3>
                                <hr/>
                                <div class="home-menu-item" style="text-align: center">

                                                <div class="row" v-for = "data in context.response " >                                                        
                                                        <div class=" col-4 card-text" style=" padding: 5px">
                                                                <small class="text-muted">required amount</small>                                                                
                                                                <h3 class="text-info">KSh {{humanize(data.required_amount)}}</h3>
                                                        </div>
                                                        <div class=" col-4 card-text" style="padding: 5px">
                                                                <small class="text-muted">raised amount</small>                                                                
                                                                <h3 class="text-success">KSh {{humanize(data.raised_amount)}}</h3>

                                                        </div>
                                                        <div class="col-4 card-text" style="padding: 5px">
                                                                <small class="text-muted">percentage funded</small>                                                      
                                                                <h3 class="text-danger">{{data.percentage_funded}} %</h3>
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
                                                <th>name</th>
                                                <th>amount</th>
                                                <th>date</th>
                                                <th>recorded by</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for = "data in contributions.response">
                                                
                                                <td v-if = "data.member != null">{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                <td v-if = "data.names != ''"><span class="text-info">(N.M)</span> {{data.names}}</td>
                                                <td><p class="text-success">{{humanize(data.amount)}}</p></td>
                                                <td>{{data.recorded_at}}</td>
                                                <td><p class="text-info">{{data.recorded_by.member.first_name}} {{data.recorded_by.member.last_name}}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="v-pills-pledges" role="tabpanel" aria-labelledby="v-pills-pledges-tab">
                                    <div v-if = "pledges_selected">
                                        <h3><span v-for = "data in context.response">{{data.name}} /</span> pledges</h3>
                                        <hr/>
                                        <div class="home-menu-item" style="text-align: center">

                                                        <div class="row" v-for = "data in context.response " >                                                        
                                                                <div class=" col-4 card-text" style=" padding: 5px">
                                                                        <small class="text-muted">total in pledges-</small>                                                                
                                                                        <h3 class="text-info">KSh {{humanize(data.total_in_pledges)}}</h3>
                                                                </div>
                                                                <div class=" col-4 card-text" style="padding: 5px">
                                                                        <small class="text-muted">total in settled pledges-</small>                                                                
                                                                        <h3 class="text-success">KSh {{humanize(data.total_in_settled_pledges)}}</h3>
        
                                                                </div>
                                                                <div class="col-4 card-text" style="padding: 5px">
                                                                        <small class="text-muted">percentage of pledges settled</small>                                                      
                                                                        <h3 class="text-danger">{{data.percentage_of_pledge_settled}} %</h3>
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
                                                        <th>name</th>
                                                        <th>amount pledged</th>
                                                        <th>amount raised</th>
                                                        <th>amount remaining</th>
                                                        <th>percentage funded</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for = "data in pledges.response" v-if="selectedMember == '' || selectedMember == null || memberSearch == ''">                                                                                                                
                                                        <td v-if = "data.member != null">{{data.member.member.first_name}} {{data.member.member.last_name}}</td>
                                                        <td v-if = "data.names != ''"><span class="text-info">(N.M)</span> {{data.names}}</td>
                                                        <td>{{humanize(data.amount)}}</td>
                                                        <td><p class="text-success">{{humanize(data.amount_so_far)}}</p></td>
                                                        <td><p class="text-danger">{{humanize(data.remaining_amount)}}</p></td>
                                                        <td><span class="badge badge-pill badge-info">{{data.percentage_funded}}</span></td>
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                    </div>
                                </div>
                               
                        </div>
                </div>
                <div class="col-12 col-sm-10 col-md-8 col-lg-3">
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
                                        <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="added_contribution.length > 0">
                                                <strong>
                                                        <span v-for="data in added_contribution">contribution by {{data.member.member.username}} amount {{humanize(data.amount)}} was successfully added</span>
                                                </strong> 
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
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
                                                    <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch">   
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
                            <button type="button" class="btn btn-success" disabled v-if="! enable_add_button"><b>+</b> add contribution</button>
                            <button type="button" class="btn btn-success" v-if="enable_add_button" v-on:click="addContribution()">{{add_contribution_button_text}}</button>
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
                            <button type="button" class="btn btn-success" disabled v-if="! enable_add_pledge_button"><b>+</b> add pledge</button>
                            <button type="button" class="btn btn-success" v-if="enable_add_pledge_button" v-on:click="addPledge()">{{add_pledge_button_text}}</button>
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
                            <button type="button" class="btn btn-success" v-on:click="settlePledge()"> settle pledge</button>
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
    name : 'projectDetail',
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
            memberSearch: '',found_members:[],
            memberSearch_status: '',selectedMember: 0,
            showMemberInput: false,
            member_ids: [],
        //add contribution
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
            add_pledge_button_text: '+ addd pledge',
            enable_add_pledge_button: true,
            pledge_amount: null,        
            pledge_due_date: '',
            pledge_amount_errors: [],
            selected_member_errors: [],name_if_not_member_errors: [],
            pledge_date_errors: []

        }
    },
    created () {
        this.fetchdata()
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    watch: {
        '$route': 'fetchdata',
    // search for member
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
                this.fetchdata()
            }
        },
        selectedMember: function(){
                if (this.selectMember > 0
                    && ! this.non_member
                    && this.contribution_amount > 0){
                        this.added_contribution = []
                        this.enable_add_button = true
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
        humanize: function(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        fetchdata: function() {
            this.fetch_data_error = []
            this.$http.get(this.$BASE_URL +'/api/projects/project-with-id/' + this.$route.params.id + '/')
                .then(response => {
                this.context = {"response": response.data } 
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })

            this.$http.get(this.$BASE_URL +'/api/projects/contribution-for-project/'+ this.$route.params.id + '/')
                .then(response => {
                this.contributions = {"response": response.data } 
                var array = this.contributions.response
                this.foundItems = array.length
                })
                .catch((err) => {
                    
                })
        },
        getPledges: function(){
            this.memberSearch = ''
            this.tab = 'pledges'
            this.pledges_selected = true
            this.$http.get(this.$BASE_URL +'/api/projects/pledges-for-project/'+ this.$route.params.id + '/')
                .then(response => {
                this.pledges = {"response": response.data } 
                var array = this.pledges.response
                this.foundPledges = array.length
                })
                .catch((err) => {
                    
                })
        },
        getContributions: function(){
            this.tab = 'contributions'
        },
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
        //add contribution
        addContribution: function(){
                if (this.non_member){
                        this.enable_add_project_button = false
                        this.add_contribution_button_text = '+ add contribution'            
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
                               this.memberSearch = ''    
                               this.name_if_not_member = ''
                               this.phone_number = ''
                               this.contribution_amount = null                                                                                                                       
                               this.add_contribution_button_text = '+ add contribution'                                   
                               alert("contribution succesfully added")


                        })
                        .catch((err) => {
                                alert("an error has occured")
                        })
                }
                if (! this.non_member){                   
                        this.enable_add_project_button = false
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
                               this.memberSearch = ''
                               this.contribution_amount = null
                               this.added_contribution.push(response.data)                                 
                               this.add_contribution_button_text = '+ add contribution'
                               this.enable_add_button = false  
                               alert("contribution succesfully added")
                        })
                        .catch((err) => {
                                alert("an error has occured.")
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
                                                this.enable_add_pledge_button = true                                                
                                                this.memberSearch = ''       
                                                alert("pledge of amount " + response.data.amount + "\n"
                                                        + "added for " + response.data.member.member.first_name)                     
                                        })
                                        .catch((err) => {
                                                alert("an error occured while attempting to add pledge. \n"
                                                        + "check your connection and try again")
                                                                        
                                        })
                        }
                        if (this.non_member){
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
                                console.log(this.selectedMember)
                                console.log(this.project_id)
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
                                                this.enable_add_pledge_button = true                                                
                                                this.memberSearch = ''       
                                                alert("amount " + response.data.payment_amount+ " "
                                                        + "settled for pledge by " + response.data.pledge.member.member.first_name 
                                                        + "\n remaining amount is " + response.data.pledge.remaining_amount
                                                        + "\n percentage settled is "
                                                        + response.data.pledge.percentage_funded )                     
                                        })
                                        .catch((err) => {
                                                alert("an error occured while attempting to add pledge. \n"
                                                        + "check your connection and try again")
                                                                        
                                        })
                        }
                        
                }

        }
    }

}
</script>


<style >
</style>
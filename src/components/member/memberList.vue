<template>
    <div class="memberList">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{name: 'Home'}">Home</router-link> 
          <li class="breadcrumb-item active" aria-current="page">members</li>
        </ol>
      </nav>
      <body>
        <div class="container">
        <div class="row">
        <div class="filters col-12 col-sm-10 col-md-8 col-lg-2" style="padding: 0px 0px 0px 0px">
          <form>
            <div class="form-group">
                <label for="searchInput"><h5><b>search by first name</b></h5></label>
                <input type="text" class="form-control" id="searchInput" aria-describedby="searchHelp" placeholder="E.g John,Brian etc" autofocus>
                <small id="searchHelp" class="form-text text-muted">search members by their first names</small>
            </div>
          </form>
          <p>
              <a class="" data-toggle="collapse" href="#collapseMoreFilters" role="button" aria-expanded="false" aria-controls="collapseMoreFilters">
                <div class="moreButton">
                  <img style="width: 25px ;height: auto" src="@/assets/icons/icons8-down-arrow-64.png">
                  more filters
                </div>
              </a>
          </p>
          <div class="collapse" id="collapseMoreFilters">
              <div id="container">
                  <div class="accordion">
                    <label for="tm" class="accordionitem"><b>names</b> <span class="arrow">&raquo;</span></label>
                    <input type="checkbox" id="tm"/>
                    <form style="padding: 5px 5px">
                        <div class="form-group">
                            <input type="text" class="form-control" id="searchInput" aria-describedby="searchHelp" placeholder="search by last name" autofocus>
                        </div>
                      </form>
                      <form style="padding: 5px 5px">
                          <div class="form-group">
                              <input type="text" class="form-control" id="searchInput" aria-describedby="searchHelp" placeholder="search by nick name" autofocus>
                          </div>
                        </form>
                  </div>
                  
                  <div class="accordion">
                    <label for="tn" class="accordionitem"><b>gender</b> <span class="arrow">&raquo;</span></label>
                    <input type="checkbox" id="tn"/>
                    <form style="padding: 5px 5px">
                        <div class="radio">
                            <input type="radio" name="optradio" checked> male
                          </div>
                          <div class="radio">
                            <input type="radio" name="optradio"> female
                          </div>
                    </form>
                  </div>
                  
                  <div class="accordion">
                    <label for="to" class="accordionitem"><b>roles</b> <span class="arrow">&raquo;</span></label>
                    <input type="checkbox" id="to"/>
                    <div>
                        <div class="radio">
                            <input type="radio" name="optradio" checked> Option 1
                          </div>
                          <div class="radio">
                            <input type="radio" name="optradio"> Option 2
                          </div>
                          <div class="radio disabled">
                            <input type="radio" name="optradio" disabled> Option 3
                          </div>
                    </div>
                  </div>
                </div>  
          </div>

        </div>
          <div class="col" style="padding: 60px">
            <div>
              <p>
              found <span class="badge badge-pill badge-info">3</span>
              </p>
            </div>
              <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row"></th>
                      <td><img src="@/assets/avatars/icons8-user-female-skin-type-4-40.png">
                        <router-link :to="`/memberDetail/1/`">
                          mark masai
                        </router-link>
                       </td>
                     
                   
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td><img src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                        <router-link :to="`/memberDetail/1/`">
                          Joshua Mayeki
                        </router-link>
                      </td>
                 
                 
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td><img src="@/assets/avatars/icons8-user-male-skin-type-4-40.png"> 
                        <router-link :to="`/memberDetail/1/`">
                          Nickson Korir
                        </router-link>
                      </td>
                      
                  
                    </tr>
                  </tbody>
                </table>
          </div>
          <div class="col-12 col-sm-10 col-md-8 col-lg-3">
            <div style="padding: 0px 0px 25px 0px">
              <router-link :to="{name: 'memberAdd'}">
                  <div class="add-button">
                    + Add member
                  </div>
              </router-link>
            </div>
              <div class="list-group ">
                  <button type="button" class="action-list list-group-item list-group-item-action border-0" data-toggle="modal" data-target="#emailModatCenter" ><img src="@/assets/icons/icons8-email-64.png">email people</button>
                  <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#textModalCenter"><img src="@/assets/icons/icons8-comments-64.png">text people</button>
                  <button type="button" class="list-group-item list-group-item-action border-0"  data-toggle="modal" data-target="#assignModalCenter"><img src="@/assets/icons/icons8-add-user-group-man-man-64.png">assign group</button>
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
                      <h5 class="modal-title" >text people</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">message</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">send text</button>
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
                        ......
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">assign</button>
                      </div>
                    </div>
                  </div>
                </div>   
          </div>
        </div>
        </div>
      </body>
    </div>
  </template>

<script>
export default {
  name: 'memberList',
  data () {
    return {
    }
  }
}
</script>


<style >
</style>
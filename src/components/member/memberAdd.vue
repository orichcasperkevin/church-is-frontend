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
                            <label><input type="checkbox" value=""> names</label>
                        </div>
                        <div class="checkbox">
                            <label><input type="checkbox" value=""> gender</label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" value=""> roles</label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" value=""> age</label>
                        </div>
                        <div class="checkbox">
                                <label><input type="checkbox" value=""> marital status</label>
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
                                <input type="text" class="form-control"  placeholder="first name" autofocus>
                        </div>
                        <div class="form-group">
                                <label><b>last name :</b></label>
                                <input type="text" class="form-control"  placeholder="last name" autofocus>
                        </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="mx-auto">
                    <div class="">
                        <div class="row" style="padding: 5px 60px ">
                                <div class="checkbox col">
                                        <div class="radio">
                                                <label><input type="radio" name="optradio" checked> male</label>
                                              </div>
                                              <div class="radio">
                                                <label><input type="radio" name="optradio"> female</label>
                                              </div>
                                </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="mx-auto">
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
                <hr/>
                <div class="mx-auto">
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
                <hr/>
                <div class="mx-auto">
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
                <hr/>
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
    }
  }
}
</script>


<style >
</style>
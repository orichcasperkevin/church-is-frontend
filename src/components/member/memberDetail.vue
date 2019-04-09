<template>
    <div class="memberDetail">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name: 'Home'}">Home</router-link> 
                <li class="breadcrumb-item"><router-link :to="{name: 'memberList'}">members</router-link> 
                <li class="breadcrumb-item active" aria-current="page">member detail</li>
            </ol>
    </nav>
    <div class="container">
            <div class="row">
              <div class="col-3">
                    <div class="list-group ">
                            <router-link :to="{name: 'Home'}" class="action-list list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-user-30.png"> detail</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-user-groups-filled-50.png"> groups</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-attendance-filled-50 (1).png"> attendance</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-donate-filled-50.png"> contibutions</router-link>
                            <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action border-0"><img class="church-is-menu" src="@/assets/icons/icons8-cancel-26.png"> delete</router-link>
                    </div>  
              </div>
              <div class="col-9">
                <hr/>
                <div class=" row mx-auto"><h2>Real Big Names</h2></div>
                <div style="padding: 10px 10px 10px 10px">
                </div>
                <div class="mx-auto" style="width: 200px;">
                    <div class="row">
                            <div class="col border border-primary" style=" height: 100px ;border-radius: 15px">
                                <div style="padding: 25px 25px 25px 25px">
                                    <img src="@/assets/avatars/icons8-user-male-skin-type-4-40.png">
                                </div>
                            </div>
                            <div class="col">
                                <b>email:</b>
                                <b>phone number:</b>
                            </div>
                    </div>
                </div>
                <hr/>
                <div class="row" style="padding: 25px 25px 25px 25px">
                    <div class="col">
                        <div class="card border-0" style="max-width: 18rem;">
                                <div class="card-header border-0">personal</div>
                                <div class="card-body">
                                 <p>name:</p>
                                 <p>gender:</p>
                                 <p>role(s):</p>
                                 <p>marital status:</p>
                                 <p>age:</p>
                                </div>
                        </div>
                        <div class="card border-0" style="max-width: 18rem;">
                                <div class="card-header border-0">residence & contact</div>
                                <div class="card-body">
                                        <p>home town:</p>
                                        <p>road:</p>
                                        <p>street:</p>
                                        <p>address:</p>
                                        <p>contact:</p>
                                </div>
                        </div>
                    </div>
                    <div class="col">
                            <div class="card border-0" style="max-width: 18rem;">
                                    <div class="card-header border-0">Family</div>
                                    <div class="card-body">
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
  name: 'memberDetail',
  data () {
    return {
    }
  }
}
</script>


<style >
</style>
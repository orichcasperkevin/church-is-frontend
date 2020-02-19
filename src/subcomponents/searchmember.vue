<!-- Child.vue -->
<template>
    <div class="child">
        <!-- search for member -->
            <input type="text" class=" form-control" placeholder="type to search member" v-model="memberSearch" autofocus>                  

            <div class="pre-scrollable searchedItemsDiv border " 
                style="min-width: 200px; 
                        max-height: 185px;
                         overflow-y: scroll;
                          position: absolute;
                           z-index: 1;
                            background-color: white"
                v-if="showMemberInput">

                <div style="padding: 10px 10px 10px 10px" class="text-info" >{{memberSearch_status}}</div> 

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
</template>
<script>
export default {
name: 'searchmember',
created () {        
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
},
data() {
    return {
    childMessage: '',
    //member search
    memberSearch: '',found_members:[],
    memberSearch_status: '',
    selectedMember: null,
    showMemberInput: false,  
    }
},
watch:{
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
    selectedMember: function(){
        if (this.selectedMember){
            this.emitToParent()
        }
    }

},
methods: {
    // Define the method that emits data to the parent as the first parameter to `$emit()`.
    // This is referenced in the <template> call in the parent. The second parameter is the payload.
    emitToParent (event) {
        this.$emit('memberSelected', this.selectedMember)
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
}
}
</script>
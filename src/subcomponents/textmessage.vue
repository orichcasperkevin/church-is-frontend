<!-- Child.vue -->
<template>
    <div>
        <!-- Modal text people -->
        <div class="modal fade" id="textModalCenter" tabindex="-1" role="dialog" aria-labelledby="smsModal" aria-hidden="true">
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
                                <label for="exampleFormControlTextarea1">
                                    message {{memberIds.length}} members
                                    <span  class="mt-2 ml-2 small text-muted" 
                                        v-if="sms_credit_balance"
                                        style="transition: ease-out;">
                                        {{sms_credit_balance}} left to spend.
                                    </span>
                                </label>
                                    <!-- text message -->                                    
                                    <textarea  type="text" class="form-control" placeholder="type text message" 
                                    v-model="message" v-on:focus="getSMSCreditBalance()" rows="3">                  
                                </textarea>
                                <p class="mt-2 ml-2 small text-muted"><span class="font-weight-bold">{{numberOfMessages}}</span> messages | a message is 160 characters long</p>                                
        
                            </div>
                            <div v-if="sms_status.length > 0" class="text-center">
                                <p class="text-success">Successfull</p>
                                <p class="text-info"> The members will receive your message.</p>
                                <p> check sms outbox later as it may take a while</p>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click=closeSmsModal() data-dismiss="modal">Close</button>
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
    </div>
</template>
<script>
export default {
name: 'textmessage',
data() {
    return {
        memberIds:[],
        message: '',
        numberOfMessages:0,        
        sms_status: [],
        sending_message: false,
        sms_credit_balance: null
    }
},
props: {
    memberIds: [],
},
watch:{
    message: function(){
        if (this.message.length){
            this.numberOfMessages = parseInt(this.message.length / 130) + 1
        }        
        else{
            this.numberOfMessages = 0
        }
    }
},
methods: {
    // Define the method that emits data to the parent as the first parameter to `$emit()`.
    // This is referenced in the <template> call in the parent. The second parameter is the payload.
    emitToParent (event) {        
        this.$emit('messageSet', this.message)
    },
    //church sms balance
    getSMSCreditBalance: function(){
        this.$http.get(this.$BASE_URL + '/api/sms/sms-credit-balance')
        .then((response)=>{            
            this.sms_credit_balance =  response.data.UserData.balance
        })
    },
    //send message
    sendMessage: function (){
        this.sending_message = true
        this.$http({
                method: 'post',
                url: this.$BASE_URL + '/api/sms/add-sms/',
                data: {
                        sending_member_id: this.$session.get('member_id'),
                        app: "CHURCH",
                        message: this.message,
                        website: true,
                        receipient_member_ids: this.memberIds
                }
                }).then(response => {        
                        this.sms_status.push(response.data)          
                        this.sending_message = false
                })
                .catch((err) => {                        
                        this.sending_message = false
                })
        },
        closeSmsModal: function (){
            this.sms_status = []
            this.message = ""
      },
    
}
}
</script>
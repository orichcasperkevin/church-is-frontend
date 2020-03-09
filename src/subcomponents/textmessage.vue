<!-- Child.vue -->
<template>
    <div>
        <!-- text message -->
        <textarea  type="text" class="form-control" placeholder="type text message" 
                v-model="message" v-on:blur="emitToParent()" rows="3" autofocus>                  
        </textarea>
        <p class="mt-2 ml-2 small text-muted"><span class="font-weight-bold">{{numberOfMessages}}</span> messages | a message is 160 characters long</p>
    </div>
</template>
<script>
export default {
name: 'textmessage',
data() {
    return {
        message: '',
        numberOfMessages:0
    }
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
}
}
</script>
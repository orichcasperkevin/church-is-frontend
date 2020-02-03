<template>
    <div>
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                    <li class="breadcrumb-item active" aria-current="page">Sms Analytics</li>
                </ol>
        </nav>
        <div>
            {{sms_this_month}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'smsAnalytics',
    data () {
        return{
           sms_this_month: null
        }
    },
    created () {
       this.fetchData() 
    },
    methods: {
        fetchData () {            
            this.$http.get(this.$BASE_URL + '/api/sms/sms-this-month/')
                .then(response => {
                this.sms_this_month =  response.data 
               
                })
                .catch((err) => {
                    alert("error occured while fetching data")
                })
        }
    }
}
</script>


<style >
</style>
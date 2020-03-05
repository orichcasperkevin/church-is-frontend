<template>
    <div>
        <nav aria-label="breadcrumb" class="container">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                    <li class="breadcrumb-item active" aria-current="page">SMS outbox</li>
                </ol>
        </nav>
        <div class="container">
                <table class="table table-responsive">
                        <thead>
                          <tr>     
                            <th scope="col">date</th>                       
                            <th scope="col">message</th>
                            <th scope="col">receiver</th>
                            <th scope="col">status</th>
                            <th> cost</th>
                          </tr>
                        </thead>
                        <tbody class="text-muted">
                          <tr v-for= "message in sms_this_month" >  
                            <td>{{$humanizeDate(message.sms.date)}}</td>                                                     
                            <td><p>{{message.sms.message}}</p></td>
                            <td>
                                {{message.receipient.member.first_name}} {{message.receipient.member.first_name}}                        
                            </td>
                            <td>{{message.status}}
                            <td>{{message.cost}}</td>                            
                          </tr>
                        </tbody>
                      </table>            
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
            this.$store.dispatch('update_isLoading', true)          
            this.$http.get(this.$BASE_URL + '/api/sms/sms-this-month/')
                .then(response => {
                this.sms_this_month =  response.data 
                this.$store.dispatch('update_isLoading', false)
                })
                .catch((err) => {
                    this.$store.dispatch('update_isLoading', false)
                    alert("error occured while fetching data")
                })
        }
    }
}
</script>


<style >
</style>
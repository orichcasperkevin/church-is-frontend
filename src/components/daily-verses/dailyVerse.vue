<template>
    <div>
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                    <li class="breadcrumb-item active" aria-current="page">daily verses</li>
                </ol>
        </nav>
        <div class="container">
            <div class="row">
                <div class = "col-12 col-sm-10 col-md-8 col-lg-2" >
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="action-list list-group-item list-group-item-action border-0 active" id="v-pills-income-tab" data-toggle="pill" href="#v-pills-today" role="tab" aria-controls="v-pills-today" aria-selected="true">today</a>
                        <a class="action-list list-group-item list-group-item-action border-0" id="v-pills-expenditure-tab" data-toggle="pill" href="#v-pills-this-month" role="tab" aria-controls="v-pills-this-month" aria-selected="false" v-on:click="getVersesThisMonth()">this month</a>  
                </div>
                </div>
                <div class = "col">
                    <div class="tab-content" id="v-pills-tabContent">
                       
                        <div class="tab-pane fade show active" id="v-pills-today" role="tabpanel" aria-labelledby="v-pills-today-tab">
                            <div v-if = "! verse_available">
                                no verse added for today: <a href="#"> <b>+</b> addhihu </a>
                            </div>
                            <div v-if = "verse_available">
                                verse and lesson by: <span class="text-secondary" v-for = "data in verse_today.response">{{data.by.member.first_name}} {{data.by.member.last_name}}</span>
                                <h3 class="breadcrumb-item active"><span v-for = "data in verse_today.response">{{data.verse}}</span></h3>                    
                                <div class="border border-0" style="border-radius: 5px; padding: 10px ; background-color: #d2d2d2;" v-for = "data in verse_today.response">
                                    {{data.text}}
                                </div>
                                <div v-for = "data in verse_today.response" >
                                    <p></p>
                                    <h3 class="text-info">lesson: </h3>

                                    {{data.lesson}}
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade show " id="v-pills-this-month" role="tabpanel" aria-labelledby="v-pills-this-month-tab">
                            <div v-if = "this_month_selected">                
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>date</th>
                                            <th>verse</th>
                                            <th>by</th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        <tr v-for = "data in verses_this_month.response" >                                        
                                            <td>{{data.day}}</td>
                                            <td><span class="backButton"><a href = "#" style="text-decoration: none">{{data.verse}}</a></span></td>                        
                                            <td><p class="text-secondary">{{data.by.member.first_name}} {{data.by.member.last_name}}</p></td>
                                        </tr>                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "col-12 col-sm-10 col-md-8 col-lg-3" >
                    <div style="padding: 0px 0px 25px 10px">
                        <a href="#" data-toggle="modal" data-target="#addProject" style="text-decoration: none">
                            <div class="add-button">
                                + add verse today
                            </div>
                        </a>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dailyVerse',
    data () {
        return{
            fetch_data_error: [],
            verse_today: null,
            verse_available: false,
            this_month_selected: false,
            verses_this_month: null
        }
    },
    created () {
       this.fetchData() 
    },
    methods: {
        fetchData () {
            this.fetch_data_error = []
            this.$http.get('http://127.0.0.1:8000/api/daily-verses/verse-today/')
                .then(response => {
                this.verse_today = {"response": response.data }
                if (this.verse_today.response.length > 0){
                    this.verse_available = true
                }
                })
                .catch((err) => {
                    this.fetch_data_error.push(err)
                })
        },
        getVersesThisMonth: function () {
            this.this_month_selected = true
            this.get_verses_error = []
            this.$http.get('http://127.0.0.1:8000/api/daily-verses/verses-this-month/')
                .then(response => {
                this.verses_this_month = {"response": response.data }
                })
                .catch((err) => {
                    this.get_verses_error.push(err)
                })
        }
    }
}
</script>


<style >
</style>
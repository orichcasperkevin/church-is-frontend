<template>
    <div>
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><span class="backButton"><router-link style="text-decoration: none" :to="{name: 'Home'}">Home</router-link></span>  
                    <li class="breadcrumb-item active" aria-current="page">news</li>
                </ol>
        </nav>
        <div class="container">
            <h3>              
                News
            </h3> 
            <hr>
            <div class="row">
                <!-- navigation on the left -->
                <section class="col">
                    
                </section>
                <!-- content -->
                <section class="col-lg-9">
                    <article id="news">                            
                        <div class="row">                                
                            <div class="col-lg-12 " v-if="news">                                                                        
                                <div    v-for="news in news"
                                        class="border border-light shadow p-2 mb-2 bg-white rounded">
                                    <i class="ml-3 text-primary font-weight-bold">{{news.author}}</i>
                                    <p class="ml-3 lead">{{news.heading}}</p>   
                                    <article :id="`article_` + news.id">                                    
                                    </article>                                                                                                         
                                    <p>
                                    <p class="ml-3">{{$humanizeDate(news.date)}}</p>
                                    </p>
                                </div>                                        
                            </div>
                            <div class="col text-center text-muted" v-else>
                                <h3>Oops!</h3>
                                <h3>news articles not found</h3>
                                <p>add news articles to have content here</p>
                            </div>
                            
                        </div>                            
                    </article>
                </section>
                <!-- actions -->
                <section class="col-lg-2">
                    <button data-toggle="modal" data-target="#addNewsModal"
                            class="btn btn-success">
                        + Add news
                    </button>
                </section>
            </div>                      
        </div>

        <!-- MODALS -->
        <section>
            <!-- Modal -->
            <div class="modal fade" id="addNewsModal" tabindex="-1" role="dialog" aria-labelledby="addNewsModal" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" >Add news</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            <label class="font-weight-bold">news heading / title</label>                            
                            <input  v-model="news_title"
                                    type="text" class="mb-4 form-control" 
                                    placeholder="A catchy title for your news article">
                            
                            <label class=font-weight-bold>news article</label> 
                            <quill-editor class="mb-4" v-model="news_article"/>

                            <label class="font-weight-bold">news author</label>                            
                            <input  v-model="news_author"
                                    type="text" class="mb-4 form-control" 
                                    placeholder="who is writing this article? eg. John Doe, Church Pastor ">
                            
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" v-on:click="addNewsArticle()">
                            add news article
                            <span v-if="adding_news_article"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                            </span>
                        </button>
                        </div>
                    </div>
                    </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'smsAnalytics',
    data () {
        return{
           news: null,
           //adding news article
           adding_news_article: false,
           news_article:null,
           news_title:null,
           news_author:null           
        }
    },
    created () {
       this.getNews() 
    },
    watch :{
        news:function(){            
            if (this.news && this.$el){
                if (this.news.length){                    
                    this.parseNewsArticles()
                }
            }
        }
    },
    methods: {
        //get news
        getNews () {  
            this.$store.dispatch('update_isLoading', true)          
            this.$http.get(this.$BASE_URL + '/api/news/recent-news/')
                .then(response => {
                    this.news =  response.data                    
                    this.$store.dispatch('update_isLoading', false)
                    // setTimeout(()=>{ this.parseNewsArticles() },15)
                })
                .catch((err) => {
                    this.$store.dispatch('update_isLoading', false)
                    alert("error occured while fetching data:" + err )
                })
        },
        parseNewsArticles: function(){
            console.log(this.news)
            for (var i in this.news){
                //article div           
                console.log("here2")   
                var article_div = document.getElementById("article_" + this.news[i].id)
                console.log(article_div)
                //new elements
                var el = document.createElement('div')
                var domString = news.article
                el.innerHTML =  domString;
                //article_div.appendChild(el.firstChild);
            }        
        },
        //adding news article
        addNewsArticle: function(){
            this.adding_news_article = true
            this.$http.post(
                this.$BASE_URL + '/api/news/add-news/',
                {
                    heading:this.news_title,
                    article:this.news_article,
                    author:this.news_author
                } 
            ).then(()=>{
                this.adding_news_article = false
                this.getNews()
            }).catch((err)=>{
                this.adding_news_article = false
                alert("an error occured :" + err)
            })
        }
    }
}
</script>


<style >
</style>
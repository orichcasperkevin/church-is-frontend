<template>
    <div>
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name: 'Home'}">Home</router-link> 
                <li class="breadcrumb-item"><router-link :to="{name: 'memberList'}">members</router-link> 
                <li class="breadcrumb-item active" aria-current="page">member detail</li>
            </ol>
    </nav>
    </div>
  </template>

<script>
export default {
  name: 'groupDetail',
  data () {
    return {
    }
  },
  created() {
        this.fetchData()
    },

  watch: {
        '$route': 'fetchData'
    },
  methods: {
        fetchData() {
            
        }
      
    }

}
</script>


<style >
</style>
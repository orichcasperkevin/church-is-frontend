<!-- Parent.vue -->
<template>
        <div>
            from child {{fromChild}}            
          <!--
          Listen for `childToParent`: the first parameter of the `$emit` method
          in the child component. We're also listening and reacting to an
          `increment` event - in this case, we increment a counter inline.
          -->
          <searchmember v-on:memberSelected="onMemberSelected" /></PassProps>
        </div>
      </template>
      <script>
      import searchmember from '@/subcomponents/searchmember.vue'
      export default {
        data () {
          return {
            myData: 0,
            counter: 0,
            fromChild: '', // This value is set to the value emitted by the child
          }
        },
        name: 'about',
        components: { searchmember },
        methods: {
          // Triggered when `childToParent` event is emitted by the child.
          onMemberSelected (value) {
            this.fromChild = value
          }
        }
      }
      </script>
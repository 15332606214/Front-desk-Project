<template>
  <div>
    <TypeNav></TypeNav>
    <h2>search</h2>
    <h3>params:{{$route.params.keyword}}</h3>
    <h3>query.keyword2:{{$route.query.keyword2}}</h3>
  </div>
</template>

<script>
export default {
    name:'search'
}
</script>

<style>

</style>
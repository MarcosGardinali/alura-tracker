<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
export default {}
</script>

<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>

<style scoped>
.box {
    background-color: #FAF0CA;
    transition: 0.5s all;
}

.box:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
<template>
    <div class="buttonBar">
            <div>
                <slot name="left"></slot>
            </div>
            <div>
                <slot name="right"></slot>
            </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.buttonBar{
    margin:5px;
    display: flex; 
    justify-content: space-between;
    align-items: center;
}
</style>
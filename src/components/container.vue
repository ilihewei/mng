<template>
    <div class="container">
        <header v-if="conf.header">
            <slot name="header"></slot>
        </header>
        <section v-if="conf.section">
            <slot name="section"></slot>
        </section>
    </div>
</template>

<script>
export default {
    name: 'base-container',
    props: {
        conf:{
            type: Object,
            default(){
                return {
                    header: true,
                    section: true
                }
            }
        }
    }

}
</script>

<style lang="less" scoped>
.container{
    height: 100%;
    background: #fff;
    padding: 20px;
    header{
        padding: 20px 0px 10px;
        padding-left: 20px;
        border: 1px solid #dcdad6;
        border-radius: 4px;
        background: #fff;
        display: flex;
        align-items: center;
    }
    section{
        margin-bottom: 6px;
        height: calc(100% - 190px);
        background: #fff;
        width: 100%;
        overflow: auto;
    }
}
</style>
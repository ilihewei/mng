<template>
    <div class="searchForm">
        <el-form inline size="mini" :ref="searchConf.formRef" :model="searchForm" label-position="left">
            <template v-for="(item,index) in searchConf.formConf">
                <el-form-item :key="index" :label="item.label" :prop="item.prop">
                    <el-date-picker v-if="item.render === 'date'" :disabled="isDisabled" v-model="searchForm[item.prop]" type="date" :placeholder="item.label">
                    </el-date-picker>
                    <el-select v-else-if="item.render === 'select'" :disabled="isDisabled" v-model="searchForm[item.prop]" :placeholder="item.label">
                        <el-option
                            v-for="(ite,index) in item.options"
                            :key="index"
                            :label="item.props ? ite[item.props.label] : ite.label"
                            :value="item.props ? ite[item.props.value] : ite.value">
                        </el-option>
                    </el-select>
                    <el-button v-else-if="item.render === 'button'" type="primary" plain :icon="item.btnIcon" @click="$emit(item.btnEnv)">{{item.btnText}}</el-button>
                    <el-input v-else type="text" :disabled="isDisabled" :placeholder="item.label" v-model="searchForm[item.prop]"/>
                </el-form-item>
            </template>
            <el-form-item v-if="!isDisabled">
                <el-button size="mini" type="primary" icon="el-icon-search" round @click="searchInput">{{searchConf.searchText}}</el-button>
                <el-button size="mini" type="warning" icon="el-icon-refresh" round @click="clearInput">{{searchConf.clearText}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:'search-form',
    props:{
        isDisabled: {
            type: Boolean,
            default(){
                return false
            }
        },
        formValue: {
            type: Object,
            default(){
                return {}
            }
        },
        searchConf: {
            type: Object,
            default(){
                return {
                    formConf: [],
                    formRef: 'searchForm',
                    searchText: 'search',
                    clearText: 'clear',
                }
            }
        }
    },
    data(){
        return {
            searchForm: {}
        }
    },
    created(){
        this.initSearchFom();
    },
    methods: {
        initSearchFom(){
            let res = {};
            this.searchConf.formConf.forEach(item=>{
                res[item.prop] = this.formValue[item.prop] || null;
            })
            this.$set(this,'searchForm',res);
        },
        searchInput(){
            this.$emit('search',this.searchForm);
        },
        clearInput(){
            this.initSearchFom();
            this.$emit('search',this.searchForm);
        }
    }
}
</script>

<style>

</style>
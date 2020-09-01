// computed:计算属性
// 算属性是由data中的已知值，得到的一个新值。
// 这个新值只会根据已知值的变化而变化，其他不相关的数据的变化不会影响该新值。
// 计算属性不在data中，计算属性新值的相关已知值在data中


//watch:监听数据的变化

//监听data中数据的变化‘
// 监听的数据就是data中的已知值
/* <div id="app">
    <input type="text" v-model="name" />
    <span v-show="isShow">请输入3-6个字符</span>
    <br />
    <input type="text" v-model="todoName" />
</div>

<script src="./vue.js"></script>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            name: "zs",
            todoName: "ls"
        },
        computed: {
            isShow() {
                //当this.name的长度小于3或者大于6时显示提示内容(我根据name的变化而变化)
                if (this.name.length >= 3 && this.name.length <= 6) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        watch: {
            //监听data中的name,如果发生了变化,就把变化的值给data中的todoName(我影响了别人)
            name(newVal) {
                this.todoName = newVal;
            }
        }
    });
</script>



// computed 　　　　
// 　　　　当一个属性受多个属性影响的时候就需要用到computed
// 　　　　最典型的例子： 购物车商品结算的时候
// watch
// 　　　　当一条数据影响多条数据的时候就需要用watch

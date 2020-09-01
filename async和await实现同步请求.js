
fun1=()=>{
    sleep(1000)
    console.log('1')
    }
    var sleep = function(time) {
      var startTime = new Date().getTime() + parseInt(time, 10);
      while(new Date().getTime() < startTime) {}
    };
    var fun2 = async function(){
      // sleep(5000)
      
      await fun1();
      sleep(5000)
      console.log('3')
    }
    fun2()
    sleep(5000)
    console.log("2")
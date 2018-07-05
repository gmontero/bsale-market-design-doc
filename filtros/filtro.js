var Filtro = {
    init: function(){
        $(window).resize(function() {
            $("#filters, body, #leftbar").removeClass("toggled");
        });
    },
	start: function(obj) {
	    var href = $(obj).attr('href');
	    var paramsTex = Filtro.setToString(Filtro.getData());
	    if (paramsTex== ''){
    	    return
    	}
	    window.location= href + '?' + paramsTex
	    return;
	},
	getData: function(clase) {
	    var hash = {}
	    $('#filters [name]:checked').each(function(){
	        hash = Filtro.getHash(this, hash)
	    })
	    $('#filters [name][type="hidden"]').each(function(){
	        hash = Filtro.getHash(this, hash)
	    })
	    return hash;
	}, 
	//Convierte un hash a string con el formato de html:"parametro=valor&"
    //@params hash parametro
    //@return string        
    setToString: function(params) {
        var sort = ['price&way=asc','price&way=desc', 'name&way=asc', 'name&way=desc'];
        
		var element = '';
		var i = 0;
		for (var k in params){
		    var value = params[k]
		    if (Array.isArray(value)){
		        console.log(element+ "vacio");
		        for (var val in value){
		            if(value[val] == undefined){
                		continue;
                	}
                	if (element == ''){
                	    
                	    element += k+"[]="+escape(value[val]);
                	   
        			}else{
        			    element += "&"+ k+"[]="+escape(value[val]); // element = element+"&"+ k+"[]="+escape(value[val]);
        			}
		        }
		    }else{
		        
    			if(params[k] == undefined){
            		continue;
            	}
    			if (element == ''){
    				
    				// revisa que hay un valor llamado sortby
    				if(params[k].slice(0,4) == 'sort'){
    				    var g = params[k].slice(6,7);
    				    console.log(g);
    				    console.log(sort[g]);
    				    params[k] = sort[g-1];
    				    element += k+"="+(params[k]);
    				}else{
    				    element += k+"="+escape(params[k]);
    				}
    			}else{
    			    
    			    if(params[k].slice(0,4) == 'sort'){
    			        var g = params[k].slice(6,7);
    			        console.log(g);
    			        console.log(sort[g]);
    				    params[k] = sort[g-1];
    				    element += "&"+ k+"="+(params[k]);
    				}else{
    				    element += "&"+ k+"="+escape(params[k]);
    				}
    			    console.log(params[k]);
    			}
		    }
		  // Do something with element i.
		}
		return element;
    },
    getHash: function(obj, hash){
        var name = $(obj).attr('name');
        var value = $(obj).attr('value');
        
        if( value == ''){
            return hash;
        }
        if (hash[name] != undefined)
            if (Array.isArray(hash[name])){
                hash[name].push(value);
            }else{
                var temp = hash[name]
                hash[name] = []
                hash[name].push(temp);
                hash[name].push(value);
            }
        else{
            hash[name] = value;
        }
        return hash;
    },
    toggleMenu: function(){
        $("#filters, body, #leftbar").toggleClass("toggled");
    },
};
// Inicializador
$(function () {
  Filtro.init();
});
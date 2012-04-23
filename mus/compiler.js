var endTime = function (time, expr) {
    if(expr.tag == 'note')
    {
        return time + expr.dur;
    }
    else   
    {
        return endTime(time, expr.left) + endTime(0, expr.right);
    }
    
};




// maybe some helper functions
var endTime = function (time, expr) {
    if(expr.tag == 'note')
    {
        return time + expr.dur;
    }
    else   
    {
        return endTime(time, expr.left) + endTime(0, expr.right);
    }
    
};

var compileWithTime = function(time, expr, array){  
    if(expr.tag == 'note'){
        array.push({ tag: 'note', pitch: expr.pitch, start: time, dur: expr.dur });
        return 0;
    }
    else{
           var leftEndTime = endTime(time, expr.left);
 
        var left = compileWithTime(time, expr.left, array);
       
        var right = compileWithTime(leftEndTime, expr.right, array);
    
        return 0;
    }          
};

var compile = function (musexpr) {

    var a = [];
    compileWithTime(0, musexpr, a);
    
    return a;
};


var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
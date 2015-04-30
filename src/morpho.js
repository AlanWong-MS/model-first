function Morpho()
{
}

Morpho.log = function(){};
Morpho.convertFrom  = {};
Morpho.convertTo    = {};
Morpho.registerFrom = function(name, fromFunc){
  this.convertFrom[name] = fromFunc;
};

Morpho.registerTo    = function(name, toFunc) {
  this.convertTo[name] = toFunc;
};

Morpho.convert= function(source, sourceFormat, targetFormat, option){
  if(!Morpho.convertFrom[sourceFormat]){
    throw 'Source format ' + sourceFormat + ' not supported.';
  }

  if(!Morpho.convertTo[targetFormat]){
    throw 'Target format ' + targetFormat + ' not supported.';
  }

  var errors = [];
  var model = Morpho.convertFrom[sourceFormat].call(this, source, errors, option);
  var result;
  if(model){
    result = Morpho.convertTo[targetFormat].call(this, model, errors, option);
  }
  
  return {
    model     : result,
    errors    : errors
  };
};






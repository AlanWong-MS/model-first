'use strict';

describe('[YAML] Service section test', function() {
  var input='\
service:\n\
  name: Service0\n';

  var model = Morpho.loadFromYaml(input);
  it('Service name should match', function() {
    expect(model.service.name).toEqual('Service0');
  });
});

describe('[YAML] Type section test', function() {
  it('Single property should work.',
    fromYamlTypeTest(
'\
types:\n\
  - name: type1\n\
    requiredProperties: p1\n',
      [{'properties':[{'name':'p1'}],'name':'type1'}]));
      
  it('Multiple property should work,using -.',
    fromYamlTypeTest(
'\
types:\n\
  - name: type1\n\
    requiredProperties:\n\
      - p1\n\
      - p3\n',
      [{'properties':[{'name':'p1'},{'name':'p3'}],'name':'type1'}]));

  xit('Multiple property should work,using [].', // not supported by parser
    fromYamlTypeTest(
'\
types:\n\
  - name: type1\n\
    requiredProperties: [p1 p3]\n',
      [{'properties':['name','id'],'name':'type1'}]));     

  it('Property with facets should work.',
    fromYamlTypeTest(
'\
types:\n\
  - name: type1\n\
    requiredProperties:\n\
      - name: p1\n\
        type: int32\n',
      [{'properties':[{'name':'p1','type':'int32'}],'name':'type1'}]));

  it('Combined Property case should work.',
    fromYamlTypeTest(
'\
types:\n\
  - name: type1\n\
    requiredProperties:\n\
      - name: p1\n\
        type: int32\n\
      - p2',
      [{'properties':[{'name':'p1','type':'int32'},{'name':'p2'}],'name':'type1'}]));      
});

function fromYamlTypeTest(input, types)
{
  return fromYamlTest(input, {'types':types,'errors':[]});
}

function fromYamlTest(input, json){
  return function(){
    var model = Morpho.loadFromYaml(input);
    expect(model.toJson()).toEqual(JSON.stringify(json));
  };
}
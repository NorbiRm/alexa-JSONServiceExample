'use strict';
var http = require('http');

exports.handler=function(event, context){
  try{
    var request = event.request;
    //Request Type
    if(request.type==="LaunchRequest"){
      let options = {};
      options.speechText=" ";
      options.repromptText=" ";
      options.endSession=false;
      context.succeed(buildResponse(options));
    }else if(request.type==="IntentRequest"){
      let options = {};
      if(request.intent.name===" "){
        let dato=request.intent.slots.modeloDrone.value;
        options.speechText=" ";
        options.endSession=true;
        context.succeed(buildResponse(options));

      }else{
        throw "no te entiendo";
      }

    }else if(request.type=="SessionEndRequest"){

    }else{
      throw "no te entiendo";
    }
  } catch(e){
    context.fail("Exception: "+e);
  }
}
function buildResponse(options){
  var response={
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": options.speechText
      },
      "shouldEndSession": options.endSession
    }
  };
  if(options.repromptText){
      response.response.reprompt={
        "outputSpeech": {
          "type": "PlainText",
          "text": options.repromptText
        }
      };
  }
  return response;
}

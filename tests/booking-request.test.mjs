import test from 'node:test';
import assert from 'node:assert/strict';
import { sendGuestRequest, sendSponsorInquiry } from '../src/scripts/booking-request.ts';
const endpoint='https://formsubmit.co/ajax/test%40example.com';
const request={name:'Test Guest',xHandle:'@testguest',email:'guest@example.com',project:'Test Project',message:'A test pitch.',honey:''};

test('a closed or invalid destination never sends guest data',async()=>{
  const noFetch=()=>{throw new Error('Must not call the network');};
  for(const target of ['', 'https://example.org/inbox'])assert.equal((await sendGuestRequest(target,request,noFetch)).ok,false);
});
test('invalid fields and a filled honeypot never send',async()=>{
  const noFetch=()=>{throw new Error('Must not call the network');};
  for(const change of [{name:' '},{xHandle:'not a handle'},{email:'invalid'},{message:' '},{honey:'spam'},{project:'a'.repeat(161)}])assert.equal((await sendGuestRequest(endpoint,{...request,...change},noFetch)).ok,false);
});
test('sends all five named fields as JSON and accepts explicit success',async()=>{
  let sent;
  const result=await sendGuestRequest(endpoint,request,async(url,options)=>{
    assert.equal(url,endpoint);assert.equal(options.method,'POST');sent=JSON.parse(options.body);
    return new Response(JSON.stringify({success:'true'}),{status:200});
  });
  assert.deepEqual([sent.name,sent['X handle'],sent.email,sent.project,sent.message],[request.name,request.xHandle,request.email,request.project,request.message]);
  assert.equal(result.ok,true);
});
test('an HTTP 200 activation error or string false never becomes success',async()=>{
  for(const result of [{success:'false',message:'This form needs Activation'},{success:false},{message:'sent'},null]){
    assert.equal((await sendGuestRequest(endpoint,request,async()=>new Response(JSON.stringify(result)))).ok,false);
  }
});
test('non-JSON, rate limiting and connection failures are retryable failures',async()=>{
  const replies=[async()=>new Response('<html>Error</html>'),async()=>new Response('',{status:429}),async()=>{throw new Error('offline');}];
  for(const fetcher of replies)assert.equal((await sendGuestRequest(endpoint,request,fetcher)).ok,false);
});

test('sponsorship accepts an optional X handle and uses its own subject',async()=>{
  let sent;
  const result=await sendSponsorInquiry(endpoint,{...request,xHandle:''},async(url,options)=>{
    assert.equal(url,endpoint);
    sent=JSON.parse(options.body);
    return new Response(JSON.stringify({success:true}));
  });
  assert.equal(result.ok,true);
  assert.equal(sent._subject,'CR2: Partnership inquiry');
  assert.equal(sent.project,request.project);
  assert.equal(sent['X handle'],'');
});
test('sponsorship stays closed without an endpoint and validates supplied handles',async()=>{
  const noFetch=()=>{throw new Error('Must not call the network');};
  assert.equal((await sendSponsorInquiry('',request,noFetch)).ok,false);
  assert.equal((await sendSponsorInquiry(endpoint,{...request,xHandle:'not valid'},noFetch)).ok,false);
});

import { sendGuestRequest } from './booking-request';
const dialog=document.querySelector<HTMLDialogElement>('#guest-dialog')!;
const trigger=document.querySelector<HTMLAnchorElement>('[data-booking-open]')!;
const form=dialog.querySelector<HTMLFormElement>('form')!;
const fields=form.querySelector<HTMLFieldSetElement>('fieldset')!;
const feedback=form.querySelector<HTMLElement>('.booking-feedback')!;
const submit=form.querySelector<HTMLButtonElement>('[type="submit"]')!;
const success=dialog.querySelector<HTMLElement>('.booking-success')!;
let sending=false;

trigger.addEventListener('click',event=>{
  event.preventDefault();
  if (!dialog.open) dialog.showModal();
  dialog.querySelector<HTMLElement>('#guest-title')?.focus();
});
dialog.querySelectorAll<HTMLElement>('[data-booking-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
});
dialog.addEventListener('close',()=>trigger.focus({preventScroll:true}));
form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(sending||!form.dataset.endpoint)return;
  if(!form.reportValidity())return;
  const values=new FormData(form);
  const value=(key:string)=>String(values.get(key)??'');
  sending=true;
  fields.disabled=true;
  form.setAttribute('aria-busy','true');
  feedback.textContent='Sending your guest request…';
  submit.textContent='Sending…';
  const result=await sendGuestRequest(form.dataset.endpoint,{name:value('name'),xHandle:value('xHandle'),email:value('email'),project:value('project'),message:value('message'),honey:value('_honey')});
  sending=false;
  fields.disabled=false;
  form.removeAttribute('aria-busy');
  submit.textContent='Send guest request ↗';
  if(result.ok){
    form.reset();
    form.hidden=true;
    success.hidden=false;
    feedback.textContent='';
    if(dialog.open)success.focus();
  }else{feedback.textContent=result.message;}
});

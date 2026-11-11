export interface GuestRequest { name:string; xHandle:string; email:string; project:string; message:string; honey:string; }
export type DeliveryResult = { ok:true } | { ok:false; message:string };

export async function sendGuestRequest(endpoint:string, data:GuestRequest, fetcher:typeof fetch = fetch):Promise<DeliveryResult> {
  return sendContactRequest(endpoint, data, 'guest', fetcher);
}

export async function sendSponsorInquiry(endpoint:string, data:GuestRequest, fetcher:typeof fetch = fetch):Promise<DeliveryResult> {
  return sendContactRequest(endpoint, data, 'sponsor', fetcher);
}

async function sendContactRequest(endpoint:string, data:GuestRequest, kind:'guest'|'sponsor', fetcher:typeof fetch):Promise<DeliveryResult> {
  if (!/^https:\/\/formsubmit\.co\/ajax\/[^/\s?#]+$/.test(endpoint)) return { ok:false, message:'This form isn’t open yet. Please check back soon.' };
  if (data.honey) return { ok:false, message:'Unable to send this request. Please try again.' };
  const handle=data.xHandle.trim();
  const invalidHandle=(kind==='guest'||Boolean(handle))&&!/^@?[A-Za-z0-9_]{1,15}$/.test(handle);
  if (!data.name.trim() || data.name.length>100 || invalidHandle || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) || data.email.length>254 || !data.project.trim() || data.project.length>160 || !data.message.trim() || data.message.length>3000) return { ok:false, message:'Please complete the required fields with valid details.' };
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(),15000);
  try {
    const response = await fetcher(endpoint, {
      method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'}, signal:controller.signal,
      body:JSON.stringify({name:data.name.trim(),'X handle':handle,email:data.email.trim(),project:data.project.trim(),message:data.message.trim(),_subject:kind==='sponsor'?'CR2 — Sponsorship inquiry':'CR2 — Guest spot request',_template:'table',_honey:''})
    });
    if (!response.ok) return {ok:false,message:response.status===429?'Too many attempts. Please wait a moment and try again.':'Your request wasn’t sent. Please try again shortly.'};
    const result:unknown = await response.json();
    if (result && typeof result==='object' && 'success' in result && (result.success===true || result.success==='true')) return {ok:true};
    return {ok:false,message:'Your request wasn’t confirmed. Your details are still here; please try again later.'};
  } catch {
    return {ok:false,message:'We couldn’t confirm delivery. Check your connection and try again. Your details are still here.'};
  } finally { clearTimeout(timeout); }
}

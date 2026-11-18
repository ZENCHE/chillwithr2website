import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { guests, permanentGuests } from '../data';
const originals=import.meta.glob<ImageMetadata>('../assets/guests/*.jpg',{eager:true,import:'default'});
export async function guestPortraits(){return Promise.all(guests.map(async guest=>({...guest,portrait:await getImage({src:originals['../assets/guests/'+guest.handle.toLowerCase()+'.jpg'],width:256,height:256,format:'webp',quality:90})})));}
export async function permanentGuestPortraits(){return Promise.all(permanentGuests.map(async guest=>({...guest,portrait:await getImage({src:originals['../assets/guests/'+guest.handle.toLowerCase()+'.jpg'],width:128,height:128,format:'webp',quality:90})})));}

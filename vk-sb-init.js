/* CJ Supabase Init — corazon-de-jaguar · DMZ org · 2026 */
var VK_SB_URL='CJ_SUPABASE_URL_PENDIENTE';
var VK_SB_KEY='CJ_SUPABASE_KEY_PENDIENTE';
var vkSB=null;

function initSB(){
  if(typeof window.supabase==='undefined'||vkSB)return;
  try{vkSB=window.supabase.createClient(VK_SB_URL,VK_SB_KEY);}catch(e){}
}

function sbUpsertProgreso(subId,pct,total,ok,datos){
  try{
    initSB();if(!vkSB)return;
    var usr=typeof CU!=='undefined'&&CU?CU.email:'';
    vkSB.from('modulo_progreso').upsert({
      modulo_id:subId,area:subId.split('-')[0],
      fecha:new Date().toISOString().slice(0,10),
      usuario:usr,total_items:total,items_ok:ok,pct:pct,
      datos:datos||{},updated_at:new Date().toISOString()
    },{onConflict:'modulo_id,fecha'}).then(function(){}).catch(function(e){console.warn('[SB-P]',e.message);});
  }catch(e){}
}

function sbUpsertDisplay(area,semanaKey,dataObj){
  try{
    initSB();if(!vkSB)return;
    vkSB.from('display_sabores').upsert({
      area:area,semana_key:semanaKey,
      proyecto:dataObj.proyecto||'Corazón de Jaguar',
      elaboro:dataObj.elaboro||'',reviso:dataObj.reviso||'',
      obs:dataObj.obs||'',filas:dataObj.rows||[],
      actualizado_por:typeof CU!=='undefined'&&CU?CU.email:'',
      updated_at:new Date().toISOString()
    },{onConflict:'area,semana_key'}).then(function(){}).catch(function(e){console.warn('[SB-D]',e.message);});
  }catch(e){}
}

function sbInsertAlerta(tipo,severidad,titulo,mensaje,moduloId){
  try{
    initSB();if(!vkSB)return;
    vkSB.from('alertas').insert({
      tipo:tipo,severidad:severidad,titulo:titulo,mensaje:mensaje,
      modulo_id:moduloId,fecha:new Date().toISOString().slice(0,10)
    }).then(function(){}).catch(function(){});
  }catch(e){}
}

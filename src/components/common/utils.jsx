import axios from 'axios';
function getIncidents() {
  return axios.get('samples/incidentsresults.json', {responseType: 'json'});
}
function getGeneralResults() {
  return axios.get('samples/incidentsresults.json', {responseType: 'json'});
}
function getPositions(pFiltroComponente) {
  return axios.get('samples/positions.json', {responseType: 'json'});
}
function getDatosResultados(pCargoId) {
  return axios.get('samples/datosresultados' + pCargoId + '.json', {responseType: 'json'});
}
function getDatosMunicipios() {
  return axios.get('samples/municipios.json', {responseType: 'json'});
}
function getDatosCircuitos(pId) {
  return axios.get('samples/circuitos.json', {responseType: 'json'});
}
function getDatosEstablecimientos(pId) {
  return axios.get('samples/establecimientos.json', {responseType: 'json'});
}
function getDatosMesas(pId) {
  return axios.get('samples/mesas.json', {responseType: 'json'});
}
function getDatosNroMesa(pNro) {
  if (pNro.toString() === "2000")
    return axios.get('samples/mesa.2000.json', {responseType: 'json'});
  else
    return axios.get('samples/mesa.NOTFOUND.json', {responseType: 'json'});
}
function cleanNavTitle(ptitleId){
  
  const ttitulos = {
    "linkRESGRALES":"Resultados generales",
    "linkCONSULTAFILTRO":"Consulta por filtro",
    "linkNROMESA":"Consulta por Nro de Mesa",
    "linkINCIDEN":"Mesas en incidencia definitiva" 
  }


  document.getElementById("linkRESGRALES").style="border-bottom-width:0px";
  document.getElementById("linkCONSULTAFILTRO").style="border-bottom-width:0px";
  document.getElementById("linkNROMESA").style="border-bottom-width:0px";
  document.getElementById("linkINCIDEN").style="border-bottom-width:0px";

  document.getElementById(ptitleId).style="border-bottom-style:solid;border-bottom-width:2px";
  document.getElementById("navTitle").innerHTML = ttitulos[ptitleId];
  return true;
}
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}
export {getIncidents, getGeneralResults, getPositions, getDatosResultados, cleanNavTitle, getDatosMunicipios, getDatosCircuitos, getDatosEstablecimientos, getDatosMesas, getDatosNroMesa, myTrim};

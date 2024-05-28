(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */async function f(){const{Place:l,AutocompleteSessionToken:n,AutocompleteSuggestion:i}=await google.maps.importLibrary("places");let o={input:"Tadi",locationRestriction:{west:-122.44,north:37.8,east:-122.39,south:37.78},origin:{lat:37.7893,lng:-122.4039},includedPrimaryTypes:["restaurant"],language:"en-US",region:"us"};const e=new n;o.sessionToken=e;const{suggestions:t}=await i.fetchAutocompleteSuggestions(o);document.getElementById("title").appendChild(document.createTextNode('Query predictions for "'+o.input+'":'));for(let a of t){const u=a.placePrediction,c=document.createElement("li"),p=document.getElementById("results");c.appendChild(document.createTextNode(u.text.toString())),p.appendChild(c)}let s=t[0].placePrediction.toPlace();await s.fetchFields({fields:["displayName","formattedAddress"]});const d=document.getElementById("prediction");d.textContent="First predicted place: "+s.displayName+": "+s.formattedAddress}f();

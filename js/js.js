// JavaScript Document
var string;
var Lstring;
var timme = 8;
var minut =15;
var Ltimme = 8;
var Lminut =0;
var lista="";



function kontrollNamn(plats,namn)
{
			aa=plats.slice(0,1);
			bb=plats.slice(1,3);
			cc=plats.slice(4,6);
			
		
			antal=cc;
			antal = parseInt(countCells(aa, bb-10))+10;
			for(b=10; b<antal;b++) {
				nyplats=aa+bb+"_"+b;
				if (document.getElementById(nyplats).value==namn) {
					return false;
				}
			}
			return true;
				
}
		
function idDecoder(cellId){
	
	var cellInf=[cellId.slice(0,1),cellId.slice(1,3),cellId.slice(4,6)];
	return cellInf
	
	}			
			
	

function fyll(){
	var radF=0;
	oki=false;
	
	for (a=1; a<schemaJS.length;a++){
		
		if (schemaJS[a].inTable!="frisk"){
		
		if (schemaJS[a].namn.length==0){
			document.getElementById(schemaJS[a].inTable).value=schemaJS[a].namn;
			
			}
		else if (kontrollNamn(schemaJS[a].inTable,schemaJS[a].namn)==false){
					if (a==(schemaJS.length-1) && person==schemaJS[a].namn){
						alert(schemaJS[a].namn + " , du har en namne på förvaltningen, som vill ha rast samtidigt som dig. Ändra på ditt namn eller ändra tid!");
					}
		}
	else
		{
		if (document.getElementById(schemaJS[a].inTable).value.length==0){
			//lägger info i fil ruta
			
				{document.getElementById(schemaJS[a].inTable).value=schemaJS[a].namn;
				document.getElementById(schemaJS[a].inTable).style.backgroundColor="e0ffff";
				schemaJS[a].namn;
				oki=true;}
		}
				
		else{
			//Om inte rutan fil tstar vi att lägga i nästa ruta
			aa=schemaJS[a].inTable.slice(0,1);
			bb=schemaJS[a].inTable.slice(1,3);
			cc=schemaJS[a].inTable.slice(4,6);
			oki=false;
			//alert(aa + bb +"_" + cc);
			//if (aa=="L"){antal=15;}else{antal=12;}
			antal=parseInt(countCells(aa, bb-10))+10; //cc; Problemet är att detta är inte den inf vi vill ha
			
			 for(b=10; b<antal;b++) {
				 
				nyplats=aa+bb+"_"+b;
				
				if (document.getElementById(nyplats).value.length==0){
					document.getElementById(nyplats).value=schemaJS[a].namn;
					b=antal;
					oki=true;}
				}
		
			
				if (oki==false && a==schemaJS.length-1) //Sista posten i listan inte bidde ngt
				{if (person!=0)
				 {alert("Planet hälsar att någon varit snabbare än dig!");}}
				
			}//IF ELSE
		
			
		}
				
			if (oki==true && person == schemaJS[a].namn){
					mataLista(schemaJS[a].inTable);
					document.getElementById(schemaJS[a].inTable).style.backgroundColor="#E0EEE0";
				
				}
			oki=false;	
		}
		else
		{
			//document.getElementById("kontrollruta").innerHTML=document.getElementById("kontrollruta").innerHTML+"\n"+"   kl" + schemaJS[a].klocka;
			fyll_friskvard(schemaJS[a].klocka,schemaJS[a].langd, schemaJS[a].aktivitet, schemaJS[a].namn, radF);
			radF++;}
	}//For
	dinatider();
	}//Fun
		
function countCells(table, where){
				c=table+where;		
				return tabell[0][c];
	}	
	
function fyll_friskvard(json_klocka, json_langd, json_aktivitet, json_namn, radnummer){
	/*10 nov 2017 AL*/
	document.getElementById("tid"+radnummer).innerHTML=json_klocka;
	document.getElementById("langd"+radnummer).innerHTML=json_langd;
	document.getElementById("aktivitet"+radnummer).innerHTML=json_aktivitet;
	document.getElementById("namn"+radnummer).innerHTML=json_namn;
	
}
		
			
function drawTerminal()
{
	var minT;
	
	
	for(q=0; q<46;q++){
		minut=minut+15;
		minT=":"+minut;
			if (minut==60){
				minT=":00";
				minut=0;
				timme++;}
		if (q==0){string="<tr class=\"termrad\"><th scope=\"row\">"+ timme + minT +"</th>"
			}	else
	{	string=string+"<tr class=\"termrad\"><th scope=\"row\" id=\"T"+q+"_00"+"\">"+ timme + minT +"</th>";}
				c="T"+q;		
				nuff=tabell[0][c];
			for (p=0;p<nuff;p++){ 	
			
	a=p+10;
	b=q+10;		
				string=string+" <td><input type=\"text\" onclick=\"nameInput(this.id)\" id=\"T"+b+"_"+a+"\" onkeydown=\"if (event.keyCode == 13) bock(id)\"></td>";}
			
			string=string+"</tr>";}
	

document.write(string);
}
	
function drawFriskvard()
{
	/* Rita tabellen för de redan registrerade tiderna.   10 nov 2017 Al*/
string="";
	for(q=0; q<antalFrisk;q++){
		
		
		
if (q==0)string="<tr class=\"frisk_rad\">"; else string=string+"<tr class=\"frisk_rad\">"
string=string+"<th  id=\"tid"+q+"\">"+"A"+"</th>";
string=string+"<td  id=\"langd"+q+"\">"+q+"</td>";
string=string+"<td  id=\"aktivitet"+q+"\"></td>";
string=string+"<td id=\"namn"+q+"\"></td>";
string=string+"</tr>";}

//document.writeln(string);	
document.write(string);	

fyll();
}	


function drawLunch()
{ var minT;
	for(q=0; q<23;q++){
		Lminut=Lminut+30;
		minT=":"+Lminut;
		if (Lminut==60){
			minT=":"+"00";
			Lminut=0;
			Ltimme++;
			}
			
		if (q==0){Lstring="<tr class=\"termrad\"><th scope=\"row\">"+ Ltimme +minT +"</th>"
			}	else	
//Lstring=Lstring+"<tr class=\"lunchrad\">";
{	
Lstring=Lstring+"<tr class=\"lunchrad\"><th scope=\"row\" id=\"L"+q+"_00"+"\">"+ Ltimme +minT +"</th>";}
 				c="L"+q;		
				nuff=tabell[0][c];
for (p=0;p<nuff;p++){ 	
	a=p+10;
	b=q+10;
Lstring=Lstring+"<td><input type=\"text\" id=\"L"+b+"_"+a+"\"  onclick=\"nameInput(this.id)\" onkeydown=\"if (event.keyCode == 13) bock(id)\"></td>";}
Lstring=Lstring+"</tr>";
		}
//document.writeln(string);		
document.write(Lstring);	


}	

function nameInput(aaa){
	if (person.length>0){
		document.getElementById(aaa).value=person;
		}
	}

function mataLista(cell){
	
	mums=idDecoder(cell);
	
	lista+= document.getElementById(mums[0]+(mums[1]-10)+"_"+"00").innerHTML+", ";
	}

function dinatider(){
	if (person.length>0){
	 document.getElementById("tid").innerHTML="Dina bokade tider "+ person +" är:"+lista;
	}}

function ref(){
	
	
    document.getElementById("inTable").value="blank";
	document.getElementById("namn").value=person;
	document.getElementById("theForm").submit();
	}	

function bock(vilkenRuta){
	
	if (checkText(document.getElementById(vilkenRuta).value)==true){
    document.getElementById("inTable").value=vilkenRuta;
	document.getElementById("namn").value=document.getElementById(vilkenRuta).value;
	document.getElementById("theForm").submit();}
	else
	{
	document.getElementById(vilkenRuta).value=null;	
		}
	}	
	
function friskvard_bokning(){
	/* Kontroller och skickar info till json-fil. 10nov2017 AL*/
	
	
	if (document.getElementById("friskvard_namn").value == "" || document.getElementById("friskvard_klocka").value == "" || document.getElementById("friskvard_aktivitet").value == ""){
	alert("Du behöver fylla i alla rutor för att registrera friskvård.");
	document.getElementById(vilkenRuta).value=null;	
	return;
	}
	if (checkText(document.getElementById("friskvard_namn").value)==false) return;
	if (checkTime(document.getElementById("friskvard_klocka").value)==false) { alert ("Tiden skrivs i format 00:00"); return;}
	
	document.getElementById("inTable").value="frisk";
	document.getElementById("namn").value=document.getElementById("friskvard_namn").value;
	document.getElementById("F_aktivitet").value=document.getElementById("friskvard_aktivitet").value;
	document.getElementById("F_klocka").value=document.getElementById("friskvard_klocka").value;
	document.getElementById("F_langd").value=document.getElementById("friskvard_langd").value;
	document.getElementById("theForm").submit();
	
		
	
	
	}	
	
function checkText(dittnamn)
{
	for (a=0;a<dittnamn.length;a++){
		if (checkBokstav(dittnamn.charCodeAt(a))==false){
			alert ("Vad sa du att du hette? Stava om!");
			return false;}
		}
	return true;	
		
	}
	
	function checkTime(tid){
		
		
			if (tid.length>5) return false;
			if (tid.length == 4) tid= "0" + tid;
		
					
		if ( 48 <= tid.charCodeAt(0) 
			&& tid.charCodeAt(0) <= 57
				&& 48 <= tid.charCodeAt(1)
					&& tid.charCodeAt(1) <= 57
			 			&& 48 <= tid.charCodeAt(3) 
							&& tid.charCodeAt(3) <= 57
								&& 48 <= tid.charCodeAt(4) 
									&& tid.charCodeAt(4) <= 57
								 		&& tid.charCodeAt(2) == 58) 
											return true;
			else return false;
		}
				
	

function checkBokstav(bokstav){
	
				
				if (65 <= bokstav && bokstav <= 90){return true;}//versaler
				if (48 <= bokstav && bokstav <= 57){return true;}//nuffror
				if (97 <= bokstav && bokstav <= 122){return true;}//gemener
				if (192 <= bokstav && bokstav <= 214){return true;}//VERSALER Extra
				if (222 <= bokstav && bokstav <= 255){return true;}//Versaler gemener extra
				if (bokstav==45){return true;}
				
			return false;
					
			
	}

function checkFileName(filnamn){
	
	for (a=0;a<filnamn.length;a++){
		if (checkBokstavNuff(filnamn.charCodeAt(a))==false){
						return false;}
		}
	return true;	
		
}
	
function checkBokstavNuff(bokstav){
	
				
				if (65 <= bokstav && bokstav <= 90){return true;}//versaler
				if (48 <= bokstav && bokstav <= 57){return true;}//nuffror
				if (97 <= bokstav && bokstav <= 122){return true;}//gemener
				
			
				
			return false;
					
			
	}	
	
	

	

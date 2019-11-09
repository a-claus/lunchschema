var day=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];
var LText="{150:0}";
var TText="{150:0}";


//echo date("D");Day
//echo date("M");Månad


function drawAdmTerminal() //admPlanera
{
	var nuff;
	var c;
	
	for(q=0; q<46;q++){
		minut=minut+15;
		
			if (minut==60){
				minut=0;
				timme++;}
		if (q==0){string="<tr class=\"termrad\"><th scope=\"row\">"+ timme +":"+ minut +"</th>"
			}	else
	{string=string+"<tr class=\"termrad\"><th scope=\"row\" id=\"T"+q+"_00"+"\">"+ timme +":"+ minut +"</th>";}

			 	
	for (p=0;p<1;p++){ 		
	a=p+10;
	b=q+10;	
		
		c="T"+q;		
				nuff=schemaJS[0][c];
				
				string=string+" <td><input type=\"text\" id=\"T"+b+"_"+a+"\"" + " value=\""+ nuff +"\" onkeyup=\"onlyNuff(id)\"></td>";}
			
			string=string+"</tr>";}
	
document.writeln(string);	
}

function drawAdmLunch() //admPlanera
{
	var nuff;
	var c;
	
	for(q=0; q<23;q++){
		Lminut=Lminut+30;
		if (Lminut==60){
			Lminut=0;
			Ltimme++;
			}
			
		if (q==0){Lstring="<tr class=\"termrad\"><th scope=\"row\">"+ Ltimme +":"+ Lminut +"</th>"
			}	else	
//Lstring=Lstring+"<tr class=\"lunchrad\">";
{	
Lstring=Lstring+"<tr class=\"lunchrad\"><th scope=\"row\" id=\"L"+q+"_00"+"\">"+ Ltimme +":"+ Lminut +"</th>";}

for (p=0;p<1;p++){	
	a=p+10;
	b=q+10;
	
	c="L"+q;
	nuff=schemaJS[0][c];
Lstring=Lstring+"<td><input type=\"text\" id=\"L"+b+"_10"+"\""+" value=\""+ nuff +"\" onkeyup=\"onlyNuff(id)\">  </td>";}
Lstring=Lstring+"</tr>";
		}
		
		
document.writeln(Lstring);	

//fyll();
}	

function onlyNuff(tabid){ //admPlanera
var a=document.getElementById(tabid).value;

	if (a.length>0){
		a=a.charAt(a.length-1);
		
		if (nuffs(a)==true){//nuffror
				document.getElementById(tabid).value=a;
	}
		else
			{document.getElementById(tabid).value="0";}
	} 
	
	
}

function nuffs(nuffa){//admPlanera
nuffa=nuffa.charCodeAt(0);
		if (48 <= nuffa && nuffa <= 56){//nuffrornuffa utan nian
			return true;
		}
		return false;
	}

function saveDay(){
	var obj={};
	var y=9999;	
	var ddd;
	if (document.getElementById("dagList").value<10) ddd="0"+document.getElementById("dagList").value;
					else ddd=document.getElementById("dagList").value;
		//obj["typ"]=document.getElementById("typ").value;
		//obj["datum"]="null";
		obj["fil"]=document.getElementById("schema").value;
	
			if (document.getElementById("typ").value=="datum"){
				
				if(document.getElementById("once").checked){
					
					date1 = new Date();
					date1.setHours(0,0,0,0);
					y=date1.getFullYear();
					
					
					dagens = new Date (y+document.getElementById("monList").value + document.getElementById("dagList").value);	
					
					a= new Date(dagens).getTime();
					b= new Date(date1).getTime();
				
					
					if (dagens<=date1){y++; }	
					
				}
				
				
				obj["datum"]=y+ "-" + document.getElementById("monList").value +"-"+  ddd;
				
				}
			else
				{
					obj["datum"]=document.getElementById("typ").value;
					}
			
	
		
document.getElementById("letter").value=JSON.stringify(obj);	
document.getElementById("theForm").submit();

	
/*	
	textJson=JSON.stringify(obj);
			document.getElementById("tid").innerHTML=textJson;
			//mess='{"lunch":['+ Ltext +']},{"terminaler":['+Ttext +']}'
			send(textJson);
			
*/
	
}


function shoot(){
	
	var obj={};
	var newObj={};
	if (document.getElementById("filnamn").value.length==0){alert("Du måste döpa filen!"); return;}
	//	for (a=0; bygg
	//	if (document.getElementById("filnamn").value.length==0){
	//		alert("Du måste döpa filen!"); return;}
	if (checkFileName(document.getElementById("filnamn").value)==false) {alert("Filnamnet får bara innehålla engelska bokstäver och siffror"); return;}

	obj["namn"]=document.getElementById("filnamn").value;
	for (a=0;a<23;a++){
		p=a+10;
		
		ruta=document.getElementById("L"+ p +"_10").value;
		if (ruta.length==0){ruta="0";}
			obj["L"+a]=ruta;
			
		}
			
		
		for (b=0;b<46;b++){
		p=b+10;
		ruta=document.getElementById("T"+p+"_10").value;
		if (ruta.length==0){ruta="0";}
			obj["T"+b]=ruta;


			
		
		
			textJson=JSON.stringify(obj);
			document.getElementById("tid").innerHTML=textJson;
			send2(textJson);
				
		
}
	
}

function adm_bock(vilkenRuta){
	
	if (checkNumber(document.getElementById(vilkenRuta).value)==true)
	{}
	}
		
		
function send(jsonText){		
    document.getElementById("letter").value=jsonText;
	document.getElementById("theForm").submit();
	
	}	
	
	function send2(jsonText){		//admPlanera
    document.getElementById("json_dag").value=jsonText;
	
	document.getElementById("namn").value=document.getElementById("filnamn").value;
	document.getElementById("typ").value=1;
	document.getElementById("theForm").submit();
	
	}	
	function changeMall(typen){	//admPlanera
		 document.getElementById("json_dag").value="";
	
	document.getElementById("namn").value=document.getElementById("mall").value;
	document.getElementById("typ").value=typen;
	document.getElementById("theForm").submit();
		}	
	function checkNumber(bokstav){
	
			if (length<2){	
				
				if (48 <= bokstav && bokstav <= 57){return true;}//nuffror
				{return true;
				}}
				
			return false;
					
			
	}
	
function showMonth(){
	if (document.getElementById("typ").value=="datum");
		{	document.getElementById("monList").style.visibility="visible";
			document.getElementById("dagList").style.visibility="visible";
						document.getElementById("once").style.visibility="visible";
							document.getElementById("once2").style.visibility="visible";

		}
	if (document.getElementById("typ").value!="datum")
		{
		    document.getElementById("monList").style.visibility="hidden";
			document.getElementById("dagList").style.visibility="hidden";
				document.getElementById("once").style.visibility="hidden";
				document.getElementById("once2").style.visibility="hidden";

		}
}
	function ta_bort_datum_poster(schemaJS,antal){	
		//adm
		var namn;
		var obj=[];
		var b=0;
	
		
		for (a=0;a<antal;a++){
			namn="radergummi"+a;
			
			if(document.getElementById(namn).checked==false){
				
				obj.push({"fil": schemaJS["dag"][a].fil, "datum": schemaJS["dag"][a].datum});
				
				}
			
			
			} 
		
		textJson=JSON.stringify(obj);
		
		document.getElementById("vilken").value=2;
		send(textJson.slice(1,-1));
		
			
		}
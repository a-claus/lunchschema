
//"datum", "namn", "klocka", "langd", "aktivitet"
const DATUM=0;
const NAMN=1;
const KLOCKA=2;
const LANGD=3;
const AKTIVITET=4;

const nollY=285;
var enhetSteg=10; //tveksamt
var hoppY; //tveksamt
var space=Math.floor(760/31);
var intervallEnd=new Date();
var intervallStart=new Date();
intervallEnd.setDate(intervallStart.getDate() - 1);
intervallStart.setDate(intervallStart.getDate() - 31);
var iS=intervallStart.toLocaleDateString();


var firstInFil=0;
var lastInFil=0;


class Diagram{
	/*----------------------------------------------------
			1. Räkna ut statestiken
			2. Skapa canvas
			3. Räkna ut storlek diagram
			4. Rita diagram 
	-------------------------------------------------------*/

	constructor(stapelKat,vadSkaRaknas){

			this.uppner=0;
			this.stapelKat=stapelKat;
			this.vadSkaRaknas=vadSkaRaknas;
			this.name=stapelKat+"_"+vadSkaRaknas;

 //skapa canvas
       		this.canvas = document.createElement("canvas");
       		this.canvas.id=this.name;//"CanvasArea";
        	this.canvas.width=810;
        	this.canvas.height=310;
        	this.canvas.style.border="1px solid #c3c3c3";
        	var body = document.getElementsByTagName("body")[0];
        	body.appendChild(this.canvas);
        	this.canvasArea=document.getElementById(this.name); //canvasArea var inte "this" tidigare
        	this.graf = this.canvasArea.getContext("2d");
        	

        	this.updateGraf();
}

	updateGraf(){
			this.uppner=0;	
			this.graf.clearRect(0,0,810,310);
		//statestik	
        	this.stats=countStats(this.name);
        	

        //diagramfakta för storlek
			this.topp=this.toppCheck();
			this.antalstaplar=this.stats.length;
        

        //variabler för att rita grafer
        	//this.skala = this.topp/250;
        	this.skala=250/this.topp;
        	
        	
        	this.skaladStats = this.stats.map(x => /*Math.round*/(x.value*this.skala));

        	
        	this.lineValue=this.calcLines(); 
        	this.drawLines();
        	this.drawStaplar();
        	this.drawXInfo();
        	this.drawMedel();
			this.skrivRubrik();

	}

	drawMedel(){
			var summa = this.skaladStats.reduce(function(a, b) {return a + b;}, 0);
			var medel = nollY-summa/this.antalstaplar;
				this.graf.strokeStyle="red";
			 	this.graf.beginPath();
                this.graf.moveTo(20,medel);
                this.graf.lineTo(800,medel);
                this.graf.stroke();


	}

	drawXInfo(){
		//först ska vi räkna ut bredden
		var yStart=0;
		var bredd= 770/this.antalstaplar; //vi startar på 15 slutar på 790
		var loop=this.antalstaplar;	
		var y=1;
		while (loop>45){y++; loop=this.antalstaplar/y;}

		this.graf.fillStyle="#123456";
		this.graf.font="10px Trebuchet MS";

		
		for (var x=0; x<this.antalstaplar; x=x+y){
			 this.graf.fillText(this.stats[x].stapelRub,x*bredd+bredd/2 +15,nollY+15);
		}
	}


	drawStaplar(){
		//först ska vi räkna ut bredden
		var yStart=0;
		var bredd= 770/this.antalstaplar; //vi startar på 10 slutar på 790
		this.graf.fillStyle="#123456";
		
		for (var x=0; x<this.antalstaplar; x++){

				yStart=nollY-this.skaladStats[x];
				this.graf.fillRect(x*bredd+25, yStart, bredd, this.skaladStats[x]);

		}


	}

	drawSkalInfo(val){
		
		 	this.graf.fillStyle="black";
            this.graf.font="10px Trebuchet MS"
            this.graf.fillText(Math.round(val),5,nollY+3-val*this.skala);
          //  this.pixVal*(val)


	}

	  skrivRubrik()
    {
       		var text;
       		switch(this.name){
       			case "datum_tid": text="Minuter friskvård per datum"; break;
       			case "datum_antal": text="Antal personer per datum"; break;
       			case "aktivitet_antal": text="Antal personer som nyttjat viss aktivitet"; break;
       			default: text=this.name;


       		}
            this.graf.fillStyle="black";
            this.graf.font="18px Trebuchet MS"
            this.graf.fillText(text,15,24);

    }

	drawLines(){
	
		var val=this.lineValue;
		
	
		var hoppy;
		var x=0;
		var fetLinje;
		if (this.vadSkaRaknas=="tid"){fetLinje=4;}else{fetLinje=5;}
		//this.skaladStats = this.stats.map(x => /*Math.round*/(x.value*this.skala));
		 //for (var x=0;x<=antal;x++)
		 while(x*this.lineValue*this.skala<251)
		 {
            this.graf.strokeStyle="#dddddd";
            
            //   console.log("skI:"+this.skala+" sum:"+x*this.lineValue*this.skala);
              if (x%fetLinje==0){this.graf.strokeStyle="#bbbbbb"; this.drawSkalInfo(x*this.lineValue);}
                if (x==0){this.graf.strokeStyle="#000000";}
                hoppY=nollY-x*this.lineValue*this.skala;
                this.graf.beginPath();
                this.graf.moveTo(20,hoppY);
                this.graf.lineTo(800,hoppY);
                this.graf.stroke();
                x++;
                }


	}

	calcLines(){
		
			var timeCutter=[];
			var i=0;
		switch(this.vadSkaRaknas){
			case "tid":
				timeCutter=[1,5,10,15,30,60,120,300,600,1200,1800,2400];
				
				do {i++;
				if (timeCutter.length==i) timeCutter.push(timeCutter[i-1]+=600);}
				while (this.topp/timeCutter[i]>15);

			break;

			case "antal":
			
				timeCutter=[.005,.01,.05,.1,.02,0.5,1,2,5,10,25,50,100,200,500];
				while (this.topp/timeCutter[i]>15) {
					i++;
					if (timeCutter.length==i) timeCutter.push(timeCutter[i-1]+=500);}
			
			break;
		}
		
		return (timeCutter[i]);
	}

	toppCheck(){
        var tiptop=0;
      	var loop=this.stats.length;
      	
        for (var x=0; x<loop; x++){
        	
            if (tiptop<this.stats[x].value) {tiptop=this.stats[x].value;
            
            }}
          
            return(tiptop);
	}

}


function findIntervall(){
	var ifl=inputFil.length;
	var i=0;
	do
	{i=i+5;
		
	}
	while (new Date(inputFil[i])< intervallStart && i<ifl); 
	firstInFil=i;
	
	do
	{i=i+5; 
	}
	while (new Date(inputFil[i])<= intervallEnd && i<ifl); 
	lastInFil=i-5;


}





function countStats(name){

   
	var statArray=[];
	
    var i=firstInFil;
    var finger;

    var a_l=-1;
    var d = new Date(intervallStart);
    
   	var filDate = new Date(inputFil[i]);
   	console.log("IE:"+intervallEnd);
    for (d; d <= intervallEnd; d.setDate(d.getDate() + 1)){
    	console.log("da"+d+" IE:"+intervallEnd);
    		
    	switch (name){
    		case "datum_tid":
    			statArray.push({stapelRub:d.getDate(),value:0});
    			a_l++;
    				//while(d > new Date(inputFil[i])){console.log("i:"+i+d); i=i+5;}
					while(d >= filDate){
					
						statArray[a_l].value=statArray[a_l].value+calcMin(inputFil[i+LANGD],inputFil[i+AKTIVITET]);
						i=i+5;
						filDate = new Date(inputFil[i]);
					
					}
			break;
//-----------------------------------------------------------------------------------------------------------

			case "datum_antal":
				statArray.push({stapelRub:d.getDate(),value:0});
				a_l++;
				while(d >= filDate){
					if (inputFil[i+AKTIVITET]=="avboka"){statArray[a_l].value--;}else{statArray[a_l].value++;}
						i=i+5;
						filDate = new Date(inputFil[i]);
						
					}

			break;
//-----------------------------------------------------------------------------------------------------------
			case "aktivitet_antal":
				
				i=i+5;
				finger=statArray.findIndex(x=>x.stapelRub==inputFil[i+AKTIVITET]);
				
				if (finger==-1)
					{statArray.push({stapelRub:inputFil[i+AKTIVITET],value:1});}
				else
					{
						if (inputFil[i+AKTIVITET]!="avboka"){statArray[finger].value++;} else {statArray[finger].value--;}

					}
				

			break;
//---------------------------------------------------------------------			
			case "aktivitet_tid":
				
				i=i+5;
				if (i>=inputFil.length) break;
				finger=statArray.findIndex(x=>x.stapelRub==inputFil[i+AKTIVITET]);
				
				if (finger==-1){
					console.log("x:"+inputFil[i+LANGD]+ "i"+i);
						statArray.push(
						{stapelRub:inputFil[i+AKTIVITET], value: calcMin(inputFil[i+LANGD], inputFil[i+AKTIVITET])}
						);}
				else
					{statArray[finger].value += calcMin(inputFil[i+LANGD],inputFil[i+AKTIVITET]) ;}
				

			break;
//---------------------------------------------------------------------------------------------------
			case "dag_tid":
                                
                                i=i+5;
                                if (i>=inputFil.length) break;
                                var dagg = new Date(inputFil[i+DATUM]);
                                var n = vardag(dagg.getDay());
                                
                                finger=statArray.findIndex(x=>x.stapelRub==n);
                              
                                
                                if (finger==-1){
                                			for (var a=0;a<7;a++){
                                                statArray.push({stapelRub: vardag(a), value: 0});

                        }finger=statArray.findIndex(x=>x.stapelRub==n);}
                                
                                        statArray[finger].value += calcMin(inputFil[i+LANGD],inputFil[i+AKTIVITET]);
                                

                        break;
//------------------------------------------------------------------------------------------------------------------
			case "dag_antal":
                                i=i+5;
                                if (i>=inputFil.length) break;
                                var dagg = new Date(inputFil[i+DATUM]);
                                var n = vardag(dagg.getDay());
                                
                                finger=statArray.findIndex(x=>x.stapelRub==n);
                              
                                
                                if (finger==-1){
                                			for (var a=0;a<7;a++){
                                                statArray.push({stapelRub: vardag(a), value: 0});}
                                              	 finger=statArray.findIndex(x=>x.stapelRub==n);}
                                	if (inputFil[i+AKTIVITET]!="avboka"){statArray[finger].value++;} else {statArray[finger].value--;}

                                

                        break;
//---------------------------------------------------------------------------------------------------------------------------------

			
		}
	}
	return statArray;
    	  		
}

function vardag(nummer){

	var d=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
	return d[nummer];
}

function hittaIndex(arrayName,seek) { 
   // return arrayName. === seek;
}

function calcMin(tid,minus){
		var numb = tid.substring(0,2);
		var min;
		
		
        numb=Number(numb);
            if(isNaN(numb) === true){numb=5;}
			if (minus=="avboka"){min=-numb;}else{min=numb;}    
    	return min;
}

function setDateFunction() {
    var s = new Date(document.getElementById("startDate").value);
    var e = new Date(document.getElementById("endDate").value);
    var idag = new Date();

    if (s<e && e<idag){
    		console.log("setDateF");
    		intervallStart= new Date(s); intervallEnd= new Date(e); 
    		findIntervall();
    		for (var x=0;x<canvasYta.length;x++){
    		canvasYta[x].updateGraf();}
    	}
    else
    	{	
    		remDatesInput();
    	
    	}
}

function remDatesInput(){
		document.getElementById("startDate").value=intervallStart.toLocaleDateString();
    	document.getElementById("endDate").value=intervallEnd.toLocaleDateString();

}
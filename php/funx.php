<?php


$GLdatum=date("Y-m-d");
$GLyear=date("Y");
$GLmonth=date("m");
switch ($GLmonth) {
    case 1:
        $GLmonth="jan";
        break;
    case 2:
        $GLmonth="feb";
        break;
    case 3:
        $GLmonth="mar";
        break;
    case 4:
        $GLmonth="apr";
    break;
    case 5:
        $GLmonth="maj";
    break;
    case 6:
        $GLmonth="jun";
    break;        
    case 7:
        $GLmonth="jul";
    break;
    case 8:
        $GLmonth="aug";
    break;
    case 9:
        $GLmonth="sep";
    break;
    case 10:
        $GLmonth="okt";
    break;
    case 11:
        $GLmonth="nov";
    break;    
    case 12:
        $GLmonth="dec";
    break;    
} 


$GLdag=date("D");
if ($GLdag=="Sun" || $GLdag==7)$GLdag="sondag";
if ($GLdag=="Sat" || $GLdag==6)$GLdag="lordag";
if ($GLdag=="Mon" || $GLdag=="Tue" || $GLdag=="Wed" || $GLdag=="Thu" || $GLdag=="Fri" ) $GLdag="vardag";

if ($GLdag <=5 && $GLdag >=1) $GLdag="vardag";



function makeJsonArray($filen){
	global $jsArray, $phpArray;
	
	//$filen="json/admin.txt";
	$string = file_get_contents($filen) or exit("Unable to open filen! Funx_MJS()");
	$jsArray = $string;
	

	$phpArray = json_decode("[".$string."]");
	//echo "ray in MJA".$phpArray;
}

function getDag($phpArray2){
	//print_r($phpArray2);
$GLdag=date("D");
if ($GLdag=="Sun" || $GLdag==7)$GLdag="sondag";
if ($GLdag=="Sat" || $GLdag==6)$GLdag="lordag";
if ($GLdag=="Mon" || $GLdag=="Tue" || $GLdag=="Wed" || $GLdag=="Thu" || $GLdag=="Fri" ) $GLdag="vardag";

if ($GLdag <=5 && $GLdag >=1) $GLdag="vardag";	
$d1=date('9999'.'-M-d');
$d2=date('Y-M-d');
	foreach ($phpArray2 as $filen){
		foreach($filen as $x => $x_value) {
			
        	
            if ($x=="datum"){
 				$datum=$x_value;
            }
			
    		if ($x=="fil"){
 				$filURL=$x_value;
            }
			
        }
		



 
	//checkHIT
		//------------------------------------------
	
if ($datum==$d2) $dateHit=$filURL;
if ($datum==$d1) $dateHit=$filURL;
if ($GLdag==$datum) $dagHit=$filURL;
				
//echo $datum."<br>";
		 }
//	echo $d1."-".$d2."<br>";
	//echo $dateHit."-".$dagHit;	
	if ($dateHit==true) return($dateHit);	
	if ($dagHit==true) return($dagHit);	  
	$filLev="json/sch/default.txt";
	return $filLev;
}


function schemaToday(){
	
	
	 $stringa = file_get_contents("json/schema.txt") or exit("Unable to open filen!");
  	 $the_schem = json_decode("[".$stringa."]",true);
	return $the_schem[0]["inTable"];
	
	}



function seekString($stringen){
	$filesArray = glob('json/frisk/*.{csv}', GLOB_BRACE);



$stringen="json/frisk/".$stringen.".csv";
if (in_array($stringen,$filesArray, TRUE))
  {
  return "ja";
  }
else
  {
  return "nej";;
  }
	
	
			
}


?>
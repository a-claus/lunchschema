<?php
function sparafil_se($filadress,$stringsomskasparas){
		//spara nytt formulär
		$filet=fopen($filadress,"x+") or exit("Unable to file! Func sparafil_se");
		fwrite($filet,$stringsomskasparas);
		fclose($filet);	
		}
		

function openreadfile_se($filadress){ 
	
	$myfile = file_get_contents($filadress) or die("Unable to open file! openreadfunction");
	fclose($myfile);
	return $myfile;	
}


function make_se_excel($fil_input){
global $GLmonth, $GLyear;


	$csv =chr(255) . chr(254) /* BOM */ . "sep=;\n" . mb_convert_encoding($fil_input, 'UTF-16LE', 'UTF-8');
	//$filnamn="/json/frisk/".$GLmonth.$GLyear.rand(100,199);
	$filnamn="json/frisk/".$GLmonth.$GLyear.".csv";	

	sparafil_se($filnamn,$csv);
	nollstallaJSON();
	}




	function nollstallaJSON(){
		$jsonRubriker='["datum", "namn", "klocka", "langd", "aktivitet"';
		$filadress="json/frisk.txt";

		$filet=fopen($filadress,"w") or exit("Unable to file! Func nollstallafil");
		fwrite($filet,$jsonRubriker);
		fclose($filet);	
		}




	


/*-------------------------------------------------------------------------
			
			1 Först läsa fil, som ska omvandlas till csv från json

			2 Spara csv

			3 Nollställa JSON



------------------------------------------------------------------------------*/	

function omvandlaJSONfilExcel($jsonFilen){

$jsonArray=json_decode($jsonFilen.']');
//print_r($jsonArray);	


//----- Måste adda ; /n radbrytning i arrayen

	$arrlength = count($jsonArray);
//	echo $arrlength;

	for($x = 0; $x < $arrlength; $x++) {
  
 		   $jsonArray[$x]=$jsonArray[$x].";";
    		if (($x+1) % 5){ 							//fem poster i excelen
				 
			}
			else
			{
					$jsonArray[$x]=$jsonArray[$x]."\n";

			}	
//----- Slå ihop array till en fil
    		if (is_null($enFil))
    			{
    				$enFil=$jsonArray[$x];
    			}
    		else
    			{
    				$enFil=$enFil.$jsonArray[$x];
    			}
	}


make_se_excel($enFil);
	
}








	
	
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Rastschema</title>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="icon" href="img/flavicon.png" type="img/vnd.microsoft.icon" />
<script src="js/js.js?v2"></script>

<script type="text/javascript">
var person=0;</script>

<?php
$jsArray=1;
include("php/funx.php");



/*--------------
Om fil inte innehåller rätt mån + år 

Exportera till excel
skapa ny fil lagra ny månad


*/

if (seekString($GLmonth.$GLyear)=="nej")
{
include("php/makeExcel_se.php");
   $frisk_fil = file_get_contents("json/frisk.txt") or exit("Unable to open filen!");
 omvandlaJSONfilExcel($frisk_fil);

}


$dateCheck =date("Y-m-d",filectime("json/schema.txt")); // tar fram filens senaste datum

if ($dateCheck!=$GLdatum)
	{
//-------    Nollställer schema och väljer vilket schema som ska läggas in. ------------------
		makeJsonArray("json/admin.txt");
		$adress=getDag($phpArray);
		$file=fopen("json/schema.txt","w") or exit("Unable to file! datum");
		fwrite($file,'{"namn":"dag","inTable":"'.$adress.'"}');
		fclose($file);
	}

//------------------   spara ny bokning ------------------------
if ($_SERVER["REQUEST_METHOD"] == "POST"){

	?>	
<script type="text/javascript">person="<?php echo ($_POST['namn']) ?>";</script>
<?php
include("php/sparaTillFil.php");

/*
	if ($_POST["inTable"]!="blank" && $_POST["inTable"]!="frisk"){ // blank är kommando från form som innebär att man bara ska uppdatera tabellen
	$file=fopen("json/schema.txt","a") or exit("Unable to file! a+");
		$st=',{"namn":"'.($_POST['namn']).'","inTable":"'. ($_POST["inTable"]).'"}';
	fwrite($file,$st);
	fclose($file);	
	}

	if ($_POST["inTable"]=="frisk"){
	$file=fopen("json/schema.txt","a") or exit("Unable to file! a+");
		$st=',{"namn":"'.($_POST['namn']).'","inTable":"'. ($_POST["inTable"]).'","klocka":"'. ($_POST["F_klocka"]).'","langd":"'. ($_POST["F_langd"]).'","aktivitet":"'. ($_POST["F_aktivitet"]).'"}';
	fwrite($file,$st);
	fclose($file);	



$file2=fopen("json/frisk.txt","a") or exit("Unable to file! a+");
    $inputJSON=',{"datum:"'.$GLdatum.'",namn":"'.($_POST['namn']).'","inTable":"'. ($_POST["inTable"]).'","klocka":"'. ($_POST["F_klocka"]).'","langd":"'. ($_POST["F_langd"]).'","aktivitet":"'. ($_POST["F_aktivitet"]).'"}';
  fwrite($file2,$inputJSON);
  fclose($file2);  


	}
  */
	}
?>	

<script type="text/javascript">
  //----------------- Fylla schemat ------------------------------  
  var tiderJSON="[<?php echo addslashes ($jsArray);?>]";
  var tiderArray=JSON.parse(tiderJSON);
  var antalFrisk=0;

  //hämta rastbokningar till schemat
  var the_schema="[<?php 
   $stringa = file_get_contents("json/schema.txt") or exit("Unable to open filen!");
  echo addslashes ($stringa);
  $the_schem = json_decode("[".$stringa."]",true);?>]";
  var schemaJS =  JSON.parse(the_schema);
  
  for (a=1; a<schemaJS.length;a++){
	 if (schemaJS[a].inTable=="frisk") antalFrisk++;
	}




<?php 
	//------- hämta dagvärden till filen ------------ 
	 /*Den tar första posten i filen och hämtar namnet för att läsa in dagschemat. Om man skulle kunna lägga in ett nytt dagschema under dagen. Så skulle den kunna hämta det. För att sen förändra det som är möjligt. */
	 
		makeJsonArray($the_schem[0]["inTable"]);
?>

//hämta rastbokningar till schemat
var tabell="[<?php 
  echo addslashes ($jsArray);?>]";
var tabell =  JSON.parse(tabell);
</script>



  
</head>

<body>
<?php //echo $adress; ?>
<p id="kontrollruta"></p>
<h1>Rastschema </h1>
<p id="tid"></p>

<FORM>
<INPUT TYPE="button" onClick="ref()" value="Refresh">
</FORM>



<script type="text/javascript">
document.write('<table  border=\"1\" class=\"terminaler\" id=\"terminaler\" ><caption>Terminal</caption>');
drawTerminal();
document.write('</table>');
</script>


   
 <script type="text/javascript">
document.write('<table  border=\"1\" class=\"lunch\" id=\"lunch\" ><caption>Lunch</caption>');
  drawLunch();
  document.write('</table>');
 </script>


<table  border="1" class="friskvard" id="friskvard" >
<caption>Friskvård</caption>
 <tr>
    <th>Tid</th>
    <th>Längd</th>
    <th>Aktivitet</th>
    <th>Namn</th>
  </tr>
  <script type="text/javascript">
  drawFriskvard();
   </script>
  

   <tr>
   
    <th><input type="text" id="friskvard_klocka"></th>
    <th> <select name="friskvard_langd" id="friskvard_langd">
  <option value="5min">5 min</option>
   <option value="10min">10 min</option>
    <option value="15min" selected>15min</option>
     <option value="20min">20 min</option>
      <option value="25min">25 min</option>
       <option value="30min">30 min</option>
        <option value="45min">45min</option>
         <option value="60min">60min</option>
        </select> 
     </th>
    <th> 
    <select name="friskvard_aktivitet" id="friskvard_aktivitet">
    <option value=""></option>
    <option value="promenad">Promenad</option>
    <option value="massage">Massage</option>
    <option value="cykling">Cykling</option>
    <option value="pingis">Pingis</option>
    <option value="gym">Gym</option>
    <option value="bad">Bad</option>
    <option value="övrigt">Övrigt</option> 
    <option value="avboka">Avboka</option>
    </select> </th>
   
   <th> 
    <input type="text" id="friskvard_namn" onkeydown="if (event.keyCode == 13) friskvard_bokning()"> 
     </th>
  </tr>


</table>

<hr>
<p id="inf"></p>
<button onClick="document.getElementById('inf').innerHTML=the_schema;">Visa JSON</button>


<form action="index.php" method="post" id="theForm" >

<input type="text" id="namn" name="namn" style="visibility:hidden">
<input type="text" id="inTable" name="inTable" style="visibility:hidden">

<input type="text" id="F_klocka" name="F_klocka" style="visibility:hidden">
<input type="text" id="F_langd" name="F_langd" style="visibility:hidden">
<input type="text" id="F_aktivitet" name="F_aktivitet" style="visibility:hidden">

</form>
<p>
  <?php
echo '<a href="adm.php"><INPUT TYPE="button" value="ADM"></a>'; ?>
  
</p>
<p>&nbsp;</p>
<p><em>version 4d nov 2019</em></p>
</body>
</html>

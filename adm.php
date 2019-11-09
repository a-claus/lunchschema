<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Rastschema adm v1b</title>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="icon" href="img/flavicon.png" type="img/vnd.microsoft.icon" />

<?php
include("php/funx.php");

if ($_SERVER["REQUEST_METHOD"] == "POST"){
	if (($_POST["vilken"])==1){
	$file=fopen("json/admin.txt","a+") or exit("Unable to file! a+");
		$st=",".($_POST["letter"]);
	fwrite($file,$st);
	fclose($file);	
	echo "sparat ".$_POST["letter"];
		}

if (($_POST["vilken"])==2){
	$file=fopen("json/admin.txt","w") or exit("Unable to file! w");
		$st=($_POST["letter"]);
	fwrite($file,$st);
	fclose($file);	
	echo "Tagit bort dagarna";
		}
}

?>	

<script type="text/javascript">
//                           Skapa Lista över lagrade scheman
//-------------------------------------------------------------------------------------------------------
var the_schema="<?php 
	if( 0==filesize("json/admin.txt"))
	{echo file_put_contents('json/admin.txt','{"fil":"json/sch/default.txt","datum":"vardag"},{"fil":"json/sch/default.txt","datum":"lordag"},{"fil":"json/sch/default.txt","datum":"sondag"}');}
   $stringa = file_get_contents("json/admin.txt") or exit("Unable to open filen!");
   
 

	  
	//$stringa = '{"fil":"json/sch/default.txt","datum":"9999-Jan-31"}';
	
	
	 echo addslashes ($stringa);
   ?>";
the_schema="{\"dag\":[" + the_schema + "]}";
var schemaJS =  JSON.parse(the_schema);

//-------------------------------------------------------------------------------------------------------
</script>



<?php 
makeJsonArray("json/admin.txt");

//
//            Listan över sparade scheman
//----------------------------------------------------------

$urlarna=glob("json/sch/*.txt"); 
?>


<script src="js/js.js"></script>
<script src="js/js_adm.js"></script>
  
</head>

<body>
v.1m3
<?php
include("admStart.php"); ?>

<h1>Rastschema Admin</h1>
<p id="tid"></p>



<form>

 <br> 
<h2>Vilket schema ska användas?</h2>
<hr>
<select name="schema" id="schema">
<?php  
	foreach ($urlarna as $namn){
		echo '<option value="'.$namn.'">'.$namn.'</option>'; }
?>
 
</select>
 <br> <br> <br>
<h2>När ska det användas:</h2>
<hr>
<select id="typ" name="typ" onChange="showMonth()">
  <option value="datum">Datum</option>
   <option value="vardag">Vardag</option>
    <option value="lordag">Lördag</option>
     <option value="sondag">Söndag</option>

 
</select>

<select name="monList" id="monList">
  <option value="Jan">Januari</option>
   <option value="Feb">Februari</option>
    <option value="Mar">Mars</option>
     <option value="Apr">April</option>
      <option value="May">Maj</option>
       <option value="Jun">Juni</option>
        <option value="Jul">Juli</option>
         <option value="Aug">August</option>
          <option value="Sep">September</option>
           <option value="Okt">Oktober</option>
            <option value="Nov">November</option> 
            <option value="Dec">December</option>
</select>
<select name="dagList" id="dagList">
<?php 
for ($a=1; $a<32;$a++){
	 echo '<option value="'.$a.'">'.$a.'</option>';

}

?>
</select>
<br><br>

En gång: <input id="once" type="radio" name="type" value="once" checked >
<br>
Återkommande: <input id="once2" type="radio" name="type" value="om" >


</form>
 <br> <br>
<INPUT TYPE="button" onClick="saveDay()" value="Spara">


<p id="inf"></p>



<form action="adm.php" method="post" id="theForm" >
<input type="text" id="letter" name="letter" style="visibility:hidden">
<input type="text" id="vilken" name="vilken" style="visibility:hidden" value="1">
</form>
<hr><hr>
<p>Datum har förträde före, dagar. Ligger samma datum eller dagar med olika schemaval, så är det den sist begärda som gäller. Alltså den som är listad sist av dag, datumen."</p>
<hr><hr>
<?php  
//echo "*". $urlarna[1]."*";
$antal= count($phpArray);
$aa=0;
$n=0;//nov2017
echo "<br>"."<input type='checkbox' id='radergummi".$aa++."'>";


	foreach ($phpArray as $filen){
		foreach($filen as $x => $x_value) {
    		echo " " . $x . ", " . $x_value;
			
		if (fmod($n++/2,2)==0){	
    		if (in_array($x_value, $urlarna)==false){
				echo  "<span class='red'>"." Filen finns inte, default kommer att användas istället om det behövs!"."</span>";} 
		}
		}
		

		if ($aa<$antal) {echo "<br><input type='checkbox' id='radergummi".$aa++."'>";}
		
		 }
?>
<br>
<INPUT TYPE="button" onClick="ta_bort_datum_poster(schemaJS,<?php echo $antal; ?>)" value="Radera bockade poster">
	
</body>
</html>

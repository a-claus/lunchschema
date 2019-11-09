<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Rastschema</title>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="icon" href="img/flavicon.png" type="img/vnd.microsoft.icon" />

<?php
include("php/funx.php");

if ($_SERVER["REQUEST_METHOD"] == "POST"){
	
if 	($_POST['typ']=="1"){
	$file=fopen("json/sch/".$_POST['namn'].".txt","x") or exit("Unable to file! x");
	echo $_POST['namn']." har blivit sparad och är klar att användas.";
		$st=($_POST["json_dag"]);
	fwrite($file,$st);
	fclose($file);	
	}
	if 	($_POST['typ']=="3" && $_POST['namn']!="json/sch/default.txt"){
		//stadaConteolDates()
		$todaj=schemaToday();
		echo "idag:".$todaj."  fildag:".$_POST['namn'];
		if ($todaj!=$_POST['namn']){
			echo $_POST['namn'];
				if (!unlink($_POST['namn']))
 			 {
  				echo ("Error deleting $file");
			  }
			else
  		{
  		echo ("Deleted $file");
  }
		}
		else{
		echo "Fil ej borttagen! Filen används och behövs i dagens rastschema och tas därför inte bort."; 	
			}
		
		}
		
	
	if 	($_POST['typ']=="2"){
		
		
		makeJsonArray($_POST['namn']);
		
		}
		else
		{
		makeJsonArray('json/sch/default.txt');
		
		}
	
		
}
else
		{
		makeJsonArray('json/sch/default.txt');
		
		}?>	
		
		

<script type="text/javascript">
var the_schema="[<?php echo addslashes ($jsArray);?>]";
var schemaJS=JSON.parse(the_schema);

</script>

<script src="js/js.js">


</script>

<script src="js/js_adm.js">


</script>


  <?php 
makeJsonArray("json/admin.txt");

//
//            Listan över sparade scheman
//----------------------------------------------------------

$urlarna=glob("json/sch/*.txt"); 
?>

</head>

<body>
<?php
include("admStart.php"); ?>

<h1>Rastschema Admin v1b</h1>
<p class="red">OBS! Fungerar inte att spara i explorer.</p>
<hr>
<p id="tid"></p>
 <hr>
<p>Vill du använda tidigare schema eller ta bort ett?</p>

<select name="mall" id="mall">
<?php  
	foreach ($urlarna as $namn){
		echo '<option value="'.$namn.'">'.$namn.'</option>'; }
?>
 
</select>
<INPUT TYPE="button" onClick="changeMall(2)" value="Använd som mall">
<INPUT TYPE="button" onClick="changeMall(3)" value="Ta bort fil">

<hr>

<script type="text/javascript">

//document.getElementById("tid").innerHTML=schemaJS.nisse[1].namn;
</script>


<INPUT TYPE="button" onClick="shoot()" value="Spara">


<p>Döp nya schemat</p>
<input type="text" id="filnamn" name="filnamn">
<br>
<p>Max åtta får gå på rast samtidigt.</p>
<table  border="1" class="terminaler" id="terminaler" >
  <tr>
    <th scope="col" ></th>
    <th scope="col">Terminaler</th>    
</tr>  
<script type="text/javascript">
drawAdmTerminal();
</script>
</table>
<table  border="1" class="lunch" id="lunch">
  <tr>
   <th scope="col" ></th>
   <th scope="col">Lunch</th>
   </tr>
   
 <script type="text/javascript">
  drawAdmLunch();
 </script>
</table>
<p id="inf"></p>


<form action="admPlanera.php" method="post" id="theForm" >
<input type="text" id="namn" name="namn" style="visibility:hidden">
<input type="text" id="typ" name="typ" style="visibility:hidden">
<input type="text" id="json_dag" name="json_dag" style="visibility:hidden">

</form>

	
</body>
</html>

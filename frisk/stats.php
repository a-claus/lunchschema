<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>diagram</title>
<link rel="stylesheet" type="text/css" href="../css/style.css">
<link rel="icon" href="../img/flavicon.png" type="img/vnd.microsoft.icon" />

<style type="text/css">
	

input[type=date] {
    
    width:120px;
}



</style>
<script>
var inputFil=	
<?php 

 echo (file_get_contents("../json/frisk/statestikHistory.txt") or exit("Unable to open filen!"););

?>"]";

	
	


</script>

<script src="../js/js.js"></script>
<script src="../js/diagramDrawer/grafDrawer.js"></script>

  
</head>

<body>
<p>Intervall Startdatum
<input type="date" id="startDate" value="2018-02-15">
Intervall Slutdatum
<input type="date" id="endDate" value="2018-03-05">
<button onclick="setDateFunction()"> Ändra intervall</button></p>
<br />
<script>

</script>


<script>

findIntervall();
var canvasYta=[];
canvasYta.push(new Diagram("datum","tid")); 
canvasYta.push(new Diagram("datum","antal")); 
canvasYta.push(new Diagram("aktivitet","tid")); 
canvasYta.push(new Diagram("aktivitet","antal"));
canvasYta.push(new Diagram("dag","antal")); 
canvasYta.push(new Diagram("dag","tid"));

remDatesInput();


</script>


</body>
</html>

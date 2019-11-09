<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Länkar till lagrade csv filer</title>
<link rel="stylesheet" type="text/css" href="../css/style.css">
<link rel="icon" href="../img/flavicon.png" type="../img/vnd.microsoft.icon" />

</head>

<body>
<?php
/*  -----------------
		Läsa in filerna vi har i en mapp
	
   		välja excelfilerna

   		skriva ut dem som länkar
---------------------------------------------*/

include("../admStart.php");
echo "<br />";
echo "<br />";

$filesArray = glob('../json/frisk/*.{csv}', GLOB_BRACE);
$arrlength = count($filesArray);

for($x = 0; $x < $arrlength; $x++) {
  
    echo "<a href='$filesArray[$x]'>$filesArray[$x]</a>";
    echo "<br />";


}

echo "<br />";
echo "<br />";
echo "<a href='../json/frisk.txt'>Pågående månad</a>";


?>

</body>	
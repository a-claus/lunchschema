<?php
echo '<a href="/index.php"><INPUT TYPE="button" value="Rastschemat"></a>';
echo '<a href="/adm.php"><INPUT TYPE="button" value="Planera"></a>';
echo '<a href="/admPlanera.php"><INPUT TYPE="button" value="Skapa/redigera"></a>';
echo '<a href="/frisk/frisk.php"><INPUT TYPE="button" value="Excelfiler Friskvård"></a>';
echo '<a href="/frisk/stats.php"><INPUT TYPE="button" value="Friskvårds diagram"></a>';

/*
Todo
------------------------------------------
	- Övrigtlista
	- Rensa lista på inaktuella dates och tabort.
	- När man tar bort i admPlanera,så kolla att default funkar. Bör göra någon koll.
	- Ändra schema samma dag?
	- Ändra vardag funkar inte, eftersom det är dagsschemat. 
	
	- Kolla 9999 funkar. /Check
	- Kolla kolumn med nio celler funkar. /Testar åtta funkar
*/
?>
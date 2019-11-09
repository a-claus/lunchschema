<?php 

/* -------------------------------------------------------

Tre saker händer från formulär

    frisk: friskvård, ska in i rastschema, men annorlunda, samt läggas in i friskvårdschemat
    blank: uppdatera schemat utan ngn bokning
    default: Lägga in rast i schemat


---------------------------------------------------------    */
switch ($_POST["inTable"]) {
    case "blank":
       
        break;
    
    case "frisk":
       
        $file=fopen("json/schema.txt","a") or exit("Spara friskvård på dagens schema. *sparatillfil.php");
        $st=',{"namn":"'.($_POST['namn']).'","inTable":"'. ($_POST["inTable"]).'","klocka":"'. ($_POST["F_klocka"]).'","langd":"'. ($_POST["F_langd"]).'","aktivitet":"'. ($_POST["F_aktivitet"]).'"}';
        fwrite($file,$st);
        fclose($file);  


        $file2=fopen("json/frisk.txt","a") or exit("Spara friskvård på månadens friskvårdschema *sparatillfil.php");

        $inputJSON=',"'.$GLdatum.'","'.($_POST['namn']).'","'.($_POST["F_klocka"]).'","'.($_POST["F_langd"]).'","'.($_POST["F_aktivitet"]).'"';
/*
        $inputJSON=',{"datum:"'.$GLdatum.'",namn":"'.($_POST['namn']).'","inTable":"'. ($_POST["inTable"]).'","klocka":"'. ($_POST["F_klocka"]).'","langd":"'. ($_POST["F_langd"]).'","aktivitet":"'. ($_POST["F_aktivitet"]).'"}';
*/        

        fwrite($file2,$inputJSON);
        fclose($file2);  
        break;

    default:
        $file=fopen("json/schema.txt","a") or exit("Lägga in rastbokning på schemat *sparatillfil.php");
        $st=',{"namn":"'.($_POST['namn']).'","inTable":"'. ($_POST["inTable"]).'"}';
        fwrite($file,$st);
        fclose($file);  
    }


?>
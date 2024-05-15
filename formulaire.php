<!DOCTYPE html>
<html>
    <head>
        <title>Page de traitement</title>
        <meta charset="utf-8">
    </head>
    <body>
        <p>Dans le formulaire précédent, vous avez fourni les
        informations suivantes :</p>
        
        <?php
            echo 'Prénom : '.$_POST["prenom"].'<br>';
            echo 'Email : ' .$_POST["email"].'<br>';
            echo 'Nom : ' .$_POST["nom"].'<br>';
            echo 'Objet : ' .$_POST["objet"].'<br>';
            echo 'Message : ' .$_POST["message"].'<br>';
        ?>
    </body>
</html>
<?php

$to = "clement.lazzarini71@gmail.com";
$from = "clement.lazzarini71@gmail.com";
ini_set("sendmail_from", "clement.lazzarini71@gmail.com");
$JOUR = date("Y-m-d");
$HEURE = date("H:i");
$NOM = filter_input(INPUT_POST, "nom", FILTER_SANITIZE_STRING);
$PRENOM = filter_input(INPUT_POST, "prenom", FILTER_SANITIZE_STRING);
$MAIL = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
if (!$MAIL) {
    echo "Adresse email non valide";
    exit();
}
$OBJET = filter_input(INPUT_POST, "objet", FILTER_SANITIZE_STRING);
$MESSAGE = filter_input(INPUT_POST, "message", FILTER_SANITIZE_STRING);
$Subject = "$OBJET de $NOM $PRENOM";
$mail_Data = "
<html> 
<head> 
<title>Subject</title> 
</head> 
<body> 
$OBJET<br><br> 
$MESSAGE<br><br> 
Mail de  $NOM $PRENOM <br><br>
Adresse mail de contact $MAIL<br><br>
Mail reçu le $JOUR à $HEURE 
</body> 
</HTML>";
$headers = "MIME-Version: 1.0 \n";
$headers .= "Content-type: text/html; charset=iso-8859-1 \n";
$headers .= "From: $from  \n";
$headers .= "Disposition-Notification-To: $from  \n";
$headers .= "X-Priority: 1  \n";
$headers .= "X-MSMail-Priority: High \n";
$CR_Mail = mail($to, $Subject, $mail_Data, $headers);
if ($CR_Mail === FALSE) {
    header("Location: https://www.clementlazzarini.com/message-erreur.html");
    exit();
} else {
    header("Location: https://www.clementlazzarini.com/message-envoye.html");
    exit();
}
?>

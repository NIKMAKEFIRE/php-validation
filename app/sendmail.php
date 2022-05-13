<?php
/* Здесь проверяется существование переменных */
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['message'])) {$message = $_POST['message'];}
 
/* Сюда впишите свою эл. почту */
$myaddres  = "jumpinmarket@yandex.ru"; // кому отправляем
 
/* А здесь прописывается текст сообщения, \n - перенос строки */
$mes = "Тема: Заказ обратной связи!\nПочта: $email\nИмя: $name\nСообщение: $message";
 
/* А эта функция как раз занимается отправкой письма на указанный email */
$sub='Заявка'; //сабж
$email='Заказ обратной связи'; // от кого
$send = mail ($myaddres,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");
 
ini_set('short_open_tag', 'On');
header('Refresh: 3; URL=index.html');
?>

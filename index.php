<?php
    header('Content-type:text/html; charset=utf8')

    $link = mysql_connect('localhost', 'root', 'root')
    mysql_select_db('test', $link)
    $q = "SELECT * FROM user_info"
    mysql_query("SET NAMES utf8")
    $rs = mysql_query($q)
    if(!$rs){die("Valid result!");}
    while($row = mysql_fetch_array($rs))

    echo "<div>$row[0]</div>"
?>
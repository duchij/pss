<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<!-- Modernizr -->
<script src="gdw/js/libs/modernizr-2.6.2.min.js"></script>
<!-- framework css -->
<!--[if gt IE 9]><!-->
<link type="text/css" rel="stylesheet" href="gdw/css/groundwork.css">
<!--<![endif]-->
<!--[if lte IE 9]>
<link type="text/css" rel="stylesheet" href="gdw/css/groundwork-core.css">
<link type="text/css" rel="stylesheet" href="gdw/css/groundwork-type.css">
<link type="text/css" rel="stylesheet" href="gdw/css/groundwork-ui.css">
<link type="text/css" rel="stylesheet" href="gdw/css/groundwork-anim.css">
<link type="text/css" rel="stylesheet" href="gdw/css/groundwork-ie.css">
<![endif]-->
{include file="css.tpl"}
</head>

<body>
<div class="row">

<div id="debugData">{$error}<p>{$sql}</p></div>
<div id="content">
<h1>Zoznam praktických úloh pre splenenie PŠŠ</h1>
<hr>
<div id="tabs">
<ul>
    <li><a href="#tab1">Vloženie vyšetrenia</a></li>
    <li><a href="#tab2">Pridanie skupiny vyšetrenia</a></li>
</ul>
<div id="tab1">
<div class="one half">
Zoznam vyšetrení: <select id="zoznam_dl" onchange="getCountAmount();">
    <option id="-">-</option>
	{foreach from=$vysetrenia key=k item=vys}
	<option value="{$vys.id}">{$vys.name}</option>
	{/foreach}

</select>
<div id="displayInfo">Počet splnení:<div id="taskToCompl"></div> Splnených:<div id="taskCompleted"></div></div>
</div>
<div class="one half ">

<h1>Vlož vyšetrenie...</h1>
	   Dátum:<input type="text" value="" name="task_date" id="datePicker" readonly="readonly" >
	   Poznámka:<input type="text" value="" name="task_comment" style="width:250px">
	   <button id="saveButton" class="green button">Ulož</button>
</div>
</div>
<div id="tab2">
<h2>Vytvor novú skupinu vyšetrení</h2>
<hr>
<div class="one half">
<table class="responsive" data-max="14">
    <tr>
        <td><p class="large">Názov úlohy:</p></td><td><input type="text" name="task_name" id="task_name" value=""></td>
    </tr>
    <tr>
        <td><p class="large">Počet vykonaní:</p></td><td><input type="text" name="task_count" id="task_count" onchange="checkNum('task_count');" id="task_count"></td>
    </tr>
    <tr>
        <td><p class="large">Krátky popis:</p></td><td><input type="text" name="task_comment" id="task_comment" value=""></td>
    </tr>
    <tr>
        <td colspan="2">
            <button id="saveTaskBtn" class="green button">Uložiť</button>
        </td>
    </tr>
</table>
</div>
<div class="one half">
</div>	    


</div>
</div>
</div>
</div> <!-- End of Content -->
{include file="scripts.tpl"}


	
</body>
</html>
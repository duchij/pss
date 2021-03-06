<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
{include file="css.tpl"}
</head>

<body>

<div id="dialogBox"></div>
<div id="debugData">{$error}<p>{$sql}</p></div>
<div id="content">
<div class="row">
<h1>Online LogBook</h1>
<hr>
<div id="tabs">
<ul>
    <li><a href="#tab1">Vloženie vyšetrenia</a></li>
    <li><a href="#tab2">Pridanie skupiny vyšetrenia</a></li>
    <li><a href="#tab3">Prehľad</a></li>
</ul>
<div id="tab1">
<div class="one half">
<h2 class="asphalt">Zoznam vyšetrení:</h2> <select id="zoznam_dl" onchange="getCountAmount();">
    <option id="-">-</option>
	{foreach from=$vysetrenia key=k item=vys}
	<option value="{$vys.id}">{$vys.name}</option>
	{/foreach}

</select>
<div id="displayInfo">Počet splnení:<div id="taskToCompl"></div> Splnených:<div id="taskCompleted"></div>
<div id="subTasks">
<hr>
<p class="normal asphalt">Podúlohy k hlavnej (vybranej) úlohe...</p> 
    <select id="subTasks_dl" style="width:200px;" onchange="getSubCountAmount();">
        <option id="-">-</option>
    </select>
    <div id="displaySubInfo">Počet splnení:<div id="taskSubToCompl"></div> Splnených:<div id="taskSubCompleted"></div></div>
</div>


<p class="small"><div id="comment_lbl"></div></p>
</div>
</div>
<div class="one half ">

<h1>Vlož vyšetrenie...</h1>
	   Dátum:<input type="text" value="" name="task_date" id="datePicker" readonly="readonly" >
	   Poznámka:<input type="text" value="" name="task_comment" id="task_comment" style="width:250px">
	   <button onclick="saveNewCompletedTask();" class="green button" id="saveCompletedTask_btn">Ulož</button>
</div>
</div>
<div id="tab2">
<h2>Vytvor novú skupinu vyšetrení <span id="taskType"></span></h2>
<hr>
<div class="one half">
<table class="responsive" data-max="14">
<input type="hidden" value="" id="updateTaskId">
    <tr>
        <td><p class="large">Názov úlohy:</p></td><td><input type="text" name="task_name" id="task_name" value=""></td>
    </tr>
    <tr>
        <td><p class="large">Počet vykonaní:</p></td><td><input type="text" name="task_count" id="task_count" onchange="checkNum('task_count');" id="task_count"></td>
    </tr>
    <tr>
        <td><p class="large">Krátky popis:</p></td><td><input type="text" name="task_comment" id="task_comment_tab2" value=""></td>
    </tr>
    <tr>
        <td>
            <button id="saveTaskBtn" class="green button medium">Uložiť/Zmeniť</button>
        </td>
        <td>
            <button id="saveSubTask" class="blue button medium" style="display: none;" onclick="insertNewSubTask();" >Uložiť ako podúlohu</button>
        </td>
    </tr>
</table>
</div>
<div class="one half">
    <div id="editView"></div>
</div>	    
</div>
<div id="tab3">
<div id="overView"></div>
</div>
</div>
</div>
</div> <!-- End of Content -->
{include file="scripts.tpl"}
</body>
</html>
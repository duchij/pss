/**
 * 
 */
console.log(this);

function debug(text)
{
	$("#debugData").val(text);
}

function checkNum(id)
{
	var num =$("#"+id).val();
	
	if (isNaN(num)){
		alert("Toto nie je číslo");
		$("#"+id).val(1);
	}
}

function saveTaskFnc()
{
	var data = {
		task_name:$("#task_name").val(),
		task_count:$("#task_count").val(),
		task_comment:$("#task_comment").val()
	}
	
	var t= new js_comunication();
	t.addRawRequest("index.php?a=async","pss/saveTask",this,[data,"testFunc"]);
	t.sendData();
}

function testFunc(status,result)
{
	if (status)
	{
		
		var taskName = $("#task_name").val();
		
		$("#task_name").val("");
		$("#task_count").val("");
		$("#task_comment").val("");
		
		var str=onlineRes.fncs.sprintf("<option id='{lastId}'>{taskName}</option>",{lastId:result.lastId,taskName:taskName});
		$("#zoznam_dl").append(str);
		
	}
}

function getCountAmount()
{
	
	
	var id = $("#zoznam_dl").val();
	if (id != "-"){
		$("#saveButton").prop('disabled',false);
		var t = new js_comunication();
		t.addRawRequest("index.php?a=async","pss/getTaskAmounts",this,[{taskId:id},"showAmountData"]);
		t.sendData();
	
		var t = new js_comunication();
		t.addRawRequest("index.php?a=async","pss/getComplAmounts",this,[{taskId:id},"showComplData"]);
		t.sendData();
	}
	else{
		$("#saveButton").prop('disabled',true);
		$("#taskToCompl").html("0");
		$("#taskCompleted").html("0");
	}
}
	

function showAmountData(status,result)
{
	$("#taskToCompl").html(result.pocet);
}

function showComplData(status,result)
{
	$("#taskCompleted").html(result.pocet);
}

$(document).ready(function(){
	
	$("#tabs").tabs();
	
	$("#datePicker").datepicker();
	$("#datePicker").datepicker( "option", "dateFormat","yy-mm-dd");
	$("#datePicker").datepicker( "setDate", "yy-mm-dd");
	
	$("#saveButton").prop('disabled',true);
	
	 $("#saveTaskBtn").click(function(e){
	 	saveTaskFnc();
	 });
	
});
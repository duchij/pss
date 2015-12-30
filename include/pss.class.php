<?php
class pss extends main {
    
    function __coonstruct()
    {
        parent::__construct();
    }
    
    function test($data)
    {
        $result = array("status"=>true,"result"=>"test");
        
        return $result;
        
    }
    
    function saveTask($data)
    {
        $this->log->logData($data);
        
        $inData = array(
            "name"=>$data["task_name"],
            "pocet"=>intval($data["task_count"]),
            "comment"=>$data["task_comment"]
        );
         
        $res = $this->db->insert_row("pss_ulohy", $inData,true);
        
        if ($res){
            $result = array("status"=>true,"result"=>$res["lastId"]);
        }
        else{
            $result = array("status"=>false,"msg"=>$res["msg"]."<br>".$res["sql"]);
        }
        
        return $result;
    }
    
    function getTaskAmounts($data)
    {
        $query = sprintf("SELECT pocet,comment FROM pss_ulohy WHERE id='%d'", $data["taskId"]);
        $data = $this->db->row($query);
        
        if ($data!=false){
            return array("result"=>$data,"status"=>true);
        }
        else{
            return array("result"=>"error","status"=>false);
        }
    }
    
    function getSubTaskAmount($data)
    {
        $query = sprintf("SELECT pocet,comment FROM pss_ulohy WHERE id='%d'", intval($data["subTaskId"]));
        
        $res = $this->db->row($query);
    
        if ($res!=false){
            return array("result"=>$res,"status"=>true);
        }
        else{
            return array("result"=>"error","status"=>false);
        }
    }
    
    
    function getComplAmounts($data)
    {
        $query = sprintf("SELECT COUNT(*) AS pocet FROM pss_splnene WHERE uloha_id='%d'", $data["taskId"]);
        $data = $this->db->row($query);
        
        if ($data!=false){
            return array("result"=>$data,"status"=>true);
        }
        else{
            return array("result"=>"error","status"=>false);
        }
    }
    
    
    function saveNewTask($data)
    {
        $inData = array(
            "uloha_id"=>intval($data["taskId"]),
            "datum"=>$data["taskDate"],
            "poznamka"=>$data["taskComment"],
        );
        
        $res = $this->db->insert_row("pss_splnene", $inData,true);
        
        if ($res){
            $result = array("status"=>true,"result"=>$res["lastId"]);
        }
        else{
            $result = array("status"=>false,"msg"=>$res["msg"]."<br>".$res["sql"]);
        }
        
        return $result;
        
    }
    
    
    function loadOverView($data)
    {
       $query = "select 
                            count(t_ulohy.id) as done, 
                            t_ulohy.name as nazov, 
                            t_ulohy.pocet as toDone 
                    from pss_ulohy as t_ulohy
                    inner join pss_splnene as t_spln on t_spln.uloha_id = t_ulohy.id
                group by t_ulohy.name";

       $data = $this->db->table($query);
       $this->log->logData($data,false,"test");
       if ($data["status"])
       {
           $this->smarty->assign("data",$data["table"]);

           $html = $this->smarty->fetch("reports/overview.tpl");
           
            return array("status"=>true,"result"=>$html);
       }
       else
       {
           return array("status"=>false,"result"=>$data["msg"]."<br>".$data["sql"]);
       }
    }
    
    function getSubTasks($data)
    {
        $query = "SELECT id,name,comment,pocet FROM pss_ulohy WHERE parent_id=%d";
        $query = sprintf($query,intval($data["taskId"]));
        
        $table = $this->db->table($query);
        
        if ($table["status"])
        {
            return array("status"=>true,"result"=>$table["table"]);
        }
        else
        {
            return array("status"=>false,"result"=>$table["msg"]);
        }
    }
    
    function getSubTaskStatus($data)
    {
        $query = sprintf("SELECT COUNT(*) AS pocet FROM pss_splnene WHERE uloha_id='%d'", $data["subTaskId"]);
        $data = $this->db->row($query);
        
        if ($data!=false){
            return array("result"=>$data,"status"=>true);
        }
        else{
            return array("result"=>"error","status"=>false);
        }
    }
    
    function insertNewSubTask($data)
    {
        $inData = array(
            "name"=>$data["taskName"],
            "pocet"=>intval($data["taskCount"]),
            "comment"=>$data["taskComment"],
            "parent_id"=>intval($data["parentId"])
            
        );
        
        $res = $this->db->insert_row("pss_ulohy", $inData,true);
        
        if ($res["status"])
        {
            return array("status"=>true,"result"=>$res["lastId"]);
        }
        else 
        {
            return array("status"=>false,"result"=>$res["msg"]);
        }
    }
    
    
    function saveNewSubTask($data)
    {
        $inData = array(
            "uloha_id"=>intval($data["subTaskId"]),
            "datum"=>$data["taskDate"],
            "poznamka"=>$data["taskComment"],
        );
        
        $res = $this->db->insert_row("pss_splnene", $inData,true);
        
        if ($res){
            $result = array("status"=>true,"result"=>$res["lastId"]);
        }
        else{
            $result = array("status"=>false,"msg"=>$res["msg"]."<br>".$res["sql"]);
        }
        
        return $result;
    }
    
    function loadTasks($data)
    {
        $query = "SELECT id,name,comment,pocet FROM pss_ulohy";
        $table = $this->db->table($query);
        
		$this->log->logData($table,false);
		
        if ($table["status"]){
            $this->smarty->assign("data",$table["table"]);
            $html =  $this->smarty->fetch("reports/taskedit.tpl");
            return array("status"=>true,"result"=>$html);
        }
        else{
            return array("status"=>false,"result"=>$table["msg"]."<br>".$table["sql"]);
        }
        
    }
    
    function deleteTask($data)
    {
        $query = sprintf("DELETE FROM pss_ulohy WHERE id='%d'",intval($data["taskId"]));
        
        $res = $this->db->execute($query);
        
        if ($res["status"]){
            return array("status"=>true,"result"=>"OK");
        }
        else {
            return array("status"=>false,"result"=>$res["msg"]);
        }
    }
    
    function loadTaskData($data)
    {
        $query = sprintf("SELECT name,pocet,comment FROM pss_ulohy WHERE id='%d'",intval($data["taskId"]));
        
        $row = $this->db->row($query);
        
        if ($row!=false){
            return array("status"=>true,"result"=>$row);
        }
        else{
            return array("status"=>false, "result"=>"error");
        }
    }
    
    function updateTaskData($data){
        
        $inData = array(
                    "name"=>$data["task_name"],
                    "pocet"=>intval($data["task_count"]),
                    "comment"=>$data["task_comment"]
        );
        
        $res = $this->db->update($inData, "pss_ulohy", "id", intval($data["task_id"]));
        
        if ($res["status"]){
            return array("status"=>true,"result"=>"ok");
        }
        else{
            return array("status"=>false,"result"=>$res["msg"]);
        }
    }
}

return  "pss";
?>
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
        $query = sprintf("SELECT pocet FROM pss_ulohy WHERE id=%d", $data["taskId"]);
        $data = $this->db->row($query);
        
        if ($data!=false){
            return array("result"=>$data,"status"=>true);
        }
        else{
            return array("result"=>"error","status"=>false);
        }
    }
    
    function getComplAmounts($data)
    {
        $query = sprintf("SELECT COUNT(*) AS pocet FROM pss_splnene WHERE uloha_id=%d", $data["taskId"]);
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
    
        
}

return  "pss";
?>
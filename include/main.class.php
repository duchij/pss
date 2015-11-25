<?php

class main {
    var $smarty;
    var $db;
    var $log;
    
    function __construct(){
        //echo "jk";
        $this->smarty = &$GLOBALS["smarty"];
        $this->db = new db();
        $this->log = new log();
    }
    
    function start($data){
        if (isset($data["a"])){
            if (method_exists($this, $data["a"])){
                $this->$data["a"]($data);
            }
            else{
                $this->showPage($data);
            }
            
        }else{
            $this->showPage($data);
        }
    }
    
    function showPage()
    {
        $data = $this->db->table("SELECT * FROM pss_ulohy");
        $this->smarty->assign("vysetrenia",$data["table"]);
        $this->smarty->display("main.tpl");
    }
    
    
    function showError($data)
    {
        $this->smarty->assign("error",$data["msg"]);
        $this->smarty->assign("sql",$data["sql"]);
        $this->smarty->display("main.tpl");
    }
    
    function create_new_pss_tsk($data)
    {
      
       if (!$res["status"]){
           $this->showError($res);
       }
       else{
           $this->showPage();
       }
    }
    
    function async($data)
    {
        $this->log->logData($data);
        $comm = $this->loadClass("commJs");
        $comm->getRespond($data["data"],$data["client"]);
        
    }
    
    function loadClass($module)
    {
        
        if (isset($GLOBALS[$module])) {
            return $GLOBALS[$module];
        }
        else{
            $class = require_once $module.".class.php";
            
            $obj = new $class();
            $GLOBALS[$module] = $obj;
            
            return $obj;
        }
    }
    
}

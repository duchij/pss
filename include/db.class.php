<?php
require_once 'log.class.php';

class db{
    var $db;
    var $log;
    
    function __construct(){
        $this->db = new SQLite3(DB_DIR."pss.sqlite");
        $this->log = new log();
    }
    
    function table($query){
        
        $results = $this->db->query($query);
        $table = array();
        $i=0;
        
        if ($results){
            while ($row = $results->fetchArray(SQLITE3_ASSOC))
            {
                $table[$i] = $row;
                $i++;
            } 
            $result["status"]= true;
            $result["table"] = $table;
            
        }
        else{
            $result["status"] = false;
            $result["msg"] = $this->db->lastErrorMsg();
            
        }
        return $result;
            
    }
    
    
    function row($query)
    {
        if (strpos($query,"LIMIT 1")==false){
            $query." LIMIT 1";
        }
        
        $this->log->logData($query,false,"row sql query");
        
        $results = $this->db->query($query);
        $this->log->logData($results);
        if ($results!=false){
            return $results->fetchArray(SQLITE3_ASSOC);
        }
        else{
            $this->log->logData($this->db->lastErrorMsg());
            return false;
        }
    }
    
    function buildSql($string,$data)
    {
        //foreach ($data as $key=>$value)
    }
    
    
    function insert_row($table,$data,$lastId = false)
    {
        $result = array();   
        $cols = array();
        $values = array();
        
        foreach ($data as $key=>$value)
        {
            array_push($cols,$key);
            
            $escStr = $this->db->escapeString(trim($value));
            array_push($values,"'{$escStr}'");
        }
        
        $colsStr = join(",",$cols);
        $valStr = join(",",$values);
        
        
        $sql = sprintf("INSERT INTO %s (%s) VALUES(%s)",$table,$colsStr,$valStr);

        $res = $this->db->exec($sql);
        
        
        if ($res){
            $result["status"] = true;
            if ($lastId){
                $result["lastId"] = $this->db->lastInsertRowID();
            }
        }
        else{
            $result["status"] = false;
            $result["msg"] = $this->db->lastErrorMsg();
            $result["sql"] = $sql;
        }
        
        return $result;
        
    }
}

?>
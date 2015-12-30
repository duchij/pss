<?php
//phpinfo();
session_start();

$INCLUDE_DIR = __DIR__."/include";
$APP_DIR = __DIR__;
$DB_DIR = "c:/web/adminer/";

DEFINE("INCLUDE_DIR",$INCLUDE_DIR);
DEFINE("APP_DIR",$APP_DIR);
DEFINE("DB_DIR",$DB_DIR);

require_once APP_DIR."/smarty/Smarty.class.php";

$smarty = new Smarty();
$smarty->template_dir = APP_DIR."/templates/";
$smarty->compile_dir  = APP_DIR."/templates_c/";
$smarty->config_dir   = APP_DIR."/configs/";
$smarty->cache_dir    = APP_DIR."/cache/";


require_once INCLUDE_DIR.'/main.class.php';
require_once INCLUDE_DIR.'/db.class.php';
require_once INCLUDE_DIR.'/log.class.php';

$log = new log();

$app = new main();
$app->start($_REQUEST);

?>
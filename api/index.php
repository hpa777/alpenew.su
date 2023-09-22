<?php
require_once dirname(dirname(__FILE__)) . '/config.core.php';
require_once MODX_CORE_PATH. 'vendor/autoload.php';
$modx = new \MODX\Revolution\modX();
$modx->initialize('web');


$rest = new \MODX\Revolution\Rest\modRestService($modx, [
    'basePath' => dirname(__FILE__) . '/Controllers/',
    'controllerClassSeparator' => '',
    'controllerClassPrefix' => 'Controller',
    'xmlRootNode' => 'response',
]);
$rest->prepare();
if (!$rest->checkPermissions()) {
    $rest->sendUnauthorized(true);
}

$rest->process();
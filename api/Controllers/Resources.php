<?php
use xPDO\Om\xPDOObject;
use xPDO\Om\xPDOQuery;
class ControllerResources extends \MODX\Revolution\Rest\modRestController {

    //public $classKey = \MODX\Revolution\modResource::class;
    public $classKey = 'modResource';
    public $defaultSortField = 'id';    
   
    public function afterRead(array &$objectArray)
    {        
        foreach(explode(',', $this->getProperty('tvs')) as $tv) {
            $tv = trim($tv);
            $objectArray['tv_' . $tv] = $this->object->getTVValue($tv);
        }
        return parent::afterRead($objectArray);
        
    }

    protected function prepareListObject(xPDOObject $object)
    {
        $objectArray = $object->toArray();
        foreach(explode(',', $this->getProperty('tvs')) as $tv) {
            $tv = trim($tv);
            $objectArray['tv_' . $tv] = $object->getTVValue($tv);
        }
        return $objectArray;
    }

    protected function addSearchQuery(xPDOQuery $c) {
        $slider = $this->getProperty('slider');
        if (empty($slider)) {
            return parent::addSearchQuery($c);
        }
        switch($slider) {
            case 'index' : {
                $c->leftJoin('modTemplateVarResource', 'TemplateVarResources');
                $c->leftJoin('modTemplateVar', 'tv', "tv.id=TemplateVarResources.tmplvarid");
                $searchQuery = [
                    'tv.name'   => 'onIndexSlider',
                    'TemplateVarResources.value' => 1,
                    'parent' => $this->modx->getOption('catalog_root', null, 4),
                ];
                $c->where($searchQuery);
                $this->setProperty('tvs', 'image,dop_title');
                break;
            }
        }
        return $c;
    }
    
}
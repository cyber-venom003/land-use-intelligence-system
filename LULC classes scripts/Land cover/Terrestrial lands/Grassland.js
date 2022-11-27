//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//
//                        Useful variables
//    
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//If you wanna export the consensus image for this class as an asset first put "Exportation" in the task variable
//If you have already exported the asset and you wanna import it, process it and find the pure tiles coordinates put "Processing" in the task variable  
var task = "Exportation"; //Exportation or Reprojection or Processing

//You can modify the extracted tiles purity with this variable 
var purity= 0.75 // 0.00 = 0%    -    1.00 = 100%

//The path where your assets are imported from with this variable
var consnesus_asset_path="users/lareb/consensus/Grassland"
var reprojected_asset_path="users/lareb/reprojected2/Grassland_2240m"
//-----------------------------------------------------------------------
//
//                        Useful function
//    
//-----------------------------------------------------------------------
//--------------- Mosaicking an Image Collection by Date ----------------------//
function mosaicByDate(imcol){
  // imcol: An image collection
  // returns: An image collection
  var imlist = imcol.toList(imcol.size())

  var unique_dates = imlist.map(function(im){
    return ee.Image(im).date().format("YYYY-MM-dd")
  }).distinct()

  var mosaic_imlist = unique_dates.map(function(d){
    d = ee.Date(d)

    var im = imcol
      .filterDate(d, d.advance(1, "day"))
      .mosaic();

    return im.set(
        "system:time_start", d.millis(), 
        "system:id", d.format("YYYY-MM-dd"))
  })

  return ee.ImageCollection(mosaic_imlist)
}

//---------------Reprojection function ----------------------//
var reprojection = function(original){
  var ns=original.projection().nominalScale()
  
  var original_new = original.reproject({
    crs: 'EPSG:4326',//for monitoring EPSG:3857 instead of crs: 'EPSG:4326'
    scale: ns
  })
  
  var original_new_2240m = original_new.reduceResolution({
    reducer: ee.Reducer.mean(),
    bestEffort: false,
    maxPixels: 65535 
  })
  .reproject({
    crs: 'EPSG:4326',
    scale: 2240
  });
  return original_new_2240m
};  
//***********************************************************************


////==========================================================================
////==========================================================================
////============================ -Grassland- MASK ===============================
////==========================================================================
////==========================================================================

///////////////////////////// First Dataset ////////////////////////////////// 
var dataset1 = ee.Image('MODIS/006/MCD12Q1/2017_01_01');
var datamask1 = dataset1.select('LC_Type1').unmask(0);
var ModisIgbpGrassland1 = datamask1.eq(10)
var dataset2 = ee.Image('MODIS/006/MCD12Q1/2018_01_01');
var datamask2 = dataset2.select('LC_Type1').unmask(0);
var ModisIgbpGrassland2 = datamask2.eq(10)
var dataset3 = ee.Image('MODIS/006/MCD12Q1/2019_01_01');
var datamask3 = dataset3.select('LC_Type1').unmask(0);
var ModisIgbpGrassland3 = datamask3.eq(10)
var ModisGrassland=ModisIgbpGrassland3.add(ModisIgbpGrassland2.add(ModisIgbpGrassland1))
ModisGrassland=ModisGrassland.divide(3)
Map.addLayer(ModisGrassland,{min: 0, max: 1,format:'jpg'},'Modis1Grassland',false);

///////////////////////////// Second Dataset /////////////////////////////////
var dataset1 = ee.Image('MODIS/006/MCD12Q1/2017_01_01');
var datamask1 = dataset1.select('LC_Type2').unmask(0);
var ModisIgbpGrassland1 = datamask1.eq(10)
var dataset2 = ee.Image('MODIS/006/MCD12Q1/2018_01_01');
var datamask2 = dataset2.select('LC_Type2').unmask(0);
var ModisIgbpGrassland2 = datamask2.eq(10)
var dataset3 = ee.Image('MODIS/006/MCD12Q1/2019_01_01');
var datamask3 = dataset3.select('LC_Type2').unmask(0);
var ModisIgbpGrassland3 = datamask3.eq(10)
var ModisGrassland2=ModisIgbpGrassland3.add(ModisIgbpGrassland2.add(ModisIgbpGrassland1))
ModisGrassland2=ModisGrassland2.divide(3)
Map.addLayer(ModisGrassland2,{min: 0, max: 1,format:'jpg'},'Modis2Grassland',false);
var Modis12Grassland = ModisGrassland2.add(ModisGrassland)
Map.addLayer(Modis12Grassland,{min: 0, max: 2,format:'jpg'},'Modis12Grassland',false);

///////////////////////////// Third Dataset ///////////////////////////////// 
var dataset1 = ee.Image('MODIS/006/MCD12Q1/2017_01_01');
var datamask1 = dataset1.select('LC_Type3').unmask(0);
var ModisIgbpGrassland1 = datamask1.eq(1)
var dataset2 = ee.Image('MODIS/006/MCD12Q1/2018_01_01');
var datamask2 = dataset2.select('LC_Type3').unmask(0);
var ModisIgbpGrassland2 = datamask2.eq(1)
var dataset3 = ee.Image('MODIS/006/MCD12Q1/2019_01_01');
var datamask3 = dataset3.select('LC_Type3').unmask(0);
var ModisIgbpGrassland3 = datamask3.eq(1)
var ModisGrassland3=ModisIgbpGrassland3.add(ModisIgbpGrassland2.add(ModisIgbpGrassland1))
ModisGrassland3=ModisGrassland3.divide(3)
Map.addLayer(ModisGrassland3,{min: 0, max: 1,format:'jpg'},'Modis3Grassland',false);
var Modis123Grassland = ModisGrassland3.add(Modis12Grassland)
Map.addLayer(Modis123Grassland,{min: 0, max: 3,format:'jpg'},'Modis123Grassland',false);

///////////////////////////// Fourth Dataset ///////////////////////////////// 
var dataset1 = ee.Image('MODIS/006/MCD12Q1/2017_01_01');
var datamask1 = dataset1.select('LC_Type4').unmask(0);
var ModisIgbpGrassland1 = datamask1.eq(6)
var dataset2 = ee.Image('MODIS/006/MCD12Q1/2018_01_01');
var datamask2 = dataset2.select('LC_Type4').unmask(0);
var ModisIgbpGrassland2 = datamask2.eq(6)
var dataset3 = ee.Image('MODIS/006/MCD12Q1/2019_01_01');
var datamask3 = dataset3.select('LC_Type4').unmask(0);
var ModisIgbpGrassland3 = datamask3.eq(6)
var ModisGrassland4=ModisIgbpGrassland3.add(ModisIgbpGrassland2.add(ModisIgbpGrassland1))
ModisGrassland4=ModisGrassland4.divide(3)
Map.addLayer(ModisGrassland4,{min: 0, max: 1,format:'jpg'},'Modis4Grassland',false);
var Modis1234Grassland = ModisGrassland4.add(Modis123Grassland)
Map.addLayer(Modis1234Grassland,{min: 0, max: 4,format:'jpg'},'Modis1234Grassland',false);

///////////////////////////// Fifth Dataset //////////////////////////////////
var dataset1 = ee.Image('MODIS/006/MCD12Q1/2017_01_01');
var datamask1 = dataset1.select('LC_Type5').unmask(0);
var ModisIgbpGrassland1 = datamask1.eq(6)
var dataset2 = ee.Image('MODIS/006/MCD12Q1/2018_01_01');
var datamask2 = dataset2.select('LC_Type5').unmask(0);
var ModisIgbpGrassland2 = datamask2.eq(6)
var dataset3 = ee.Image('MODIS/006/MCD12Q1/2019_01_01');
var datamask3 = dataset3.select('LC_Type5').unmask(0);
var ModisIgbpGrassland3 = datamask3.eq(6)
var ModisGrassland5=ModisIgbpGrassland3.add(ModisIgbpGrassland2.add(ModisIgbpGrassland1))
ModisGrassland5=ModisGrassland5.divide(3)
Map.addLayer(ModisGrassland5,{min: 0, max: 1,format:'jpg'},'Modis5Grassland',false);
var Modis12345Grassland = ModisGrassland5.add(Modis1234Grassland)
Map.addLayer(Modis12345Grassland,{min: 0, max: 5,format:'jpg'},'Modis12345Grassland',false);

/////////////////////////// Sixth Dataset /////////////////////////////////////////
var image1 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2017")
var datamask1 =  image1.select('discrete_classification').unmask(0);
var COPERNICUSGrassland1 =datamask1.eq(30);
var image2 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2018")
var datamask2 =  image2.select('discrete_classification').unmask(0);
var COPERNICUSGrassland2 =datamask2.eq(30);
var image3 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
var datamask3 =  image3.select('discrete_classification').unmask(0);
var COPERNICUSGrassland3 =datamask3.eq(30);
var COPERNICUSGrassland=COPERNICUSGrassland3.add(COPERNICUSGrassland2.add(COPERNICUSGrassland1))
COPERNICUSGrassland=COPERNICUSGrassland.divide(3)
Map.addLayer(COPERNICUSGrassland,{min: 0, max: 1,format:'jpg'},'COPERNICUSGrassland',false);
var ModisCOPERNICUSGrassland = COPERNICUSGrassland.add(Modis12345Grassland)
Map.addLayer(ModisCOPERNICUSGrassland,{min: 0, max: 6,format:'jpg'},'ModisCOPERNICUSGrassland',false);

///////////////////////////// Seventh Dataset ////////////////////////////////
var image = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3');
var datamask =  image.select('landcover').unmask(0);
var GLOBCOVERGrassland =datamask.eq(140)////white=Grassland black=others
Map.addLayer(GLOBCOVERGrassland,{min: 0, max: 1,format:'jpg'},'GLOBCOVERGrassland',false);
var GLOBCOVERModisCOPERNICUSGrassland = GLOBCOVERGrassland.add(ModisCOPERNICUSGrassland)
Map.addLayer(GLOBCOVERModisCOPERNICUSGrassland,{min: 0, max: 7,format:'jpg'},'GLOBCOVERModisCOPERNICUSGrassland',false);

///////////////////////////// Eighth Dataset /////////////////////////////////////////
var image = ee.Image('JAXA/ALOS/PALSAR/YEARLY/FNF/2017');
var datamask = image.select('fnf').unmask(0);
var PALSAR =datamask.eq(2)
Map.addLayer(PALSAR,{min: 0, max: 1,format:'jpg'},'PALSAR',false);
var PALSARGLOBCOVERModisCOPERNICUSGrassland = PALSAR.add(GLOBCOVERModisCOPERNICUSGrassland)
Map.addLayer(PALSARGLOBCOVERModisCOPERNICUSGrassland,{min: 0, max: 8,format:'jpg'},'PALSARGLOBCOVERModisCOPERNICUSGrassland',false);

///////////////////////////// Eleventh Dataset ///////////////////////////
var image = ee.Image("UMD/hansen/global_forest_change_2019_v1_7");
var datamask = image.select('treecover2000').unmask(999);
var Hansen1 =datamask.lt(5)
var datamask2 = image.select('loss').unmask(999);
var Hansen2 =datamask2.eq(0)
var datamask3 = image.select('gain').unmask(999);
var Hansen3 =datamask3.eq(0)
var datamask4 = image.select('datamask').unmask(999);
var Hansen4 =datamask4.neq(2)
var Hansen = Hansen1.and(Hansen2.and(Hansen3.and(Hansen4)))
Map.addLayer(Hansen,{min: 0, max: 1,format:'jpg'},'Hansen',false);
var HansenPALSARGLOBCOVERModisCOPERNICUSGrassland = Hansen.add(PALSARGLOBCOVERModisCOPERNICUSGrassland)
Map.addLayer(HansenPALSARGLOBCOVERModisCOPERNICUSGrassland,{min: 0, max: 9,format:'jpg'},'HansenPALSARGLOBCOVERModisCOPERNICUSGrassland',false);

///////////////////////////// Twelvth Dataset ///////////////////////////
var image = ee.Image('NASA/JPL/global_forest_canopy_height_2005');
var datamask = image.select('1').unmask(999);
var GFCHForestDEN=datamask.lt(2)
Map.addLayer(GFCHForestDEN,{min: 0, max: 1,format:'jpg'},'GFCHForestDEN',false);
var GFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland = GFCHForestDEN.add(HansenPALSARGLOBCOVERModisCOPERNICUSGrassland)
Map.addLayer(GFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland,{min: 0, max: 10,format:'jpg'},'GFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland',false);

///////////////////////////// Thirteenth Dataset ///////////////////////////
var ic = ee.ImageCollection('NASA/MEASURES/GFCC/TC/v3').filter(ee.Filter.date('2015-01-01', '2015-12-31'));

// Mosaic the collection of tiles
var ic_m = mosaicByDate(ic);
var ic_mask12 = ic_m.map(function(image) {
  var mask = image.select('tree_canopy_cover').unmask(999);
  mask = mask.lt(5);
  return mask
})

// Combine over time
var c = ee.Image(0);
for (var i = 0; i < 1; i++) {
  var image = ee.Image(ic_mask12.toList(ic_mask12.size()).get(i));
  c = c.add(image);
}
var GFCC = c;
Map.addLayer(GFCC,{min: 0, max: 1,format:'jpg'},'GFCC',false);
var GFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland = GFCC.add(GFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland)
Map.addLayer(GFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland,{min: 0, max: 11,format:'jpg'},'GFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland',false);

///////////////////////////// Tenth Dataset /////////////////////////////////////////
var dataset1 = ee.Image('JRC/GSW1_2/YearlyHistory/2017');
var datamask1 = dataset1.select('waterClass').unmask(0);
var JRC1 = datamask1.eq(1).or(datamask1.eq(0))
var dataset2 = ee.Image('JRC/GSW1_2/YearlyHistory/2018');
var datamask2 = dataset2.select('waterClass').unmask(0);
var JRC2 = datamask2.eq(1).or(datamask2.eq(0))
var dataset3 = ee.Image('JRC/GSW1_2/YearlyHistory/2019');
var datamask3 = dataset3.select('waterClass').unmask(0);
var JRC3 = datamask3.eq(1).or(datamask3.eq(0))
var JRC=JRC3.and(JRC2.and(JRC1))
Map.addLayer(JRC,{min: 0, max: 1,format:'jpg'},'JRC',false);
var JRCGFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland =GFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland.multiply(JRC)
Map.addLayer(JRCGFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland,{min: 0, max: 11,format:'jpg'},'JRCGFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland',false);

///////////////////////////////////JRC Mapping ///////////////////////////////////
var image= ee.Image('JRC/GSW1_2/GlobalSurfaceWater');
var datamask = image.select('max_extent').unmask(999);
var JRCM =datamask.eq(0)
Map.addLayer(JRCM,{min: 0, max: 1,format:'jpg'},'JRCM',false);
var GrasslandwithoutWater = JRCM.multiply(JRCGFCCGFCHHansenPALSARGLOBCOVERModisCOPERNICUSGrassland)
Map.addLayer(GrasslandwithoutWater,{min: 0, max: 11,format:'jpg'},'GrasslandwithoutWater',false);

GrasslandwithoutWater=GrasslandwithoutWater.divide(11)
Map.addLayer(GrasslandwithoutWater,{min: 0, max: 1,format:'jpg'},'Grassland_addition_divided_by_11',false);

/////////////////////////////////// Tsinghua based Urban areas elimination method ///////////////////////////////////
var Tsinghua1 = ee.Image("Tsinghua/FROM-GLC/GAIA/v10").unmask(999);
var Tsinghua = Tsinghua1.select('change_year_index').eq(999)

GrasslandwithoutWater=GrasslandwithoutWater.multiply(Tsinghua); 
Map.addLayer(GrasslandwithoutWater,{min: 0, max: 1,format:'jpg'},'Grassland_without_urban',false);



//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//
//                        Consensus results exportation and processing
//    
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

switch(task) {
    
    case "Exportation":
      print("The executed task is the exportation only")
        var World =  ee.Geometry.Polygon(
          [[[-180, 90],
          [-180, -90],
          [180, -90],
          [180, 90]]], null, false);
          
        var proj = GrasslandwithoutWater.projection().nominalScale().getInfo();
          
        Export.image.toAsset({
          image: GrasslandwithoutWater, 
          description: 'consensus/Grassland',
          //crs: proj.crs,
          //crsTransform: transform_new,
          scale: proj,
          maxPixels: 1e13,
          region: World
          });
        break;
        
    case "Reprojection":
      print("The executed task is the reprojection only")
      var image = ee.Image(consnesus_asset_path);
      var reproj_image=reprojection(image)
      var proj = reproj_image.projection().nominalScale().getInfo();
      var World =  ee.Geometry.Polygon(
          [[[-180, 90],
          [-180, -90],
          [180, -90],
          [180, 90]]], null, false);  
        Export.image.toAsset({
          image: reproj_image, 
          description: 'reprojected2/Grassland_2240m',
          //crs: proj.crs,
          //crsTransform: transform_new,
          scale: proj,
          maxPixels: 1e13,
          region: World
          });
          break;

    case "Processing":
        print("The executed tasks are Asset importation and Processing and Coordinates generation");
        
        //importing the asset image
        var image = ee.Image(reprojected_asset_path);
        
        //information about the asset image
        print('Imported image',image.getInfo())
        print('Imported image CRS',image.projection().crs().getInfo())
        print('Imported image Nominal scale',image.projection().nominalScale())
        
        //visualizing the asset image
        Map.addLayer(image,{min: 0, max: 1,format:'jpg'},'Grassland_2240m_Asset_image',false);
        
        //counting the number of pure tiles
        var purity_perc = ee.Number(purity).multiply(100)
        print('Used purity percentage',purity_perc)
        var World =  ee.Geometry.Polygon(
                [[[-180, 90],
                  [-180, -90],
                  [180, -90],
                  [180, 90]]], null, false);
        
        var image_purity_mask = image.gte(purity).updateMask(image.gte(purity))
        Map.addLayer(image_purity_mask,{min: 0, max: 1,format:'jpg'},'Asset_image_with_the_used_purity_percentage')
        var NumOfTiles = image_purity_mask.reduceRegion({
          reducer: ee.Reducer.count(),
          geometry: World,
          maxPixels: 1e13,
          bestEffort: true,
          tileScale: 16})
        print('Number of pure tiles',NumOfTiles)
        
        // converting the image into a features collection of its coordinates
        var coordsImage = ee.Image.pixelLonLat().reproject(image_purity_mask.projection())
        var coordsImage = coordsImage.updateMask(image_purity_mask);
        //Map.addLayer(coordsImage, {},"coordsImage")
        coordsImage=coordsImage.sample(World)
        coordsImage=coordsImage.distinct(['longitude','latitude'])
        var pixel_value = function(f){
          var longitude= f.getNumber('longitude')
          var latitude= f.getNumber('latitude')
          var point = (ee.Geometry.Point(longitude,latitude));
          var pix= ee.Number(image.reduceRegion(ee.Reducer.first(),point,1).get('max_extent')).multiply(100);
          f = f.set('pixel_purity', pix);
          f = f.set('land_cover_class', "Grassland");
          var GHM = ee.Image("users/iec2019002/GHM_2240");
          var ghm= ee.Number(GHM.reduceRegion(ee.Reducer.first(),point,1).get('gHM')).multiply(100);
          f = f.set('human_modification', ghm);
          return f;
        };
        coordsImage = coordsImage.map(pixel_value);
        print('Coordinates',coordsImage)
        
        //sorting the collection given purity level
        coordsImage = coordsImage.sort('pixel_purity', false)
        //center the map to the first element
        //var point1=(ee.Geometry.Point(coordsImage.first().getNumber('longitude'),coordsImage.first().getNumber('latitude')))
        //Map.centerObject(point1)
        
        // Export the FeatureCollection to a KML file
        var filename='coordinates_Grassland'
        var foldername='Coordinates'
        Export.table.toDrive({
          collection: coordsImage,
          description:filename,
          folder:foldername,
          selectors:['longitude','latitude','pixel_purity','land_cover_class','human_modification'],
          fileFormat: 'CSV'
        });
        break;
}

















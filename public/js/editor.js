// functions are organized by alpha

var copiedUrl = "";
var R;
var G;
var B;
var Size;
var rotY;
var rotX;
var rotZ;
var copiedSelectedText;
var copiedElement = 0;

var g_currSlide = 0;
var g_numSlides = 0;
var g_slidesPlayed = 0;
var g_isPlaying = 0;
var g_playSlider = null;
var g_timer = null;
var g_interval = null;

var g_sceneInspector = null;


function copy()
{
    if (selectedModel) {
        copiedUrl = selectedModel.url.getValueDirect().join("");
        R = selectedModel.color.values[0];
        G = selectedModel.color.values[1];
        B = selectedModel.color.values[2];
        Size = selectedModel.scale.getValueDirect().x;
        rotX = selectedModel.rotation.getValueDirect().x;
        rotY = selectedModel.rotation.getValueDirect().y;
        rotZ = selectedModel.rotation.getValueDirect().z;
        copiedElement = 1;
    }
    else if (selectedThing)
    {
        copiedSelectedText = selectedText;
        console.log(copiedSelectedText);
        copiedElement = 2;
    }
}
function cut()
{
    if (selectedModel) {
        copy();
        var name = selectedModel.name.getValueDirect().join("");
        var c = "\<Remove target='" + name + "'/>"
        bridgeworks.updateScene(c);
        console.log(name);

        var panel = document.getElementById("object-panel");
        var link = document.getElementById("row" + name);
        panel.removeChild(link);
    }
    else {
      var c = "\<Remove target='" + selectedThing + "'/>"
      bridgeworks.updateScene(c);
    }
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = function(e) {
            var text = reader.result;
            console.log(text);
            bridgeworks.onLoadModified();
            bridgeworks.updateScene(text);
        }

        reader.readAsText(f);
    }
}

function loadEgypt() {
  reset();
  bridgeworks.contentDir='/BwContent/Egypt';
  //bridgeworks.onLoadModified();
  bridgeworks.updateScene('Egypt-Models.xml');
  loadSlides(10);
}

function loadEntymology() {
  reset();
  bridgeworks.contentDir='/BwContent/Entymology/BwContent';
  bridgeworks.onLoadModified();
  bridgeworks.updateScene('formica_rufa.xml');
}

function loadTwoStroke() {
  reset();
  bridgeworks.contentDir='/BwContent/Engine/BwContent';
  bridgeworks.onLoadModified();
  bridgeworks.updateScene('Stihl.xml');
  loadSlides(1);
}

function load2D3D() {
  reset();
  bridgeworks.contentDir='/BwContent';
  bridgeworks.onLoadModified();
  bridgeworks.updateScene('2D-vs-3D.xml');
}

function new3Scape() {
  bridgeworks.contentDir='/BwContent';
  bridgeworks.onLoadModified();
  bridgeworks.updateScene('grid-100.xml');
  reset();
}

function reset() {

  g_currSlide = 0;
  g_isPlaying = 0;
  g_labelCount = 0;
  g_numSlides = 0;
  g_slidesPlayed = 0;
  g_sceneInspector = null;

  $('#object-panel').empty();
  $('#animate-panel').empty();
  $('#slide-list').empty();
}

function switchModes()
{
    var objectInspector = bridgeworks.registry.find("ObjectInspector");
    if (!g_sceneInspector) g_sceneInspector = bridgeworks.registry.find("SceneInspector");
    var sceneActive = g_sceneInspector.enabled.getValueDirect();

    if(sceneActive)
    {
        g_sceneInspector.enabled.setValueDirect(false);
        objectInspector.enabled.setValueDirect(true);
    }
    else if(!sceneActive)
    {
        g_sceneInspector.enabled.setValueDirect(true);
        objectInspector.enabled.setValueDirect(false);
    }

    console.log(g_sceneInspector.enabled.getValueDirect());

}
function trashModel(name)
{
    var c = "\<Remove target='" + name + "'/>";
    console.log(c);
    bridgeworks.updateScene(c);

    var panel = document.getElementById("object-panel");
    var link = document.getElementById("row" + name);
    panel.removeChild(link);
}

function trashAnimation(name)
{
  var cmd = "\<Remove target='" + name + "'/>";
  console.log(cmd);
  bridgeworks.updateScene(cmd);

  var panel = document.getElementById("animate-panel");
  var link = document.getElementById("row" + name);
  panel.removeChild(link);

}

<!-- Color Picker Script - ColorCodeHex.COM -->
function updateInfo(color) {
  document.getElementById('info-r').value = color.rgb[0];
  document.getElementById('info-g').value = color.rgb[1];
  document.getElementById('info-b').value = color.rgb[2];
}


var loaded = 0;
function listLibrary()
{
    var href = document.location.href;
    var url = href.substring(0, href.lastIndexOf('/')) + "/BwContent/";
    if(loaded == 0)
    {
        //Seperating the libs out and changing which panel they are loaded into.
        var panel = document.getElementById("panel-lib-shapeObjects");
        loadDirectoryObject(url,"objects/Cube.lwo",panel,"Cube");
        loadDirectoryObject(url,"objects/Grid.lwo",panel,"Grid");
        loadDirectoryObject(url,"objects/Sphere.lwo",panel,"Sphere");
        loadDirectoryObject(url,"objects/Tube.lwo",panel,"Tube");
        loadDirectoryObject(url,"objects/Wall.lwo",panel,"Wall");
        loadDirectoryObject(url,"Geography/objects/cone.lwo",panel,"Cone");
        loadDirectoryObject(url,"objects/Push Pin.lwo",panel,"Push_Pin");
        loadDirectoryObject(url,"objects/Wood.lwo",panel,"Wood");
        loadDirectoryObject(url,"objects/Gear.lwo",panel,"Gear");
        loadDirectoryObject(url,"objects/9VBattery.lwo",panel,"9VBattery");
        loadDirectoryObject(url,"objects/sword.lwo",panel,"Sword");
        loadDirectoryObject(url,"objects/Satellite.lwo",panel,"Satellite");
        loadDirectoryObject(url,"objects/table.lwo",panel,"Table");
        loadDirectoryObject(url,"objects/thor_hammer.lwo",panel,"Thor Hammmer");

        panel = document.getElementById("panel-lib-animalObjects");
        loadDirectoryObject(url,"Animals/objects/Cow.lwo",panel,"Cow");
        loadDirectoryObject(url,"Animals/objects/trex.lwo",panel,"Trex");
        loadDirectoryObject(url,"Animals/objects/Ant.lwo",panel,"Ant");
        loadDirectoryObject(url,"objects/rhino.lwo",panel,"Rhino");
        loadDirectoryObject(url,"objects/elephant.lwo",panel,"Elephant");
        loadDirectoryObject(url,"objects/dolphin.lwo",panel,"Dolphin");
        loadDirectoryObject(url,"objects/dragon.lwo",panel,"Dragon");
        loadDirectoryObject(url,"objects/Creature.lwo",panel,"Creature");
        loadDirectoryObject(url,"objects/ammonite.lwo",panel,"Ammonite");

        panel = document.getElementById("panel-lib-peopleObjects");
		    loadDirectoryObject(url,"Characters/objects/bobble-body.lwo",panel,"Bobble Head Body");
        loadDirectoryObject(url,"Characters/objects/DanPatrick.lwo",panel,"Ham Patrick");
		    loadDirectoryObject(url,"People/objects/B rifleman.lwo",panel,"Rifleman");
        loadDirectoryObject(url,"People/objects/Civilian.lwo",panel,"Civilian");
        loadDirectoryObject(url,"People/objects/RECON.lwo",panel,"RECON");
        loadDirectoryObject(url,"People/objects/SOF_gun.lwo",panel,"SOF_gun");
        loadDirectoryObject(url,"People/objects/Saw_Gunner.lwo",panel,"Saw_Gunner");
        loadDirectoryObject(url,"People/objects/SOF.lwo",panel,"SOF");
        loadDirectoryObject(url,"People/objects/Soldier_look.lwo",panel,"Soldier_look");

        panel = document.getElementById("panel-lib-anatomyObjects");
        loadDirectoryObject(url,"Heart/objects/Heart_back.lwo",panel,"Heart_back");
        loadDirectoryObject(url,"Heart/objects/Heart_front.lwo",panel,"Heart_front");
        loadDirectoryObject(url,"Arm/objects/Arm.lwo",panel,"Arm");
        loadDirectoryObject(url,"Arm/objects/Bn_femur.lwo",panel,"Bn_femur");
        loadDirectoryObject(url,"Arm/objects/bones.lwo",panel,"bones");
        loadDirectoryObject(url,"Arm/objects/Hand.lwo",panel,"Hand");
        loadDirectoryObject(url,"Arm/objects/hand-skin.lwo",panel,"hand-skin");
        loadDirectoryObject(url,"Arm/objects/Humerus-Ulna.lwo",panel,"Humerus-Ulna");



        panel = document.getElementById("panel-lib-buildingObjects");
        loadDirectoryObject(url,"Barnville/objects/Barn.lwo",panel,"Barn");
        loadDirectoryObject(url,"Buildings/objects/Building.lwo",panel,"Building1");
        loadDirectoryObject(url,"Buildings/objects/building1.lwo",panel,"Building2");
        loadDirectoryObject(url,"Barnville/objects/Church.lwo",panel,"Church");
        loadDirectoryObject(url,"objects/medstreet.lwo",panel,"Village");
        loadDirectoryObject(url,"Buildings/objects/City_buildings.lwo",panel,"City_buildings");
        loadDirectoryObject(url,"Buildings/objects/shed.lwo",panel,"Shed");
        loadDirectoryObject(url,"Buildings/objects/shed2.lwo",panel,"Shed2");
        loadDirectoryObject(url,"Buildings/objects/shed3.lwo",panel,"Shed3");
        loadDirectoryObject(url,"Barnville/objects/Stone_Wall.lwo",panel,"Stone Wall");
        loadDirectoryObject(url,"Barnville/objects/Well.lwo",panel,"Well");
        loadDirectoryObject(url,"objects/Flag.lwo",panel,"Flag");
        loadDirectoryObject(url,"Buildings/objects/RadioTower.lwo",panel,"Radio Tower");
        loadDirectoryObject(url,"Buildings/objects/CheckPoint.lwo",panel,"Checkpoint");
        loadDirectoryObject(url,"objects/helmsdeep.lwo",panel,"Helms Deep");

        panel = document.getElementById("panel-lib-landVehicleObjects");
        loadDirectoryObject(url,"Vehicles/objects/C2V.lwo",panel,"C2V");
        loadDirectoryObject(url,"Vehicles/objects/Fishing Boat.lwo",panel,"Fishing Boat");
        loadDirectoryObject(url,"Vehicles/objects/Humvee_Medical.lwo",panel,"Humvee_Medical");
        loadDirectoryObject(url,"Vehicles/objects/M1A1.lwo",panel,"M1A1");
        loadDirectoryObject(url,"Geography/objects/Camaro.lwo",panel,"Camaro");
        loadDirectoryObject(url,"Geography/objects/SemiTruck.lwo",panel,"SemiTruck");
        loadDirectoryObject(url,"Geography/objects/Truck3.lwo",panel,"Truck3");
        loadDirectoryObject(url,"Geography/objects/carriage.lwo",panel,"Carriage");

        panel = document.getElementById("panel-lib-airVehicleObjects");
        loadDirectoryObject(url,"Vehicles/objects/AP_A10R.lwo",panel,"A10 Warthog");
        loadDirectoryObject(url,"Vehicles/objects/BW_ac-130.lwo",panel,"AC130");
        loadDirectoryObject(url,"Vehicles/objects/BW_ACprop.lwo",panel,"AC130 prop");
        loadDirectoryObject(url,"Geography/objects/AP_ApacheL1.lwo",panel,"Apache-1");
        loadDirectoryObject(url,"Geography/objects/AP_ApacheL2.lwo",panel,"Apache-2");
        loadDirectoryObject(url,"Geography/objects/AP_ApacheL3.lwo",panel,"Apache-3");
        loadDirectoryObject(url,"Vehicles/objects/DC-10.lwo",panel,"DC-10");
        loadDirectoryObject(url,"Vehicles/objects/AP_F15R.lwo",panel,"F15");
        loadDirectoryObject(url,"Vehicles/objects/F16.lwo",panel,"F16");
        loadDirectoryObject(url,"Geography/objects/AP_F18R.lwo",panel,"F18 Hornet");
        loadDirectoryObject(url,"Vehicles/objects/BlackHawk.lwo",panel,"BlackHawk");
        loadDirectoryObject(url,"Vehicles/objects/JStars.lwo",panel,"JStars");
        loadDirectoryObject(url,"Vehicles/objects/Predator.lwo",panel,"Predator");
        loadDirectoryObject(url,"Vehicles/objects/RC12.lwo",panel,"RC12");
        loadDirectoryObject(url,"Vehicles/objects/U2.lwo",panel,"U2");
        loadDirectoryObject(url,"objects/Aerostat.lwo",panel,"Aerostat");
        loadDirectoryObject(url,"Vehicles/objects/stringray.lwo",panel,"Stingray");


        panel = document.getElementById("panel-lib-egyptObjects");
        loadDirectoryObject(url,"Egypt/objects/Artifact_01.lwo",panel,"Artifact_01");
        loadDirectoryObject(url,"Egypt/objects/Artifact_02.lwo",panel,"Artifact_02");
        loadDirectoryObject(url,"Egypt/objects/Artifact_03.lwo",panel,"Artifact_03");
        loadDirectoryObject(url,"Egypt/objects/EGYPT.lwo",panel,"EGYPT");
        loadDirectoryObject(url,"Egypt/objects/GreatPyramid.lwo",panel,"GreatPyramid");
        loadDirectoryObject(url,"Egypt/objects/GreatSphinx.lwo",panel,"GreatSphinx");
        loadDirectoryObject(url,"Egypt/objects/KhafrePyramid.lwo",panel,"KhafrePyramid");
        loadDirectoryObject(url,"Egypt/objects/MenkaurePyramid.lwo",panel,"MenkaurePyramid");
        loadDirectoryObject(url,"Egypt/objects/Site_SkyDome.lwo",panel,"Site_SkyDome");

        panel = document.getElementById("panel-lib-robotObjects");
        loadDirectoryObject(url,"Robots/objects/MULE_ARV_1.lwo",panel,"MULE_ARV_1");
        loadDirectoryObject(url,"Robots/objects/MULE_CM_1.lwo",panel,"MULE_CM_1");
        loadDirectoryObject(url,"Robots/objects/MULE_T_HIGH.lwo",panel,"MULE_T_HIGH");

        panel = document.getElementById("panel-lib-geoObjects");
        loadDirectoryObject(url,"objects/Terrain.lwo",panel,"Terrain");
        loadDirectoryObject(url,"Vehicles/objects/Landing-Pad.lwo",panel,"Landing-Pad");
        loadDirectoryObject(url,"Vehicles/objects/AirfieldFlat.lwo",panel,"AirfieldFlat");
        loadDirectoryObject(url,"Geography/objects/Dam.lwo",panel,"Dam");
        loadDirectoryObject(url,"Geography/objects/road.lwo",panel,"road");
        loadDirectoryObject(url,"objects/Water.lwo",panel,"Water");
        loadDirectoryObject(url,"objects/Sky2.lwo",panel,"Sky2");

        panel = document.getElementById("panel-motions");
        loadDirectoryObject(url,"motions/fly-loop.mot",panel,"Fly-loop");
        loadDirectoryObject(url,"motions/fly-loop-roll.mot",panel,"Fly-loop-roll");
        loadDirectoryObject(url,"motions/oscillate-dissolve.mot",panel,"Oscillate Dissolve");
        loadDirectoryObject(url,"motions/oscillate-scale.mot",panel,"Oscillate Scale");
        loadDirectoryObject(url,"motions/spin-y.mot",panel,"Spin");
    }

}
function loadDirectoryObject(url,href,panel,name){
    var A = document.createElement('a');
    A.setAttribute("onclick", "load('" + url + href + "'),modalHide();");
    A.setAttribute("id", name);
    A.innerHTML = name;
    panel.appendChild(A);
    var br = document.createElement("br");
    panel.appendChild(br);
}



function load(u)
{
    var url = u == null ? $('#url').val() : u;
    var ext = getFileExtension(url);
    var name = url;


    console.debug(name);
    switch(ext) {
    case "lwo":
        loadModel(url);
        break;
    case "mot":
        loadMotion(url);
        break;
    case "xml":
        bridgeworks.updateScene(url);
        break;
    }
}

var count = 1;
var motionCount = 1;

function loadModel(url)
{
    var name = url.substring(url.lastIndexOf("/")+1, url.lastIndexOf("."));
    name = count.toString()+". "+name;
    count++;


    var objectPanel = document.getElementById("object-panel");
    var row = document.createElement('div');
    row.setAttribute("id", "row" + name);
    //row.setAttribute("class", "row" + name);
    var nameColumn = document.createElement('div');
    // var colorColumn = document.createElement('div');
    var moveColumn = document.createElement('div');
    var findColumn = document.createElement('div');
    var trashColumn = document.createElement('div');
    var playColumn = document.createElement('div');
    var ffColumn = document.createElement('div');
    var stopColumn = document.createElement('div');

    var a = document.createElement('a');
    a.innerHTML = name.substring(3);
    a.setAttribute("id", name);
    a.setAttribute("onclick", "setModel('"+name+"');"); // Instead of calling setAttribute
    a.setAttribute("title", "Select Object");
    a.setAttribute("class", "object")
    a.style.cursor="pointer";
    a.style.cursor="hand";

    var id = name.replace(' ', '_');

    var moveBtn = document.createElement('span');
    moveBtn.setAttribute("id", "moveable" + id);
    moveBtn.setAttribute("class", 'shape icon-move');
    moveBtn.setAttribute("style", "margin-top:3px;");
    moveBtn.setAttribute("title", 'Toggle Moveable');
    moveBtn.setAttribute("onClick", "toggleMoveable('" + name + "');");

    moveBtn.addEventListener("click", function() {
      if ($(this).hasClass("toggle-on")) {
        $(this).removeClass("toggle-on");
      } else {
        $(this).addClass("toggle-on");
      }
    });

    var findBtn = document.createElement('span');
    findBtn.setAttribute("id", "find" + name);
    findBtn.setAttribute("class", 'shape fa fa-search');
    findBtn.setAttribute("style", "margin-top:3px;");
    findBtn.setAttribute("title", 'Jump to Object');
    findBtn.setAttribute("onClick", "locate('" + name + "');");

    var trashBtn = document.createElement('span');
    trashBtn.setAttribute("id", "trash" + name);
    trashBtn.setAttribute("class", 'shape fa fa-trash-o');
    trashBtn.setAttribute("style", "margin-top:3px;");
    trashBtn.setAttribute("title", 'Remove');
    trashBtn.setAttribute("onClick", "trashModel('" + name + "');");

    var playBtn = document.createElement('span');
    playBtn.setAttribute("id", "play-roam" + name);
    playBtn.setAttribute("class", 'shape icon-play');
    playBtn.setAttribute("style", "margin-top:3px;");
    playBtn.setAttribute("Title", 'Roam');
    playBtn.setAttribute("onClick", "roam('" + name + "');");

    var ffBtn = document.createElement('span');
    ffBtn.setAttribute("id", "fast-roam" + name);
    ffBtn.setAttribute("class", 'shape icon-fast-forward');
    ffBtn.setAttribute("style", "margin-top:3px;");
    ffBtn.setAttribute("Title", 'Roam Faster');
    ffBtn.setAttribute("onClick", "roamFaster('" + name + "');");

    var stopBtn = document.createElement('span');
    stopBtn.setAttribute("id", "stop-roam" + name);
    stopBtn.setAttribute("class", 'shape icon-stop');
    stopBtn.setAttribute("style", "margin-top:3px;");
    stopBtn.setAttribute("Title", 'Stop');
    stopBtn.setAttribute("onClick", "stopRoaming('" + name + "');");

    nameColumn.setAttribute("class", "col-sm-5");
    // colorColumn.setAttribute("class", "col-md-5");
    moveColumn.setAttribute("class", "col-sm-1");
    findColumn.setAttribute("class", "col-sm-1");
    trashColumn.setAttribute("class", "col-sm-1");
    playColumn.setAttribute("class", "col-sm-1");
    ffColumn.setAttribute("class", "col-sm-1");
    stopColumn.setAttribute("class", "col-sm-1");

    nameColumn.appendChild(a);
    moveColumn.appendChild(moveBtn);
    findColumn.appendChild(findBtn);
    // colorColumn.appendChild(c);
    trashColumn.appendChild(trashBtn);
    playColumn.appendChild(playBtn);
    ffColumn.appendChild(ffBtn);
    stopColumn.appendChild(stopBtn);

    row.appendChild(nameColumn);
    // row.appendChild(colorColumn)
    row.appendChild(moveColumn);
    row.appendChild(playColumn);
    row.appendChild(ffColumn);
    row.appendChild(stopColumn);
    row.appendChild(findColumn);
    row.appendChild(trashColumn);

    objectPanel.appendChild(row);

    var xml = loadXMLFile("BwContent/model.xml");

    var model = xml.getElementsByTagName("Model")[0];

    var n = model.attributes["name"];
    n.value = name;

    var u = model.attributes["url"];
    u.value = url;

    var pointWorld = bridgeworks.selector.pointWorld.getValueDirect();

    var pos = xml.getElementsByTagName("position")[0];
    pos.attributes["x"].value = pointWorld.x.toString();
    pos.attributes["y"].value = pointWorld.y.toString();
    pos.attributes["z"].value = pointWorld.z.toString();


    var xstr = (new XMLSerializer()).serializeToString(xml);
    //console.debug(xstr);
    bridgeworks.updateScene(xstr);

    selectedModel = bridgeworks.registry.find(name);

    myObject = document.getElementById(name);
    $('.object').removeClass('current-object');
    $(myObject).addClass('current-object');

    scaleValues = (selectedModel.scale.getValueDirect());
    x = scaleValues['x'] * 100
    $('#scales').slider('setValue', x);

    var r = selectedModel.rotation.getValueDirect();
    $("#rotxs").slider("setValue", r.x);
    $("#rotys").slider("setValue", r.y);
    $("#rotzs").slider("setValue", r.z);


    if($('#sidebar-button').hasClass("closed")){
        $('#sidebar-button').removeClass('btn-danger').addClass('btn-info');
    }

}

function loadMotion(url)
{
    var name = url.substring(url.lastIndexOf("/")+1, url.lastIndexOf("."));
    name = motionCount.toString()+". "+name;
    motionCount++;

    var animationPanel = document.getElementById("animate-panel");
    var row = document.createElement('div');
    row.setAttribute("id", "row" + name)
    var nameColumn = document.createElement('div');
    var trashColumn = document.createElement('div');
    var p = document.createElement('p');
    p.setAttribute("id", name);
    t = document.createElement('span');
    t.setAttribute("id", "trash" + name)
    t.setAttribute("class", 'shape fa fa-trash-o');
    t.setAttribute("style", "margin-top:3px;");
    t.setAttribute("Title", 'Remove');
    t.setAttribute("onClick", "trashAnimation('" + name + "');");
    nameColumn.setAttribute("class", "col-md-9");
    trashColumn.setAttribute("class", "col-md-3");
    p.innerHTML = name; // <a>INNER_TEXT</a>
    nameColumn.appendChild(p);
    trashColumn.appendChild(t);
    row.appendChild(nameColumn);
    row.appendChild(trashColumn);
    animationPanel.appendChild(row); // Append the link to the div


    var xml = loadXMLFile("BwContent/motion.xml");

    var kfi = xml.getElementsByTagName("KeyframeInterpolator")[0];

    var n = kfi.attributes["name"];
    n.value = name;

    var u = kfi.attributes["url"];
    u.value = url;

    var t = kfi.attributes["target"];
    t.value = selectedModel.name.getValueDirect().join("");

    var xstr = (new XMLSerializer()).serializeToString(xml);
    console.debug(xstr);
    bridgeworks.updateScene(xstr);
}

function locate() //Where is this function called?
{
    var name = $('#objectname').val();
    var xml = "\<Locate target='" + name + "'/>";
    console.log(xml);
    bridgeworks.updateScene(xml);
}

//Locates the target given the name and also sets current object to be the object located
function locate(name){
    var cmd = "\<Locate target='" + name + "'/>";
    selectedModel = bridgeworks.registry.find(name); //Sets the selectedModel to whatever the name is of the model you click in the list.
    setColorPicker();
    console.log(cmd);
    bridgeworks.updateScene(cmd);

    myObject = document.getElementById(name);
    $('.object').removeClass('current-object');
    $(myObject).addClass('current-object');

    scaleValues = (selectedModel.scale.getValueDirect());
    x = scaleValues['x'] * 100
    $('#scales').slider('setValue', x);

    var r = selectedModel.rotation.getValueDirect();
    $("#rotxs").slider("setValue", r.x);
    $("#rotys").slider("setValue", r.y);
    $("#rotzs").slider("setValue", r.z);

}

function roam(name) {
    if (!name) {
      name = selectedModel.name.getValueDirect().join("");
    }
    if (name === "Grid") return;

    var cmd = "\<AnimalMover name='"+ name + "_roam' target='" + name + "' linearSpeed='.5' angularSpeed='20'/>";
    console.log(cmd);
    bridgeworks.updateScene(cmd);
}

function roamFaster(name) {
    if (!name) {
      name = selectedModel.name.getValueDirect().join("");
    }
    if (name === "Grid") return;

    var cmd = "\<Set target='" + name + "_roam' linearSpeed='3'/>";
    console.log(cmd);
    bridgeworks.updateScene(cmd);
}

function toggleMoveable(name) {
  if (!name) {
    name = selectedModel.name.getValueDirect().join("");
  }
  var m = !(selectedModel.moveable.getValueDirect());

  var cmd = "\<Set target='" + name + "' moveable='" + m + "'/>";
  console.log(cmd);
  bridgeworks.updateScene(cmd);
}

function stopRoaming(name) {
    if (!name) {
      name = selectedModel.name.getValueDirect().join("");
    }
    if (name === "Grid") return;

    var cmd = "\<Remove target='" + name + "_roam'/>";
    console.log(cmd);
    bridgeworks.updateScene(cmd);
}

function setColorPicker()
{
    var g;
    var r;
    var b;
    r = selectedModel.color.values[0];
    g = selectedModel.color.values[1];
    b = selectedModel.color.values[2];
    document.getElementById('myColor').color.fromRGB(r, g, b);
}

function setModel(name)
{
    var xml = "\<Set target='" + name + "'/>";
    selectedModel = bridgeworks.registry.find(name);
    console.log(xml);
    setColorPicker();
    bridgeworks.updateScene(xml);

    myObject = document.getElementById(name);
    $('.object').removeClass('current-object');
    $(myObject).addClass('current-object');

    scaleValues = (selectedModel.scale.getValueDirect());
    x = scaleValues['x'] * 100
    $('#scales').slider('setValue', x);

    var r = selectedModel.rotation.getValueDirect();
    $("#rotxs").slider("setValue", r.x);
    $("#rotys").slider("setValue", r.y);
    $("#rotzs").slider("setValue", r.z);
}
function paste()
{
    if(copiedElement == 2)
    {
        var pointWorld = bridgeworks.selector.pointWorld.getValueDirect();

        g_labelCount = g_labelCount + 1;
        g_countStr = g_labelCount.toString();

        g_labelName = "L-" + g_countStr;

        var xml = loadXMLFile("BwContent/label.xml");

        var name = xml.getElementsByTagName("Model")[0].attributes[0];
        name.value = g_labelName;

        var pos = xml.getElementsByTagName("position")[0];
        pos.attributes["x"].value = pointWorld.x.toString();
        pos.attributes["y"].value = pointWorld.y.toString();
        pos.attributes["z"].value = pointWorld.z.toString();

        var label = xml.getElementsByTagName("Label")[0];
        label.attributes["name"].value = "Label_" + name.value;
        if(selectedModel)
        {
            label.attributes["parent"].value = modelName;
            console.log(modelName)
        }
        else {
            label.attributes["parent"].value = name.value;
            console.log("No Model");
        }

        name = xml.getElementsByTagName("Group")[0].attributes[0];
        name.value = "Group_" + g_labelName;


        var xstr = (new XMLSerializer()).serializeToString(xml);
        console.debug(xstr);
        bridgeworks.updateScene(xstr);

        var update = "\<Set target='Label_" + g_labelName + "' text='" + copiedSelectedText + "' show='true'/>";
        console.debug(update);
        bridgeworks.updateScene(update);

        var cmd = "\<Remove target='"+g_labelName+"'/>";
        bridgeworks.updateScene(cmd);
    }
    else if(copiedElement == 1) {
        load(copiedUrl);
        var name = copiedUrl.substring(copiedUrl.lastIndexOf("/") + 1, copiedUrl.lastIndexOf("."));
        count -= 1;
        name = count.toString() + ". " + name;
        count += 1;
        selectedModel.scale.setValueDirect(Size, Size, Size);
        selectedModel.rotation.setValueDirect(rotX, rotY, rotZ);
        var cmd = "\<Set target='" + name + "'>" + "\<color r= '" + R + "' " + "g= '" + G + "' " + "b= '" + B + "'/>" + "</Set>";
        bridgeworks.updateScene(cmd);
    }
}

function show(name)
{
    var xml = "\<Locate target='" + name + "'/>";
    console.debug(xml);
    bridgeworks.updateScene(xml);
}
//Apply Color function takes the selected model and sets its color to whatever the color is
//in the color patch

function applyColor()
{
    var name = selectedModel.name.getValueDirect().join("");
    var b = $('#info-b').val();
    var g = $('#info-g').val();
    var r = $('#info-r').val();
    var cmd = "\<Set target='"+name+"'>" + "\<color r= '" +r+ "' " + "g= '"+g+"' " + "b= '"+b+"'/>" +"\</Set>";
    bridgeworks.updateScene(cmd);
}

function remoteColor(name)
{
    var b = $('#' + name + 'info-b').val();
    var g = $('#' + name + 'info-g').val();
    var r = $('#' + name + 'info-r').val();
}

function cubify() {
  var m = "\<Update>";

    m += "\<Model url='objects/Cube.lwo'>";
    m += "\<scale x='100' y='100' z='1'/>";
    m += "\<position x='100' y='0' z='0'/>";
    m += "\</Model>";

    m += "\<Model url='objects/Cube.lwo'>";
    m += "\<scale x='1' y='100' z='100'/>";
    m += "\</Model>";

    m += "\<Model url='objects/Cube.lwo'>";
    m += "\<scale x='100' y='1' z='100'/>";
    m += "\<position x='0' y='0' z='100'/>";
    m += "\</Model>";

  m += "\</Update>";
  bridgeworks.updateScene(m);

}
